import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateHeroTexts({ leftEl, rightEl, planeEl, togetherEl, tejasEl, descriptionEl, threePlaneApi, onRightShown, heroSectionEl } = {}) {
  if (!leftEl || !rightEl) return null

  // Initial state: hidden (no translate for main texts)
  gsap.set([leftEl, rightEl], { opacity: 0 })

  // If together/tejas are provided, set their starting positions (together from below, tejas from above)
  if (togetherEl) gsap.set(togetherEl, { opacity: 0, y: 30 })
  if (tejasEl) gsap.set(tejasEl, { opacity: 0, y: -30 })

  // Longer delay when a plane element is present so text appears after plane settles
  const delay = planeEl ? 1.2 : 0.4

  const tl = gsap.timeline()

  // Fade in left text, then right text with a short stagger
  tl.to(leftEl, { duration: 0.8, opacity: 1, ease: 'power2.out' }, delay)
    .to(rightEl, { duration: 0.8, opacity: 1, ease: 'power2.out' }, delay + 0.15)

  // Invoke callback immediately after the "Ahead" (rightEl) tween finishes
  if (typeof onRightShown === 'function') {
    const rightEndTime = delay + 0.15 + 0.8 // start + duration
    tl.add(() => onRightShown(), rightEndTime)
  }

  // Scroll-triggered exit: when scrolling down, move texts up and fade out; plane moves up further
  if (typeof window !== 'undefined' && heroSectionEl) {
    const texts = [leftEl, rightEl, togetherEl, tejasEl, descriptionEl].filter(Boolean)

    // Texts translate up as user scrolls past hero (no opacity change)
    gsap.to(texts, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: false,
        invalidateOnRefresh: true
      }
    })

    // Plane continuation on scroll removed — plane will no longer animate off-screen.
  }  
  
  // Create the scroll-driven plane animation, but delay setup until after
  // the entry/text timeline has played so the initial entry animation is not interrupted.
  function createPlaneScroll() {
    if (!(planeEl && threePlaneApi)) return

    // proxy holds the target values we'll push to the ThreePlane instance
    const initial = (typeof threePlaneApi.getState === 'function' && threePlaneApi.getState()) || {}
    const proxy = {
      px: initial.position?.x ?? 0,
      py: initial.position?.y ?? 0,
      pz: initial.position?.z ?? 0,
      rx: initial.rotation?.x ?? 0,
      ry: initial.rotation?.y ?? 0,
      rz: initial.rotation?.z ?? 0,
    }
    // (no plane duration scale — use explicit per-key durations)
    
    // push initial proxy into the ThreePlane so its targets are established
    // before any scroll-driven tweens begin
    pushProxy()

    function pushProxy() {
      try {
        if (threePlaneApi && typeof threePlaneApi.setTargetPosition === 'function') {
          threePlaneApi.setTargetPosition({ x: proxy.px, y: proxy.py, z: proxy.pz })
        }
        if (threePlaneApi && typeof threePlaneApi.setTargetRotation === 'function') {
          threePlaneApi.setTargetRotation({ x: proxy.rx, y: proxy.ry, z: proxy.rz })
        }
      } catch (e) {
        // ignore
      }
    }

    const planeTL = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionEl,
        start: 'top top',
        end: 'bottom top+=220',
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      }
    })

    // Define named stages (keyframes) for clarity — positions in world units
    // and rotations in radians. Each stage may specify its own duration.
    const STAGES = [
      {
        name: 'preAbout', // reach this early as you start scrolling
        pos: { x: -1.29, y: -0.4, z: -1.43 },
        rot: { x: 1.42, y: 0.01, z: -0.08 },
        duration: 0.6
      },
      {
        name: 'farAway', // further away and rotated
        pos: { x: -2.47, y: -0.790, z: -3.08 },
        rot: { x: 1.42, y: 1.47, z: -1.28 },
        duration: 1
      }
      ,
      {
        name: 'crossX', // previous final stage — keep as stage 3 but do NOT change X
        keys: [
          { pos: { x: -3.0, y: -0.79, z: -3.08 }, rot: { x: 1.42, y: 1.5, z: -1.28 }, duration: 0.7 },
          { pos: { x: 3.0, y: -0.79, z: -3.08 }, rot: { x: 1.42, y: 1.5, z: -1.28}, duration: 0.6 },
          { pos: { x: 3.0, y: -0.79, z: -3.08 }, rot: { x: 1.42, y: 1.5, z: -1.28 }, duration: 0.9 }
        ]
      }
    ]

    // Stage 4 keyframes combined into a single array — played when
    // the MVVG section is reached.
    const STAGE4_KEYS = [
      { pos: { x: 3.0, y: -0.79, z: -3.08 }, rot: {  x: -0.7, y: -1.5, z: -0.92 }, duration: 0.7 },
      { pos: { x: -3.0, y: -0.79, z: -3.08 }, rot: { x: -0.7, y: -1.5, z: -0.92 }, duration: 0.9 }
    ]

    // Stage 5: additional keyframes requested — rotation changes while
    // holding the same position, then move to the final position.
    const STAGE5_KEYS = [
      { pos: { x: -2.668, y: -0.79, z: -3.08 }, rot: { x: 0.280, y: 0.020, z: -0.690 }, duration: 0.6 },
      { pos: { x: -2.668, y: -0.79, z: -3.08 }, rot: { x: 1.080, y: 0.860, z: -0.860 }, duration: 0.6 },
      { pos: { x: 1.750, y: -1.420, z: -3.08 }, rot: { x: 1.080, y: 0.860, z: -0.860 }, duration: 0.9 }
    ]

    // Stage 6: user-provided sequence of five keyframes moving forward
    // through the scene. Rotations are identical across these keys.
    const STAGE6_KEYS = [
      { pos: { x: 2.090, y: -0.630, z: -2.404 }, rot: { x: -0.110, y: -0.460, z: -0.788 }, duration: 0.6 },
      { pos: { x: 1.320, y: -0.630, z: -1.430 }, rot: { x: -0.110, y: -0.460, z: -0.788 }, duration: 0.6 },
      { pos: { x: 0.340, y: -0.630, z: -0.310 }, rot: { x: -0.110, y: -0.460, z: -0.788 }, duration: 0.6 },
      { pos: { x: -0.260, y: -0.630, z: 0.300 }, rot: { x: -0.110, y: -0.460, z: -0.788 }, duration: 0.6 },
      { pos: { x: -1.380, y: -0.630, z: 4.530 }, rot: { x: -0.110, y: -0.460, z: -0.788 }, duration: 0.9 }
    ]

    // Stage 7: new sequence of six keyframes (user-provided)
    const STAGE7_KEYS = [
      { pos: { x: -0.100, y: 0.620, z: -0.000 }, rot: { x: -3.000, y: -0.010, z: -0.040 }, duration: 0.4 },
      { pos: { x: 0.210, y: 1.760, z: -2.258 }, rot: { x: -3.000, y: -0.010, z: -0.040 }, duration: 0.35 },
      { pos: { x: 0.210, y: 1.160, z: -3.840 }, rot: { x: -4.500, y: -0.010, z: -0.040 }, duration: 0.35 },
      { pos: { x: 0.210, y: 0.960, z: -3.840 }, rot: { x: -5.000, y: -0.010, z: -0.040 }, duration: 0.35 },
      { pos: { x: 0.210, y: 0.170, z: -3.680 }, rot: { x: -6.000, y: -0.020, z: -0.010 }, duration: 0.35 },
      { pos: { x: 0.210, y: -0.030, z: -1.680 }, rot: { x: -6.000, y: -0.020, z: -0.010 }, duration: 0.6 }
    ]

    // Initial small X-translation bump is part of the timeline so progress
    // remains continuous (avoids snapping back). Use a relative value.
    const bumpX = 0 // removed initial nudge to avoid startup rollback
      planeTL.to(proxy, { px: `+=${bumpX}`, duration: 0.35, ease: 'power1.out', onUpdate: pushProxy })

    // Build the timeline from the STAGES array for readability
    // Only include Stage 1 and Stage 2 in the main (hero) scrubbed timeline.
    STAGES.slice(0, 2).forEach((s) => {
      if (Array.isArray(s.keys) && s.keys.length) {
        s.keys.forEach((k) => {
          planeTL.to(proxy, {
            px: k.pos.x,
            py: k.pos.y,
            pz: k.pos.z,
            rx: k.rot.x,
            ry: k.rot.y,
            rz: k.rot.z,
            duration: k.duration || 0.8,
            ease: 'power1.inOut',
            onUpdate: pushProxy
          })
        })
      } else {
        planeTL.to(proxy, {
          px: s.pos.x,
          py: s.pos.y,
          pz: s.pos.z,
          rx: s.rot.x,
          ry: s.rot.y,
          rz: s.rot.z,
          duration: s.duration,
          ease: 'power1.inOut',
          onUpdate: pushProxy
        })
      }
    })
    
    // About section timeline (Stage 3 keys) — created later once aboutEl
    // exists. We attach a scrubbed timeline that pauses the main planeTL
    // while active so the stage progression maps to the About scroll.

    // Stage 4: separate, non-scrubbed sequence that runs when MVVG section
    // is reached. We build a paused timeline that animates the same proxy
    // used by the scrubbed planeTL, then play it on the MVVG ScrollTrigger.
    const mvvgEl = (typeof document !== 'undefined')
      ? document.querySelector('#mvvg, [data-mvvg], .mvvg-section, .mvvg')
      : null

    if (mvvgEl && Array.isArray(STAGE4_KEYS) && STAGE4_KEYS.length) {
      // Make stage 4 scroll-driven (scrub) so X translation follows scroll
      const stage4TL = gsap.timeline({
        scrollTrigger: {
          trigger: mvvgEl,
          start: 'top bottom', // start earlier: when mvvg top hits viewport bottom
          end: 'bottom top',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
          // while the MVVG scrub is active, disable the main planeTL scrub to avoid overlap
          onToggle: (self) => {
            try {
              if (self.isActive) {
                if (planeTL && planeTL.scrollTrigger) {
                  planeTL.pause()
                  planeTL.scrollTrigger.disable()
                }
              } else {
                if (planeTL && planeTL.scrollTrigger) {
                  planeTL.scrollTrigger.enable()
                }
              }
            } catch (e) {}
          }
        }
      })

      STAGE4_KEYS.forEach((k) => {
        stage4TL.to(proxy, {
          px: k.pos.x,
          py: k.pos.y,
          pz: k.pos.z,
          rx: k.rot.x,
          ry: k.rot.y,
          rz: k.rot.z,
          duration: k.duration || 0.8,
          ease: 'power1.inOut',
          onUpdate: pushProxy
        })
      })
      // (Stage 5 is handled on the sponsor timeline so it doesn't play
      // during the MVVG section.)

      // Create a separate timeline for Stage 6 that triggers on the
      // sponsor section so those keyframes don't play until the
      // user reaches that section.
      const sponsorEl = (typeof document !== 'undefined') ? (() => {
        // Prefer the Sponsor section on the Home page (nearest section
        // containing the home .sponsor-cta), then fall back to other
        // common sponsor selectors.
        const mainCta = document.querySelector('main .sponsor-cta')
        if (mainCta) return mainCta.closest('section') || null
        const explicit = document.querySelector('#sponsor, [data-sponsor], .sponsor-section, .sponsor')
        if (explicit) return explicit
        const cta = document.querySelector('.sponsor-cta')
        if (cta) return cta.closest('section')
        return null
      })() : null

      if (sponsorEl && Array.isArray(STAGE6_KEYS) && STAGE6_KEYS.length) {
        // Build a timeline driven by ScrollTrigger (scrubbed) so the
        // plane progress maps to the sponsor section scroll. We still
        // pause/disable the main plane timeline while the sponsor
        // scrub is active to avoid conflicting updates.
        const stage6TL = gsap.timeline({
          scrollTrigger: {
            trigger: sponsorEl,
            start: 'top 70%',
            end: 'bottom top+=200',
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              try {
                if (typeof console !== 'undefined' && console.debug) console.debug('[plane] sponsor onToggle', { isActive: self.isActive, scrollY: window?.scrollY })
                if (self.isActive) {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.pause()
                    planeTL.scrollTrigger.disable()
                  }
                } else {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.scrollTrigger.enable()
                  }
                }
              } catch (e) {}
            }
          }
        })

        // Play Stage 5 first when sponsor section is reached
        if (Array.isArray(STAGE5_KEYS) && STAGE5_KEYS.length) {
          STAGE5_KEYS.forEach((k) => {
            stage6TL.to(proxy, {
              px: k.pos.x,
              py: k.pos.y,
              pz: k.pos.z,
              rx: k.rot.x,
              ry: k.rot.y,
              rz: k.rot.z,
              duration: k.duration || 0.8,
              ease: 'power1.inOut',
              onUpdate: pushProxy
            })
          })
        }

        // Then play Stage 6
        STAGE6_KEYS.forEach((k) => {
          stage6TL.to(proxy, {
            px: k.pos.x,
            py: k.pos.y,
            pz: k.pos.z,
            rx: k.rot.x,
            ry: k.rot.y,
            rz: k.rot.z,
            duration: k.duration || 0.8,
            ease: 'power1.inOut',
            onUpdate: pushProxy
          })
        })

        // Note: ScrollTrigger is attached directly to the timeline above
        // (so no separate ScrollTrigger.create() is required).
      }

      // Create a separate timeline for Stage 7 that triggers on the
      // testimonials section so those keyframes don't play until the
      // user reaches that section.
      const testimonialsEl = (typeof document !== 'undefined')
        ? document.querySelector('main .testimonials-section, main #testimonials, main [data-testimonials], .testimonials-section, #testimonials, #test')
        : null

      if (testimonialsEl && Array.isArray(STAGE7_KEYS) && STAGE7_KEYS.length) {
        const stage7TL = gsap.timeline({
          scrollTrigger: {
            trigger: testimonialsEl,
            start: 'top 70%',
            end: 'bottom top+=200',
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              try {
                if (typeof console !== 'undefined' && console.debug) console.debug('[plane] testimonials onToggle', { isActive: self.isActive, scrollY: window?.scrollY })
                if (self.isActive) {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.pause()
                    planeTL.scrollTrigger.disable()
                  }
                } else {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.scrollTrigger.enable()
                  }
                }
              } catch (e) {}
            }
          }
        })

        STAGE7_KEYS.forEach((k) => {
          stage7TL.to(proxy, {
            px: k.pos.x,
            py: k.pos.y,
            pz: k.pos.z,
            rx: k.rot.x,
            ry: k.rot.y,
            rz: k.rot.z,
            duration: k.duration || 0.8,
            ease: 'power1.inOut',
            onUpdate: pushProxy
          })
        })
      }
    }

    let floatTween = null
    ScrollTrigger.create({
      trigger: heroSectionEl,
      start: 'bottom top+=220',
      onEnter: () => {
        if (floatTween) return
        floatTween = gsap.to(proxy, { py: `+=0.08`, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate: pushProxy })
      },
      onLeaveBack: () => {
        if (floatTween) {
          floatTween.kill()
          floatTween = null
        }
        pushProxy()
      },
      markers: false,
      invalidateOnRefresh: true
    })

    // Animate the About section by fading it in when it appears.
    const aboutEl = (typeof document !== 'undefined')
      ? document.querySelector('#about, [data-about], .about-section, .about')
      : null

    if (aboutEl) {
      // start invisible (no horizontal translate)
      gsap.set(aboutEl, { opacity: 0 })

      ScrollTrigger.create({
        trigger: aboutEl,
        start: 'top center',
        onEnter: () => {
          gsap.to(aboutEl, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              try {
                aboutEl.dispatchEvent(new CustomEvent('about:visible', { bubbles: true, composed: true }))
              } catch (e) {
                // ignore if dispatch fails
              }
            }
          })
        },
        onLeaveBack: () => {
          gsap.to(aboutEl, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              try {
                aboutEl.dispatchEvent(new CustomEvent('about:hidden', { bubbles: true, composed: true }))
              } catch (e) {}
            }
          })
        },
        markers: false,
        invalidateOnRefresh: true
      })
    }

    // Create an About-driven timeline for Stage 3 (crossX keys) so the
    // plane progression through Stage 3 is controlled by scrolling the
    // About section instead of the main hero timeline.
    try {
      if (aboutEl && Array.isArray(STAGES) && STAGES[2] && Array.isArray(STAGES[2].keys)) {
        const aboutTL = gsap.timeline({
          scrollTrigger: {
            trigger: aboutEl,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              try {
                if (self.isActive) {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.pause()
                    planeTL.scrollTrigger.disable()
                  }
                } else {
                  if (planeTL && planeTL.scrollTrigger) {
                    planeTL.scrollTrigger.enable()
                  }
                }
              } catch (e) {}
            }
          }
        })

        STAGES[2].keys.forEach((k) => {
          aboutTL.to(proxy, {
            px: k.pos.x,
            py: k.pos.y,
            pz: k.pos.z,
            rx: k.rot.x,
            ry: k.rot.y,
            rz: k.rot.z,
            duration: k.duration || 0.8,
            ease: 'power1.inOut',
            onUpdate: pushProxy
          })
        })
      }
    } catch (e) {
      // non-fatal
    }

    
  }

  // Section reveals: only MVVG, Sponsor (Home), and Testimonials
  try {
    const mvvgEl = (typeof document !== 'undefined') ? document.querySelector('main #mvvg, main [data-mvvg], main .mvvg, .mvvg-section, .mvvg') : null
    if (mvvgEl) {
      gsap.from(mvvgEl, { opacity: 0, y: 50, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: mvvgEl, start: 'top 75%', markers: false } })
    }

    // Sponsor on Home only: prefer the sponsor CTA inside <main>
    const homeSponsorCta = (typeof document !== 'undefined') ? document.querySelector('main .sponsor-cta') : null
    const sponsorHomeEl = homeSponsorCta ? (homeSponsorCta.closest('section') || null) : null
    if (sponsorHomeEl) {
      const logos = sponsorHomeEl.querySelectorAll('.sponsor-logo, .sponsor-item, .marquee-item')
      if (logos && logos.length) {
        gsap.set(logos, { opacity: 0, scale: 0.92, rotate: -2 })
        gsap.to(logos, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: sponsorHomeEl, start: 'top 70%', end: 'bottom top+=200', scrub: true, markers: false } })
      } else {
        gsap.fromTo(sponsorHomeEl, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sponsorHomeEl, start: 'top 70%', scrub: true, markers: false } })
      }
    }

    // Testimonials (home): prefer section inside main
    const testimonialsHome = (typeof document !== 'undefined') ? document.querySelector('main .testimonials-section, main #testimonials, main [data-testimonials], .testimonials-section') : null
    if (testimonialsHome) {
      const tItems = testimonialsHome.querySelectorAll('.testimonial-card, .testimonial, .quote, .test-card')
      if (tItems && tItems.length) {
        gsap.set(tItems, { opacity: 0, scale: 0.96 })
        gsap.to(tItems, { opacity: 1, scale: 1, duration: 0.75, stagger: 0.12, ease: 'back.out(0.9)', scrollTrigger: { trigger: testimonialsHome, start: 'top 70%', end: 'bottom top+=200', scrub: true, markers: false } })
      } else {
        gsap.fromTo(testimonialsHome, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: testimonialsHome, start: 'top 70%', scrub: true, markers: false } })
      }
    }
  } catch (e) {
    console.warn('section reveals failed', e)
  }

  // After the main texts finish, animate TOGETHER (from bottom) then Tejas (from top)
  if (togetherEl) {
    tl.to(togetherEl, { duration: 0.6, opacity: 1, y: 0, ease: 'power2.out' })
  }

  if (tejasEl) {
    tl.to(tejasEl, { duration: 0.6, opacity: 1, y: 0, ease: 'power2.out' })
  }

  // Start the scroll-driven plane animation after the initial entry/text
  // timeline finishes so the plane's entry animation isn't interrupted.
  tl.add(() => createPlaneScroll())

  return tl
}

// Typewriter effect: types by word, then leaves a blinking cursor.
export function animateTypewriter({ el, fullText = '', wordDelay = 60, startDelay = 50, cursorColor = '#75fbfd' } = {}) {
  if (!el) return () => {}

  // Clear any previous content
  el.innerHTML = ''

  // Create cursor (no left margin so it sits directly after the last character)
  const cursor = document.createElement('span')
  cursor.style.display = 'inline-block'
  cursor.style.width = '2px'
  cursor.style.height = '1em'
  cursor.style.backgroundColor = cursorColor
  cursor.style.verticalAlign = 'bottom'
  el.appendChild(cursor)

  // Replace newlines with a marker so we can insert <br/> during typing
  const marker = '[[BR]]'
  const prepared = fullText.replace(/\n/g, ` ${marker} `)
  const tokens = prepared.split(/\s+/).filter(Boolean)

  const timers = []

  // Schedule each token; first token appears at startDelay, subsequent tokens after increments of wordDelay
  tokens.forEach((token, i) => {
    const delayAt = startDelay + i * wordDelay
    const t = setTimeout(() => {
      if (token === marker) {
        const br = document.createElement('br')
        el.insertBefore(br, cursor)
      } else {
        // Only add a trailing space if the next token is not a line-break marker and exists
        const next = tokens[i + 1]
        const addSpace = next && next !== marker
        const textNode = document.createTextNode(token + (addSpace ? ' ' : ''))
        el.insertBefore(textNode, cursor)
      }
    }, delayAt)
    timers.push(t)
  })

  const totalDelay = startDelay + tokens.length * wordDelay

  // Start blinking after typing completes
  let blinkInterval = null
  const finalTimer = setTimeout(() => {
    blinkInterval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0'
    }, 500)
  }, totalDelay + 100)
  timers.push(finalTimer)

  // Return cleanup
  return () => {
    timers.forEach(clearTimeout)
    if (blinkInterval) clearInterval(blinkInterval)
    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor)
  }
}