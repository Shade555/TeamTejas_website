"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import styles from "./threeplane.module.css";

export default function ThreePlane() {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, model, frameId;
    let mixer = null;
    let gsapTween = null;
    let actions = [];
    let autoPlay = true;
    let autoElapsed = 0;
    const AUTO_DURATION = 2.1; // seconds to play automatically before scroll control
    let planeCompleted = false;
    let lastFrameTime = performance.now();

    let mounted = true;
    let originalModelScale = null;
    let scaleResizeHandler = null;

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

        // Fallback camera — if the GLB contains a camera we'll replace this
        camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 1000);
        camera.position.set(0, 0, 3.2);

        const ambient = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambient);

        const dir = new THREE.DirectionalLight(0xffffff, 0.6);
        dir.position.set(5, 5, 5);
        scene.add(dir);

        mountRef.current.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        // Load the requested GLB (no entry animations or transforms)
        loader.load(
          "/plane_model/tejas_plane.glb",
          (gltf) => {
            model = gltf.scene || gltf.scenes?.[0];
            if (model) scene.add(model);

            // capture original scale and apply mobile scaling if needed
            try {
              originalModelScale = model.scale.clone();
              const applyResponsiveScale = () => {
                try {
                  const isMobile = (window.innerWidth || document.documentElement.clientWidth) <= 768;
                  const factor = isMobile ? 0.6 : 1.0; // reduce to 60% on mobile
                  // Scale the model directly for mobile
                  if (model && originalModelScale) {
                    model.scale.copy(originalModelScale).multiplyScalar(factor);
                  }
                } catch (e) {}
              };
              applyResponsiveScale();
              // call on resize as well
              window.addEventListener('resize', applyResponsiveScale);
              // remember handler reference so we can clean up later
              scaleResizeHandler = applyResponsiveScale;
            } catch (e) {}

            // Setup animations after model is added so tracks resolve correctly
            if (gltf.animations && gltf.animations.length > 0) {
              // Use scene as mixer root so camera clips affect scene camera too
              mixer = new THREE.AnimationMixer(scene);
              actions = gltf.animations.map((clip) => {
                const action = mixer.clipAction(clip);
                action.reset();
                action.setLoop(THREE.LoopOnce, 0);
                action.clampWhenFinished = true;
                action.play();
                return { clip, action, duration: clip.duration || 0 };
              });

              // dispatch event when mixer finishes (fallback)
              try {
                mixer.addEventListener && mixer.addEventListener('finished', () => {
                  if (!planeCompleted) {
                    planeCompleted = true;
                    try { window.dispatchEvent(new CustomEvent('planeAnimationComplete')); } catch (e) {}
                  }
                });
              } catch (e) {}

              // debug info
              console.log("GLTF animations:", gltf.animations.map((a) => ({ name: a.name, duration: a.duration })));
            }

            // If the GLB contains cameras, use the first one as active camera
            if (gltf.cameras && gltf.cameras.length > 0) {
              camera = gltf.cameras[0];
              // ensure aspect correct for current mount size
              camera.aspect =
                (mountRef.current.clientWidth || window.innerWidth) /
                (mountRef.current.clientHeight || window.innerHeight);
              if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
            } else {
              // fallback: try to find a camera in scene graph
              const camFromScene = scene.getObjectByProperty("type", "Camera");
              if (camFromScene) camera = camFromScene;
            }

            // Ensure materials are opaque (no animations/transforms applied)
            if (model) {
              model.traverse((c) => {
                if (c.isMesh && c.material) {
                  try {
                    c.material.transparent = false;
                    c.material.opacity = 1;
                    c.material.depthWrite = true;
                  } catch (err) {}
                }
              });
            }
          },
          undefined,
          (err) => console.error("GLTF load error:", err)
        );

        function onResize() {
          if (!mountRef.current) return;
          const w = mountRef.current.clientWidth;
          const h = mountRef.current.clientHeight;
          if (camera.isPerspectiveCamera || camera.isOrthographicCamera) {
            camera.aspect = w / h;
            if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
          }
          renderer.setSize(w, h);
          // if model scale responsiveness is set, re-apply based on new width
          try {
            if (originalModelScale && model) {
              const isMobile = (window.innerWidth || document.documentElement.clientWidth) <= 768;
              const factor = isMobile ? 0.6 : 1.0;
              model.scale.copy(originalModelScale).multiplyScalar(factor);
            }
          } catch (e) {}
        }

        window.addEventListener("resize", onResize);

        const animate = () => {
          if (!mounted) return;
          const now = performance.now();
          const delta = (now - lastFrameTime) / 1000;
          lastFrameTime = now;

          // During auto-play phase, advance mixer normally
          if (mixer && autoPlay) {
            try {
              mixer.update(delta);
            } catch (e) {
              console.warn("mixer.update during autoplay failed", e);
            }
            autoElapsed += delta;
            if (autoElapsed >= AUTO_DURATION) {
              autoPlay = false;
              // After auto phase, create ScrollTrigger scrub to control rest
              if (actions && actions.length > 0) {
                const scrubObj = { t: AUTO_DURATION };
                const totalTarget = Math.max(...actions.map((a) => a.duration || AUTO_DURATION));
                // create tween only once
                gsapTween = gsap.to(scrubObj, {
                  t: totalTarget,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: mountRef.current || document.body,
                    // end when Testimonials section reaches top of viewport
                    endTrigger: ".testimonials-section",
                    start: "top top",
                    end: "top top",
                    scrub: true,
                  },
                  onUpdate: () => {
                    actions.forEach(({ action, duration }) => {
                      const time = Math.min(scrubObj.t, duration || totalTarget);
                      try {
                        action.time = time;
                      } catch (e) {
                        console.warn("action.time set failed", e);
                      }
                    });
                    try {
                      mixer.update(0);
                    } catch (e) {
                      console.warn("mixer.update failed", e);
                    }
                    // if scrub reached end, mark plane completed and dispatch event
                    if (scrubObj.t >= totalTarget && !planeCompleted) {
                      planeCompleted = true;
                      try { window.dispatchEvent(new CustomEvent('planeAnimationComplete')); } catch (e) {}
                    }
                  },
                });
              }
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
          if (gsapTween) {
            try {
              if (gsapTween.scrollTrigger) gsapTween.scrollTrigger.kill();
              gsapTween.kill();
            } catch (e) {}
            gsapTween = null;
          }
          if (mixer) {
            try {
              mixer.stopAllAction();
            } catch (e) {}
            mixer = null;
          }
          if (scaleResizeHandler) {
            try { window.removeEventListener('resize', scaleResizeHandler); } catch (e) {}
            scaleResizeHandler = null;
          }
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
