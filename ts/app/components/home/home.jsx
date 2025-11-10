// Add animation CSS for moving gradient border
if (
  typeof window !== "undefined" &&
  !document.getElementById("dynamic-gradient-border-keyframes")
) {
  const style = document.createElement("style");
  style.id = "dynamic-gradient-border-keyframes";
  style.innerHTML = `
  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes rotateGradient {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
  }

  .gradient-border {
    position: relative;
    border-radius: 16px; /* match your card radius */
    overflow: hidden;
    z-index: 0;
  }

  .gradient-border::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px; /* border thickness */
    border-radius: inherit;
    background: conic-gradient(
      from var(--angle),
      #00ffff,
      #0088ff,
      #ff00ff,
      #ff8800,
      #00ffff
    );
    animation: rotateGradient 5s linear infinite;
    z-index: -1;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
  }

  .gradient-border > * {
    position: relative;
    z-index: 1;
  }
`;
  document.head.appendChild(style);
}
import NextImage from "next/image";
import missionImg from "./mission.png";
import valuesImg from "./values.png";
import visionImg from "./vision.png";

const cardImages = {
  "Our Mission": missionImg,
  "Our Values": valuesImg,
  "Our Vision": visionImg,
};

const Home = () => {
  return (
    <>
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
        {/* Left column: primary headline 'Defending the Digital' */}
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
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.28rem",
              fontSize: "0.9rem",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Cyber Security
          </div>

          <div
            style={{
              fontSize: "6.5rem",
              lineHeight: 1.08,
              fontWeight: 600,
              color: "white",
              textAlign: "left",
              fontFamily:
                'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Defending
            <br />
            the Digital
          </div>

          <div style={{ marginTop: "2.4rem" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#0f172a",
                border: "none",
                padding: "0.9rem 1.6rem",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Contact us
            </button>
          </div>
        </div>
        <div
          className="hero-right"
          style={{
            flex: 1,
            maxWidth: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "3rem",
            position: "relative",
          }}
        >
          {/* Top-right small paragraph */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translateX(-1.5REM)",
              maxWidth: "38ch",
              color: "rgba(255,255,255,0.85)",
              textAlign: "right",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.3,
                paddingTop: "1.8rem",
              }}
            >
              We assist our clients in integrating <br />
              cyber security by design in their
              <br /> digital transformation.
            </p>
          </div>

          <h1
            style={{
              fontSize: "7rem",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 600,
              fontFamily:
                'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              textAlign: "right",
              display: "inline-block",
            }}
          >
            <div
              style={{
                display: "block",
                position: "relative",
                transform: "translateX(-18.5rem)",
              }}
            >
              on
            </div>
            <div style={{ display: "block" }}>the Dot.</div>
          </h1>
        </div>
      </section>

      {/* Mission, Vision, Values - horizontally arranged cards */}
      <section
        className="mission-vision-section"
        style={{
          padding: "2.5rem 8rem",
          marginTop: "-6rem",
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          background: "transparent",
        }}
      >
        {[
          {
            title: "Our Mission",
            body: "To craft and perfect RC aircraft through teamwork, creativity, and learning, proudly showcasing SFIT’s spirit of innovation and excellence.",
          },
          {
            title: "Our Values",
            body: "We value innovation, integrity, and unity, growing together through challenges and learning continuously while striving for excellence in everything we do.",
          },
          {
            title: "Our Vision",
            body: "To innovate and excel in aerodynamics through teamwork, creativity, and dedication, inspiring future Tejas members to reach higher and achieve greater goals.",
          },
        ].map((card) => (
          <div
            key={card.title}
            onMouseEnter={(e) => {
              const panel = e.currentTarget.querySelector("[data-card-panel]");
              const titleEl =
                e.currentTarget.querySelector("[data-card-title]");
              if (panel) {
                panel.style.transform = "translateY(-6px) scale(1.03)";
                panel.style.boxShadow = "0 12px 40px rgba(2,8,16,0.55)";
                panel.style.background = "rgba(255,255,255,0.08)";
                panel.classList.add("animated-blue-border");
              }
              if (titleEl) titleEl.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              const panel = e.currentTarget.querySelector("[data-card-panel]");
              const titleEl =
                e.currentTarget.querySelector("[data-card-title]");
              if (panel) {
                panel.style.transform = "translateY(0) scale(1)";
                panel.style.boxShadow = "0 12px 40px rgba(2,8,16,0.55)";
                panel.style.background = "rgba(255,255,255,0.08)";
                panel.classList.remove("animated-blue-border");
              }
              if (titleEl) titleEl.style.transform = "scale(1)";
            }}
            style={{
              flex: "1 1 300px",
              maxWidth: 420,
              minWidth: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Title */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
                minHeight: 56,
              }}
            >
              <h3
                data-card-title="true"
                style={{
                  margin: 0,
                  fontSize: "1.8rem",
                  color: "#ffffff",
                  letterSpacing: 0.6,
                  textShadow: "0 6px 18px rgba(0,0,0,0.6)",
                  textAlign: "center",
                  transform: "scale(1)",
                  transition: "transform 180ms ease",
                }}
              >
                {card.title}
              </h3>
            </div>

            {/* Card Panel */}
            <div
              data-card-panel="true"
              style={{
                transform: "translateY(0) scale(1)",
                transition:
                  "transform 180ms ease, box-shadow 180ms ease, background 220ms ease",
                width: "100%",
                color: "#d7f6ff",
                padding: "1.6rem",
                borderRadius: "16px",
                boxShadow: "0 12px 40px rgba(2,8,16,0.55)",
                border: "1px dashed rgba(255,255,255,0.06)",
                position: "relative",
                backdropFilter: "blur(6px)",
                overflow: "hidden",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 12,
                textAlign: "left",
              }}
              className="blue-border"
            >
              {cardImages[card.title] && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 70,
                    marginTop: 50,
                    marginBottom: 60,
                    padding: "1rem",
                    boxSizing: "border-box",
                  }}
                >
                  <NextImage
                    src={cardImages[card.title]}
                    alt={card.title}
                    width={160}
                    height={64}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
              <p
                style={{
                  margin: 0,
                  color: "#bfefff",
                  lineHeight: 1.6,
                  fontSize: "1rem",
                  textAlign: "justify",
                  width: "100%",
                  padding: "0 0.5rem",
                  boxSizing: "border-box",
                }}
              >
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Our events and workshops */}
      <section></section>
    </>
  );
};

export default Home;
