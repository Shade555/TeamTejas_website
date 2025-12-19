"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
import styles from "./gallery.module.css";

// ============================================
// Image Data - Replace with your actual paths
// ============================================

// Carousel images (7 images for horizontal scroll - odd number for center focus)
const carouselImages = [
  "https://picsum.photos/seed/highlight1/800/800",
  "https://picsum.photos/seed/highlight2/800/800",
  "https://picsum.photos/seed/highlight3/800/800",
  "https://picsum.photos/seed/highlight4/800/800",
  "https://picsum.photos/seed/highlight5/800/800",
  "https://picsum.photos/seed/highlight6/800/800",
  "https://picsum.photos/seed/highlight7/800/800",
];

// Grid images for bottom section - varied aspect ratios for masonry effect
const gridImages = [
  {
    src: "https://picsum.photos/seed/grid1/600/800",
    caption: "Team building session",
  },
  { src: "https://picsum.photos/seed/grid2/600/400", caption: "Workshop day" },
  {
    src: "https://picsum.photos/seed/grid3/600/600",
    caption: "Celebrating success",
  },
  {
    src: "https://picsum.photos/seed/grid4/600/900",
    caption: "Late night coding",
  },
  {
    src: "https://picsum.photos/seed/grid5/600/450",
    caption: "Competition prep",
  },
  {
    src: "https://picsum.photos/seed/grid6/600/750",
    caption: "Award ceremony",
  },
  { src: "https://picsum.photos/seed/grid7/600/500", caption: "Design review" },
  { src: "https://picsum.photos/seed/grid8/600/850", caption: "Testing phase" },
  { src: "https://picsum.photos/seed/grid9/600/400", caption: "Team lunch" },
  {
    src: "https://picsum.photos/seed/grid10/600/700",
    caption: "Brainstorming ideas",
  },
  {
    src: "https://picsum.photos/seed/grid11/600/550",
    caption: "Project kickoff",
  },
  {
    src: "https://picsum.photos/seed/grid12/600/650",
    caption: "Final presentation",
  },
];

// ============================================
// Gallery Component
// ============================================
const Gallery = () => {
  // Track the active/center card index
  const [activeIndex, setActiveIndex] = useState(3);

  // Ref for carousel section to attach wheel listener
  const carouselRef = useRef(null);

  // Handle previous - move active index left
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : carouselImages.length - 1));
  }, []);

  // Handle next - move active index right
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < carouselImages.length - 1 ? prev + 1 : 0));
  }, []);

  // Wheel event handler for horizontal scrolling (only responds to horizontal swipes)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let lastScrollTime = 0;
    const scrollCooldown = 300; // ms between scroll triggers

    const handleWheel = (e) => {
      // Only respond to horizontal scrolling (intentional left/right swipes)
      // Ignore vertical scrolling so page scrolls normally
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
        return; // Let vertical scroll pass through to page
      }

      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaX) > 10) {
        e.preventDefault();
        lastScrollTime = now;

        if (e.deltaX > 0) {
          setActiveIndex((prev) =>
            prev < carouselImages.length - 1 ? prev + 1 : 0
          );
        } else {
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : carouselImages.length - 1
          );
        }
      }
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Get the position class for each card based on distance from active
  const getCardClass = (index) => {
    const diff = index - activeIndex;
    if (diff === 0) return styles.cardCenter;
    if (diff === 1 || diff === -(carouselImages.length - 1))
      return styles.cardRight1;
    if (diff === -1 || diff === carouselImages.length - 1)
      return styles.cardLeft1;
    if (diff === 2 || diff === -(carouselImages.length - 2))
      return styles.cardRight2;
    if (diff === -2 || diff === carouselImages.length - 2)
      return styles.cardLeft2;
    if (diff === 3 || diff === -(carouselImages.length - 3))
      return styles.cardRight3;
    if (diff === -3 || diff === carouselImages.length - 3)
      return styles.cardLeft3;
    return styles.cardHidden;
  };

  return (
    <div className={styles.galleryContainer}>
      {/* ================================== */}
      {/* Top Section - Highlights Carousel */}
      {/* ================================== */}
      <div className={styles.carouselContainer}>
        {/* Heading above carousel */}
        <div className={styles.headingWrapper}>
          <span className={styles.gradientLine}></span>
          <h2 className={styles.carouselHeading}>Highlights</h2>
          <span className={styles.gradientLineRight}></span>
        </div>

        <div className={styles.carouselSection} ref={carouselRef}>
          {/* 3D Carousel */}
          <div className={styles.carousel3d}>
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.carouselSlide} ${getCardClass(index)}`}
              >
                <img src={image} alt={`Highlight ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <button
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={handleNext}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* ================================== */}
      {/* Bottom Section - Image Grid */}
      {/* ================================== */}
      <div className={styles.gridSection}>
        <div className={styles.headingWrapper}>
          <span className={styles.gradientLine}></span>
          <h2 className={styles.gridTitle}>Our Moments</h2>
          <span className={styles.gradientLineRight}></span>
        </div>
        <p className={styles.gridDescription}>
          A raw collection of memories, candid frames, and behind-the-scenes
          glimpses that tell our story as it happened.
        </p>
        <div className={styles.imageGrid}>
          {gridImages.map((image, index) => (
            <div key={index} className={styles.gridItem}>
              <img src={image.src} alt={`Gallery image ${index + 1}`} />
              <div className={styles.gridOverlay}>
                <span className={styles.gridCaption}>{image.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
