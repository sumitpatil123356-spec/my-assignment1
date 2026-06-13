import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 className="tech-mono" style={styles.errorCode}>ERROR_404 //</h1>
      <p style={styles.title}>SEGMENTATION FAULT: PAGE NOT DETECTED</p>
      <p style={styles.desc}>The coordinates you supplied point to a secure or unmapped sector in the database array.</p>
      <Link to="/" style={styles.link} className="tech-mono">
        ← BACK_TO_OPERATIONAL_SPACE
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 24px',
    textAlign: 'center',
  },
  errorCode: {
    fontSize: '4.5rem',
    color: '#ff4d4d',
    textShadow: '0 0 16px rgba(255, 77, 77, 0.4)',
    fontWeight: '900',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '16px',
    letterSpacing: '1px',
    color: 'var(--color-text)',
  },
  desc: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    maxWidth: '460px',
    lineHeight: '1.6',
    marginBottom: '40px',
  },
  link: {
    display: 'inline-block',
    border: '1px solid var(--color-primary-accent)',
    color: 'var(--color-primary-accent)',
    padding: '14px 28px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '700',
    background: 'var(--color-accent-soft)',
    boxShadow: '0 0 12px var(--color-accent-glow)',
    transition: 'all 0.2s',
  }
};
