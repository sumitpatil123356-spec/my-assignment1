import { useState } from 'react';

export default function HardwareProtocols() {
  const [nodes] = useState([
    { id: 'NODE-01', name: 'Volt Green Controller Core', latency: '0.2ms', status: 'ONLINE', signal: '98%' },
    { id: 'NODE-02', name: 'Cobalt Element Controller Core', latency: '0.25ms', status: 'ONLINE', signal: '95%' },
    { id: 'NODE-03', name: 'Alabaster Core Controller', latency: '--', status: 'OFFLINE', signal: '0%' },
    { id: 'NODE-04', name: 'SoundScape Pro Tactical Array', latency: '1.2ms', status: 'ONLINE', signal: '87%' },
    { id: 'NODE-05', name: 'Mechanical Core Keyboard Controller', latency: '0.8ms', status: 'ONLINE', signal: '92%' },
  ]);

  const runDiagnostics = (nodeId) => {
    alert(`DIAGNOSTIC PROTOCOL INITIATED FOR ${nodeId}...\nALL LOGICAL INPUT SIGNALS OPERATING AT OPTIMAL LATENCY DATA.`);
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>HARDWARE // DEVICE_PROTOCOLS</h1>
        <p style={styles.subtitle}>Direct interface for tactical hardware node status, latency measurements, and input matrix tests.</p>
      </div>

      <div style={styles.grid}>
        {nodes.map((node) => (
          <div key={node.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span className="tech-mono" style={styles.nodeId}>{node.id}</span>
              <span
                className="tech-mono"
                style={{
                  ...styles.statusBadge,
                  color: node.status === 'ONLINE' ? 'var(--color-primary-accent)' : '#ff4d4d',
                  backgroundColor: node.status === 'ONLINE' ? 'var(--color-accent-soft)' : 'rgba(255, 77, 77, 0.08)',
                  borderColor: node.status === 'ONLINE' ? 'var(--color-primary-accent)' : '#ff4d4d',
                }}
              >
                {node.status}
              </span>
            </div>
            <h3 style={styles.nodeName}>{node.name}</h3>
            <div style={styles.telemetryRow}>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>LATENCY</span>
                <span className="tech-mono" style={styles.metricVal}>{node.latency}</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>SIGNAL STRENGTH</span>
                <span className="tech-mono" style={styles.metricVal}>{node.signal}</span>
              </div>
            </div>
            <button
              onClick={() => runDiagnostics(node.id)}
              disabled={node.status === 'OFFLINE'}
              style={{
                ...styles.btn,
                opacity: node.status === 'OFFLINE' ? 0.3 : 1,
                cursor: node.status === 'OFFLINE' ? 'not-allowed' : 'pointer'
              }}
              className="tech-mono"
            >
              RUN_DIAGNOSTICS
            </button>
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
  nodeId: { fontSize: '0.75rem', color: 'var(--color-text-secondary)' },
  statusBadge: { fontSize: '0.65rem', padding: '4px 8px', borderRadius: '2px', border: '1px solid', fontWeight: '700' },
  nodeName: { fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '20px' },
  telemetryRow: { display: 'flex', gap: '24px', borderTop: '1px solid var(--color-border-system)', paddingTop: '16px', marginBottom: '20px' },
  metric: { display: 'flex', flexDirection: 'column', gap: '4px' },
  metricLabel: { fontSize: '0.6rem', color: 'var(--color-text-secondary)', letterSpacing: '1px' },
  metricVal: { fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: '700' },
  btn: { backgroundColor: 'transparent', border: '1px solid var(--color-border-system)', color: 'var(--color-text)', padding: '10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }
};
