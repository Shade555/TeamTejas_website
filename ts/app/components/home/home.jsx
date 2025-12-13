import Hero from "../hero/hero";
import MissionVision from "../mission/mission";
import AboutUs from "../about/about";
import NextImage from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import sponsor1 from "../sponsor/image-removebg-preview (19).png";
import sponsor2 from "../sponsor/image-removebg-preview (20).png";
import sponsor3 from "../sponsor/image-removebg-preview (21).png";
import sponsor4 from "../sponsor/image-removebg-preview (22).png";
import sponsor5 from "../sponsor/image-removebg-preview (23).png";
import Testimonials from "../testimonials/testimonials";

const Home = () => {
  const logos = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5];
  const sectionRef = useRef(null);

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

  return (
    <main>
      <Hero />
      <div style={{ marginTop: "-6rem" }}>
        <AboutUs />
      </div>
      <MissionVision />

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
              color: "#ffffff",
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

          {/* Logos marquee (fade sequence via GSAP) */}
          <div style={{ marginTop: "2rem", overflow: "hidden" }}>
            <div className="marquee" aria-hidden>
              <div className="marquee-track">
                {[...logos, ...logos].map((src, idx) => (
                  <div key={idx} className="marquee-item">
                    <NextImage
                      src={src}
                      alt={`sponsor-${(idx % logos.length) + 1}`}
                      style={{ objectFit: "contain", objectPosition: "center" }}
                      width={260}
                      height={140}
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
                  boxShadow: "none",
                  transition: "transform 160ms cubic-bezier(.2,.9,.2,1)",
                  transform: "translateY(0) scale(1)",
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

        <style jsx>{`
          .marquee {
            width: 100%;
            position: relative;
          }

          /* soft fade at edges using mask
           Increased so logos reach full opacity a bit later and begin fading a bit earlier
           (16% / 84%). */
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
          }
          .marquee-item {
            flex: 0 0 auto;
            width: 260px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* sliding animation: move the duplicated track from -50% to 0 so logos travel left->right */
          .marquee-track {
            animation: slideLR 20s linear infinite;
          }

          @keyframes slideLR {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          /* Reduce motion for users who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }
          }
          /* Sponsor CTA subtle pop-up (matches sponsor page) */
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
      </section>

      <Testimonials />
    </main>
  );
};

export default Home;
