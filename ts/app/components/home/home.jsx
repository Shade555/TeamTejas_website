const Home = () => {
  return (
    <section style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 8rem'
    }}>
      {/* Left column: primary headline 'Defending the Digital' */}
      <div style={{
        flex: 1,
        maxWidth: '55%',
        color: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: 'translateY(-5rem)'
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
          lineHeight: 0.95,
          fontWeight: 800,
          color: 'white',
          textAlign: 'left'
        }}>
          Defending<br />the Digital
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
      <div style={{
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
          transform: 'translateY(0)',
          maxWidth: '38ch',
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'right'
        }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 300, lineHeight: 1.3, paddingTop: '2.5rem' }}>
            We assist our clients in integrating cyber security by design in their<br /> digital transformation.
          </p>
        </div>

        <h1 style={{
          fontSize: '7rem',
          lineHeight: 0.95,
          margin: 0,
          fontWeight: 900,
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          textAlign: 'right',
          display: 'inline-block'
        }}>
          <div style={{ display: 'block', position: 'relative', transform: 'translateX(-19.25rem)' }}>on</div>
          <div style={{ display: 'block' }}>the Dot.</div>
        </h1>

      </div>
    </section>
  );
};

export default Home;
