import React, { useEffect, useRef } from "react";
import GlassSurface from '../../../components/GlassSurface';

const Testimonials = () => {
  const scrollerRef = useRef(null);

  const testimonials = [
    { quote: "Creation of Team Tejas is a fruit of efforts of beautiful and enterprising brains having a vision and devotion for accomplishment. I was fortunate to witness the development of the Team as a Captain. Also the kind of guidance that we got from our professor's is remarkable.",
       name: 'SHRIDHAMA JOSHI', 
       role: 'Team Captain, Tejas 2020-21' },
    { quote: "Being one of the founding members of the team was a blessing for me, and I also got a chance to witness the growth of the team from zero under my captaincy. The team has nurtured my passion for aeronautics and helped me to get a step ahead regarding it. The experience that I got being on board the team is one I will never forget in my life ahead!", 
       name: 'SIDDHESH LELE', 
       role: 'Team Captain, Tejas 2021-22' },
    { quote: "I was recruited in fabrication department and eventually secured the post of fabrication head.I gained valuable experience working with people as well as a sense of responsibility. It was one of the best experiences of my college career to work with Team- Tejas, whether it was late night work, night outs, or just getting things done regardless of unforeseen circumstances. I developed a close relationship with all my teammates and the team as a whole.My time in the team was full of diverse experiences, including multiple times when things went wrong, and I dealt with them and found a way out.It was a pleasure working with so many wonderful people, and I treasure the memories I shared with each one.Lastly, I wish the upcoming team the best.", 
       name: 'OMKAR PARAB', 
       role: 'Team Vice - Captain / (Fabrication Head), Tejas 2020-21' },
    { quote: "As we design an aircraft aerodynamic to counter air drag, Team Tejas helped me shape my journey fail to dynamic to counter failures ", 
       name: 'VISHAL CHOTALIYA', 
       role: 'Ex-Member Fabrication Department, Tejas 2021-22' },
    { quote: "It was a wonderful learning opportunity wherein we designed", 
       name: 'LYNN CARVALHO', 
       role: 'Team Member, Tejas 2020-21 Manager' },
    { quote: "It was a great experience working for Team Tejas. The exposure of working for a relatively new team was immense. It was wonderful to spend time with the team members. Wishing the team luck for their future endeavours.", 
       name: 'SHREYANSH JAIN', 
       role: 'Head Of Graphics, Tejas 2021-22 Team Lead' },
    { quote: "Enjoyed being a part of Team Tejas as a member. Learnt something new each day, made new friends, and some unforgettable memories. It was a wonderful experience amidst the hectic and busy college schedule. ", 
       name: 'RJONATHAN SEQUEIRA', 
       role: 'Design Department, Tejas 2021-22' },
    { quote: "I thoroughly enjoyed being a part of Team Tejas where they were significantly hardworking and always been persistent to keep up their goals to achieve. Since a past one year it had provided me with prominent knowledge and had gained confidence in resolving issues about Fabrication. ", 
       name: 'SHIVAM SHRIMAL', 
       role: 'Fabrication Member , Tejas 2021-22' },
    { quote: "It was a pleasure to be part of this team, got to know little from something also had a great time working with the members!", 
       name: 'MPRANAY DHUMALE', 
       role: 'Member , Tejas 2021-22' },
    { quote: "Team Tejas has been the brainchild of Shridama Joshi (MECH 2022) and I was involved in recruitment of the very first team. The pandemic caused near abruption of the working and modelling of the team but we took up every challenge and delivered in those trying times. Fast forward, the team has come a long way. I wish the team all the best for every challenge they face. Excelsior!", 
       name: 'YASH DOSHI', 
       role: 'Advisor , Tejas 2020-21' },
  ];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const singleSet = scroller.querySelector('.test-set');
    if (!singleSet) return;

    let setWidth = singleSet.offsetWidth;
    scroller.scrollLeft = setWidth; // start in the middle copy

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
    <section className="testimonials-section">
      <div className="inner">
        <h2>What our members say</h2>

        <div className="scroller-wrap">
          <div
            className="scroller"
            ref={scrollerRef}
            tabIndex={0}
            aria-label="Testimonials carousel"
          >
          {Array.from({ length: 3 }).map((_, copyIdx) => (
            <div className="test-set" key={copyIdx}>
              {testimonials.map((t, i) => (
                <div className="card" key={`${copyIdx}-${i}`}>
                  <GlassSurface
                    width={500}
                    height={360}
                    borderRadius={16}
                    className="testimonial-surface"
                    displace={2.5}             // was 10  → LESS blur
                    distortionScale={2}     // was 40 → still distorted but softer
                    redOffset={0}
                    greenOffset={0}         // slightly lower
                    blueOffset={0}          // slightly lower
                    brightness={25}          // was 40 → less washed out
                    opacity={0.78}           // was 0.85 → clearer card
                    mixBlendMode="screen"
                  >
                    <div className="card-inner">
                      <p className="quote">“{t.quote}”</p>
                      <div className="meta">
                        <div className="name">{t.name}</div>
                        <div className="role">{t.role}</div>
                      </div>
                    </div>
                  </GlassSurface>
                </div>
              ))}
            </div>
          ))}
          </div>
          <div className="scroller-fog scroller-fog--left" aria-hidden="true" />
          <div className="scroller-fog scroller-fog--right" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .testimonials-section{
          padding: 4rem 6rem;
          background-color: #050a12;
          color: #e9fbff;
          position: relative; /* allow pseudo-element for image */
          overflow: visible;
        }
        /* move bg image to pseudo-element so we can control image opacity independently */
        .testimonials-section::before{
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/testimonials/testimo_bg.png');
          background-size: 76% auto;
          background-position: center center;
          background-repeat: no-repeat;
          opacity: 0.70; /* adjust this to change image opacity only */
          pointer-events: none;
          z-index: 0;
        }
        .inner{ max-width: 1100px; margin: 0 auto; position: relative; z-index: 1 }
        h2{ text-align: center; font-size: 2.2rem; margin: 0 0 1.1rem; color: #ffffff }

        .scroller-wrap{ position: relative; }

        .scroller{
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 2rem 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          outline: none;
        }

        /* fog overlays to mask card edges (DOM elements) */
        .scroller-fog{
          position: absolute;
          top: 0;
          bottom: 0;
          width: 96px;
          pointer-events: none;
          z-index: 6;
        }

        .scroller-fog--left{ left: 0; background: linear-gradient(90deg, rgba(5,10,18,1) 0%, rgba(5,10,18,0.0) 55%); }
        .scroller-fog--right{ right: 0; background: linear-gradient(270deg, rgba(5,10,18,1) 0%, rgba(5,10,18,0.0) 55%); }

        .test-set{ display: flex; gap: 20px; }

        .card{ flex: 0 0 360px; display: flex; align-items: stretch; }

        /* style the glass surface content inside each card */
        .card .glass-surface__content{
          padding: 18px;
          box-sizing: border-box;
          display: flex;
          width: 100%;
          height: 100%;
        }

        /* subtle black tint and faint border (removed per request) */

        .card-inner{ display:flex; flex-direction:column; justify-content:space-between; width:100%; }

        .quote{ font-size: 1rem; line-height: 1.5; margin: 0 0 0.6rem; color: #eafcff; text-align: left; white-space: normal; display: block; overflow: visible; }

        .meta{ display:flex; flex-direction: column; gap: 2px; font-size: 0.95rem; color: rgba(255,255,255,0.95); align-items: flex-end; }
        .name{ font-weight: 800; }
        .role{ font-weight: 500; color: rgba(255,255,255,0.8); }

        /* hide native scrollbars but keep accessibility */
        .scroller::-webkit-scrollbar{ height: 10px; }
        .scroller::-webkit-scrollbar-thumb{ background: rgba(255,255,255,0.06); border-radius: 99px; }

        .quote{ font-size: 1rem; line-height: 1.45; margin: 0 0 1rem; color: #eafcff; }
        .meta{ display:flex; flex-direction: column; gap: 2px; font-size: 0.9rem; color: rgba(255,255,255,0.9); }
        .name{ font-weight: 700; }
        .role{ font-weight: 400; color: rgba(255,255,255,0.75); }

        @media (max-width: 900px){
          .card{ flex: 0 0 300px; }
          .testimonials-section{ padding: 3rem 2rem; }
        }

        @media (prefers-reduced-motion: reduce){
          .scroller{ scroll-behavior: auto; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
