import React from 'react';

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav style={styles.navContainer}>
      <div style={styles.logo} className="tech-mono">GAMEOVER<span style={{color: 'var(--brand-primary)'}}>_</span></div>
      
      <ul style={styles.navLinks}>
        <li style={styles.activeLink} className="tech-mono">Home</li>
        <li style={styles.link} className="tech-mono">About</li>
        <li style={styles.link} className="tech-mono">Pricing</li>
        <li style={styles.link} className="tech-mono">Tech Specs</li>
        <li style={styles.link} className="tech-mono">Services</li>
      </ul>

      <div style={styles.utilityIcons}>
        <button onClick={onCartClick} style={styles.iconBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span style={styles.cartBadge} className="tech-mono">{cartCount}</span>
        </button>
        <button style={styles.loginBtn} className="tech-mono">Log_In</button>
      </div>
    </nav>
  );
}

const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 8%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-technical)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: { fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '40px', fontSize: '12px' },
  activeLink: { color: 'var(--brand-primary)', fontWeight: '700', cursor: 'pointer' },
  link: { color: 'var(--text-muted)', cursor: 'pointer', transition: 'var(--transition-fast)' },
  utilityIcons: { display: 'flex', alignItems: 'center', gap: '30px' },
  iconBtn: { background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', position: 'relative', display: 'flex' },
  cartBadge: { position: 'absolute', top: '-10px', right: '-12px', backgroundColor: 'var(--brand-primary)', color: '#000', fontSize: '10px', fontWeight: '700', padding: '1px 5px', borderRadius: '2px' },
  loginBtn: { padding: '6px 18px', borderRadius: 'var(--radius-sharp)', border: '1px solid var(--border-technical)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '12px', cursor: 'pointer' }
};

export default Navbar;