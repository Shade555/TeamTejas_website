import Hero from "../hero/hero";
import MissionVision from "../mission/mission";
import AboutUs from "../about/about";
import MVVG from "../MVVG/mvvg";
import NextImage from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import sponsor1 from "../sponsor/image-removebg-preview (19).png";
import sponsor2 from "../sponsor/image-removebg-preview (20).png";
import sponsor3 from "../sponsor/image-removebg-preview (21).png";
import sponsor4 from "../sponsor/image-removebg-preview (22).png";
import sponsor5 from "../sponsor/image-removebg-preview (23).png";
import Testimonials from "../testimonials/testimonials";

const Home = () => {
  const logos = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5];
  const sectionRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const animationRef = useRef(null);
  

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const cta = container.querySelector(".sponsor-cta");
    let hoverTween = null;

    const onEnter = () => {
      if (!cta) return;
      hoverTween && hoverTween.kill();
      hoverTween = gsap.to(cta, {
        scale: 1.03,
        duration: 0.18,
        ease: "power1.out",
      });
    };

    const onLeave = () => {
      if (!cta) return;
      hoverTween && hoverTween.reverse();
    };

    if (cta) {
      cta.addEventListener("mouseenter", onEnter);
      cta.addEventListener("mouseleave", onLeave);
      cta.addEventListener("focus", onEnter);
      cta.addEventListener("blur", onLeave);
    }

    return () => {
      if (cta) {
        cta.removeEventListener("mouseenter", onEnter);
        cta.removeEventListener("mouseleave", onLeave);
        cta.removeEventListener("focus", onEnter);
        cta.removeEventListener("blur", onLeave);
      }
      hoverTween && hoverTween.kill();
    };
  }, []);

  // Auto-scroll animation with local dragging
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    let currentX = 0;
    let isDraggingLocal = false;
    let dragStartX = 0;

    const startAutoScroll = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(track, {
        x: -track.offsetWidth / 2,
        duration: 12,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(track, { x: 0 });
          currentX = 0;
        },
        onUpdate: () => {
          if (!isDraggingLocal) {
            currentX = gsap.getProperty(track, "x");
          }
        },
      });
    };

    const handlePointerDown = (e) => {
      isDraggingLocal = true;
      dragStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      if (animationRef.current) {
        animationRef.current.pause();
      }
      track.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (!isDraggingLocal || !track) return;
      
      // Prevent default only when actively dragging
      if (e.cancelable && e.type === 'touchmove') {
        e.preventDefault();
      }
      
      const currentXPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const diff = currentXPos - dragStartX;
      currentX += diff;
      gsap.set(track, { x: currentX });
      dragStartX = currentXPos;
    };

    const handlePointerUp = () => {
      isDraggingLocal = false;
      track.style.cursor = 'grab';
      startAutoScroll();
    };

    startAutoScroll();
    
    // Start drag on track element
    track.addEventListener("pointerdown", handlePointerDown, { passive: true });
    track.addEventListener("touchstart", handlePointerDown, { passive: true });
    
    // Move/up handlers on document for smoother dragging
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("touchmove", handlePointerMove, { passive: false });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("touchend", handlePointerUp, { passive: true });
    document.addEventListener("pointercancel", handlePointerUp, { passive: true });
    document.addEventListener("touchcancel", handlePointerUp, { passive: true });

    return () => {
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("touchend", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("touchcancel", handlePointerUp);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  // Sponsor section creative reveal (title clip, paragraph slide, logos pop, CTA pulse)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const title = el.querySelector('h2');
    const para = el.querySelector('p');
    const logos = el.querySelectorAll('.marquee-item');
    const cta = el.querySelector('.sponsor-cta');

    // initial states
    if (title) gsap.set(title, { opacity: 0, y: 6, clipPath: 'inset(0 100% 0 0)' });
    if (para) gsap.set(para, { opacity: 0, y: 18 });
    if (logos && logos.length) gsap.set(logos, { opacity: 0, y: 18, scale: 0.94, rotate: -4 });
    if (cta) gsap.set(cta, { opacity: 0, y: 10, scale: 0.98 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom top',
        scrub: false,
        markers: false,
        invalidateOnRefresh: true,
      }
    });

    if (title) tl.to(title, { clipPath: 'inset(0 0% 0 0)', opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    if (para) tl.to(para, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45');
    if (logos && logos.length) tl.to(logos, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.1)' }, '-=0.4');
    if (cta) tl.to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }, '-=0.45');

    return () => {
      try { tl.kill(); } catch (e) {}
    };
  }, []);

  return (
    <main>
      <Hero />
      <div style={{ marginTop: "-6rem" }}>
        <AboutUs />
      </div>

      <MVVG />

      <MissionVision />

      {/* ✅ MOVED STYLES HERE (only change made) */}
      <style jsx>{`
        .marquee {
          width: 100%;
          position: relative;
          overflow: hidden;
          cursor: grab;
        }

        .marquee:active {
          cursor: grabbing;
        }

        .marquee {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 16%,
            black 84%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 16%,
            black 84%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 28px;
          align-items: center;
          will-change: transform;
          user-select: none;
        }

        .marquee-item {
          flex: 0 0 auto;
          width: 260px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 160px;
            height: 120px;
          }
          
          .marquee-track {
            gap: 12px;
          }
          
          .marquee {
            -webkit-mask-image: linear-gradient(
              90deg,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              90deg,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }

        .sponsor-cta {
          will-change: transform;
        }
        .sponsor-cta:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .sponsor-cta:active {
          transform: translateY(-2px) scale(0.995);
        }
      `}</style>

      {/* Sponsor Us section */}
      <section
        ref={sectionRef}
        style={{
          padding: "3.5rem 6rem",
          background: "linear-gradient(180deg, #070e1c 0%, #050a12 100%)",
          backgroundColor: "#070e1c",
          color: "#dff6fb",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.2rem",
              margin: 0,
              backgroundImage:
                "linear-gradient(135deg, #00103c 0%, #0a3990 35%, #79a1c0 55%, #a0d8f4 80%, #4fa1eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Sponsor Us
          </h2>

          <p
            style={{
              margin: "1rem auto",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#bfeefc",
              maxWidth: 920,
              textAlign: "center",
            }}
          >
            We are seeking companies that can support our team in the areas of
            design, fabrication, and avionics. As a way to express our
            appreciation for your support, we will use our aircraft and social
            media handles.
          </p>

          {/* Logos marquee */}
          <div style={{ marginTop: "2rem", overflow: "hidden" }}>
            <div className="marquee" aria-hidden>
              <div className="marquee-track" ref={marqueeTrackRef}>
                {[...logos, ...logos].map((src, idx) => (
                  <div key={idx} className="marquee-item">
                    <NextImage
                      src={src}
                      alt={`sponsor-${(idx % logos.length) + 1}`}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        pointerEvents: "none",
                      }}
                      width={260}
                      height={140}
                      draggable={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <a href="/sponsor" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "rgba(59,130,246,0.25)",
                  color: "#66f0ff",
                  padding: "0.6rem 1rem",
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  transition: "transform 160ms cubic-bezier(.2,.9,.2,1)",
                }}
                className="sponsor-cta"
              >
                <span style={{ display: "inline-block", padding: "0 6px" }}>
                  Learn More
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>

        <Testimonials />
    </main>
  );
};

export default Home;
