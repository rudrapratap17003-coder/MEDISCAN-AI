import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PREFERENCES_STORAGE_KEY = 'mediscan_preferences_v1';

const DEFAULT_PREFERENCES = {
  theme: 'light', // 'light' | 'dark' | 'system'
  language: 'en', // 'en' | 'es' | 'fr' | 'de'
  dateFormat: 'MM/DD/YYYY', // 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
  timeFormat: '12h', // '12h' | '24h'
  notifications: {
    inApp: true,
    analysisCompletion: true,
    educationalTips: false,
  },
};

const PreferencesContext = createContext(null);

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load preferences from storage:', e);
    }
    return DEFAULT_PREFERENCES;
  });

  // Apply theme to document element
  useEffect(() => {
    const applyTheme = (themeValue) => {
      const root = document.documentElement;
      if (themeValue === 'dark') {
        root.classList.add('dark');
      } else if (themeValue === 'light') {
        root.classList.remove('dark');
      } else if (themeValue === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme(preferences.theme);

    // If system theme, listen to OS theme changes
    if (preferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [preferences.theme]);

  // Persist preferences
  const updatePreferences = useCallback((updates) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save preferences:', err);
      }
      return next;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
    } catch {}
  }, []);

  // Export all application data as a JSON file
  const exportAllUserData = useCallback(() => {
    try {
      const authUser = localStorage.getItem('mediscan_demo_user');
      const activities = localStorage.getItem('mediscan_activity_records_v1');
      const conversations = localStorage.getItem('mediscan_conversations_v1');
      const prefs = localStorage.getItem(PREFERENCES_STORAGE_KEY);

      const exportBundle = {
        exportedAt: new Date().toISOString(),
        application: 'MEDISCAN AI',
        version: '1.0.0',
        user: authUser ? JSON.parse(authUser) : null,
        preferences: prefs ? JSON.parse(prefs) : DEFAULT_PREFERENCES,
        activities: activities ? JSON.parse(activities) : [],
        conversations: conversations ? JSON.parse(conversations) : [],
        disclaimer:
          'This export file contains educational activity records and user preferences formulated in MEDISCAN AI. It does not constitute a legal or certified electronic medical record.',
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute(
        'download',
        `mediscan_user_data_${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      return true;
    } catch (e) {
      console.error('Data export error:', e);
      return false;
    }
  }, []);

  // Clear all local application data
  const clearAllLocalData = useCallback(() => {
    try {
      const keys = [
        'mediscan_activity_records_v1',
        'mediscan_conversations_v1',
        PREFERENCES_STORAGE_KEY,
      ];
      keys.forEach((k) => localStorage.removeItem(k));
      setPreferences(DEFAULT_PREFERENCES);
      return true;
    } catch (e) {
      console.error('Error clearing data:', e);
      return false;
    }
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
        exportAllUserData,
        clearAllLocalData,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export default PreferencesContext;
