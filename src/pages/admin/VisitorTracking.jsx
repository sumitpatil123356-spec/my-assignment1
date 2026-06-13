import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_LOGS = [
  { id: 'vl-01', session_id: 'visitor-8812', path: '/', user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', created_at: new Date().toISOString() },
  { id: 'vl-02', session_id: 'visitor-8812', path: '/login', user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', created_at: new Date().toISOString() },
  { id: 'vl-03', session_id: 'visitor-7704', path: '/', user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)', created_at: new Date().toISOString() },
];

export default function VisitorTracking() {
  const [logs, setLogs] = useState(FALLBACK_LOGS);

  useEffect(() => {
    supabase
      .from('visitor_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setLogs(data);
      });
  }, []);

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>VISITORS // NETWORK_TRAFFIC</h1>
        <p style={styles.subtitle}>Log details showing active sessions, URL coordinates visited, and browser agent variables.</p>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>LOG_ID</th>
              <th style={styles.th}>SESSION_ID</th>
              <th style={styles.th}>PATH SECTOR</th>
              <th style={styles.th}>USER AGENT INDICATOR</th>
              <th style={styles.th}>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.td} className="tech-mono">{log.id.substring(0, 8).toUpperCase()}</td>
                <td style={{ ...styles.td, color: 'var(--color-primary-accent)' }} className="tech-mono">{log.session_id}</td>
                <td style={styles.td} className="tech-mono">{log.path}</td>
                <td style={{ ...styles.td, fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{log.user_agent}</td>
                <td style={styles.td} className="tech-mono">{new Date(log.created_at).toLocaleString()}</td>
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
  td: { padding: '16px', fontSize: '0.85rem', color: 'var(--color-text)' },
};
