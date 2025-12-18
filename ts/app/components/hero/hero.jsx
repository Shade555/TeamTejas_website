import React from "react";
import Image from "next/image";                 //to remove this
import HeroPlane from "./HeroSectionPlane.png"; //to remove this
import ThreePlane from "./three_plane/ThreePlane";

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        padding: "6rem 8rem",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <ThreePlane />
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
          transform: "translateY(-5.5rem)",
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
          <span className="cormorant-semibold">TOGETHER</span>
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
            the Sky
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
            <span className="cormorant-semibold">Tejas</span>
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
            transform: "translateX(-1.5rem)",
          }}
        >
          <p
            className="cormorant-light"
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