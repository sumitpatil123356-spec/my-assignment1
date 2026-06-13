import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_TICKETS = [
  { id: 't-001', subject: 'Volt green stick drift', message: 'Calibration offset by 3 degrees on vertical coordinate.', status: 'open', created_at: new Date().toISOString() },
  { id: 't-002', subject: 'Zero-Lag mouse connection loss', message: 'Fails to sync when device is active on wireless hub.', status: 'open', created_at: new Date().toISOString() },
  { id: 't-003', subject: 'Soundscape headphone headband crackle', message: 'Haptic engines feedback causing hum.', status: 'resolved', created_at: new Date().toISOString() },
];

export default function SupportCenter() {
  const [tickets, setTickets] = useState(FALLBACK_TICKETS);

  useEffect(() => {
    supabase
      .from('support_tickets')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setTickets(data);
      });
  }, []);

  const resolveTicket = async (id) => {
    const { error } = await supabase
      .from('support_tickets')
      .update({ status: 'resolved' })
      .eq('id', id);

    if (error) {
      // Optimistic local update on DB failure
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
    } else {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>SUPPORT // OPERATIONS_DESK</h1>
        <p style={styles.subtitle}>Direct resolver screen mapping active ticket arrays submitted by operator client units.</p>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>TICKET_ID</th>
              <th style={styles.th}>SUBJECT</th>
              <th style={styles.th}>MESSAGE DETAILS</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>OPERATION</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td} className="tech-mono">{t.id.substring(0, 8).toUpperCase()}</td>
                <td style={{ ...styles.td, fontWeight: '700' }} className="tech-mono">{t.subject}</td>
                <td style={styles.td}>{t.message}</td>
                <td style={styles.td}>
                  <span className="tech-mono" style={{
                    ...styles.badge,
                    color: t.status === 'resolved' ? 'var(--color-primary-accent)' : '#ff4d4d',
                    backgroundColor: t.status === 'resolved' ? 'var(--color-accent-soft)' : 'rgba(255, 77, 77, 0.08)',
                    borderColor: t.status === 'resolved' ? 'var(--color-primary-accent)' : '#ff4d4d',
                  }}>{t.status.toUpperCase()}</span>
                </td>
                <td style={styles.td}>
                  {t.status === 'open' && (
                    <button onClick={() => resolveTicket(t.id)} style={styles.btn} className="tech-mono">
                      MARK_RESOLVED
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
  badge: { fontSize: '0.65rem', padding: '4px 8px', borderRadius: '2px', border: '1px solid', fontWeight: '700' },
  btn: { backgroundColor: 'var(--color-primary-accent)', border: 'none', color: '#000', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
};
