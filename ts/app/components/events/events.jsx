'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './events2.module.css'

export default function Events2() {
  const planeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const leftLabelRef = useRef(null)
  const centerLineRef = useRef(null)
  const rightLabelRef = useRef(null)

  useEffect(() => {
    // Kill any existing animations to reset
    gsap.killTweensOf([
      planeRef.current,
      line1Ref.current,
      line2Ref.current,
      leftLabelRef.current,
      centerLineRef.current,
      rightLabelRef.current
    ])

    // Reset all elements to their initial state
    gsap.set([
      line1Ref.current,
      line2Ref.current,
      leftLabelRef.current,
      rightLabelRef.current
    ], { opacity: 0 })

    gsap.set(planeRef.current, { y: 300, opacity: 0 })
    gsap.set(centerLineRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center' })
    gsap.set([leftLabelRef.current, rightLabelRef.current], { x: 0 })

    // Create a timeline for the animations
    const timeline = gsap.timeline()

    // Animate plane image coming from below with fade in
    timeline.to(planeRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power2.out'
    }, 0)

    // Animate TEAM text fade in
    timeline.to(line1Ref.current, {
      duration: 0.8,
      opacity: 1,
      ease: 'power2.out'
    }, 0.2)

    // Animate TEJAS text fade in
    timeline.to(line2Ref.current, {
      duration: 0.8,
      opacity: 1,
      ease: 'power2.out'
    }, 0.3)

    // Animate center line growing from left to right
    timeline.to(centerLineRef.current, {
      duration: 1,
      scaleX: 1,
      opacity: 1,
      ease: 'power2.out'
    }, 0.4)

    // Animate left label fade in
    timeline.to(leftLabelRef.current, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      ease: 'power2.out'
    }, 0.6)

    // Animate right label fade in
    timeline.to(rightLabelRef.current, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      ease: 'power2.out'
    }, 0.6)

    return () => {
      // Cleanup: kill animations on unmount
      timeline.kill()
    }
  }, [])

  return (
    <>
      <section className={styles.hero} ref={planeRef}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            <span className={styles.line1} ref={line1Ref}>TEAM</span>
            <span className={styles.line2} ref={line2Ref}>TEJAS</span>
          </h1>

          <div className={styles.bottomBar}>
            <span className={styles.leftLabel} ref={leftLabelRef}>ENGINEERING</span>
            <div className={styles.centerLine} ref={centerLineRef} />
            <span className={styles.rightLabel} ref={rightLabelRef}>THE ART OF FLIGHT</span>
          </div>
        </div>
      </section>

      <section className={styles.section2}>
        <div className={styles.section2Inner}>
          <p className={styles.section2Description}>
            Student-led aerospace innovation driven by precision, teamwork,
            and performance.
          </p>
          <div className={styles.cardsContainer}>
            <div className={styles.card + ' ' + styles.cardLeft} />
            <div className={styles.card + ' ' + styles.cardCenter} />
            <div className={styles.card + ' ' + styles.cardRight} />
          </div>
          <h2 className={styles.flightText}>THE FLIGHT</h2>
        </div>
      </section>

      <section className={styles.section3}>
        <div className={styles.section3Inner}>
          <div className={styles.largeCard}>
            <div className={styles.textTopLeft}>
              Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet Lorem ipsom sit dolor amet
              lorem
            </div>
            <div className={styles.textBottomRight}>
              Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet lorem
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section4}>
        <div className={styles.section4Inner}>
          <div className={styles.columnContainer}>
            <div className={styles.column + ' ' + styles.columnLeft}>
              <p className={styles.cardTopText}>LOREM IPSUM</p>
              <div className={styles.cardSmallLeft} />
            </div>

            <div className={styles.column + ' ' + styles.columnCenter}>
              <div className={styles.cardLarge} />
              <p className={styles.cardBottomText}>LOREM IPSUM SIT DOLOR AMET LOREM</p>
            </div>

            <div className={styles.column + ' ' + styles.columnRight}>
              <p className={styles.rightTopText}><span>L</span>OREM IPSUM SIT DOLOR AMET LOREM</p>
              <div className={styles.dropCapContainer}>
                <div className={styles.listContent}>
                  <span className={styles.listItem}>01 - LOREM IPSUM</span><br />
                  <span className={styles.listItem}>02 - LOREM IPSUM</span><br />
                  <span className={styles.listItem}>03 - LOREM IPSUM</span><br />
                  <span className={styles.listItem}>04 - LOREM IPSUM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section5}>
        <div className={styles.section5Inner}>
          <div className={styles.section5Top}>
            <div className={styles.section5Left}>
              <p className={styles.section5Title}>Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem</p>
              <p className={styles.section5Text}>
                Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem sit dolor amet lorem. Lorem ipsum sit dolor amet lorem
              </p>
            </div>
            <div className={styles.section5Card} />
          </div>

          <div className={styles.divider} />

          <div className={styles.section5Bottom}>
            <div className={styles.section5BottomColumn}>
              <p className={styles.section5ColumnTitle}>Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem</p>
            </div>
            <div className={styles.section5BottomColumn}>
              <p className={styles.section5ColumnTitle}>Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem</p>
            </div>
            <div className={styles.section5BottomColumn}>
              <p className={styles.section5ColumnTitle}>Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem Lorem ipsum sit dolor amet lorem. Lorem ipsum sit dolor amet lorem</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}