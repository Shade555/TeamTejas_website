"use client";
import { useEffect } from "react";

export default function ScrollToTopClient() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && 'scrollRestoration' in window.history) {
        // Prefer manual so reload/back/forward don't restore scroll automatically
        window.history.scrollRestoration = 'manual';
      }
    } catch (e) {}

    // Ensure on initial load we're at top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // If page is restored from bfcache, force top as well
    const onPageShow = (evt) => {
      if (evt.persisted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return null;
}
