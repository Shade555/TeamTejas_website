'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './events2.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Events2() {
  const planeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const leftLabelRef = useRef(null)
  const centerLineRef = useRef(null)
  const rightLabelRef = useRef(null)

  const heroSectionRef = useRef(null)
  const section2Ref = useRef(null)
  const section2DescriptionRef = useRef(null)
  const flightTextRef = useRef(null)
  const cardLeftRef = useRef(null)
  const cardCenterRef = useRef(null)
  const cardRightRef = useRef(null)
  const section3Ref = useRef(null)
  const section3CardRef = useRef(null)
  const section3TextLeftRef = useRef(null)
  const section3TextRightRef = useRef(null)
  const section4Ref = useRef(null)
  const section4LeftTextRef = useRef(null)
  const section4CardSmallRef = useRef(null)
  const section4CardLargeRef = useRef(null)
  const section4CenterTextRef = useRef(null)
  const section4ListItemsRef = useRef([])
  const section4RightTopTextRef = useRef(null)
  const section5Ref = useRef(null)
  const section5PlaneRef = useRef(null)
  const section5InnerRef = useRef(null)

  useEffect(() => {
    // ============ SECTION 1 ANIMATIONS ============
    
    // Kill any existing animations to reset
    gsap.killTweensOf([
      planeRef.current,
      heroSectionRef.current,
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

    gsap.set(heroSectionRef.current, { y: 300, opacity: 0 })
    gsap.set(centerLineRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center' })

    // Create a timeline for section 1 animations
    const timeline = gsap.timeline()

    // Animate hero section (plane) coming from below with fade in
    timeline.to(heroSectionRef.current, {
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
      ease: 'power2.out'
    }, 0.6)

    // Animate right label fade in
    timeline.to(rightLabelRef.current, {
      duration: 0.6,
      opacity: 1,
      ease: 'power2.out'
    }, 0.6)

    // ============ SECTION 1 SCROLL-OUT ANIMATION ============
    
    // Create scroll animation after the initial timeline completes
    timeline.add(() => {
      gsap.to([line1Ref.current, line2Ref.current, leftLabelRef.current, rightLabelRef.current, centerLineRef.current, heroSectionRef.current], {
        scrollTrigger: {
          trigger: window.innerWidth <= 640 ? document.querySelector(`.${styles.mobileTheSection}`) : section2Ref.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: -30,
        ease: 'power2.in'
      })
    })

    // ============ MOBILE ANIMATIONS: THE AND FLIGHT SECTIONS ============
    if (window.innerWidth <= 640) {
      // THE text - letter by letter animation
      const theTextEl = document.querySelector(`.${styles.mobileTheText}`)
      if (theTextEl) {
        const letters = theTextEl.querySelectorAll(`.${styles.letter}`)
        gsap.to(letters, {
          scrollTrigger: {
            trigger: document.querySelector(`.${styles.mobileTheSection}`),
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            markers: false
          },
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.1
        })
      }

      // FLIGHT text - letter by letter animation
      const flightTextEl = document.querySelector(`.${styles.mobileFlightText}`)
      if (flightTextEl) {
        const letters = flightTextEl.querySelectorAll(`.${styles.letter}`)
        gsap.to(letters, {
          scrollTrigger: {
            trigger: document.querySelector(`.${styles.mobileFlightSection}`),
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            markers: false
          },
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.1
        })
      }
    }

    // ============ SECTION 2 SCROLL ANIMATIONS ============

    // Reset section 2 elements
    gsap.set(section2DescriptionRef.current, { opacity: 0, y: 20 })
    gsap.set(cardLeftRef.current, { opacity: 0, y: -50 })
    gsap.set(cardCenterRef.current, { opacity: 0, y: 50 })
    gsap.set(cardRightRef.current, { opacity: 0, y: -50 })
    gsap.set(flightTextRef.current, { opacity: 0 })

    // Section 2 description fade in - triggers very late, after 80% scroll through section 2
    gsap.to(section2DescriptionRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 20%',
        end: 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })

    // Flight text fade in - triggers very late
    gsap.to(flightTextRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 20%',
        end: 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      ease: 'power2.out'
    })

    // Left card comes from up - triggers very late
    gsap.to(cardLeftRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: window.innerWidth <= 640 ? 'top 60%' : 'top 20%',
        end: window.innerWidth <= 640 ? 'top 50%' : 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })

    // Right card comes from up - triggers very late
    gsap.to(cardRightRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: window.innerWidth <= 640 ? 'top 50%' : 'top 30%',
        end: window.innerWidth <= 640 ? 'top 40%' : 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })

    // Center card comes from down - triggers very late
    gsap.to(cardCenterRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: window.innerWidth <= 640 ? 'top 40%' : 'top 30%',
        end: window.innerWidth <= 640 ? 'top 30%' : 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })

    // ============ SECTION 3 SCROLL ANIMATIONS ============

    // Reset section 3 elements
    gsap.set(section3CardRef.current, { opacity: 0 })
    gsap.set(section3TextLeftRef.current, { opacity: 0, x: -100 })
    gsap.set(section3TextRightRef.current, { opacity: 0, x: 100 })

    // Section 3 card fade in
    gsap.to(section3CardRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: window.innerWidth <= 640 ? 'top 80%' : 'top 20%',
        end: window.innerWidth <= 640 ? 'top 60%' : 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      ease: 'power2.out'
    })

    // Section 3 left text comes from left
    gsap.to(section3TextLeftRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: window.innerWidth <= 640 ? 'top 80%' : 'top 20%',
        end: window.innerWidth <= 640 ? 'top 60%' : 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      x: 0,
      ease: 'power2.out'
    })

    // Section 3 right text comes from right
    gsap.to(section3TextRightRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: window.innerWidth <= 640 ? 'top 80%' : 'top 20%',
        end: window.innerWidth <= 640 ? 'top 60%' : 'top 5%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      x: 0,
      ease: 'power2.out'
    })

    // Hover animation for section 3 card - pop up effect
    if (section3CardRef.current) {
      section3CardRef.current.addEventListener('mouseenter', () => {
        gsap.to([section3CardRef.current, section3TextLeftRef.current, section3TextRightRef.current], {
          duration: 0.3,
          y: -10,
          ease: 'power2.out'
        })
      })

      section3CardRef.current.addEventListener('mouseleave', () => {
        gsap.to([section3CardRef.current, section3TextLeftRef.current, section3TextRightRef.current], {
          duration: 0.3,
          y: 0,
          ease: 'power2.out'
        })
      })
    }

    // ============ SECTION 4 SCROLL ANIMATIONS ============

    // Reset section 4 elements
    gsap.set(section4LeftTextRef.current, { opacity: 0, x: -300 })
    gsap.set(section4CardSmallRef.current, { opacity: 0, scale: 0 })
    gsap.set(section4CardLargeRef.current, { opacity: 0, scale: 0 })
    gsap.set(section4CenterTextRef.current, { opacity: 0 })
    gsap.set(section4RightTopTextRef.current, { opacity: 0 })
    section4ListItemsRef.current.forEach(item => {
      gsap.set(item, { opacity: 0 })
    })

    // Left text slides in from far left
    gsap.to(section4LeftTextRef.current, {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 30%',
        end: 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      x: -200,
      ease: 'power2.out'
    })

    // Small card pops out
    gsap.to(section4CardSmallRef.current, {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 30%',
        end: 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      scale: 1,
      ease: 'back.out(1.5)'
    })

    // Large card pops out
    gsap.to(section4CardLargeRef.current, {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 30%',
        end: 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      scale: 1,
      ease: 'back.out(1.5)'
    })

    // Center text fades in
    gsap.to(section4CenterTextRef.current, {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 30%',
        end: 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      ease: 'power2.out'
    })

    // Right top text fades in (same timing as list items)
    gsap.to(section4RightTopTextRef.current, {
      scrollTrigger: {
        trigger: (() => {
          const isMobile = window.innerWidth <= 640
          if (isMobile) {
            return document.querySelector(`.${styles.dropCapContainer}`)
          }
          return section4Ref.current
        })(),
        start: window.innerWidth <= 640 ? 'top 80%' : 'top 30%',
        end: window.innerWidth <= 640 ? 'bottom 20%' : 'top 10%',
        scrub: 1,
        markers: false
      },
      opacity: 1,
      ease: 'power2.out'
    })

    // List items appear one by one
    section4ListItemsRef.current.forEach((item, index) => {
      const isMobile = window.innerWidth <= 640
      const dropCapContainer = document.querySelector(`.${styles.dropCapContainer}`)
      
      gsap.to(item, {
        scrollTrigger: {
          trigger: isMobile ? dropCapContainer : section4Ref.current,
          start: isMobile ? 'top 80%' : `top ${30 - index * 2}%`,
          end: isMobile ? 'bottom 20%' : `top ${10 - index * 2}%`,
          scrub: 1,
          markers: false
        },
        opacity: 1,
        ease: 'power2.out',
        stagger: isMobile ? 0.15 : 0
      })
    })

    // ============ SECTION 4 HOVER ANIMATIONS ============

    // Left card hover - pops up left card only
    if (section4CardSmallRef.current) {
      section4CardSmallRef.current.addEventListener('mouseenter', () => {
        gsap.to(section4CardSmallRef.current, {
          duration: 0.3,
          y: -10,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })

      section4CardSmallRef.current.addEventListener('mouseleave', () => {
        gsap.to(section4CardSmallRef.current, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    // Center card hover - pops up center card only
    if (section4CardLargeRef.current) {
      section4CardLargeRef.current.addEventListener('mouseenter', () => {
        gsap.to(section4CardLargeRef.current, {
          duration: 0.3,
          y: -10,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })

      section4CardLargeRef.current.addEventListener('mouseleave', () => {
        gsap.to(section4CardLargeRef.current, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    // ============ SECTION 2 HOVER ANIMATIONS ============

    // Left card hover - pops up
    if (cardLeftRef.current) {
      cardLeftRef.current.addEventListener('mouseenter', () => {
        gsap.to(cardLeftRef.current, {
          duration: 0.3,
          y: -10,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })

      cardLeftRef.current.addEventListener('mouseleave', () => {
        gsap.to(cardLeftRef.current, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    // Center card hover - pops up
    if (cardCenterRef.current) {
      cardCenterRef.current.addEventListener('mouseenter', () => {
        gsap.to(cardCenterRef.current, {
          duration: 0.3,
          y: -10,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })

      cardCenterRef.current.addEventListener('mouseleave', () => {
        gsap.to(cardCenterRef.current, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    // Right card hover - pops up
    if (cardRightRef.current) {
      cardRightRef.current.addEventListener('mouseenter', () => {
        gsap.to(cardRightRef.current, {
          duration: 0.3,
          y: -10,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })

      cardRightRef.current.addEventListener('mouseleave', () => {
        gsap.to(cardRightRef.current, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    // ============ SECTION 5 SCROLL ANIMATIONS ============

    // Plane flies right -> left across the screen
    if (section5PlaneRef.current) {
      gsap.set(section5PlaneRef.current, { x: window.innerWidth + 100, rotation: -90 })
      gsap.set(section5InnerRef.current, { x: window.innerWidth + 100, opacity: 0 })
      
      ScrollTrigger.create({
        trigger: section5Ref.current,
        start: 'top 60%',
        onEnter: () => {
          // Reset positions before animation
          gsap.set(section5PlaneRef.current, { x: window.innerWidth + 100 })
          gsap.set(section5InnerRef.current, { x: window.innerWidth + 100, opacity: 0 })
          
          // Plane animation
          gsap.to(section5PlaneRef.current, {
            x: -window.innerWidth - 100,
            ease: 'power2.inOut',
            duration: 1.7
          })
          
          // Content animation starts 1 second after plane animation begins
          gsap.to(section5InnerRef.current, {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
            delay: 1
          })
        },
        onLeaveBack: () => {
          // Smoothly hide content when scrolling back up and leaving section 5
          gsap.to(section5InnerRef.current, {
            x: window.innerWidth + 100,
            opacity: 0,
            ease: 'power2.in',
            duration: 0.5
          })
        }
      })
    }

    return () => {
      // Cleanup: kill animations on unmount
      timeline.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section className={styles.hero} ref={heroSectionRef}>
        <div className={styles.inner} ref={planeRef}>
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

      {/* Mobile: THE text section */}
      <div className={styles.mobileTheSection}>
        <div className={styles.mobileTheText}>
          {'THE'.split('').map((letter, i) => (
            <span key={i} className={styles.letter}>{letter}</span>
          ))}
        </div>
      </div>

      <section className={styles.section2} ref={section2Ref}>
        <div className={styles.section2Inner}>
          <p className={styles.section2Description} ref={section2DescriptionRef}>
            Student-led aerospace innovation driven by precision, teamwork,
            and performance.
          </p>
          <div className={styles.cardsContainer}>
            <div className={styles.card + ' ' + styles.cardLeft} ref={cardLeftRef} />
            <div className={styles.card + ' ' + styles.cardCenter} ref={cardCenterRef} />
            <div className={styles.card + ' ' + styles.cardRight} ref={cardRightRef} />
          </div>
          {/* Desktop view: THE FLIGHT text */}
          <h2 className={styles.flightText} ref={flightTextRef}>THE FLIGHT</h2>
        </div>
      </section>

      {/* Mobile: FLIGHT text section */}
      <div className={styles.mobileFlightSection}>
        <div className={styles.mobileFlightText}>
          {'FLIGHT'.split('').map((letter, i) => (
            <span key={i} className={styles.letter}>{letter}</span>
          ))}
        </div>
      </div>

      <section className={styles.section3} ref={section3Ref}>
        <div className={styles.section3Inner}>
          <div className={styles.largeCard} ref={section3CardRef}>
            <div className={styles.textTopLeft} ref={section3TextLeftRef}>
              Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet Lorem ipsom sit dolor amet
              lorem
            </div>
            <div className={styles.textBottomRight} ref={section3TextRightRef}>
              Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet lorem Lorem ipsom sit dolor amet lorem
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section4} ref={section4Ref}>
        <div className={styles.section4Inner}>
          <div className={styles.columnContainer}>
            <div className={styles.column + ' ' + styles.columnLeft}>
              <p className={styles.cardTopText} ref={section4LeftTextRef}>LOREM IPSUM</p>
              <div className={styles.cardSmallLeft} ref={section4CardSmallRef} />
            </div>

            <div className={styles.column + ' ' + styles.columnCenter}>
              <div className={styles.cardLarge} ref={section4CardLargeRef} />
              <p className={styles.cardBottomText} ref={section4CenterTextRef}>LOREM IPSUM SIT DOLOR AMET LOREM</p>
            </div>

            <div className={styles.column + ' ' + styles.columnRight}>
              <div className={styles.rightColumnContent}>
                <p ref={section4RightTopTextRef} className={styles.rightTopText}><span>L</span>OREM IPSUM SIT DOLOR AMET LOREM</p>
                <div className={styles.dropCapContainer}>
                  <div className={styles.listContent}>
                    <span className={styles.listItem} ref={el => { if (el) section4ListItemsRef.current[0] = el }}>01 - LOREM IPSUM</span><br />
                    <span className={styles.listItem} ref={el => { if (el) section4ListItemsRef.current[1] = el }}>02 - LOREM IPSUM</span><br />
                    <span className={styles.listItem} ref={el => { if (el) section4ListItemsRef.current[2] = el }}>03 - LOREM IPSUM</span><br />
                    <span className={styles.listItem} ref={el => { if (el) section4ListItemsRef.current[3] = el }}>04 - LOREM IPSUM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={section5Ref} className={styles.section5}>
        {section5PlaneRef && (
          <img
            ref={section5PlaneRef}
            src="/events_plane.png"
            alt=""
            className={styles.section5Plane}
          />
        )}
        <div ref={section5InnerRef} className={styles.section5Inner}>
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