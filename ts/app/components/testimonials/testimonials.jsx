import React, { useEffect, useRef } from "react";

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

    const singleSet = scroller.querySelector('.testimonials-track');
    if (!singleSet) return;

    let setWidth = singleSet.offsetWidth;
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

    const onResize = () => {
      const newSingle = scroller.querySelector('.testimonials-track');
      if (newSingle) {
        setWidth = newSingle.offsetWidth;
        scroller.scrollLeft = setWidth;
      }
    };

    scroller.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="background-wrapper">
        <div className="gradient-bg" />
        <div className="image-bg" />
      </div>
      
      <div className="content-wrapper">
        <h2>What our members say</h2>

        <div className="scroller-container">
          <div
            className="scroller"
            ref={scrollerRef}
            tabIndex={0}
            aria-label="Testimonials carousel"
          >
            {Array.from({ length: 3 }).map((_, copyIdx) => (
              <div className="testimonials-track" key={copyIdx}>
                {testimonials.map((t, i) => (
                  <div className="testimonial-card" key={`${copyIdx}-${i}`}>
                    <p className="quote">"{t.quote}"</p>
                    <div className="author">
                      <div className="name">{t.name}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="fog-left" aria-hidden="true" />
          <div className="fog-right" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 4rem 2rem;
          background: #050a12;
          position: relative;
          isolation: isolate;
          transform: translateZ(0);
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #050a12;
        }

        .image-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/testimonials/testimo_bg.png');
          background-size: 76% auto;
          background-position: center center;
          background-repeat: no-repeat;
          opacity: 0.7;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        h2 {
          text-align: center;
          font-size: 2.2rem;
          margin: 0 0 2.5rem;
          color: #ffffff;
        }

        .scroller-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
        }

        .scroller {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2rem 0;
        }

        .scroller::-webkit-scrollbar {
          display: none;
        }

        .testimonials-track {
          display: flex;
          gap: 24px;
          flex-shrink: 0;
        }

        .testimonial-card {
          width: 500px;
          min-height: 370px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.01);

          -webkit-backdrop-filter: blur(3px);
          backdrop-filter: blur(3px);
          
          border: 1px solid rgba(255, 255, 255, 0.01);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: translateZ(0);
        }

        .testimonial-card:hover {
          transform: translateY(-4px) translateZ(0);
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.12);
        }

        .quote {
          font-size: 1rem;
          line-height: 1.6;
          color: #eafcff;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        .author {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }

        .name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          text-align: right;
        }

        .role {
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          text-align: right;
        }

        .fog-left,
        .fog-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          pointer-events: none;
          z-index: 10;
        }

        .fog-left {
          left: 0;
          background: linear-gradient(
            to right,
            #050a12 0%,
            rgba(5, 10, 18, 0.8) 30%,
            rgba(5, 10, 18, 0) 100%
          );
        }

        .fog-right {
          right: 0;
          background: linear-gradient(
            to left,
            #050a12 0%,
            rgba(5, 10, 18, 0.8) 30%,
            rgba(5, 10, 18, 0) 100%
          );
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 3rem 1rem;
          }

          h2 {
            font-size: 1.8rem;
            margin-bottom: 2rem;
          }

          .testimonial-card {
            width: 300px;
            min-height: 260px;
            padding: 20px;
          }

          .fog-left,
          .fog-right {
            width: 80px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroller {
            scroll-behavior: auto;
          }
          
          .testimonial-card {
            transition: none;
          }
          
          .testimonial-card:hover {
            transform: translateZ(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;