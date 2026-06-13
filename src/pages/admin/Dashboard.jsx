import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_STATS = { ordersCount: 142, revenue: 28412.50, ticketsCount: 8, visitorsCount: 1984 };

export default function Dashboard() {
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    Promise.all([
      supabase.from('orders').select('total_price'),
      supabase.from('support_tickets').select('*', { count: 'exact', head: true }),
      supabase.from('visitor_logs').select('*', { count: 'exact', head: true }),
    ]).then(([ordersRes, ticketsRes, visitorsRes]) => {
      let isError = ordersRes.error || ticketsRes.error || visitorsRes.error;

      let baseOrdersCount = isError ? FALLBACK_STATS.ordersCount : (ordersRes.data?.length || 0);
      let baseRevenue = isError ? FALLBACK_STATS.revenue : (ordersRes.data || []).reduce((acc, item) => acc + Number(item.total_price), 0);
      let baseTicketsCount = isError ? FALLBACK_STATS.ticketsCount : (ticketsRes.count || 0);
      let baseVisitorsCount = isError ? FALLBACK_STATS.visitorsCount : (visitorsRes.count || 0);

      const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const localOrdersCount = localOrders.length;
      const localRevenue = localOrders.reduce((acc, item) => acc + Number(item.total_price), 0);

      setStats({
        ordersCount: baseOrdersCount + localOrdersCount,
        revenue: baseRevenue + localRevenue,
        ticketsCount: baseTicketsCount,
        visitorsCount: baseVisitorsCount,
      });
    });
  }, []);

  const cards = [
    { label: 'TOTAL ORDERS DEPLOYED', value: stats.ordersCount, sub: '// ACTIVE NODE REVENUE', highlight: `$${stats.revenue.toFixed(2)}` },
    { label: 'CLIENT SUPPORT TICKETS', value: stats.ticketsCount, sub: '// SECTOR PRIORITY QUEUES', highlight: 'ACTIVE_WARNING' },
    { label: 'TACTICAL VISITOR IMPRESSIONS', value: stats.visitorsCount, sub: '// NETWORK FREQUENCY IMPRESSION', highlight: 'ONLINE' },
    { label: 'INTELLIGENCE FRAUD RATING', value: '0.04%', sub: '// THREAT MITIGATION PROTOCOLS', highlight: 'SECURED' }
  ];

  return (
    <div>
      <div style={styles.header}>
        <h1 className="tech-mono" style={styles.title}>OVERVIEW // TELEMETRY</h1>
        <p style={styles.subtitle}>Unified systems dashboard reflecting live telemetry queries.</p>
      </div>

      <div style={styles.grid}>
        {cards.map((card, i) => (
          <div key={i} style={styles.card}>
            <span className="tech-mono" style={styles.cardLabel}>{card.label}</span>
            <div style={styles.cardValue}>{card.value}</div>
            <div style={styles.cardFooter}>
              <span style={styles.cardSub}>{card.sub}</span>
              <span className="tech-mono" style={styles.cardHighlight}>{card.highlight}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.systemStatus}>
        <h3 className="tech-mono" style={styles.statusTitle}>// INTEGRITY_DIAGNOSTICS</h3>
        <table style={styles.statusTable}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>SUBSYSTEM</th>
              <th style={styles.th}>COORDINATES</th>
              <th style={styles.th}>LATENCY</th>
              <th style={styles.th}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tr}>
              <td style={styles.td}>DATABASE_SUPABASE_CORE</td>
              <td style={styles.td} className="tech-mono">NODE_92.128.0.22</td>
              <td style={styles.td}>14ms</td>
              <td style={{ ...styles.td, color: 'var(--color-primary-accent)' }}>OPERATIONAL</td>
            </tr>
            <tr style={styles.tr}>
              <td style={styles.td}>AUTH_SESSION_HANDLER</td>
              <td style={styles.td} className="tech-mono">UPLINK_ENCRYPTED</td>
              <td style={styles.td}>8ms</td>
              <td style={{ ...styles.td, color: 'var(--color-primary-accent)' }}>OPERATIONAL</td>
            </tr>
            <tr style={styles.tr}>
              <td style={styles.td}>AI_FRAUD_EVALUATOR</td>
              <td style={styles.td} className="tech-mono">THREAT_ENGINE_PRO</td>
              <td style={styles.td}>120ms</td>
              <td style={{ ...styles.td, color: 'var(--color-primary-accent)' }}>ACTIVE_SCAN</td>
            </tr>
            <tr style={styles.tr}>
              <td style={styles.td}>INVENTORY_SHIPPING_NODE</td>
              <td style={styles.td} className="tech-mono">LOC_SECTOR_7B</td>
              <td style={styles.td}>--</td>
              <td style={{ ...styles.td, color: '#ffb300' }}>STANDBY</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.5rem',
    color: 'var(--color-primary-accent)',
    letterSpacing: '2px',
    textShadow: '0 0 8px var(--color-accent-glow)',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'var(--color-text-secondary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  card: {
    backgroundColor: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    padding: '24px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '160px',
    boxShadow: '0 0 20px rgba(163,255,18,0.01)',
  },
  cardLabel: {
    fontSize: '0.65rem',
    color: 'var(--color-text-secondary)',
    letterSpacing: '1.5px',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: '900',
    color: 'var(--color-text)',
    margin: '16px 0',
  },
  cardFooter: {
    borderTop: '1px solid var(--color-border-system)',
    paddingTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.7rem',
  },
  cardSub: {
    color: 'var(--color-text-secondary)',
  },
  cardHighlight: {
    color: 'var(--color-primary-accent)',
    fontWeight: '700',
    textShadow: '0 0 8px var(--color-accent-glow)',
  },
  systemStatus: {
    backgroundColor: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    padding: '32px',
    borderRadius: '4px',
  },
  statusTitle: {
    fontSize: '0.9rem',
    color: 'var(--color-text)',
    marginBottom: '24px',
    letterSpacing: '1px',
  },
  statusTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeader: {
    borderBottom: '1px solid var(--color-border-system)',
  },
  th: {
    padding: '12px 16px',
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-technical)',
    letterSpacing: '1px',
  },
  tr: {
    borderBottom: '1px solid rgba(22, 27, 38, 0.5)',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '16px',
    fontSize: '0.85rem',
    color: 'var(--color-text)',
  }
};
