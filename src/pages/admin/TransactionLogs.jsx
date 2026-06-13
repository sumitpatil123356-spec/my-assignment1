import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_LOGS = [
  { id: 'tx-82190', action: 'ORDER_CREATION', details: { order_id: 'order-0112', total: 329.00 }, created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 'tx-82189', action: 'SECURE_LOGIN', details: { ip_address: '102.15.82.112' }, created_at: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 'tx-82188', action: 'PRODUCT_PRICE_UPDATE', details: { sku: 'ctrl-volt', old: 179.00, new: 169.00 }, created_at: new Date(Date.now() - 3600000 * 8).toISOString() },
  { id: 'tx-82187', action: 'ORDER_CREATION', details: { order_id: 'order-0110', total: 115.00 }, created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
  { id: 'tx-82186', action: 'RLS_SECURITY_AUDIT', details: { status: 'INTEGRITY_VERIFIED' }, created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
];

export default function TransactionLogs() {
  const [logs, setLogs] = useState(FALLBACK_LOGS);

  useEffect(() => {
    supabase
      .from('transactions_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        let liveLogs = (!error && data && data.length > 0) ? data : FALLBACK_LOGS;
        
        // Merge with local storage
        const localLogs = JSON.parse(localStorage.getItem('localTransactions') || '[]');
        if (localLogs.length > 0) {
          // Remove fallback if we have real/local data
          if (liveLogs === FALLBACK_LOGS) liveLogs = [];
          liveLogs = [...localLogs.reverse(), ...liveLogs];
        }

        setLogs(liveLogs);
      });
  }, []);

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>TRANSACTIONS // AUDIT_LOGS</h1>
        <p style={styles.subtitle}>Secure logs tracking client transactions, pricing updates, and operator logins.</p>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>LOG_ID</th>
              <th style={styles.th}>ACTION</th>
              <th style={styles.th}>DETAILS</th>
              <th style={styles.th}>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.td} className="tech-mono">{log.id.substring(0, 10).toUpperCase()}</td>
                <td style={{ ...styles.td, color: log.action === 'ERROR' ? '#ff4d4d' : 'var(--color-primary-accent)', fontWeight: '700' }}>
                  {log.action}
                </td>
                <td style={styles.td}>
                  <pre style={styles.pre}>{JSON.stringify(log.details)}</pre>
                </td>
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
  td: { padding: '16px', fontSize: '0.85rem', color: 'var(--color-text)', verticalAlign: 'middle' },
  pre: { margin: 0, fontFamily: 'var(--font-technical)', fontSize: '0.75rem', color: '#a0a7b5', whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
};
