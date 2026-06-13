import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div className="tech-mono" style={styles.loaderText}>
          [ SECURE_DECRYPTING_TOKEN // LEVEL_{requireAdmin ? 'ADMIN' : 'USER'}... ]
          <span className="blinker">_</span>
        </div>
        <style>{`
          .blinker {
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page and save target path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && role !== 'admin') {
    // Redirect non-admins to home front
    return <Navigate to="/" replace />;
  }

  return children;
}

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: '#a3ff12',
    gap: '16px'
  },
  loaderText: {
    fontSize: '0.9rem',
    letterSpacing: '2px',
  }
};
