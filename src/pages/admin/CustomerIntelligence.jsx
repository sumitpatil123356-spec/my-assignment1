import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_PROFILES = [
  { id: 'user-01', full_name: 'Loyal Customer', username: 'loyal_user', role: 'user', updated_at: new Date().toISOString() },
  { id: 'admin-01', full_name: 'System Admin', username: 'sys_admin', role: 'admin', updated_at: new Date().toISOString() },
  { id: 'user-02', full_name: 'Jane Doe', username: 'janedoe_net', role: 'user', updated_at: new Date().toISOString() },
];

export default function CustomerIntelligence() {
  const [profiles, setProfiles] = useState(FALLBACK_PROFILES);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setProfiles(data);
      });
  }, []);

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>CLIENTS // CUSTOMER_INTELLIGENCE</h1>
        <p style={styles.subtitle}>Unified registry tracking registered operator profiles and security clearance indices.</p>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>USER_ID</th>
              <th style={styles.th}>FULL NAME</th>
              <th style={styles.th}>USERNAME</th>
              <th style={styles.th}>CLEARANCE LEVEL</th>
              <th style={styles.th}>LAST_ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((prof) => (
              <tr key={prof.id} style={styles.tr}>
                <td style={styles.td} className="tech-mono">{prof.id.substring(0, 10).toUpperCase()}</td>
                <td style={styles.td}>{prof.full_name || 'N/A'}</td>
                <td style={styles.td} className="tech-mono">{prof.username || 'n/a'}</td>
                <td style={{
                  ...styles.td,
                  color: prof.role === 'admin' ? 'var(--color-primary-accent)' : 'var(--color-text)',
                  fontWeight: prof.role === 'admin' ? '700' : 'normal'
                }}>
                  {prof.role.toUpperCase()}
                </td>
                <td style={styles.td} className="tech-mono">{new Date(prof.updated_at).toLocaleString()}</td>
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
  td: { padding: '16px', fontSize: '0.85rem', color: 'var(--color-text)' }
};
