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
      { pos: { x: 3.0, y: -0.79, z: -3.08 }, rot: {  x: -0.7, y: -1.5, z: -0.92 }, duration: 0.6 },
      { pos: { x: -3.0, y: -0.79, z: -3.08 }, rot: { x: -0.7, y: -1.5, z: -0.92 }, duration: 0.9 }
    ]

    // Initial small X-translation bump is part of the timeline so progress
    // remains continuous (avoids snapping back). Use a relative value.
    const bumpX = -0.6 // negative = left; adjust as needed
    planeTL.to(proxy, { px: `+=${bumpX}`, duration: 0.35, ease: 'power1.out', onUpdate: pushProxy })

    // Build the timeline from the STAGES array for readability
    STAGES.forEach((s) => {
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

    // Stage 4: separate, non-scrubbed sequence that runs when MVVG section
    // is reached. We build a paused timeline that animates the same proxy
    // used by the scrubbed planeTL, then play it on the MVVG ScrollTrigger.
    const mvvgEl = (typeof document !== 'undefined')
      ? document.querySelector('#mvvg, [data-mvvg], .mvvg-section, .mvvg')
      : null

    if (mvvgEl && Array.isArray(STAGE4_KEYS) && STAGE4_KEYS.length) {
      const stage4TL = gsap.timeline({ paused: true })
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

      ScrollTrigger.create({
        trigger: mvvgEl,
        start: 'top center',
        onEnter: () => {
          try {
            if (planeTL && planeTL.scrollTrigger) {
              planeTL.pause()
              planeTL.scrollTrigger.disable()
            }
          } catch (e) {}
          if (!stage4TL.isActive() && stage4TL.totalProgress() < 1) stage4TL.play()
        },
        onEnterBack: () => {
          try {
            if (planeTL && planeTL.scrollTrigger) {
              planeTL.pause()
              planeTL.scrollTrigger.disable()
            }
          } catch (e) {}
          if (!stage4TL.isActive() && stage4TL.totalProgress() < 1) stage4TL.play()
        },
        onLeaveBack: () => {
          try {
            if (planeTL && planeTL.scrollTrigger) {
              planeTL.scrollTrigger.enable()
            }
          } catch (e) {}
        },
        markers: false,
        invalidateOnRefresh: true
      })
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
