import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ onCartClick, itemsCount, onSearchToggle }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar-sticky">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        Nexus Gear
      </div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => `navbar-link-item ${isActive ? 'active' : ''}`}>
          Store
        </NavLink>
        {role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => `navbar-link-item ${isActive ? 'active' : ''}`}>
            Admin
          </NavLink>
        )}
      </div>

      <div className="navbar-actions">
        {user ? (
          <div style={styles.userContainer}>
            <span style={styles.username}>
              {user.email.split('@')[0]}
            </span>
            <button className="navbar-action-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-action-btn" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        )}

        <button className="navbar-action-btn" onClick={onSearchToggle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Search
        </button>

        <button className="navbar-action-btn cart-trigger-container" onClick={onCartClick}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Cart
          {itemsCount > 0 && (
            <span key={itemsCount} className="cart-badge cart-badge-pulse">
              {itemsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  username: {
    fontSize: '0.75rem',
    color: 'var(--color-primary-accent)',
    textShadow: '0 0 8px var(--color-accent-glow)',
  }
};