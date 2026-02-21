"use client";
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import styles from "./threeplane.module.css";

function ThreePlane(props, ref) {
  const mountRef = useRef(null);
  const modelRef = useRef(null)
  const entryStartPosRef = useRef(null)
  const entryStartTimeRef = useRef(null)
  const entryDoneRef = useRef(false)
  const targetRotRef = useRef(null)
  const targetPosRef = useRef(null)

  useEffect(() => {
    let renderer, scene, camera, model, frameId;

    let mounted = true;

    // === Configurable values: edit these to position/orient the plane ===
    // Position (x, y, z) in world units
    const isMobile = window.innerWidth <= 768;
    const MODEL_BASE_POS = { x: isMobile ? -0.2 : 0, y: -0.06, z: 0 };
    // Rotation in radians: pitch (x), yaw (y), roll (z)
    // change these numbers to orient the plane. Example: degrees * Math.PI/180
    // Example: -8 degrees pitch -> -8 * Math.PI / 180 === -0.1396
    const MODEL_BASE_ROT = { x: 0.7, y: -0.6, z: -0.3 };
    // Uniform scale - reduced for mobile
    const MODEL_BASE_SCALE = isMobile ? 0.55 : 0.92;

    // Camera position - move this to adjust viewpoint
    // Suggested camera for reference screenshot (closer, slightly right)
    const CAMERA_BASE_POS = { x: -0.1, y: 0.12, z: 3.2 };

    // Target rotation the model should interpolate toward. Update via mouse or manually.
    targetRotRef.current = { ...MODEL_BASE_ROT }
    let mouseOffset = { x: 0, y: 0 };
    // Entry animation: start the model offset from its base position and
    // animate into place along that vector. Edit `MODEL_ENTRY_OFFSET`
    // to change the incoming direction (matches your red arrow).
    // Reverse direction so the plane approaches from forward (camera side)
    // Flip the offset vector to make the motion come from the front.
    const MODEL_ENTRY_OFFSET = { x: 1.6, y: 0.8, z: -1.2 };
    const ENTRY_DURATION_MS = 1200;
    let entryStartTime = null;
    let entryStartPos = null;
    let entryDone = false;
    // ======================================================================

    (async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );

        const width = mountRef.current.clientWidth || window.innerWidth;
        const height = mountRef.current.clientHeight || window.innerHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.domElement.className = styles.canvas;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 1000);
        // use CAMERA_BASE_POS so you can edit camera viewpoint above
        camera.position.set(
          CAMERA_BASE_POS.x,
          CAMERA_BASE_POS.y,
          CAMERA_BASE_POS.z
        );

        const ambient = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambient);

        const dir = new THREE.DirectionalLight(0xffffff, 0.6);
        dir.position.set(5, 5, 5);
        scene.add(dir);

        // Mouse interaction: move only the light. The plane's rotation remains
        // fixed at MODEL_BASE_ROT (it will interpolate to that and not follow cursor).
        const handleMouse = (e) => {
          if (!mountRef.current) return;
          const rect = mountRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width; // 0-1
          const y = (e.clientY - rect.top) / rect.height; // 0-1

          // move directional light softly in response to mouse
          const lx = (x - 0.5) * 6;
          const ly = (0.5 - y) * 4 + 1.8;
          dir.position.set(lx, ly, 4.5);

          // intensity based on proximity to center of screen
          const dx = x - 0.5;
          const dy = y - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist * 2);
          dir.intensity = 0.35 + influence * 0.75;
        };
        window.addEventListener("mousemove", handleMouse);

        mountRef.current.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        // public/plane_model/scene.gltf
        loader.load(
          "/plane_model/scene.gltf",
          (gltf) => {
            model = gltf.scene;
            // position/scale adjustments — tweak using the constants above
            // set initial entry position offset so the plane flies into place
            entryStartPosRef.current = {
              x: MODEL_BASE_POS.x + MODEL_ENTRY_OFFSET.x,
              y: MODEL_BASE_POS.y + MODEL_ENTRY_OFFSET.y,
              z: MODEL_BASE_POS.z + MODEL_ENTRY_OFFSET.z,
            };
            // start at the entry position
            model.position.set(
              entryStartPosRef.current.x,
              entryStartPosRef.current.y,
              entryStartPosRef.current.z
            );
            // start with the base rotation (you can change this if you want
            // a rotation during entry)
            model.rotation.set(
              MODEL_BASE_ROT.x,
              MODEL_BASE_ROT.y,
              MODEL_BASE_ROT.z
            );
            model.scale.set(
              MODEL_BASE_SCALE,
              MODEL_BASE_SCALE,
              MODEL_BASE_SCALE
            );

            // ensure opaque materials
            model.traverse((c) => {
              if (c.isMesh && c.material) {
                try {
                  c.material.transparent = false;
                  c.material.opacity = 1;
                  c.material.depthWrite = true;
                } catch (err) {
                  // ignore
                }
              }
            });

            // start the entry timer
            entryStartTimeRef.current = performance.now();
            entryDoneRef.current = false;
            modelRef.current = model
            // initial target position (will interpolate toward this)
            targetPosRef.current = { ...MODEL_BASE_POS }

            scene.add(model);
          },
          undefined,
          (err) => console.error("GLTF load error:", err)
        );

        function onResize() {
          if (!mountRef.current) return;
          const w = mountRef.current.clientWidth;
          const h = mountRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }

        window.addEventListener("resize", onResize);

        const animate = () => {
          if (!mounted) return;
          if (model) {
            // Entry animation: if not done, interpolate position from entryStartPos
            // to MODEL_BASE_POS over ENTRY_DURATION_MS using an ease-out curve.
            const now = performance.now();
            if (!entryDoneRef.current && entryStartTimeRef.current != null && entryStartPosRef.current) {
              const tRaw = Math.min(
                (now - entryStartTimeRef.current) / ENTRY_DURATION_MS,
                1
              );
              const t = 1 - Math.pow(1 - tRaw, 3); // ease-out cubic
              model.position.x =
                entryStartPosRef.current.x + (MODEL_BASE_POS.x - entryStartPosRef.current.x) * t;
              model.position.y =
                entryStartPosRef.current.y + (MODEL_BASE_POS.y - entryStartPosRef.current.y) * t;
              model.position.z =
                entryStartPosRef.current.z + (MODEL_BASE_POS.z - entryStartPosRef.current.z) * t;
              if (tRaw >= 1) entryDoneRef.current = true;
            }

            // Interpolate model.rotation toward targetRot. The model keeps the
            // base rotation but will smoothly approach it (mouse or debug-driven).
            const lerp = 0.08;
            const currentTarget = targetRotRef.current || MODEL_BASE_ROT
            model.rotation.x += (currentTarget.x - model.rotation.x) * lerp;
            model.rotation.y += (currentTarget.y - model.rotation.y) * lerp;
            model.rotation.z += (currentTarget.z - (model.rotation.z || 0)) * lerp;

            // If a debug-driven target position exists, softly interpolate toward it
            if (targetPosRef.current && entryDoneRef.current) {
              const plerp = 0.06
              model.position.x += (targetPosRef.current.x - model.position.x) * plerp
              model.position.y += (targetPosRef.current.y - model.position.y) * plerp
              model.position.z += (targetPosRef.current.z - model.position.z) * plerp
            }
          }
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(animate);
        };

        animate();

        // cleanup
        return () => {
          mounted = false;
          cancelAnimationFrame(frameId);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", handleMouse);
          if (renderer) {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode)
              renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        };
      } catch (e) {
        console.error("Three import failed:", e);
      }
    })();

    return () => {
      // placeholder cleanup if the async return hasn't run
    };
  }, []);

  // expose imperative handle to allow restarting entry animation and debug control
  function getState() {
    const m = modelRef.current
    if (!m) return null
    return {
      position: { x: m.position.x, y: m.position.y, z: m.position.z },
      rotation: { x: m.rotation.x, y: m.rotation.y, z: m.rotation.z }
    }
  }

  function setTargetRotation(rot = {}) {
    targetRotRef.current = { ...(targetRotRef.current || { x: 0, y: 0, z: 0 }), ...rot }
  }

  function setTargetPosition(pos = {}) {
    targetPosRef.current = { ...(targetPosRef.current || { x: 0, y: 0, z: 0 }), ...pos }
  }

  useImperativeHandle(ref, () => ({
    restartEntry() {
      if (modelRef.current && entryStartPosRef.current) {
        // reset to entry start pos and restart timer
        modelRef.current.position.set(
          entryStartPosRef.current.x,
          entryStartPosRef.current.y,
          entryStartPosRef.current.z
        );
        entryStartTimeRef.current = performance.now();
        entryDoneRef.current = false;
      }
    },
    getState,
    setTargetRotation,
    setTargetPosition
  }))

  return <div ref={mountRef} className={styles.container} />;
}

export default forwardRef(ThreePlane)
