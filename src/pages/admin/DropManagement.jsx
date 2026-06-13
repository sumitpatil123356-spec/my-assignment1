import { useState, useEffect } from 'react';

export default function DropManagement() {
  const [drops, setDrops] = useState([
    { id: 'DR-101', name: 'Volt Green Special Refactor Pack', timeRemaining: 3600 * 48, status: 'STANDBY' },
    { id: 'DR-102', name: 'Alabaster Core Stealth Variant Drop', timeRemaining: 3600 * 5, status: 'COUNTDOWN' },
    { id: 'DR-103', name: 'Tactical Zero-Lag Mouse Elite Bundle', timeRemaining: 0, status: 'RELEASED' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDrops(prev => prev.map(d => {
        if (d.status === 'COUNTDOWN' && d.timeRemaining > 0) {
          const nextVal = d.timeRemaining - 1;
          return { ...d, timeRemaining: nextVal, status: nextVal === 0 ? 'RELEASED' : 'COUNTDOWN' };
        }
        return d;
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return 'NODE_ACTIVE';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const forceRelease = (id) => {
    alert(`OPERATOR KEY INITIATED: Forcing Drop release for drop reference ${id}.`);
    setDrops(drops.map(d => d.id === id ? { ...d, timeRemaining: 0, status: 'RELEASED' } : d));
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>LOGISTICS // DROP_MANAGEMENT</h1>
        <p style={styles.subtitle}>Countdown grids tracking hardware batch drop countdown schedulers and shipment status.</p>
      </div>

      <div style={styles.grid}>
        {drops.map((drop) => (
          <div key={drop.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span className="tech-mono" style={styles.dropId}>{drop.id}</span>
              <span
                className="tech-mono"
                style={{
                  ...styles.statusBadge,
                  color: drop.status === 'RELEASED' ? 'var(--color-primary-accent)' : drop.status === 'COUNTDOWN' ? '#ffb300' : '#7f8794',
                  borderColor: drop.status === 'RELEASED' ? 'var(--color-primary-accent)' : drop.status === 'COUNTDOWN' ? '#ffb300' : '#7f8794',
                  backgroundColor: drop.status === 'RELEASED' ? 'var(--color-accent-soft)' : 'transparent',
                }}
              >
                {drop.status}
              </span>
            </div>
            <h3 style={styles.dropName}>{drop.name}</h3>

            <div style={styles.timerBox}>
              <div className="tech-mono" style={{
                ...styles.timeDisplay,
                color: drop.status === 'RELEASED' ? 'var(--color-primary-accent)' : 'var(--color-text)',
                textShadow: drop.status === 'RELEASED' ? '0 0 10px var(--color-accent-glow)' : 'none',
              }}>
                {formatTime(drop.timeRemaining)}
              </div>
            </div>

            {drop.status !== 'RELEASED' && (
              <button
                onClick={() => forceRelease(drop.id)}
                style={styles.btn}
                className="tech-mono"
              >
                BYPASS_COUNTDOWN
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: { marginBottom: '40px' },
  title: { fontSize: '1.5rem', color: 'var(--color-primary-accent)', letterSpacing: '2px', textShadow: '0 0 8px var(--color-accent-glow)', marginBottom: '8px' },
  subtitle: { fontSize: '0.85rem', color: 'var(--color-text-secondary)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' },
  card: { backgroundColor: 'var(--color-surface-panel)', border: '1px solid var(--color-border-system)', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  dropId: { fontSize: '0.75rem', color: 'var(--color-text-secondary)' },
  statusBadge: { fontSize: '0.65rem', padding: '4px 8px', borderRadius: '2px', border: '1px solid', fontWeight: '700' },
  dropName: { fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '16px' },
  timerBox: { borderTop: '1px solid var(--color-border-system)', paddingTop: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'center' },
  timeDisplay: { fontSize: '1.4rem', fontWeight: '700', letterSpacing: '2px' },
  btn: { backgroundColor: 'transparent', border: '1px solid var(--color-border-system)', color: 'var(--color-text)', padding: '10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }
};
