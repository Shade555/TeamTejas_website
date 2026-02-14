import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #070e1c 0%, #050a12 100%)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <Image
        src="/err.jpg"
        alt="404 Error"
        width={200}
        height={100}
        style={{ marginBottom: '2rem' }}
      />
      <h1 style={{
        fontSize: '6rem',
        fontWeight: 'bold',
        margin: 0,
        background: 'linear-gradient(135deg, #00103c 0%, #0a3990 35%, #79a1c0 55%, #a0d8f4 80%, #4fa1eb 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Error 404
      </h1>
      <p style={{
        fontSize: '1.5rem',
        marginTop: '2rem',
        color: '#bfeefc',
        maxWidth: '600px',
      }}>
        MAYDAY!! MAYDAY!! We Crash landed on the wrong page
      </p>
    </div>
  );
}
