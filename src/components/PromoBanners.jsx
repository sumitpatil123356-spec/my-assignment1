import React from 'react';

function PromoBanners() {
  const promos = [
    { id: 1, tag: 'PRIMAL', title: 'Agis Quantum Headset', asset: '🎧' },
    { id: 2, tag: 'PRECISION', title: 'Nighthawk Pro Gaming Mouse', asset: '🖱️' },
    { id: 3, tag: 'COMFORT', title: 'Hydra Ergonomic Keyboard', asset: '⌨️' },
  ];

  return (
    <div style={styles.container}>
      {promos.map((p) => (
        <div key={p.id} style={styles.card}>
          <span style={styles.tag}>{p.tag}</span>
          <h3 style={styles.title}>{p.title}</h3>
          <span style={styles.asset}>{p.asset}</span>
          <button style={styles.shopBtn}>Shop Now ➔</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    padding: '20px 8% 60px 8%',
  },
  card: {
    backgroundColor: 'var(--bg-dark-card)',
    borderRadius: '12px',
    padding: '35px',
    position: 'relative',
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  tag: {
    color: '#82899a',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  title: {
    color: 'var(--text-light)',
    fontSize: '22px',
    fontWeight: '600',
    marginTop: '10px',
    maxWidth: '180px',
    zIndex: 2,
  },
  asset: {
    position: 'absolute',
    right: '20px',
    bottom: '40px',
    fontSize: '90px',
    opacity: '0.25',
  },
  shopBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent-pink)',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'left',
    cursor: 'pointer',
    marginTop: '20px',
    padding: 0,
  },
};

export default PromoBanners;