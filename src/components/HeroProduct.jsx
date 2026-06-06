import React from 'react';

function HeroProduct({ activeColor, setActiveColor, onAddToCart, colorVariants }) {
  const currentVariant = colorVariants[activeColor];

  const specs = [
    { title: "PRECISION CONTROL", desc: "Engineered analog sticks and triggers for tactical millimeter accuracy." },
    { title: "MULTI-DEVICE SUPPORT", desc: "Instantly cycle through registered system nodes seamlessly." },
    { title: "CUSTOM MAPPING", desc: "Remap array inputs and save profile structural definitions." },
    { title: "BLUETOOTH 5.0", desc: "Stable. Fast. Reliable data stream frequencies." }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Left Control Array Block */}
        <div style={styles.leftCol}>
          <span style={styles.badge} className="tech-mono">PRO SERIES</span>
          <h1 style={styles.title}>NEXT LEVEL<br /><span style={{color: 'var(--brand-primary)'}}>CONTROL SYSTEM</span></h1>
          <p style={styles.description}>
            Designed for precision comfort gameplay, bringing refined control into a seamless handheld experience.
          </p>
          
          <div style={styles.btnGroup}>
            <button onClick={() => onAddToCart(currentVariant)} style={styles.primaryBtn} className="tech-mono">Buy Now</button>
            <button onClick={() => onAddToCart(currentVariant)} style={styles.secondaryBtn} className="tech-mono">Add to cart</button>
          </div>

          <div style={styles.colorPickerSection}>
            <span style={styles.pickerTitle} className="tech-mono">CHOOSE YOUR COLOR</span>
            <div style={styles.pickerGroup}>
              {Object.keys(colorVariants).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveColor(key)}
                  style={{
                    ...styles.colorCircle,
                    backgroundColor: colorVariants[key].hex,
                    borderColor: activeColor === key ? 'var(--brand-primary)' : 'var(--border-technical)'
                  }}
                />
              ))}
            </div>
            <span style={styles.colorNameDisplay} className="tech-mono">// system_node: {currentVariant.name}</span>
          </div>
        </div>

        {/* Center Optical Display Core */}
        <div style={styles.centerCol}>
          <img src={currentVariant.img} alt={currentVariant.name} style={styles.heroImg} />
          <div style={styles.radarGlow}></div>
        </div>

        {/* Right Feature Specification Terminal */}
        <div style={styles.rightCol}>
          {specs.map((spec, i) => (
            <div key={i} style={styles.specBox}>
              <div style={styles.specIconLine}>
                <span style={styles.crosshair}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path></svg>
                </span>
                <h4 style={styles.specTitle} className="tech-mono">{spec.title}</h4>
              </div>
              <p style={styles.specDesc}>{spec.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Technical Compatibility Protocol Ribbon */}
      <div style={styles.compatBar}>
        <span style={styles.compatLabel} className="tech-mono">WORKS_WITH //</span>
        <div style={styles.compatGrid}>
          <span style={styles.compatItem} className="tech-mono">🎮 CONSOLES</span>
          <span style={styles.compatItem} className="tech-mono">💻 WINDOWS PC</span>
          <span style={styles.compatItem} className="tech-mono">📱 IOS</span>
          <span style={styles.compatItem} className="tech-mono">🤖 ANDROID</span>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '40px 8% 60px 8%', backgroundColor: 'var(--bg-canvas)' },
  container: { display: 'grid', gridTemplateColumns: '1fr 1.1fr 1fr', gap: '60px', alignItems: 'center' },
  leftCol: { display: 'flex', flexDirection: 'column' },
  badge: { alignSelf: 'flex-start', fontSize: '10px', color: 'var(--brand-primary)', padding: '2px 8px', border: '1px solid var(--brand-primary)', marginBottom: '24px' },
  title: { fontSize: '44px', fontWeight: '800', lineHeight: '1.05', color: 'var(--text-main)', marginBottom: '20px' },
  description: { fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '35px', maxWidth: '340px' },
  btnGroup: { display: 'flex', gap: '12px', marginBottom: '45px' },
  primaryBtn: { backgroundColor: 'var(--brand-primary)', color: '#000', padding: '12px 28px', border: 'none', borderRadius: 'var(--radius-sharp)', fontWeight: '700', fontSize: '12px', cursor: 'pointer' },
  secondaryBtn: { backgroundColor: 'transparent', color: 'var(--text-main)', padding: '12px 28px', border: '1px solid var(--border-technical)', borderRadius: 'var(--radius-sharp)', fontWeight: '600', fontSize: '12px', cursor: 'pointer' },
  colorPickerSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  pickerTitle: { fontSize: '10px', color: 'var(--text-muted)' },
  pickerGroup: { display: 'flex', gap: '14px' },
  colorCircle: { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #000', cursor: 'pointer', outline: '1px solid var(--border-technical)' },
  colorNameDisplay: { fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' },
  centerCol: { position: 'relative', display: 'flex', justifyContent: 'center' },
  heroImg: { width: '115%', height: 'auto', objectFit: 'contain', zIndex: 2 },
  radarGlow: { position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--brand-primary-glow) 0%, transparent 65%)', zIndex: 1 },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '32px' },
  specBox: { display: 'flex', flexDirection: 'column', gap: '8px' },
  specIconLine: { display: 'flex', alignItems: 'center', gap: '12px' },
  crosshair: { display: 'flex', alignItems: 'center' },
  specTitle: { fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' },
  specDesc: { fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', paddingLeft: '26px' },
  compatBar: { marginTop: '80px', display: 'flex', alignItems: 'center', padding: '16px 24px', borderRadius: 'var(--radius-sharp)', border: '1px solid var(--border-technical)', backgroundColor: 'var(--bg-surface)' },
  compatLabel: { fontSize: '11px', color: 'var(--brand-primary)' },
  compatGrid: { display: 'flex', gap: '40px', paddingLeft: '40px' },
  compatItem: { fontSize: '11px', color: 'var(--text-muted)' }
};

export default HeroProduct;