export default function Footer() {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.topRow}>
        <div>
          <h3 style={styles.brand}>Nexus Gear</h3>
          <p style={styles.text}>Premium gaming hardware and peripherals for competitive players.</p>
        </div>
        <div>
          <h4 style={styles.subHeading}>Newsletter</h4>
          <div style={styles.inputGroup}>
            <input style={styles.input} type="email" placeholder="Enter your email..." />
            <button style={styles.btn}>Subscribe</button>
          </div>
        </div>
      </div>
      <hr style={styles.line} />
      <div style={styles.bottomRow}>
        <p style={{ fontSize: '0.8rem' }}>© 2026 Nexus Gear. All rights reserved.</p>
        <div style={styles.socials}>
          <span>Discord</span>
          <span>YouTube</span>
          <span>Twitter</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#050608',
    padding: '60px 8% 40px 8%',
    borderTop: '1px solid var(--color-border-system)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '40px',
  },
  brand: {
    color: 'var(--color-primary-accent)',
    marginBottom: '16px',
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  text: {
    maxWidth: '360px',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
  },
  subHeading: {
    color: 'var(--color-text)',
    marginBottom: '16px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  inputGroup: {
    display: 'flex',
  },
  input: {
    backgroundColor: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    padding: '12px 16px',
    color: '#fff',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
    fontSize: '0.85rem',
    width: '220px',
  },
  btn: {
    backgroundColor: 'var(--color-primary-accent)',
    border: 'none',
    color: '#000000',
    fontWeight: '700',
    padding: '0 20px',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  line: {
    border: '0',
    height: '1px',
    backgroundColor: 'var(--color-border-system)',
    marginBottom: '24px',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'var(--color-text-secondary)',
    flexWrap: 'wrap',
    gap: '16px',
  },
  socials: {
    display: 'flex',
    gap: '24px',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
};