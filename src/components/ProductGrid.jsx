import React from 'react';

function ProductGrid({ products, onAddToCart }) {
  return (
    <section style={styles.sectionContainer}>
      <div style={styles.sectionHeader}>
        <span className="tech-mono" style={styles.metaLabel}>// ECOSYSTEM_COMPLEMENTS</span>
        <h2 style={styles.titleText}>PREMIUM FIELD EQUIPMENT</h2>
      </div>

      <div style={styles.gridMatrix}>
        {products.map((item) => (
          <div key={item.id} className="interactive-card" style={styles.productCard}>
            <div style={styles.imageBox}>
              <img src={item.img} alt={item.label} style={styles.productImage} />
            </div>
            <div style={styles.infoMeta}>
              <h4 style={styles.pName}>{item.label}</h4>
              <div style={styles.footerRow}>
                <span style={styles.currentPrice} className="tech-mono">${item.value.toFixed(2)}</span>
                <button onClick={() => onAddToCart(item)} style={styles.addBtn} className="tech-mono">+ ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  sectionContainer: { padding: '60px 8% 100px 8%', borderTop: '1px solid var(--border-technical)' },
  sectionHeader: { marginBottom: '40px' },
  metaLabel: { fontSize: '11px', color: 'var(--brand-primary)', display: 'block', marginBottom: '4px' },
  titleText: { fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px' },
  gridMatrix: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' },
  productCard: { padding: '16px', display: 'flex', flexDirection: 'column' },
  imageBox: { height: '170px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-technical)', borderRadius: 'var(--radius-sharp)', overflow: 'hidden', marginBottom: '16px' },
  productImage: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 },
  infoMeta: { display: 'flex', flexDirection: 'column', gap: '12px' },
  pName: { fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' },
  footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  currentPrice: { fontSize: '14px', fontWeight: '700', color: 'var(--brand-primary)' },
  addBtn: { padding: '6px 14px', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-technical)', borderRadius: 'var(--radius-sharp)', fontSize: '11px', fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-fast)' }
};

export default ProductGrid;