import React from 'react';

function Footer() {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.topRow}>
        <div>
          <h3 style={styles.brand}>NEXUS GEAR</h3>
          <p style={styles.text}>Next level computing parts and peripherals tailored for competitive elite gameplay.</p>
        </div>
        <div>
          <h4 style={styles.subHeading}>Newsletter</h4>
          <div style={styles.inputGroup}>
            <input style={styles.input} type="email" placeholder="Enter cyber mail..." />
            <button style={styles.btn}>JOIN</button>
          </div>
        </div>
      </div>
      <hr style={styles.line} />
      <div style={styles.bottomRow}>
        <p>© 2026 NEXUS GEAR. All Systems Operational.</p>
        <div style={styles.socials}>
          <span>👾 Discord</span> | <span>📺 YouTube</span> | <span>🐦 Twitter</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#050608',
    padding: '50px 8% 30px 8%',
    borderTop: '1px solid #2d3748',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '30px',
  },
  brand: {
    color: 'var(--text-light)',
    marginBottom: '10px',
    letterSpacing: '1px',
  },
  text: {
    maxWidth: '300px',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  subHeading: {
    color: 'var(--text-light)',
    marginBottom: '15px',
  },
  inputGroup: {
    display: 'flex',
  },
  input: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid #4a5568',
    padding: '10px',
    color: '#fff',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
  },
  btn: {
    backgroundColor: 'var(--accent-glow)',
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    padding: '0 20px',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  line: {
    border: '0',
    height: '1px',
    backgroundColor: '#1a202c',
    marginBottom: '20px',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#718096',
    flexWrap: 'wrap',
    gap: '15px',
  },
  socials: {
    display: 'flex',
    gap: '15px',
    cursor: 'pointer',
  },
};

export default Footer;