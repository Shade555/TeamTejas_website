"use client";
import React from "react";
import Image from "next/image";
import styles from "./footer.module.css";

const Logo = () => (
  <div className={styles.brand}>
    <Image src="/logo.png" alt="Team Tejas" width={60} height={80} />
    <span className={styles.brandName}>Team Tejas</span>
  </div>
);

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      fill="currentColor"
      d="M19 0h-14C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM7 19H4V9h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75S4.534 4.232 5.5 4.232s1.75.784 1.75 1.75-.784 1.75-1.75 1.75zM20 19h-3v-4.5c0-1.121-.879-2-2-2s-2 .879-2 2V19h-3V9h3v1.234c.709-.957 1.931-1.234 3-1.234 2.206 0 4 1.794 4 4V19z"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
        </div>

        <div className={styles.center}>
          <div className={styles.centerInner}>
            <div className={styles.divider} aria-hidden />
            <div className={styles.centerText}>
              St. Francis Institute Of Technology<br></br>Wing B, Room No. 011
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/sfit_tejas/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className={styles.icon} />
            </a>
            <a
              href="https://in.linkedin.com/company/team-tejas"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className={styles.icon} />
            </a>
          </div>
          <a className={styles.email} href="mailto:team_tejas@sfit.ac.in">
            team_tejas@sfit.ac.in
          </a>
        </div>
      </div>
    </footer>
  );
}
