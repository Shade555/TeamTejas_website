import React from "react";
import Image from "next/image"; //to remove this
import HeroPlane from "./HeroSectionPlane.png"; //to remove this
// ThreePlane removed from hero; mounted at top-level home page

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        padding: "6rem 8rem",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-logo-mobile {
            display: block !important;
          }
          .hero-section {
            padding: 3rem 1.5rem !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
            padding-top: 2.5rem !important;
          }
          .hero-left {
            flex: none !important;
            max-width: 100% !important;
            width: 100% !important;
            text-align: center !important;
          }
          .hero-left > div:first-child {
            text-align: center !important;
            font-size: 1.1rem !important;
          }
          .hero-left > div:nth-child(2) {
            text-align: center !important;
            font-size: 3.5rem !important;
          }
          .hero-left .ahead-mobile {
            display: inline !important;
          }
          .hero-right {
            flex: none !important;
            max-width: 100% !important;
            width: 100% !important;
            padding-left: 0 !important;
            align-items: center !important;
            margin-top: 2rem !important;
          }
          .hero-right > div {
            text-align: center !important;
            transform: none !important;
            max-width: 100% !important;
          }
          .hero-right h1 {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .hero-left .ahead-mobile {
            display: none !important;
          }
        }
      `}</style>
      {/* ThreePlane is mounted at the home page level so it stays on-screen */}
      {/* LOGO FOR MOBILE */}
      <div
        className="hero-logo-mobile"
        style={{
          display: "none",
          marginBottom: "2rem",
          textAlign: "center",
          width: "100%",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            height: "80px",
            width: "auto",
            margin: "0 auto",
            display: "block",
          }}
        />
      </div>
      {/* LEFT COLUMN */}
      <div
        className="hero-left"
        style={{
          flex: 1,
          maxWidth: "55%",
          color: "white",
          textAlign: "left",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        
        }}
      >
        {/* Top Label: TOGETHER */}
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.28rem",
            fontSize: "0.9rem",
            marginBottom: "2rem", // Adjusted to match bottom spacing
            textTransform: "uppercase",
          }}
        >
          TOGETHER
        </div>

        {/* Main Left Headline */}
        <div
          style={{
            fontSize: "6.5rem",
            lineHeight: 1.08,
            fontWeight: 600,
            color: "white",
            textAlign: "left",
          }}
        >
          <span className="cormorant-bold">
            Engineering
            <br />
            the Sky<span className="ahead-mobile"> Ahead</span>
          </span>
        </div>

        {/* Bottom Button: TEJAS */}
        <div style={{ marginTop: "2rem" }}>
          {" "}
          {/* Adjusted to match top spacing */}
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.75)", // Matches TOGETHER color
              letterSpacing: "0.28rem", // Matches TOGETHER spacing
              textTransform: "uppercase", // Matches TOGETHER case
              fontSize: "0.9rem", // Matches TOGETHER size
              fontWeight: 400,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Tejas
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div
        className="hero-right"
        style={{
          flex: 1,
          maxWidth: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end", // Aligns content to the right edge
          paddingLeft: "3rem",
          position: "relative",
        }}
      >
        {/* Description Text */}
        <div
          style={{
            maxWidth: "38ch",
            color: "rgba(255,255,255,0.85)",
            textAlign: "right",
            marginBottom: "1rem",
            
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
          >
            On the ground in the lab and above <br />
            the horizon, we craft, test, and perfect advanced UAV systems
            <br /> for global arenas
          </p>
        </div>

        {/* Big Headline: Ahead */}
        <h1
          style={{
            fontSize: "7rem",
            lineHeight: 0.95,
            margin: 0,
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          <span className="cormorant-bold">Ahead</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
