import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Demo authentication context.
 *
 * This is a frontend demonstration auth provider that persists
 * user profile information and session state in localStorage.
 * Does NOT store passwords or communicate with fake backends.
 */
const AuthContext = createContext(null);

const DEMO_USER_KEY = 'mediscan_demo_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(DEMO_USER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          return {
            displayName: parsed.displayName || parsed.name || parsed.email.split('@')[0],
            avatarColor: parsed.avatarColor || '#2563EB',
            avatarInitials: parsed.avatarInitials || (parsed.name || parsed.email).substring(0, 2).toUpperCase(),
            createdAt: parsed.createdAt || parsed.loggedInAt || new Date().toISOString(),
            role: parsed.role || 'Health Technology Researcher',
            bio: parsed.bio || 'AI health screening & biological analysis explorer.',
            ...parsed,
          };
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email) => {
    const name = email.split('@')[0];
    const demoUser = {
      email,
      name,
      displayName: name,
      avatarColor: '#2563EB',
      avatarInitials: name.substring(0, 2).toUpperCase(),
      loggedInAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      role: 'Health Technology Researcher',
      bio: 'AI health screening & biological analysis explorer.',
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      if (updates.name && !updates.avatarInitials) {
        next.avatarInitials = updates.name.substring(0, 2).toUpperCase();
      }
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
