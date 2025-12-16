"use client";

import React, { useEffect, useRef, useState } from "react";

const defaultStats = [
  {
    value: 30,
    suffix: "+",
    title: "Active Members",
    subtitle: "Core design & flight team",
  },
  {
    value: 5,
    suffix: "+",
    title: "Years of Experience",
    subtitle: "Consistent competitive participation",
  },
  {
    value: 1,
    suffix: "",
    title: "In Design Report SAEISS ADC",
    subtitle: "Top-scored technical documentation",
  },
  {
    value: 18,
    title: "Globally at SAE ADW",
    subtitle: "International competitive standing",
  },
];

const CountUp = ({ end = 0, duration = 3000, suffix = "", start = false }) => {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    // Parse numbers early so we can decide behavior for very small values
    const finalValue = Number(end) || 0;
    const animDuration = Number(duration) || 3000;

    // If not started yet, show finalValue immediately for tiny integers (like 1)
    // so they don't awkwardly animate from 0 -> 1. Otherwise keep 0 until start.
    if (!start) {
      if (finalValue <= 1) {
        setValue(finalValue);
      } else {
        setValue(0);
      }
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    // If the target is 0 or 1 (or smaller), just set it immediately instead of animating
    if (finalValue <= 1) {
      setValue(finalValue);
      return;
    }

    // CAPTURE START TIME
    const startTime = performance.now();

    const animate = () => {
      // How much time has passed?
      const now = performance.now();
      const elapsed = now - startTime;

      // Calculate progress from 0.0 to 1.0
      const progress = Math.min(elapsed / animDuration, 1);

      // Ease-out (quad) for a gradual, pleasing ramp: eased = 1 - (1 - t)^2
      const eased = 1 - Math.pow(1 - progress, 2);

      setValue(eased * finalValue);

      // Continue if not finished
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start the loop
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [start, end, duration]);

  // Formatting
  const numericEnd = Number(end);
  const isInteger = Number.isInteger(numericEnd);
  // Force 0 if not started, else use animated value
  const displayValue = !start && numericEnd > 1 ? 0 : value;

  const formatted = isNaN(numericEnd)
    ? end
    : isInteger
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toFixed(1);

  return (
    <span aria-live="polite">
      {formatted}
      {suffix}
    </span>
  );
};

const AboutUs = ({ stats = defaultStats }) => {
  const items = stats.map((s) => ({
    value: s.value,
    suffix: s.suffix || "",
    title: s.title,
    subtitle: s.subtitle || "",
  }));

  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start once and stop observing so the animation doesn't run again
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      style={{
        padding: "4rem 6rem",
        background: "transparent", // match hero / page background
        color: "#e8fbff",
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column: Text */}
          <div style={{ flex: "1 1 420px", minWidth: 320 }}>
            <h2
              id="about-heading"
              style={{ fontSize: "2.6rem", margin: 0, fontWeight: 700 }}
            >
              From Concept <br /> to Takeoff
            </h2>
            <p
              style={{
                marginTop: "1.3rem",
                color: "#bfeefc",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              From initial design and analysis to fabrication and testing, we
              engineer UAV solutions through structured processes and real-world
              validation.
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              <a href="/about" style={{ textDecoration: "none" }}>
                <button
                  className="sponsor-cta"
                  style={{
                    background: "rgba(59,130,246,0.25)",
                    color: "#66f0ff",
                    padding: "0.6rem 1rem",
                    borderRadius: "10px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span style={{ display: "inline-block", padding: "0 6px" }}>
                    Know More About Us
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div
            style={{
              flex: "1 1 420px",
              minWidth: 320,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.4rem",
            }}
          >
            {items.map((it, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: ".4rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      minWidth: "80px",
                    }}
                  >
                    {/* Conditional Logic: 1st vs 18th vs Normal */}
                    {Number(it.value) === 1 ? (
                      <span aria-label="1st">
                        {/* render 1 with superscript 'st' */}
                        <span>
                          1
                          <sup
                            style={{
                              fontSize: "0.45em",
                              verticalAlign: "super",
                              marginLeft: "0.12rem",
                            }}
                          >
                            st
                          </sup>
                        </span>
                      </span>
                    ) : Number(it.value) === 18 ? (
                      <span aria-label="18th">
                        {/* animate 18 and render superscript 'th' after it */}
                        <span>
                          <CountUp
                            end={it.value}
                            suffix={""}
                            duration={2000}
                            start={started}
                          />
                          <sup
                            style={{
                              fontSize: "0.45em",
                              verticalAlign: "super",
                              marginLeft: "0.12rem",
                            }}
                          >
                            th
                          </sup>
                        </span>
                      </span>
                    ) : (
                      <CountUp
                        end={it.value}
                        suffix={it.suffix}
                        duration={2000}
                        start={started}
                      />
                    )}
                  </div>

                  {/* Title placed below the number */}
                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: ".85rem",
                      fontWeight: 700,
                      color: "#cbd5e1",
                      background: "rgba(59,130,246,0.25)",
                      padding: "6px 10px",
                      borderRadius: 8,
                      display: "inline-block",
                    }}
                  >
                    {it.title}
                  </div>
                </div>
                <div
                  style={{
                    color: "#9fdaf1",
                    fontSize: ".92rem",
                    lineHeight: 1.3,
                  }}
                >
                  {it.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
