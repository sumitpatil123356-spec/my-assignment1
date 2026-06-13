import { useState } from 'react';

export default function AIFraudDetection() {
  const [threats, setThreats] = useState([
    { id: 'FR-9102', user: 'guest_buyer_x', location: 'IP: 198.51.100.82', flag: 'MULTIPLE_FAILED_PAYMENTS', score: 88, status: 'BLOCKED' },
    { id: 'FR-9101', user: 'sumit_admin', location: 'IP: 102.15.82.112', flag: 'SYS_ADMIN_LOGIN', score: 2, status: 'SECURED' },
    { id: 'FR-9100', user: 'frequent_shopper', location: 'IP: 203.0.113.14', flag: 'BULK_ORDER_VOLUME', score: 45, status: 'FLAGGED' },
    { id: 'FR-9099', user: 'cyber_bot_9', location: 'IP: 185.220.101.4', flag: 'TOR_EXIT_NODE_ACCESS', score: 92, status: 'BLOCKED' },
  ]);

  const approveThreat = (id) => {
    alert(`SECURITY AUDIT REVISION: Flagged item ${id} cleared manually by Administrator.`);
    setThreats(threats.map(t => t.id === id ? { ...t, score: 5, status: 'SECURED' } : t));
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>SECURITY // FRAUD_DETECTION_ENGINE</h1>
        <p style={styles.subtitle}>AI evaluation scanning transactional activities for pattern anomalies, bot inputs, and token fraud.</p>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>THREAT_ID</th>
              <th style={styles.th}>OPERATOR_NODE</th>
              <th style={styles.th}>SECURITY FLAG</th>
              <th style={styles.th}>RISK SCORE</th>
              <th style={styles.th}>DECISION</th>
              <th style={styles.th}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((t) => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td} className="tech-mono">{t.id}</td>
                <td style={styles.td}>
                  <div>{t.user}</div>
                  <div className="tech-mono" style={styles.location}>{t.location}</div>
                </td>
                <td style={styles.td} className="tech-mono" style={{ color: '#7f8794', fontSize: '0.75rem' }}>{t.flag}</td>
                <td style={styles.td}>
                  <div style={styles.scoreRow}>
                    <span className="tech-mono" style={{
                      fontWeight: '700',
                      color: t.score > 70 ? '#ff4d4d' : t.score > 30 ? '#ffb300' : 'var(--color-primary-accent)'
                    }}>{t.score}</span>
                    <div style={styles.riskTrack}>
                      <div style={{
                        ...styles.riskIndicator,
                        width: `${t.score}%`,
                        backgroundColor: t.score > 70 ? '#ff4d4d' : t.score > 30 ? '#ffb300' : 'var(--color-primary-accent)'
                      }} />
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <span className="tech-mono" style={{
                    ...styles.badge,
                    color: t.status === 'SECURED' ? 'var(--color-primary-accent)' : t.status === 'BLOCKED' ? '#ff4d4d' : '#ffb300'
                  }}>{t.status}</span>
                </td>
                <td style={styles.td}>
                  {t.status !== 'SECURED' && (
                    <button onClick={() => approveThreat(t.id)} style={styles.btn} className="tech-mono">
                      OVERRIDE_SAFE
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  header: { marginBottom: '40px' },
  title: { fontSize: '1.5rem', color: 'var(--color-primary-accent)', letterSpacing: '2px', textShadow: '0 0 8px var(--color-accent-glow)', marginBottom: '8px' },
  subtitle: { fontSize: '0.85rem', color: 'var(--color-text-secondary)' },
  container: { backgroundColor: 'var(--color-surface-panel)', border: '1px solid var(--color-border-system)', borderRadius: '4px', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeader: { borderBottom: '1px solid var(--color-border-system)' },
  th: { padding: '16px', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-technical)', letterSpacing: '1px' },
  tr: { borderBottom: '1px solid rgba(22, 27, 38, 0.5)' },
  td: { padding: '16px', fontSize: '0.85rem', color: 'var(--color-text)', verticalAlign: 'middle' },
  location: { fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '4px' },
  scoreRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  riskTrack: { width: '80px', height: '4px', backgroundColor: '#000000', borderRadius: '2px', overflow: 'hidden' },
  riskIndicator: { height: '100%', borderRadius: '2px' },
  badge: { fontSize: '0.75rem', fontWeight: '700' },
  btn: { backgroundColor: 'transparent', border: '1px solid var(--color-primary-accent)', color: 'var(--color-primary-accent)', padding: '6px 12px', borderRadius: '2px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }
};
