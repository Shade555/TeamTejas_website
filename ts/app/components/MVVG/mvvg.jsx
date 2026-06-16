import React from "react";
import GlassSurface from "../../../components/GlassSurface";

const items = [
  {
    key: "mission",
    title: "Mission",
    icon: "engineering",
    text: "Our mission is to design, build, and fly efficient RC aircraft through rigorous engineering, hands-on testing, and competitive participation.",
  },
  {
    key: "vision",
    title: "Vision",
    icon: "travel_explore",
    text: "Our vision is to grow as a leading student aerospace team, competing at global platforms and advancing practical aviation skills.",
  },
  {
    key: "values",
    title: "Values",
    icon: "handshake",
    text: "We value technical excellence, teamwork, accountability, and continuous learning through real-world engineering challenges.",
  },
  {
    key: "goals",
    title: "Goals",
    icon: "social_leaderboard",
    text: "Our goal is to consistently deliver competitive aircraft and develop industry-ready engineers.",
  },
];

const MVVG = () => {
  return (
    <section className="mvvg-section">
      <div className="inner">
        <h2>What Drives Us Forward</h2>

        <div className="grid">
          {items.map((it) => (
            <div className="grid-item" key={it.key}>
              <GlassSurface
                className="mvvg-surface"
                borderRadius={16}
                width={"100%"}
                height={"100%"}
                brightness={40}
                opacity={0.1}
                blur={15}
                displace={0}
                distortionScale={0}
                redOffset={0}
                greenOffset={0}
                blueOffset={0}
                mixBlendMode="normal"
                forceFallback={true}
              >
                <div className="card-content">
                  {/* Updated to use Material Symbols Outlined */}
                  <span className="material-symbols-outlined mvvg-icon">
                    {it.icon}
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </GlassSurface>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mvvg-section {
          padding: 4rem 6rem;
          background: transparent;
          color: #e8fbff;
          min-height: 60vh;
          opacity: 0; /* start hidden so GSAP reveal doesn't flash */
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        h2 {
          text-align: center;
          margin-bottom: 4rem;
          font-size: 2.5rem;
          letter-spacing: -0.02em;
          background: linear-gradient(
            135deg,
            #00103c 0%,
            #0a3990 30%,
            #79a1c0 55%,
            #a0d8f4 80%,
            #4fa1eb 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grid {
          display: grid;
          /* 4 Equal Columns */
          grid-template-columns: repeat(4, 1fr);
          /* Force all rows to match the height of the tallest card */
          grid-auto-rows: 1fr;
          gap: 24px;
          justify-content: center;
        }
        .grid-item {
          display: flex;
          height: 100%;
        }

        /* Stretching the glass surface to fill the grid cell height */
        :global(.mvvg-surface) {
          display: flex !important;
          flex-direction: column !important;
          flex: 1;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.02) 100%
          ) !important;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        :global(.mvvg-surface:hover) {
          transform: translateY(-5px);
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4),
            inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        :global(.mvvg-surface .glass-surface__content) {
          padding: 40px 24px !important;
          display: flex !important;
          flex-direction: column;
          flex: 1;
        }

        .card-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start; /* Align content to top */
          height: 100%;
          padding-top: 20px;
        }

        .card-content h3 {
          margin: 20px 0 12px;
          font-size: 1.5rem;
          color: #ffffff;
          font-weight: 600;
        }
        .card-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          text-align: justify;
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 700px) {
          h2 {
            font-size: 2.3rem;
          }
          .grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>

      <style jsx global>{`
        /* Load Material Symbols Outlined */
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        .mvvg-icon {
          font-size: 48px !important;
          /* Cyan glow color similar to your aerospace theme */
          color: #66f0ff;
          display: inline-block;
          height: 48px; /* Fixed height to align titles */
        }
      `}</style>
    </section>
  );
};

export default MVVG;
