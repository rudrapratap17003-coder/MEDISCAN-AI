import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  ChevronRight,
  User,
  Sun,
  Moon,
  Laptop,
  Bell,
  Shield,
  Database,
  Download,
  Trash2,
  LogOut,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
  FileText,
  Sliders,
  Globe,
  Clock,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { useActivity } from '../context/ActivityContext';
import { Button, Badge, Card, Modal } from '../components/common';

export const SettingsPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const { preferences, updatePreferences, resetPreferences, exportAllUserData, clearAllLocalData } = usePreferences();
  const { stats, clearHistory, refreshActivities } = useActivity();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'appearance' | 'notifications' | 'privacy' | 'account'

  // General tab form state
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || '');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Modals
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmAction: null,
    isDanger: true,
  });

  const showToast = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Approximate local storage footprint in KB
  const storageFootprintKB = useMemo(() => {
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('mediscan_')) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2; // UTF-16 approximate
        }
      }
    } catch {}
    return (totalBytes / 1024).toFixed(1);
  }, [stats]);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    updateProfile({ displayName });
    showToast('General preferences updated successfully!');
  };

  const handleThemeChange = (newTheme) => {
    updatePreferences({ theme: newTheme });
    showToast(`Appearance updated to ${newTheme} mode.`);
  };

  const handleLanguageChange = (lang) => {
    updatePreferences({ language: lang });
    showToast(`Language set to ${lang.toUpperCase()}.`);
  };

  const handleDateFormatChange = (format) => {
    updatePreferences({ dateFormat: format });
    showToast(`Date format updated to ${format}.`);
  };

  const handleTimeFormatChange = (format) => {
    updatePreferences({ timeFormat: format });
    showToast(`Time format updated to ${format}.`);
  };

  const handleToggleNotification = (key) => {
    const updated = {
      ...preferences.notifications,
      [key]: !preferences.notifications[key],
    };
    updatePreferences({ notifications: updated });
    showToast('Notification preference saved.');
  };

  const handleClearHistory = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear Analysis History?',
      message: 'This will delete all screening activity logs from your current browser storage. Saved reports will be retained.',
      confirmAction: () => {
        clearHistory();
        setConfirmModal({ isOpen: false });
        showToast('Analysis history cleared.');
      },
      isDanger: true,
    });
  };

  const handleClearSavedReports = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear All Saved Reports?',
      message: 'This will remove the saved bookmark status from all reports in your local session.',
      confirmAction: () => {
        try {
          const raw = localStorage.getItem('mediscan_activity_records_v1');
          if (raw) {
            const records = JSON.parse(raw);
            const cleared = records.map((r) => ({ ...r, isSaved: false }));
            localStorage.setItem('mediscan_activity_records_v1', JSON.stringify(cleared));
            refreshActivities();
          }
        } catch {}
        setConfirmModal({ isOpen: false });
        showToast('All saved reports cleared.');
      },
      isDanger: true,
    });
  };

  const handleClearConversations = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear Assistant Conversations?',
      message: 'This will permanently remove all previous AI Biology Assistant chat sessions stored in this browser.',
      confirmAction: () => {
        try {
          localStorage.removeItem('mediscan_conversations_v1');
          refreshActivities();
        } catch {}
        setConfirmModal({ isOpen: false });
        showToast('Conversation history cleared.');
      },
      isDanger: true,
    });
  };

  const handleExportData = () => {
    const success = exportAllUserData();
    if (success) {
      showToast('User data bundle downloaded as JSON.');
    }
  };

  const handleDeleteAllLocalData = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete All Local Application Data?',
      message: 'This action will completely erase all stored preferences, analysis records, saved reports, and chat conversations from this device.',
      confirmAction: () => {
        clearAllLocalData();
        clearHistory();
        setConfirmModal({ isOpen: false });
        showToast('All local application data has been deleted.');
      },
      isDanger: true,
    });
  };

  const handleSignOut = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Sign Out of MEDISCAN AI?',
      message: 'Are you sure you want to end your active session? Unsaved form progress will be cleared.',
      confirmAction: () => {
        logout();
        navigate('/');
      },
      isDanger: false,
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header & Breadcrumbs */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Account Settings</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Platform Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Customize your interface preferences, appearance theme, notification controls, and local data privacy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="outline" size="sm" className="text-xs">
                <User className="w-3.5 h-3.5 mr-1" />
                <span>View Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2 shadow-2xs"
        >
          <Check className="w-4 h-4 text-green-600" />
          <span>{saveSuccessMsg}</span>
        </motion.div>
      )}

      {/* Settings Grid Layout: Tabs Sidebar + Content Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Tabs (3 cols) */}
        <div className="md:col-span-3 space-y-1">
          <Card className="p-2 border-slate-200/90 shadow-2xs space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </Card>
        </div>

        {/* Content Section (9 cols) */}
        <div className="md:col-span-9 space-y-6">
          {/* SECTION A: GENERAL PREFERENCES */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 border-slate-200/90 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    General Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure your display name, language, and regional time formats.
                  </p>
                </div>

                <form onSubmit={handleSaveGeneral} className="space-y-5 pt-2 border-t border-slate-100">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Preferred Greeting Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe or Jane"
                      className="w-full max-w-md px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Appears on your dashboard welcome header and activity summaries.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Interface Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="en">English (US)</option>
                        <option value="es">Español (Spanish)</option>
                        <option value="fr">Français (French)</option>
                        <option value="de">Deutsch (German)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Date Display Format
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => handleDateFormatChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/12/2026)</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 12/11/2026)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (ISO standard)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Time Format
                      </label>
                      <select
                        value={preferences.timeFormat}
                        onChange={(e) => handleTimeFormatChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="12h">12-Hour Clock (e.g. 2:30 PM)</option>
                        <option value="24h">24-Hour Clock (e.g. 14:30)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="sm" className="text-xs">
                      <Check className="w-3.5 h-3.5 mr-1" />
                      <span>Save General Preferences</span>
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* SECTION B: APPEARANCE */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 border-slate-200/90 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Appearance & Theme
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose how MEDISCAN AI looks and adapts to your device.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                  {/* Light Mode Card */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('light')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferences.theme === 'light'
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                      <Sun className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>Light Mode</span>
                      {preferences.theme === 'light' && <Check className="w-4 h-4 text-blue-600" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Clean medical white surfaces with soft contrasts.
                    </p>
                  </button>

                  {/* Dark Mode Card */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('dark')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferences.theme === 'dark'
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <Moon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold flex items-center justify-between">
                      <span>Dark Mode</span>
                      {preferences.theme === 'dark' && <Check className="w-4 h-4 text-blue-400" />}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Reduced eye-strain for low-light screening work.
                    </p>
                  </button>

                  {/* System Default */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('system')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferences.theme === 'system'
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>System Sync</span>
                      {preferences.theme === 'system' && <Check className="w-4 h-4 text-blue-600" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Automatically syncs with your operating system theme.
                    </p>
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* SECTION C: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 border-slate-200/90 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Control in-app alerts and notifications during screening tasks.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100">
                  {/* In-App Notifications */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        In-App Status Notifications
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Show badge indicators and feedback toasts on saved actions.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.inApp}
                        onChange={() => handleToggleNotification('inApp')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Analysis Completion */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Image & Symptom Validation Alerts
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Prompt alerts when file checks and intake categories are validated.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.analysisCompletion}
                        onChange={() => handleToggleNotification('analysisCompletion')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Educational Tips */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Educational Study Highlights
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Periodic prompts showcasing anatomical pathways and clinical case studies.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.educationalTips}
                        onChange={() => handleToggleNotification('educationalTips')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* SECTION D: PRIVACY & DATA */}
          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card className="p-6 border-slate-200/90 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Local Data & Privacy Controls
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Inspect, export, or permanently erase data stored in your local browser sandbox.
                  </p>
                </div>

                {/* Local Storage Metrics Overview */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Stored Activities
                    </span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                      {stats.total} Records
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Saved Reports
                    </span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                      {stats.savedReports} Reports
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Conversations
                    </span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                      {stats.conversations} Sessions
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Storage Footprint
                    </span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                      ~{storageFootprintKB} KB
                    </span>
                  </div>
                </div>

                {/* Important Medical Storage Disclaimer */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                      Local Client-Side Storage Notice
                    </span>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      All research activities, bookmarks, and chat histories are persisted strictly inside your personal browser’s LocalStorage sandbox. <strong>LocalStorage is not an encrypted electronic health record (EHR) repository</strong>. Do not store confidential patient identifiers.
                    </p>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Data Management Actions
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Export All Data */}
                    <div className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                          Export All Data (JSON)
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Download a complete backup of your profile, activities, and conversations.
                        </p>
                      </div>
                      <div className="pt-3">
                        <Button variant="outline" size="sm" onClick={handleExportData} className="w-full text-xs">
                          Download JSON Backup
                        </Button>
                      </div>
                    </div>

                    {/* Clear History Only */}
                    <div className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                          Clear Analysis History
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Remove unpinned screening events while retaining saved reports.
                        </p>
                      </div>
                      <div className="pt-3">
                        <Button variant="outline" size="sm" onClick={handleClearHistory} className="w-full text-xs">
                          Clear History Records
                        </Button>
                      </div>
                    </div>

                    {/* Clear Saved Reports */}
                    <div className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
                          Clear Saved Reports
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Remove saved bookmark flags from all recorded activities.
                        </p>
                      </div>
                      <div className="pt-3">
                        <Button variant="outline" size="sm" onClick={handleClearSavedReports} className="w-full text-xs">
                          Clear Saved Reports
                        </Button>
                      </div>
                    </div>

                    {/* Clear Assistant Conversations */}
                    <div className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5 text-amber-600" />
                          Clear Assistant Chats
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Delete all conversational AI biology inquiry threads.
                        </p>
                      </div>
                      <div className="pt-3">
                        <Button variant="outline" size="sm" onClick={handleClearConversations} className="w-full text-xs">
                          Clear Conversations
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone: Delete Everything */}
                  <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-bold text-red-900">
                        Erase All Local Application Data
                      </h5>
                      <p className="text-[11px] text-red-700">
                        Permanently wipes all activities, chats, preferences, and session data.
                      </p>
                    </div>
                    <Button variant="danger" size="sm" onClick={handleDeleteAllLocalData} className="text-xs shrink-0">
                      Erase Everything
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* SECTION E: ACCOUNT MANAGEMENT */}
          {activeTab === 'account' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 border-slate-200/90 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Account & Session Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review your active authentication session and security boundaries.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-semibold text-slate-500">Account Email:</span>
                    <span className="font-bold text-slate-800">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-semibold text-slate-500">Session Type:</span>
                    <Badge variant="primary" size="sm">Local Demonstration Session</Badge>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-semibold text-slate-500">Session Activated:</span>
                    <span className="text-slate-700 font-medium">{new Date(user?.loggedInAt || user?.createdAt || Date.now()).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Security Architecture:</span>
                    <span className="text-slate-600 font-medium">Frontend Demo Auth • 0 Passwords Stored</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Sign Out</h4>
                    <p className="text-[11px] text-slate-500">Safely terminate this browser session.</p>
                  </div>
                  <Button variant="danger" size="sm" onClick={handleSignOut} className="text-xs">
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <Modal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          title={confirmModal.title}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {confirmModal.message}
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
              >
                Cancel
              </Button>
              <Button
                variant={confirmModal.isDanger ? 'danger' : 'primary'}
                size="sm"
                onClick={confirmModal.confirmAction}
              >
                Confirm Action
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsPage;
