import { useState, useRef, useEffect } from 'react';
import GlassSurface from '../../../components/GlassSurface';
import './teamCards.css';

const Team = () => {
  const filters = [
    { key: 'all', label: 'All Members' },
    { key: 'core', label: 'Core' },
    { key: 'fabrication', label: 'Fabrication' },
    { key: 'design', label: 'Design' },
    { key: 'avionics', label: 'Avionics' },
    { key: 'graphics', label: 'Graphics' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'webmasters', label: 'Webmasters' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const barRef = useRef(null);
  const buttonRefs = useRef([]);
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  // attach pill-position hook inside the component so hooks work in component scope
  usePillPosition(activeIndex, barRef, buttonRefs, setPillStyle);

  // year selector (small bar underneath)
  const yearFilters = [
    { key: '2025', label: '2025-26' },
    { key: '2024', label: '2024-25' },
    { key: '2023', label: '2023-24' },
    { key: '2022', label: '2022-23' },
    { key: '2021', label: '2021-22' },
    { key: '2020', label: '2020-21' },
  ];
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const yearBarRef = useRef(null);
  const yearButtonRefs = useRef([]);
  const [yearPillStyle, setYearPillStyle] = useState({ opacity: 0 });
  usePillPosition(activeYearIndex, yearBarRef, yearButtonRefs, setYearPillStyle, { heightScale: 0.72, centerVertical: true });

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <h1 className="cormorant-bold" style={{ fontSize: '3rem', lineHeight: 1.05, margin: '0 0 0.75rem', color: 'rgb(179, 207, 229)' }}>
        Meet Our Team
      </h1>
      <p style={{ maxWidth: 900, margin: '0 auto', fontSize: '1.125rem', color: 'rgb(179, 207, 229)' }}>
        A team's success is dependent on the members that work together to achieve its goals. Meet our team who have been pushing themselves to reach new heights constantly.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <GlassSurface
          width={'auto'}
          height={64}
          borderRadius={999}
          borderWidth={0.06}
          brightness={30}
          opacity={0.95}
          blur={18}
          distortionScale={0}
          redOffset={0}
          blueOffset={0}
          greenOffset={0}
          className="testimonial-surface"
          style={{ width: 'auto', maxWidth: '90%', height: '64px', padding: '8px 20px' }}
        >
          <div className="team-filter-bar" role="tablist" ref={barRef}>
            <div className="team-filter-pill" style={pillStyle} aria-hidden="true" />
            {filters.map((f, i) => (
              <button
                key={f.key}
                ref={(el) => (buttonRefs.current[i] = el)}
                className={`team-filter-button ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                role="tab"
                aria-selected={i === activeIndex}
              >
                {f.label}
              </button>
            ))}
          </div>
        </GlassSurface>
      </div>
      {/* year selector bar - smaller row under the main filters */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.85rem' }}>
        <GlassSurface
          width={'auto'}
          height={48}
          borderRadius={999}
          borderWidth={0.06}
          brightness={30}
          opacity={0.95}
          blur={16}
          distortionScale={0}
          redOffset={0}
          blueOffset={0}
          greenOffset={0}
          className="testimonial-surface"
          style={{ width: 'auto', maxWidth: '70%', height: '48px', padding: '6px 14px' }}
        >
          <div className="team-filter-bar" role="tablist" ref={yearBarRef}>
            <div className="team-filter-pill" style={yearPillStyle} aria-hidden="true" />
            {yearFilters.map((y, i) => (
              <button
                key={y.key}
                ref={(el) => (yearButtonRefs.current[i] = el)}
                className={`team-filter-button ${i === activeYearIndex ? 'is-active' : ''}`}
                onClick={() => setActiveYearIndex(i)}
                role="tab"
                aria-selected={i === activeYearIndex}
              >
                {y.label}
              </button>
            ))}
          </div>
        </GlassSurface>
      </div>
      {/* team cards section */}
      <div style={{ marginTop: '2rem', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
        <TeamSections filters={filters} activeIndex={activeIndex} selectedYearKey={yearFilters[activeYearIndex].key} membersByYear={membersByYear} />
      </div>
    </div>
  );
};

// compute pill position when activeIndex changes or on resize
function usePillPosition(activeIndex, barRef, buttonRefs, setPillStyle, options) {
  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      const btn = (buttonRefs.current || [])[activeIndex];
      if (!bar || !btn) {
        setPillStyle({ opacity: 0 });
        return;
      }

      const barRect = bar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const left = btnRect.left - barRect.left + bar.scrollLeft;
      const width = btnRect.width;
      // allow options to reduce pill height or offset it
      const rawHeight = btnRect.height;
      const heightScale = (options && options.heightScale) || 1;
      const heightOffset = (options && options.heightOffset) || 0;
      const pillHeight = Math.max(4, Math.round(rawHeight * heightScale + heightOffset));

      // vertical centering when requested
      const translateY = options && options.centerVertical ? ` translateY(${Math.round((rawHeight - pillHeight) / 2)}px)` : '';

      setPillStyle({
        transform: `translateX(${left}px)${translateY}`,
        width: `${width}px`,
        height: `${pillHeight}px`,
        opacity: 1,
      });
    };

    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    if (barRef.current) ro.observe(barRef.current);
    buttonRefs.current.forEach((b) => b && ro.observe(b));

    return () => {
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, [activeIndex, barRef, buttonRefs, setPillStyle]);
}

// NOTE: the hook is invoked inside the component above; no module-level invocation.

const members = {
  core: [
    { name: 'Alice Core', role: 'Head' },
    { name: 'Bob Core', role: 'Member' },
    { name: 'Cathy Core', role: 'Member' },
    { name: 'Derek Core', role: 'Member' },
    { name: 'Ethan Core', role: 'Member' }
  ],
  fabrication: [
    { name: 'Carlos Fab', role: 'Head' },
    { name: 'Dana Fab', role: 'Member' },
    { name: 'Eli Fab', role: 'Member' },
    { name: 'Fiona Fab', role: 'Member' }
  ],
  design: [
    { name: 'Eve Design', role: 'Co-Head' },
    { name: 'Frank Design', role: 'Co-Head' },
    { name: 'Gina Design', role: 'Member' },
    { name: 'Hank Design', role: 'Member' }
  ],
  avionics: [
    { name: 'Grace Av', role: 'Head' },
    { name: 'Heidi Av', role: 'Member' },
    { name: 'Ian Av', role: 'Member' },
    { name: 'Jill Av', role: 'Member' },
    { name: 'Kyle Av', role: 'Member' }
  ],
  graphics: [
    { name: 'Ivy Graph', role: 'Head' },
    { name: 'Jack Graph', role: 'Member' },
    { name: 'Lola Graph', role: 'Member' }
  ],
  marketing: [
    { name: 'Ken Market', role: 'Head' },
    { name: 'Lina Market', role: 'Member' },
    { name: 'Maya Market', role: 'Member' },
    { name: 'Nate Market', role: 'Member' },
    { name: 'Omar Market', role: 'Member' }
  ],
  webmasters: [
    { name: 'Moe Web', role: 'Head' },
    { name: 'Nina Web', role: 'Member' },
    { name: 'Ola Web', role: 'Member' }
  ]
};

// simple mapping of year -> members dataset (placeholder). Real data can replace these objects.
const membersByYear = {
  '2025': members,
  '2024': {
    core: [
      { name: 'Old Alice', role: 'Head' },
      { name: 'Old Bob', role: 'Member' }
    ],
    fabrication: [
      { name: 'Old Carlos', role: 'Head' },
      { name: 'Old Dana', role: 'Member' }
    ],
    design: [
      { name: 'Old Eve', role: 'Head' },
      { name: 'Old Frank', role: 'Member' }
    ]
  },
  '2023': {}
};

function TeamSections({ filters, activeIndex, selectedYearKey, membersByYear }) {
  const showAll = filters[activeIndex]?.key === 'all';
  const teamsToShow = showAll ? filters.filter(f => f.key !== 'all') : [filters[activeIndex]];

  return (
    <div>
      {teamsToShow.map((f) => {
        const teamMembers = (membersByYear && membersByYear[selectedYearKey] && membersByYear[selectedYearKey][f.key]) || members[f.key] || [];
        const heads = teamMembers.filter(m => /head|lead/i.test(m.role));
        const others = teamMembers.filter(m => !/head|lead/i.test(m.role));

        return (
          <section key={f.key} className="team-section">
            <h2 className="team-title">{f.label}</h2>

            {/* heads row - centered */}
            {heads.length > 0 && (
              <div className="group-row heads-row">
                {heads.map((m) => (
                  <article key={m.name} className="member-card large">
                    <div className="member-info center">
                      <div className="member-name large">{m.name}</div>
                      <div className="member-role">{m.role}</div>
                    </div>
                    <div className="avatar large" aria-hidden="true" />
                    <div className="card-footer">
                      <div className="handle">@{m.name.split(' ')[0].toLowerCase()}</div>
                      <div className="icons">🔗 ✉️</div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* members grid - centered rows with max 4 per row */}
            {others.length > 0 ? (
              <div className="group-row members-row">
                {others.map((m) => (
                  <article key={m.name} className="member-card">
                    <div className="member-info">
                      <div className="member-name">{m.name}</div>
                      <div className="member-role">{m.role}</div>
                    </div>
                    <div className="avatar" aria-hidden="true" />
                    <div className="card-footer small">
                      <div className="handle">@{m.name.split(' ')[0].toLowerCase()}</div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="group-row members-row">
                <article className="member-card placeholder large">
                  <div className="member-info center">
                    <div className="member-name large">Vacant</div>
                    <div className="member-role">No member yet</div>
                  </div>
                  <div className="avatar large" />
                </article>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default Team;