export default function AITrendAnalyzer() {
  const trends = [
    { label: 'Volt Green Special Series', demand: 'CRITICAL_HIGH', velocity: '+48% growth', score: 98 },
    { label: 'SoundScape Pro Tactical Array', demand: 'STEADY_STABLE', velocity: '+12% growth', score: 72 },
    { label: 'Mechanical Core TKL Keyboard', demand: 'STEADY_STABLE', velocity: '+8% growth', score: 65 },
    { label: 'Carbon Grid Ultralight Mouse', demand: 'RISING_SPIKE', velocity: '+24% growth', score: 84 },
    { label: 'Cobalt Element Controller', demand: 'DECLINING_LOW', velocity: '-6% drop', score: 41 },
  ];

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>AI // TREND_ANALYZER</h1>
        <p style={styles.subtitle}>Predictive modeling forecasting dynamic product demand levels and stock velocities.</p>
      </div>

      <div style={styles.container}>
        <h3 className="tech-mono" style={styles.panelTitle}>// PREDICTIVE_VELOCITY_MATRIX</h3>
        <div style={styles.rows}>
          {trends.map((item, i) => (
            <div key={i} style={styles.row}>
              <div style={styles.metaCol}>
                <div style={styles.label}>{item.label}</div>
                <div className="tech-mono" style={styles.velocity}>{item.velocity}</div>
              </div>

              <div style={styles.barContainer}>
                <div style={styles.barWrapper}>
                  <div style={{
                    ...styles.fillBar,
                    width: `${item.score}%`,
                    backgroundColor: item.score > 80 ? 'var(--color-primary-accent)' : item.score > 50 ? '#ffb300' : '#ff4d4d',
                    boxShadow: item.score > 80 ? '0 0 10px var(--color-accent-glow)' : 'none'
                  }} />
                </div>
                <span className="tech-mono" style={styles.scoreText}>{item.score}%</span>
              </div>

              <span className="tech-mono" style={{
                ...styles.badge,
                color: item.demand.includes('HIGH') || item.demand.includes('SPIKE') ? 'var(--color-primary-accent)' : item.demand.includes('LOW') ? '#ff4d4d' : '#ffb300'
              }}>{item.demand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: { marginBottom: '40px' },
  title: { fontSize: '1.5rem', color: 'var(--color-primary-accent)', letterSpacing: '2px', textShadow: '0 0 8px var(--color-accent-glow)', marginBottom: '8px' },
  subtitle: { fontSize: '0.85rem', color: 'var(--color-text-secondary)' },
  container: { backgroundColor: 'var(--color-surface-panel)', border: '1px solid var(--color-border-system)', padding: '32px', borderRadius: '4px' },
  panelTitle: { fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '24px', letterSpacing: '1px' },
  rows: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(22, 27, 38, 0.4)', paddingBottom: '16px', gap: '24px' },
  metaCol: { flex: '1 1 200px' },
  label: { fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)' },
  velocity: { fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '4px' },
  barContainer: { flex: '2 1 300px', display: 'flex', alignItems: 'center', gap: '16px' },
  barWrapper: { flexGrow: 1, height: '8px', backgroundColor: '#000000', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border-system)' },
  fillBar: { height: '100%', borderRadius: '4px', transition: 'width 1s ease-in-out' },
  scoreText: { fontSize: '0.8rem', color: 'var(--color-text-secondary)', minWidth: '40px', textAlign: 'right' },
  badge: { fontSize: '0.75rem', fontWeight: '700', minWidth: '130px', textAlign: 'right' }
};
