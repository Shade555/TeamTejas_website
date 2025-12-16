"use client";
import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    icon: "/home.svg",
    iconLight: "/light/home_light.svg",
    href: "/",
  },
  {
    name: "Our Teams",
    icon: "/team.svg",
    iconLight: "/light/team_light.svg",
    href: "/teamR",
  },
  {
    name: "Milestones",
    icon: "/milestone.svg",
    iconLight: "/light/milestone_light.svg",
    href: "/milestones",
  },
  {
    name: "Competitions",
    icon: "/newsletter.svg",
    iconLight: "/light/newsletter_light.svg",
    href: "/newsletter",
  },
  {
    name: "Sponsor Us",
    icon: "/sponsor.svg",
    iconLight: "/light/sponsor_light.svg",
    href: "/sponsor",
  },
];

const Navbar = () => {
  const pathname = usePathname() || "/";
  const [hovered, setHovered] = useState(null);
  const [mode, setMode] = useState("dark");
  const [showNightGif, setShowNightGif] = useState(false);

  React.useEffect(() => {
    setHovered(null);
  }, [pathname]);

  const handleToggle = () => {
    if (mode === "light") {
      setShowNightGif(true);
      setTimeout(() => setShowNightGif(false), 1200);
    }
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <NextImage src="/logo.png" alt="Logo" width={60} height={32} />
      </div>
      <ul className="navbar-list">
        <li className="navbar-toggle">
          <button
            className="toggle-switch"
            onClick={handleToggle}
            aria-label="Toggle dark/light mode"
          >
            <span className={`switch-track ${mode}`}></span>
            <span className={`switch-thumb ${mode}`}>
              {mode === "dark" ? (
                <NextImage
                  src="/dark/half-moon.png"
                  alt="Moon"
                  width={20}
                  height={20}
                />
              ) : (
                <NextImage
                  src="/light/sun.png"
                  alt="Sun"
                  width={20}
                  height={20}
                />
              )}
            </span>
          </button>
        </li>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isHovered = hovered === item.name;
          const pillColor =
            mode === "dark"
              ? "rgba(59, 130, 246, 0.25)"
              : "rgba(255,255,255,0.5)";
          const showPill = isActive || isHovered;
          const iconWidth = 22;
          const labelWidth = item.name.length * 8;
          const pillPadding = 33;
          const pillWidth = iconWidth + labelWidth + pillPadding;
          return (
            <li
              key={item.name}
              className={`navbar-item${isActive ? " active" : ""}`}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {showPill && (
                <span
                  className={`navbar-pill${showPill ? " pill-animate" : ""}`}
                  style={{
                    background: pillColor,
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: pillWidth + "px",
                    height: "36px",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                    zIndex: 1,
                    pointerEvents: "none",
                    overflow: "hidden",
                    transition: "background 0.3s",
                  }}
                />
              )}
              <Link
                href={item.href}
                className="navbar-link"
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                <span className="navbar-icon">
                  <NextImage
                    src={mode === "dark" ? item.icon : item.iconLight}
                    alt={item.name + " icon"}
                    width={22}
                    height={22}
                  />
                </span>
                <span
                  className={`navbar-text${showPill ? " show" : ""}`}
                  style={{ marginLeft: "8px" }}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 2rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          min-height: 64px;
          background: transparent;
        }
        .toggle-switch {
          position: relative;
          width: 48px;
          height: 28px;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .switch-track {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 20px;
          border-radius: 12px;
          background: #222;
          transition: background 0.3s;
        }
        .switch-track.light {
          background: #e3e3e3;
        }
        .switch-thumb {
          position: absolute;
          top: 50%;
          left: 4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: transparent;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          transform: translateY(-50%) translateX(0);
          transition: background 0.3s, transform 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .switch-thumb.light {
          background: transparent;
          transform: translateY(-50%) translateX(0);
        }
        .switch-thumb.dark {
          background: transparent;
          transform: translateY(-50%) translateX(24px);
        }
        .navbar-container.dark {
          background: transparent;
        }
        .navbar-container.light {
          background: transparent;
        }
        .navbar-logo {
          margin-right: 2rem;
        }
        .navbar-list {
          display: flex;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }
        .navbar-toggle {
          margin-right: 1rem;
        }
        .toggle-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: ${mode === "dark" ? "#fff" : "#222"};
          transition: color 0.2s;
        }
        .navbar-item {
          position: relative;
          display: flex;
          align-items: center;
        }
        .navbar-pill {
          width: 44px;
          min-width: 44px;
          opacity: 0.7;
          transition: width 0.35s cubic-bezier(0.77, 0, 0.18, 1),
            background 0.3s;
        }
        .pill-animate {
          animation: pill-expand-ltr 0.35s cubic-bezier(0.77, 0, 0.18, 1)
            forwards;
        }
        @keyframes pill-expand-ltr {
          0% {
            width: 44px;
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
        .navbar-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          background: transparent;
          color: ${mode === "light" ? "#111" : "#2ad4ff"};
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .navbar-item.active .navbar-link,
        .navbar-item:hover .navbar-link {
          background: transparent;
          color: #fff;
        }
        .navbar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          min-height: 22px;
        }
        .navbar-text {
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          margin-left: 0.5rem;
          color: ${mode === "light" ? "#111" : "#75FBFD"};
          transition: max-width 0.4s cubic-bezier(0.77, 0, 0.18, 1),
            opacity 0.3s;
        }
        .navbar-text.show {
          max-width: 120px;
          opacity: 1;
          color: ${mode === "light" ? "#111" : "#75FBFD"};
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
