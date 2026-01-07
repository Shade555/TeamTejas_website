"use client"
import React, { useRef, useEffect } from 'react'
import styles from './events.module.css'
import gsap from 'gsap'

export default function Events() {
  const leftLineRef = useRef(null)
  const rightLineRef = useRef(null)
  const titleRef = useRef(null)
  const section1Ref = useRef(null)
  const floatDividerRef = useRef(null)
    const bigTextRef = useRef(null) // big text will be static
    const planeRef = useRef(null) // airplane icon that flies across
    // const planeRef = useRef(null) // plane element removed

  useEffect(() => {
    if (!leftLineRef.current || !rightLineRef.current || !titleRef.current) return

    const tl = gsap.timeline()

    // Title lines expand (scaleX) and title fades in
    tl.to(leftLineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' })
      .to(rightLineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '<')
      .to(titleRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    // Section 1 fade in
    if (section1Ref.current) {
      tl.to(section1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '+=0.15')
    }

    // float divider draw top -> bottom (slightly shorter)
    if (floatDividerRef.current) {
      tl.to(floatDividerRef.current, { height: '90%', duration: 0.6, ease: 'power2.out' }, '-=0.2')
    }

    // plane flies left -> right (in front)
    if (planeRef.current) {
      gsap.set(planeRef.current, { x: -window.innerWidth - 100 })
      // start slightly before the text and a touch faster
      tl.to(planeRef.current, { x: window.innerWidth + 100, duration: 1.4, ease: 'power2.inOut' }, '-=0.8')
    }

    // big text slides in from left (plays behind the plane)
    if (bigTextRef.current) {
      gsap.set(bigTextRef.current, { x: -window.innerWidth, opacity: 0 })
      // if plane is present, overlap so text appears behind while plane is mid-flight
      if (planeRef.current) {
        // start shortly after the plane begins (so plane leads the motion)
        tl.to(bigTextRef.current, { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.3')
      } else {
        tl.to(bigTextRef.current, { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.3')
      }
    }

    return () => tl.kill()
  }, [])

  return (
    <section className="events">
      <div style={{ padding: '2rem' }}>
        <div style={{ margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          <span ref={leftLineRef} className={styles.titleLine}></span>
          <h1 ref={titleRef} className={styles.titleText} style={{
            fontFamily: 'Cormorant_SC, serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg,#00103c 0%,#0a3990 10%,#4fa1eb 50%,#79a1c0 80%,#a0d8f4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Events</h1>
          <span ref={rightLineRef} className={styles.titleLine + ' ' + styles.titleLineRight}></span>
        </div>
      </div>

      
      {/* Single wireframe-style section */}
      <div ref={section1Ref} className={styles.eventSection + ' ' + styles.sectionHidden}>
        <div className={styles.eventInner}>
          <div className={styles.leftImage} aria-hidden="true" />

          <div className={styles.contentColumn}>
            <div className={styles.floatRight}>
              <div className="col">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed non.</div>
              <div className="col">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
              <div ref={floatDividerRef} className={styles.floatDivider} aria-hidden="true" />
            </div>

            <div className={styles.descBox}>
              <h3 style={{marginTop:0}}>Main Description Title</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                fermentum, nisl at convallis tristique, arcu mauris tempus nulla,
                vitae dapibus turpis justo sit amet urna. Cras in lectus non est
                bibendum hendrerit. Integer ut orci eu lorem bibendum
                sollicitudin. Sed sit amet augue vitae purus faucibus tristique.
              </p>
              <p>
                Nullam at sapien vitae lacus tincidunt. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Curabitur non risus eu purus gravida luctus.
                Nullam at sapien vitae lacus tincidunt. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Curabitur non risus eu purus gravida luctus.
              </p>
            </div>

            <div className={styles.clearFloat} />
          </div>
        </div>

        <div className={styles.bigTextFull} style={{ position: 'relative', overflow: 'visible' }}>
          <img
            ref={planeRef}
            src="/airplane_icon.png"
            alt=""
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              width: '96px',
              height: '96px',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
          <span ref={bigTextRef} className={styles.bigTextInner} style={{ position: 'relative', zIndex: 1 }}>
            CELEBRATE CONNECT COLLABORATE JOIN US TONIGHT
          </span>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles.section2Inner}>
          <div className={styles.verticalWord}>RECAP</div>
          <div className={styles.section2Desc}>
            <h3 style={{textAlign:'left', marginTop:0}}>Second Section Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </p>
            <p>
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra.
            </p>
            <p>
              Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
              Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque
              sem at dolor.
            </p>
            <p>
              Additional content added to increase the text volume and demonstrate
              wrapping behavior. This paragraph continues the thought and will push
              content down the column to ensure the layout behaves when more text
              is present. Donec quam felis, ultricies nec, pellentesque eu,
              pretium quis, sem. Nulla consequat massa quis enim.
            </p>
            <p>
              More copy here so the description fills multiple lines and shows how
              the image sits at the far-right column. Aliquam tincidunt mauris eu
              risus. Vestibulum auctor dapibus neque. Nunc dignissim risus id
              metus. Cras ornare tristique elit. Vivamus vestibulum ntulla nec
              ante.
            </p>
            <p>
              Final paragraph for demo purposes. Praesent blandit laoreet nibh.
              Fusce convallis metus id felis luctus adipiscing. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas.
            </p>
          </div>
          <div>
            <div className={styles.descImageLarge} aria-hidden="true" />
            <div className={styles.rightTextColumn}>
              <h4 style={{marginTop:0, marginBottom:'0.5rem'}}>Strategies</h4>
              <p>
                This wasn’t just theory; it was a practical playbook. Gaurav broke
                down the entire process, from the crucial first steps of picking
                the right problem statement and navigating internal hackathons
                to the final 36-hour stretch that finishes it all.
              </p>
              <p>
                Participants learned how to scope projects, rapidly prototype,
                and make their solution presentation-ready — exactly the kind of
                hands-on advice that converts ideas into winning entries.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 - two column, two images, big floated words with text wrapping */}
      <div className={styles.section3}>
        <div className={styles.section3Inner}>
          <div className={styles.col}>
            <div className={styles.columnImage} aria-hidden="true" />
            <div className={styles.bigWordFloat}>MEMORIES</div>
            <h4 style={{marginTop:0}}>One Last Unforgettable Night</h4>
            <p>
              There’s a special kind of magic in the air at a farewell. On May 11,
              2022, the campus was filled with bright, anticipating faces, all
              there to honor our departing seniors and a journey four years in the
              making. The laughter echoed as departments gathered for one last
              group photoshoot — a beautiful, heartfelt attempt to freeze this
              perfect moment in time.
            </p>
            <p>
              The celebration then moved to the auditorium, where the second and
              third-year students had prepared a stunning tribute for their
              seniors. Our college band, Sath Sur, delivered a truly surreal
              performance, striking every nostalgic chord by dedicating different
              songs to each of the seniors for years, taking them on a musical
              journey back in time.
            </p>
            <p>
              The heartfelt vibe continued as our ceremony progressed: heartfelt
              speeches, tearful memories, and a standing ovation for the classes
              that shaped our community. The night wrapped with hugs, laughter,
              and the kind of songs that somehow make goodbyes feel hopeful.
            </p>
            <p>
              After the official program, small groups gathered under the stars
              to trade stories about late-night projects, exams survived, and
              the little traditions that became part of campus life. Alumni
              returned with quick hugs and advice, and the air was full of both
              nostalgia and excitement for the road ahead.
            </p>
            <p>
              Friends lingered on the steps outside the auditorium, comparing
              notes about favorite professors and the projects that changed
              their perspective. These conversations — equal parts reflective
              and hopeful — turned into plans for reunions, collaborations, and
              lifelong networks.
            </p>
            <p>
              As the night slowed, smaller performances popped up, improvised
              poetry, acoustic sets, and quiet toasts. Those spontaneous
              moments are what students remember years later: a grin shared over
              an inside joke, and the sense that these friendships would endure.
            </p>
          </div>

          <div className={styles.col}>
            <div className={styles.columnImage} aria-hidden="true" />
            <div className={styles.bigWordRight} aria-hidden="true">
              {"FOREVER".split("").map((char, i) => (
                <span key={i} className={styles.bigLetter}>
                  {char}
                </span>
              ))}
            </div>

            <h4 style={{marginTop:0}}>The Final Bow</h4>
            <p>
              June 11, 2024, wasn’t just a “farewell”; it was a high-energy
              celebration of four incredible years! The auditorium was packed
              with proud families and friends as the stage came alive with
              performances, speeches, and a final standing ovation that will be
              remembered.
            </p>
            <p>
              Students stepped up to the mic with gratitude and joy, thanking
              mentors and peers for the shared experiences. The evening offered
              one last chance to celebrate teamwork, late-night problem-solving,
              and the friendships that turned college into a home.
            </p>
            <p>
              As the lights dimmed the curtain fell on a chapter well-lived — yet
              the memories linger like a warm afterglow, promising more stories
              to come as these graduates head into the world.
            </p>
            <p>
              In the days following, students poured over photos and videos,
              tagging friends and reliving each highlight. The campus corridors
              hummed with congratulations and the slow settling of a milestone
              accomplished — an important punctuation mark before the next
              adventure.
            </p>
            <p>
              The farewell season also inspired reflection about the work that
              shaped each student's journey: group projects, midnight debugging
              sessions, and mentors who guided them toward their passions. Those
              memories, stitched together, form the fabric of the community.
            </p>
            <p>
              <span style={{fontSize: '2.5rem', fontWeight: 700}}>Finally</span>, as students packed boxes and lingered for last-minute
              photos, a quiet optimism filled the air — an understanding that
              although chapters close, the stories and friendships only grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
