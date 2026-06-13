import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email, password, fullName);
    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Signup failed.');
    } else {
      setSuccessMsg('Profile registered. Check your email for verification link (or use local logins if mock).');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h2 className="tech-mono" style={styles.title}>REGISTER_UNIT //</h2>
          <p style={styles.subtitle}>Create profile settings and synchronize with auth database.</p>
        </div>

        {errorMsg && (
          <div style={styles.errorContainer} className="tech-mono">
            [ ERROR: {errorMsg.toUpperCase()} ]
          </div>
        )}

        {successMsg && (
          <div style={styles.successContainer} className="tech-mono">
            [ SUCCESS: {successMsg.toUpperCase()} ]
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label className="tech-mono" style={styles.label}>OPERATOR_NAME :</label>
            <input
              type="text"
              required
              placeholder="e.g. sumit"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
            />
          </div>

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

          <div style={styles.inputGroup}>
            <label className="tech-mono" style={styles.label}>CONFIRM_PASSCODE :</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={isSubmitting} style={styles.btn} className="tech-mono">
            {isSubmitting ? 'CREATING_PROFILE...' : 'CREATE_PROFILE'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            ALREADY REGISTERED? <Link to="/login" style={styles.link}>ACCESS_PORTAL</Link>
          </p>
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
  successContainer: {
    backgroundColor: 'rgba(163, 255, 18, 0.08)',
    border: '1px solid var(--color-primary-accent)',
    color: 'var(--color-primary-accent)',
    padding: '12px',
    fontSize: '0.75rem',
    borderRadius: '4px',
    marginBottom: '24px',
    letterSpacing: '1px',
    lineHeight: '1.4',
    textShadow: '0 0 4px var(--color-accent-glow)',
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
  }
};
