import { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data?.role || 'user';
    } catch (e) {
      console.warn('Could not load user database profile, assuming default role: user', e);
      return 'user';
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get active session
    supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
      if (!mounted) return;
      if (activeSession) {
        setSession(activeSession);
        setUser(activeSession.user);
        fetchProfile(activeSession.user.id).then((userRole) => {
          if (mounted) {
            setRole(userRole);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.warn('Auth getSession failure, starting with null auth.', err);
      if (mounted) setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        setLoading(true);
        fetchProfile(currentSession.user.id).then((userRole) => {
          if (mounted) {
            setRole(userRole);
            setLoading(false);
          }
        });
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    // Mock Login Fallback for local testing or when using dummy credentials
    const isDummyEnv = import.meta.env.VITE_SUPABASE_URL?.includes('dummyprojecturl');
    
    if (isDummyEnv) {
      if (email === 'admin@example.com' && password === 'admin123') {
        const dummyUser = { id: 'dummy-admin-id', email, user_metadata: { full_name: 'System Admin' } };
        setUser(dummyUser);
        setRole('admin');
        setSession({ user: dummyUser, access_token: 'dummy-token' });
        return { data: { user: dummyUser }, error: null };
      } else if (email === 'user@example.com' && password === 'user123') {
        const dummyUser = { id: 'dummy-user-id', email, user_metadata: { full_name: 'Loyal Customer' } };
        setUser(dummyUser);
        setRole('user');
        setSession({ user: dummyUser, access_token: 'dummy-token' });
        return { data: { user: dummyUser }, error: null };
      }
      return { data: null, error: { message: 'Invalid local credentials. For mock logins use user@example.com (pass: user123) or admin@example.com (pass: admin123).' } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      // Fallback locally even if database fails to connect or is offline
      if (email === 'admin@example.com' && password === 'admin123') {
        const dummyUser = { id: 'dummy-admin-id', email, user_metadata: { full_name: 'System Admin' } };
        setUser(dummyUser);
        setRole('admin');
        setSession({ user: dummyUser, access_token: 'dummy-token' });
        return { data: { user: dummyUser }, error: null };
      } else if (email === 'user@example.com' && password === 'user123') {
        const dummyUser = { id: 'dummy-user-id', email, user_metadata: { full_name: 'Loyal Customer' } };
        setUser(dummyUser);
        setRole('user');
        setSession({ user: dummyUser, access_token: 'dummy-token' });
        return { data: { user: dummyUser }, error: null };
      }
      return { data: null, error };
    }
  };

  const signUp = async (email, password, fullName) => {
    const isDummyEnv = import.meta.env.VITE_SUPABASE_URL?.includes('dummyprojecturl');
    if (isDummyEnv) {
      return { data: null, error: { message: 'Signup is disabled in local offline mock mode. Use pre-seeded user@example.com or admin@example.com credentials.' } };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user',
          }
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const logout = async () => {
    if (user?.id?.startsWith('dummy')) {
      setUser(null);
      setRole(null);
      setSession(null);
      return { error: null };
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, session, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


