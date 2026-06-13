import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Overview' },
    { path: '/admin/transactions', label: 'Transactions' },
    { path: '/admin/protocols', label: 'Device Status' },
    { path: '/admin/inventory', label: 'Inventory' },
    { path: '/admin/customers', label: 'Customers' },
    { path: '/admin/trends', label: 'Trend Analysis' },
    { path: '/admin/fraud', label: 'Fraud Detection' },
    { path: '/admin/support', label: 'Support' },
    { path: '/admin/visitors', label: 'Visitors' },
    { path: '/admin/drops', label: 'Drop Scheduler' },
  ];

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.adminTitle}>
            Admin Center
          </div>
          <div style={styles.userBadge}>
            {user?.email}
          </div>
        </div>

        <nav style={styles.navMenu}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className="admin-nav-item"
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? 'var(--color-primary-accent)' : 'var(--color-text-secondary)',
                borderColor: isActive ? 'var(--color-primary-accent)' : 'transparent',
                backgroundColor: isActive ? 'var(--color-accent-soft)' : 'transparent',
              })}
            >
              <span className="tech-mono">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <Link to="/" style={styles.backBtn}>
            ← Back to Store
          </Link>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main style={styles.mainContent}>
        <Outlet />
      </main>

      <style>{`
        .admin-nav-item {
          display: block;
          padding: 14px 20px;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .admin-nav-item:hover {
          color: var(--color-primary-accent) !important;
          background-color: var(--color-accent-soft);
          border-left-color: var(--color-primary-accent);
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}

const styles = {
  adminContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#020304',
    color: 'var(--color-text)',
  },
  sidebar: {
    width: '280px',
    backgroundColor: 'var(--color-surface-panel)',
    borderRight: '1px solid var(--color-border-system)',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    padding: '24px 0',
  },
  sidebarHeader: {
    padding: '0 24px 24px 24px',
    borderBottom: '1px solid var(--color-border-system)',
  },
  adminTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--color-text)',
    letterSpacing: '1px',
  },
  userBadge: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
    marginTop: '6px',
    wordBreak: 'break-all',
  },
  navMenu: {
    flexGrow: 1,
    padding: '24px 12px 12px 12px',
    overflowY: 'auto',
  },
  navLink: {
    borderRadius: '4px',
  },
  sidebarFooter: {
    padding: '24px',
    borderTop: '1px solid var(--color-border-system)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  backBtn: {
    fontSize: '0.75rem',
    color: 'var(--color-text)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ff4d4d',
    color: '#ff4d4d',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    transition: 'all 0.2s',
  },
  mainContent: {
    flexGrow: 1,
    padding: '40px',
    overflowY: 'auto',
    backgroundColor: 'var(--color-bg-canvas)',
  },
};
