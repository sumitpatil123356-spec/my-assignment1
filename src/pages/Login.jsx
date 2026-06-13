import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const { error } = await login(email, password);
    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Authentication failed.');
    } else {
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h2 className="tech-mono" style={styles.title}>ACCESS_PORTAL //</h2>
          <p style={styles.subtitle}>Calibrate terminal frequency to access private node arrays.</p>
        </div>

        {errorMsg && (
          <div style={styles.errorContainer} className="tech-mono">
            [ ERROR: {errorMsg.toUpperCase()} ]
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label className="tech-mono" style={styles.label}>OPERATOR_EMAIL :</label>
            <input
              type="email"
              required
              placeholder="operator@frequency.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label className="tech-mono" style={styles.label}>PASSCODE_TOKEN :</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={isSubmitting} style={styles.btn} className="tech-mono">
            {isSubmitting ? 'ESTABLISHING_UPLINK...' : 'ESTABLISH_UPLINK'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            NEW COGNITIVE UNIT? <Link to="/signup" style={styles.link}>REGISTER_PROFILE</Link>
          </p>
          <div style={styles.helpBox} className="tech-mono">
            // LOCAL_SANDBOX_DEFAULTS:<br/>
            USER: user@example.com (pass: user123)<br/>
            ADMIN: admin@example.com (pass: admin123)
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 0',
  },
  panel: {
    width: '100%',
    maxWidth: '450px',
    background: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    borderRadius: '4px',
    padding: '40px',
    boxShadow: '0 0 40px rgba(163,255,18,0.02)',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '1.2rem',
    color: 'var(--color-primary-accent)',
    letterSpacing: '2px',
    textShadow: '0 0 8px var(--color-accent-glow)',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 77, 77, 0.08)',
    border: '1px solid #ff4d4d',
    color: '#ff4d4d',
    padding: '12px',
    fontSize: '0.75rem',
    borderRadius: '4px',
    marginBottom: '24px',
    letterSpacing: '1px',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.75rem',
    color: 'var(--color-text)',
  },
  input: {
    backgroundColor: '#000000',
    border: '1px solid var(--color-border-system)',
    borderRadius: '4px',
    padding: '14px 16px',
    color: 'var(--color-text)',
    outline: 'none',
    fontFamily: 'var(--font-technical)',
    fontSize: '0.85rem',
    transition: 'border-color 0.2s',
  },
  btn: {
    backgroundColor: 'var(--color-primary-accent)',
    color: '#000000',
    border: 'none',
    padding: '16px',
    borderRadius: '4px',
    fontFamily: 'var(--font-technical)',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    letterSpacing: '2px',
    marginTop: '12px',
    transition: 'all 0.25s ease',
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
  },
  link: {
    color: 'var(--color-primary-accent)',
    textDecoration: 'none',
    fontWeight: '700',
  },
  helpBox: {
    marginTop: '24px',
    padding: '16px',
    border: '1px dashed var(--color-border-system)',
    fontSize: '0.7rem',
    textAlign: 'left',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.6',
    backgroundColor: 'rgba(22, 27, 38, 0.2)',
  }
};
