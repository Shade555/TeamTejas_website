"use client";
import React, { useEffect, useRef } from "react";
import styles from "./threeplane.module.css";

export default function ThreePlane() {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, model, frameId;

    let mounted = true;

    // === Configurable values: edit these to position/orient the plane ===
    // Position (x, y, z) in world units
    const MODEL_BASE_POS = { x: 0, y: 0.1, z: 0 };
    // Rotation in radians: pitch (x), yaw (y), roll (z)
    // change these numbers to orient the plane. Example: degrees * Math.PI/180
    // Example: -8 degrees pitch -> -8 * Math.PI / 180 === -0.1396
    const MODEL_BASE_ROT = { x: 0.7, y: -0.6, z: -0.3 };
    // Uniform scale
    const MODEL_BASE_SCALE = 0.92;

    // Camera position - move this to adjust viewpoint
    // Suggested camera for reference screenshot (closer, slightly right)
    const CAMERA_BASE_POS = { x: -0.1, y: 0.12, z: 3.2 };

    // Target rotation the model should interpolate toward. Update via mouse or manually.
    let targetRot = { ...MODEL_BASE_ROT };
    let mouseOffset = { x: 0, y: 0 };
    // ======================================================================

    (async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import(
          "three/addons/loaders/GLTFLoader.js"
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
        camera.position.set(CAMERA_BASE_POS.x, CAMERA_BASE_POS.y, CAMERA_BASE_POS.z);

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
            model.position.set(MODEL_BASE_POS.x, MODEL_BASE_POS.y, MODEL_BASE_POS.z);
            model.rotation.set(MODEL_BASE_ROT.x, MODEL_BASE_ROT.y, MODEL_BASE_ROT.z);
            model.scale.set(MODEL_BASE_SCALE, MODEL_BASE_SCALE, MODEL_BASE_SCALE);

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
            // Interpolate model.rotation toward targetRot. To manually set a
            // fixed orientation, edit MODEL_BASE_ROT above; the model will
            // smoothly move to those values and then stay there.
            const lerp = 0.08;
            model.rotation.x += (targetRot.x - model.rotation.x) * lerp;
            model.rotation.y += (targetRot.y - model.rotation.y) * lerp;
            model.rotation.z += (targetRot.z - (model.rotation.z || 0)) * lerp;
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

  return <div ref={mountRef} className={styles.container} />;
}
