"use client";

import React, { useEffect, useRef } from "react";
import styles from './scrollplane.module.css';

const ScrollPlane = () => {
  const overlayRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = doc.clientHeight || window.innerHeight;
      const pct = Math.min(1, Math.max(0, scrollTop / (scrollHeight - clientHeight || 1)));
      if (overlayRef.current) {
        overlayRef.current.style.setProperty('--scroll-progress', String(pct));
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // initialize
    onScroll();

    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.trail} />
        <div className={styles.planeContainer}>
          {/* use airplane image from public folder */}
          <img src="/airplane_icon.png" alt="scroll plane" className={styles.plane} />
        </div>
      </div>
    </div>
  );
};

export default ScrollPlane;
