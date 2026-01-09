"use client";
import React from "react";
import gsap from "gsap";
import initSponsorAnimations from "./sponsorAnimations";
// ShinyText removed — replace with plain heading text
import LightRays from "../LightRays/page";
import sponsor1 from "./image-removebg-preview (19).png";
import sponsor2 from "./image-removebg-preview (20).png";
import sponsor3 from "./image-removebg-preview (21).png";
import sponsor4 from "./image-removebg-preview (22).png";
import sponsor5 from "./image-removebg-preview (23).png";

const Sponsor = () => {
  const containerRef = React.useRef(null);
  const leftLineRef = React.useRef(null);
  const rightLineRef = React.useRef(null);
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initSponsorAnimations(containerRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  React.useEffect(() => {
    if (!leftLineRef.current || !rightLineRef.current || !titleRef.current) return;

    const tl = gsap.timeline();

    // Title lines expand (scaleX) and title fades in
    tl.to(leftLineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' })
      .to(rightLineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '<')
      .to(titleRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    return () => tl.kill();
  }, []);

  return (
    <main
      style={{
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background light rays - absolutely positioned and non-interactive */}
      <div
        style={{
          /* place the light rays relative to the viewport so they start at the very top of the site */
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#3A81E4"
          raysSpeed={0.6}
          followMouse={true}
          className=""
        />
      </div>

      <div ref={containerRef} style={{ position: "relative", zIndex: 1 }}>
        <style jsx>{`
          .sponsor-header-line {
            transform-origin: left center;
            transform: scaleX(0);
            will-change: transform;
          }
          .sponsor-header-line-right {
            transform-origin: right center;
          }
          .sponsor-header-title {
            opacity: 0;
          }
          @media (max-width: 768px) {
            .sponsor-header-line {
              max-width: 80px !important;
              flex: 0 0 80px !important;
            }
            .sponsor-header-title {
              font-size: 1.85rem !important;
            }
          }
        `}</style>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <span
            ref={leftLineRef}
            className="sponsor-header-line"
            style={{
              flex: "0 0 150px",
              height: "2px",
              maxWidth: "150px",
              background:
                "linear-gradient(90deg, transparent 0%, #0a3990 20%, #4fa1eb 50%, #79a1c0 80%, transparent 100%)",
            }}
          ></span>
          <h1
            ref={titleRef}
            className="sponsor-header-title"
            style={{
              fontFamily: "Cormorant_SC, serif",
              fontSize: "2.25rem",
              fontWeight: 700,
              margin: 0,
              textAlign: "center",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              background:
                "linear-gradient(135deg,#00103c 0%,#0a3990 10%,#4fa1eb 50%,#79a1c0 80%,#a0d8f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sponsors and Partners
          </h1>
          <span
            ref={rightLineRef}
            className="sponsor-header-line sponsor-header-line-right"
            style={{
              flex: "0 0 150px",
              height: "2px",
              maxWidth: "150px",
              background:
                "linear-gradient(90deg, transparent 0%, #79a1c0 20%, #4fa1eb 50%, #0a3990 80%, transparent 100%)",
            }}
          ></span>
        </div>

        <p
          style={{
            maxWidth: 760,
            fontSize: "0.92rem",
            margin: "0 auto 1.5rem",
            lineHeight: 1.6,
            color: "#b3cfe5",
          }}
          className="sponsor-desc"
        >
          We're a student-led team focused on building innovative projects and
          giving students hands-on experience. Your support helps us cover costs
          for equipment and development resources.
        </p>

        <section
          className="sponsor-intro"
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          <div style={{ marginTop: "1rem" }}>
            <a
              href="https://forms.gle/GjqHTB4qxVBsjVa1A"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
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
                  /* remove ambient/glow */
                  boxShadow: "none",
                  transition: "transform 160ms cubic-bezier(.2,.9,.2,1)",
                  transform: "translateY(0) scale(1)",
                }}
                className="sponsor-cta"
              >
                <span style={{ display: "inline-block", padding: "0 6px" }}>
                  Sponsor Us
                </span>
              </button>
              {/* CTA hover/active handled in component-scoped styles below */}
            </a>
          </div>
        </section>
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#ffffff",
          }}
        >
          <small style={{ fontSize: "1.1rem" }}>Our Top Sponsors</small>
        </div>

        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <div className="sponsor-logos align-center">
            {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
              (src, idx) => (
                <div key={idx} className="sponsor-card sponsor-logo-top">
                  <img
                    src={src.src}
                    alt={`sponsor-${idx + 1}`}
                    className="sponsor-img"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* 2025-26 Production and Program Sponsors (right-aligned) */}
        <section
          className="sponsor-year"
          style={{ marginTop: 40, maxWidth: 860, marginLeft: "auto" }}
        >
          <div
            style={{
              textAlign: "right",
              color: "#ffffff",
              fontSize: "1.8rem",
              fontWeight: 600,
            }}
          >
            2025-26 Production and Program Sponsors:
          </div>
          <p
            style={{
              maxWidth: 860,
              fontSize: "1.1rem",
              margin: "0.5rem 0 1.25rem auto",
              color: "#b3cfe5",
              lineHeight: 1.6,
              textAlign: "right",
            }}
          >
            Thank you to our sponsors for supporting Team Tejas in 2025–26.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <div className="sponsor-logos align-right">
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`y-${idx}`}
                    className="sponsor-card sponsor-logo-right"
                  >
                    <img
                      src={src.src}
                      alt={`sponsor-2025-${idx + 1}`}
                      className="sponsor-img"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* 2024-25 Production and Program Sponsors (left-aligned) */}
        <section
          className="sponsor-year"
          style={{ marginTop: 40, maxWidth: 860 }}
        >
          <div
            style={{
              textAlign: "left",
              color: "#ffffff",
              fontSize: "1.8rem",
              fontWeight: 600,
            }}
          >
            2024-25 Production and Program Sponsors:
          </div>
          <p
            style={{
              maxWidth: 860,
              fontSize: "1.1rem",
              margin: "0.5rem auto 1.25rem 0",
              color: "#b3cfe5",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            Thank you to the 2024–25 sponsors whose support powered our events
            and student projects.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 8,
            }}
          >
            <div className="sponsor-logos align-left">
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`24-${idx}`}
                    className="sponsor-card sponsor-logo-left"
                  >
                    <img
                      src={src.src}
                      alt={`sponsor-2024-${idx + 1}`}
                      className="sponsor-img"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* 2023-24 Production and Program Sponsors (right-aligned) */}
        <section
          className="sponsor-year"
          style={{ marginTop: 40, maxWidth: 860, marginLeft: "auto" }}
        >
          <div
            style={{
              textAlign: "right",
              color: "#ffffff",
              fontSize: "1.8rem",
              fontWeight: 600,
            }}
          >
            2023-24 Production and Program Sponsors:
          </div>
          <p
            style={{
              maxWidth: 860,
              margin: "0.5rem 0 1.25rem auto",
              color: "#b3cfe5",
              lineHeight: 1.6,
              fontSize: "1.1rem",
              textAlign: "right",
            }}
          >
            Our 2023–24 sponsors laid the foundation for many of our successes.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <div className="sponsor-logos align-right">
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`23-${idx}`}
                    className="sponsor-card sponsor-logo-right"
                  >
                    <img
                      src={src.src}
                      alt={`sponsor-2023-${idx + 1}`}
                      className="sponsor-img"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <style jsx>{`
          /* Desktop (default): restore original flex-based layout used previously */
          .sponsor-logos {
            display: flex;
            gap: 16px;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            width: 100%;
            box-sizing: border-box;
          }

          .sponsor-logos.align-center {
            justify-content: center;
          }
          .sponsor-logos.align-right {
            justify-content: flex-end;
            justify-items: end;
          }
          .sponsor-logos.align-left {
            justify-content: flex-start;
            justify-items: start;
          }

          /* Desktop: fixed-size logo cards to match previous appearance */
          .sponsor-card {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            box-sizing: border-box;
            flex: 0 0 auto;
            width: 250px;
            height: 240px;
          }

          /* Right/left rows originally used slightly smaller cards */
          .sponsor-card.sponsor-logo-right,
          .sponsor-card.sponsor-logo-left {
            width: 230px;
          }

          .sponsor-img {
            width: 100%;
            height: auto;
            max-height: 240px;
            object-fit: contain;
            display: block;
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

          /* Tablet: 2 columns (reduce gap) */
          @media (max-width: 1024px) {
            .sponsor-logos {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
            }
            .sponsor-card {
              /* switch to responsive card sizing on tablet */
              width: 100%;
              max-width: 260px;
              height: auto;
            }
          }

          /* Mobile: single column (more compact gap) */
          @media (max-width: 768px) {
            .sponsor-logos {
              display: grid;
              grid-template-columns: 1fr;
              gap: 6px;
            }
            .sponsor-card {
              width: 100%;
              max-width: 100%;
              height: auto;
              padding-left: 0;
              padding-right: 0;
            }
            .sponsor-logos.align-right,
            .sponsor-logos.align-left,
            .sponsor-logos.align-center {
              justify-items: center;
            }
          }
        `}</style>
      </div>
    </main>
  );
};

export default Sponsor;
