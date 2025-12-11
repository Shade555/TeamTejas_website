import NextImage from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import sponsor1 from "../sponsor/image-removebg-preview (19).png";
import sponsor2 from "../sponsor/image-removebg-preview (20).png";
import sponsor3 from "../sponsor/image-removebg-preview (21).png";
import sponsor4 from "../sponsor/image-removebg-preview (22).png";
import sponsor5 from "../sponsor/image-removebg-preview (23).png";

const Home = () => {
  const logos = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5];
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const testimonials = [
    { quote: "Being on the committee taught me leadership and resilience. The team felt like family.", name: 'Aisha Khan', role: 'Former Team Lead' },
    { quote: "We learned practical engineering under real constraints — an experience I still use daily.", name: 'Ravi Patel', role: 'Ex-Avionics' },
    { quote: "Designing and building the aircraft pushed my creativity and collaboration skills.", name: 'Lina Gomez', role: 'Past Fabrication Head' },
    { quote: "Great mentorship and hands-on opportunities. Highly recommended to students.", name: 'Marcus Lee', role: 'Alumnus - Systems' },
    { quote: "The committee prepared me for industry-level design reviews and teamwork.", name: 'Emily Chen', role: 'Former Project Manager' }
  ];

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const cta = container.querySelector('.sponsor-cta');
    let hoverTween = null;
    const onEnter = () => {
      if (!cta) return;
      hoverTween && hoverTween.kill();
      hoverTween = gsap.to(cta, { scale: 1.03, duration: 0.18, ease: 'power1.out' });
    };
    const onLeave = () => {
      if (!cta) return;
      hoverTween && hoverTween.reverse();
    };

    if (cta) {
      cta.addEventListener('mouseenter', onEnter);
      cta.addEventListener('mouseleave', onLeave);
      cta.addEventListener('focus', onEnter);
      cta.addEventListener('blur', onLeave);
    }

    return () => {
      if (cta) {
        cta.removeEventListener('mouseenter', onEnter);
        cta.removeEventListener('mouseleave', onLeave);
        cta.removeEventListener('focus', onEnter);
        cta.removeEventListener('blur', onLeave);
      }
      hoverTween && hoverTween.kill();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const singleSet = scroller.querySelector('.test-set');
    if (!singleSet) return;

    let setWidth = singleSet.offsetWidth;
    // place viewport at the middle copy
    scroller.scrollLeft = setWidth;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        if (scroller.scrollLeft <= 0) {
          scroller.scrollLeft += setWidth;
        } else if (scroller.scrollLeft >= setWidth * 2) {
          scroller.scrollLeft -= setWidth;
        }
        ticking = false;
      });
      ticking = true;
    };

    const onKey = (e) => {
      if (e.key === 'ArrowRight') scroller.scrollBy({ left: 320, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const onResize = () => {
      const newSingle = scroller.querySelector('.test-set');
      if (newSingle) {
        setWidth = newSingle.offsetWidth;
        scroller.scrollLeft = setWidth;
      }
    };

    scroller.addEventListener('scroll', onScroll);
    scroller.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      scroller.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
    <section className="hero-section" style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 8rem'
    }}>
      {/* background image from public/testimonials rotated 180deg */}
      <img src="/testimonials/hero_bg.png" alt="hero background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'rotate(180deg) translateY(10%)',
        opacity: 0.33,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Left column: primary headline 'Defending the Digital' */}
      <div className="hero-left" style={{
        flex: 1,
        maxWidth: '55%',
        color: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: 'translateY(-5.5rem)'
      }}>
        <div style={{
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.28rem',
          fontSize: '0.9rem',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}>Cyber Security</div>

        <div style={{
          fontSize: '6.5rem',
          lineHeight: 1.08,
          fontWeight: 600,
          color: 'white',
          textAlign: 'left',
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
        }}>
          <span className="accent-word" style={{ color: '#75FBFD' }}>Defending</span><br />the Digital
        </div>

        <div style={{ marginTop: '2.4rem' }}>
          <button style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#0f172a',
            border: 'none',
            padding: '0.9rem 1.6rem',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer'
          }}>Contact us</button>
        </div>
      </div>

      {/* Right column: stacked 'on / the Dot.' with small paragraph top-right */}
      <div className="hero-right" style={{
        flex: 1,
        maxWidth: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '3rem',
        position: 'relative'
      }}>
        {/* Top-right small paragraph */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translateX(-1.5REM)',
          maxWidth: '38ch',
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'right'
        }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 300, lineHeight: 1.3, paddingTop: '1.8rem' }}>
            We assist our clients in integrating <br />cyber security by design in their<br /> digital transformation.
          </p>
        </div>

        <h1 style={{
          fontSize: '7rem',
          lineHeight: 0.95,
          margin: 0,
          fontWeight: 600,
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          textAlign: 'right',
          display: 'inline-block'
        }}>
          <div style={{ display: 'block', position: 'relative', transform: 'translateX(-18.5rem)' }}>on</div>
          <div style={{ display: 'block' }}>the <span className="accent-word" style={{ color: '#75FBFD' }}>Dot.</span></div>
        </h1>

      </div>
    </section>


    
    {/* Sponsor Us section */}
  <section ref={sectionRef} style={{ padding: '3.5rem 6rem', background: 'linear-gradient(180deg, #070e1c 0%, #050a12 100%)', backgroundColor: '#070e1c', color: '#dff6fb' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
  <h2 style={{ fontSize: '2.2rem', margin: 0, color: '#ffffff', fontWeight: 700, textAlign: 'center' }}>Sponsor Us</h2>

        <p style={{ margin: '1rem auto', fontSize: '1.05rem', lineHeight: 1.6, color: '#bfeefc', maxWidth: 920, textAlign: 'center' }}>
          We are seeking companies that can support our team in the areas of design, fabrication, and avionics. As a way to express our appreciation for your support, we will use our aircraft and social media handles.
        </p>

        

        {/* Logos marquee (fade sequence via GSAP) */}
        <div style={{ marginTop: '2rem', overflow: 'hidden' }}>
          <div className="marquee" aria-hidden>
            <div className="marquee-track">
              {[...logos, ...logos].map((src, idx) => (
                <div key={idx} className="marquee-item">
                  <NextImage src={src} alt={`sponsor-${(idx % logos.length) + 1}`} style={{ objectFit: 'contain', objectPosition: 'center' }} width={260} height={140} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="/sponsor" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'rgba(59,130,246,0.25)',
                color: '#66f0ff',
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'none',
                transition: 'transform 160ms cubic-bezier(.2,.9,.2,1)',
                transform: 'translateY(0) scale(1)'
              }}
              className="sponsor-cta"
            >
              <span style={{ display: 'inline-block', padding: '0 6px' }}>
                Learn More
              </span>
            </button>
          </a>
        </div>
      </div>

      <style jsx>{`
        .marquee { width: 100%; position: relative; }

        /* soft fade at edges using mask
           Increased so logos reach full opacity a bit later and begin fading a bit earlier
           (16% / 84%). */
        .marquee {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 16%, black 84%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 16%, black 84%, transparent 100%);
        }

        .marquee-track { display: flex; gap: 28px; align-items: center; }
        .marquee-item { flex: 0 0 auto; width: 260px; height: 200px; display: flex; align-items: center; justify-content: center; }

        /* sliding animation: move the duplicated track from -50% to 0 so logos travel left->right */
        .marquee-track {
          animation: slideLR 20s linear infinite;
        }

        @keyframes slideLR {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Reduce motion for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        /* Sponsor CTA subtle pop-up (matches sponsor page) */
        .sponsor-cta{ will-change: transform; }
        .sponsor-cta:hover{ transform: translateY(-6px) scale(1.02); }
        .sponsor-cta:active{ transform: translateY(-2px) scale(0.995); }
      `}</style>
    </section>


    {/* Testimonials section */}
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <h2>Testimonials</h2>
        <p className="lead">Quotes and thoughts from people who were previously in the committee.</p>

        <div className="test-scroller" tabIndex={0} aria-label="Testimonials carousel" ref={scrollerRef}>
          <div className="test-track">
            {[0,1,2].map(copyIdx => (
              <div className="test-set" key={copyIdx}>
                {testimonials.map((t, i) => (
                  <div className="test-card" key={`${copyIdx}-${i}`}>
                    <div className="quote">“{t.quote}”</div>
                    <div className="attribution">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section{
          padding: 3.5rem 4rem;
          background-color: #050a12;
          /* dark overlay + image: overlay reduces visible opacity of image */
          background-image: linear-gradient(rgba(5,10,18,0.70), rgba(5,10,18,0.70)), url('/testimonials/testimo_bg.png');
          /* reduce image size (60% width, auto height) so it appears smaller */
          background-size: 80% auto;
          background-position: center;
          background-repeat: no-repeat;
          color: #e6fbff;
        }
        .testimonials-inner{ max-width: 1100px; margin: 0 auto; }
        .testimonials-inner h2{ text-align: center; font-size: 2.2rem; margin: 0; color: #fff; }
        .testimonials-inner .lead{ text-align: center; color: rgba(230,251,255,0.9); margin: 0.85rem auto 1.6rem; max-width: 920px; }

        .test-scroller{ 
          overflow-x: auto; 
          -webkit-overflow-scrolling: touch; 
          scroll-behavior: smooth; 
          /* soft fade at edges so cards appear to disappear into fog */
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 16%, black 84%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 16%, black 84%, transparent 100%);
        }
        .test-track{ display: flex; gap: 24px; align-items: stretch; padding: 1rem 0 2rem; }

        .test-set{ display: flex; gap: 24px; flex: 0 0 auto; }

        .test-card{
          min-width: 320px;
          max-width: 360px;
          padding: 1.4rem 1.6rem;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(0,0,0,0.03), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
          color: #eafcff;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .quote{ font-size: 1rem; line-height: 1.45; color: rgba(235,251,255,0.95); }
        .attribution{ margin-top: auto; font-weight: 700; color: #bfeefc; }
        .role{ font-weight: 400; color: rgba(190,238,252,0.85); font-size: 0.92rem; }

        .test-card:hover{ transform: translateY(-6px); transition: transform 180ms ease; }
        .test-scroller:focus{ outline: 2px solid rgba(117,251,253,0.14); outline-offset: 6px; }

        @media (max-width: 720px){
          .test-card{ min-width: 280px; }
          .testimonials-section{ padding: 2.2rem 1.2rem; }
        }
      `}</style>
    </section>
    </>
  );
};

export default Home;
