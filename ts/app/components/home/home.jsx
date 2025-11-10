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
                background: 'transparent',
                color: '#66f0ff',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(102,240,255,0.18)',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'none',
                transition: 'transform 120ms ease',
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
      `}</style>
    </section>
    </>
  );
};

export default Home;
