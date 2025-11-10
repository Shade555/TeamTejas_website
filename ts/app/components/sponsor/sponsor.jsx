"use client";
import React from "react";
import initSponsorAnimations from "./sponsorAnimations";
import ShinyText from "../../../components/ShinyText";
import LightRays from "../LightRays/page";
import NextImage from "next/image";
import sponsor1 from "./image-removebg-preview (19).png";
import sponsor2 from "./image-removebg-preview (20).png";
import sponsor3 from "./image-removebg-preview (21).png";
import sponsor4 from "./image-removebg-preview (22).png";
import sponsor5 from "./image-removebg-preview (23).png";

const Sponsor = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initSponsorAnimations(containerRef.current);
    return () => {
      if (cleanup) cleanup();
    };
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
        <div className="sponsor-heading" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          <ShinyText text={"Sponsors and Partners"} speed={5} />
        </div>

        <p
          style={{
            maxWidth: 760,
            fontSize: "1.1rem",
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

  <section className="sponsor-intro" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginTop: "1rem" }}>
            <a href="/sponsor/form" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "#66f0ff",
                  padding: "0.6rem 1rem",
                  border: "1px solid rgba(102,240,255,0.18)",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  /* keep outline only, remove ambient/glow */
                  boxShadow: "none",
                  transition: "transform 120ms ease",
                }}
                className="sponsor-cta"
              >
                <span style={{ display: "inline-block", padding: "0 6px" }}>
                  Sponsor Us
                </span>
              </button>
            </a>
          </div>
        </section>
        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#ffffff",
          }}
        >
          <small style={{ fontSize: "1.1rem" }}>Our Top Sponsors</small>
        </div>

        <div
          style={{ marginTop: -25, display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "nowrap",
              maxWidth: "100%",
            }}
          >
            {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
              (src, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 250,
                    height: 240,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flex: "0 0 auto",
                  }}
                  className="sponsor-logo sponsor-logo-top"
                >
                  <NextImage
                    src={src}
                    alt={`sponsor-${idx + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* 2025-26 Production and Program Sponsors (right-aligned) */}
  <section className="sponsor-year" style={{ marginTop: 40, maxWidth: 860, marginLeft: "auto" }}>
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
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                maxWidth: "100%",
              }}
            >
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`y-${idx}`}
                    style={{
                      width: 230,
                      height: 240,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      flex: "0 0 auto",
                    }}
                    className="sponsor-logo sponsor-logo-right"
                  >
                    <NextImage
                      src={src}
                      alt={`sponsor-2025-${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* 2024-25 Production and Program Sponsors (left-aligned) */}
  <section className="sponsor-year" style={{ marginTop: 40, maxWidth: 860 }}>
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
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "nowrap",
                maxWidth: "100%",
              }}
            >
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`24-${idx}`}
                    style={{
                      width: 230,
                      height: 240,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      flex: "0 0 auto",
                    }}
                    className="sponsor-logo sponsor-logo-left"
                  >
                    <NextImage
                      src={src}
                      alt={`sponsor-2024-${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* 2023-24 Production and Program Sponsors (right-aligned) */}
  <section className="sponsor-year" style={{ marginTop: 40, maxWidth: 860, marginLeft: "auto" }}>
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
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                maxWidth: "100%",
              }}
            >
              {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map(
                (src, idx) => (
                  <div
                    key={`23-${idx}`}
                    style={{
                      width: 230,
                      height: 240,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      flex: "0 0 auto",
                    }}
                    className="sponsor-logo sponsor-logo-right"
                  >
                    <NextImage
                      src={src}
                      alt={`sponsor-2023-${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Sponsor;
