import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, Bell, Search, ChevronRight, User, LogOut, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const routeLabels = {
  '/dashboard': 'Overview',
  '/image-analysis': 'Image Analysis',
  '/image-analysis/skin': 'Skin Image Analysis',
  '/image-analysis/lung': 'Lung Image Analysis',
  '/image-analysis/blood': 'Blood Smear Analysis',
  '/symptom-analysis': 'Symptom Analysis',
  '/biological-explorer': 'Biological Explorer',
  '/ai-assistant': 'AI Assistant',
  '/history': 'Analysis History',
  '/analysis-history': 'Analysis History',
  '/saved-reports': 'Saved Reports',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/design-system': 'Design System',
};

const searchableModules = [
  { label: 'Medical Image Analysis Hub', path: '/image-analysis', category: 'Screening Hub' },
  { label: 'Skin Image Analysis', path: '/image-analysis/skin', category: 'Dermatology' },
  { label: 'Lung Image Analysis', path: '/image-analysis/lung', category: 'Chest X-Ray' },
  { label: 'Blood Smear Analysis', path: '/image-analysis/blood', category: 'Parasitology' },
  { label: 'Symptom Assessment', path: '/symptom-analysis', category: 'Intake' },
  { label: 'Biological Explorer', path: '/biological-explorer', category: '3D Anatomy' },
  { label: 'AI Biology Assistant', path: '/ai-assistant', category: 'AI Education' },
  { label: 'Analysis History', path: '/history', category: 'Records' },
  { label: 'Saved Reports', path: '/saved-reports', category: 'Records' },
  { label: 'Researcher Profile', path: '/profile', category: 'Preferences' },
  { label: 'Settings', path: '/settings', category: 'Preferences' },
  { label: 'Design System', path: '/design-system', category: 'Components' },
];

const TopBar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handle = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const currentLabel = routeLabels[location.pathname] || 'Dashboard';
  const initials = user?.avatarInitials || (user?.displayName || user?.name || 'U').substring(0, 2).toUpperCase();

  const filteredModules = searchQuery.trim()
    ? searchableModules.filter((m) =>
        m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/');
  };

  const handleSelectSearchItem = (path) => {
    setSearchQuery('');
    setSearchFocused(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6 bg-surface/80 backdrop-blur-md border-b border-border">
      {/* Left: menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-text-secondary hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm">
          <Link to="/dashboard" className="text-text-secondary hover:text-primary transition-colors">
            MediScan
          </Link>
          <ChevronRight size={14} className="text-text-secondary/40" />
          <span className="font-medium text-text-primary">{currentLabel}</span>
        </nav>

        {/* Search — desktop */}
        <div ref={searchRef} className="relative hidden md:block ml-4">
          <div className="flex items-center gap-2 bg-background rounded-xl px-3 py-2 border border-border w-64 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <Search size={16} className="text-text-secondary flex-shrink-0" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              className="bg-transparent text-sm text-text-primary placeholder:text-text-secondary/60 outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchFocused && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-12 w-80 bg-surface rounded-2xl shadow-xl border border-border overflow-hidden z-50 p-2"
              >
                {filteredModules.length > 0 ? (
                  <div className="space-y-1">
                    {filteredModules.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => handleSelectSearchItem(m.path)}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-primary-50 transition-colors flex items-center justify-between group"
                      >
                        <span className="font-medium text-text-primary group-hover:text-primary">
                          {m.label}
                        </span>
                        <span className="text-[10px] text-text-secondary bg-gray-100 group-hover:bg-primary-100 group-hover:text-primary px-2 py-0.5 rounded-md">
                          {m.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-text-secondary">
                    No matching modules found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-1.5">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="p-2 rounded-xl text-text-secondary hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-surface rounded-2xl shadow-xl border border-border overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <h4 className="text-sm font-semibold text-text-primary">Notifications</h4>
                </div>
                <div className="px-4 py-8 text-center">
                  <Bell size={24} className="text-text-secondary/30 mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">No notifications yet</p>
                  <p className="text-xs text-text-secondary/60 mt-1">Activity updates will appear here</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-2xs"
              style={{ backgroundColor: user?.avatarColor || '#2563EB' }}
            >
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text-primary leading-none">{user?.displayName || user?.name || 'User'}</p>
              <p className="text-[11px] text-text-secondary mt-0.5">{user?.email || ''}</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-56 bg-surface rounded-2xl shadow-xl border border-border overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-text-primary">{user?.name || 'User'}</p>
                  <p className="text-xs text-text-secondary truncate">{user?.email || ''}</p>
                </div>
                <div className="p-1.5">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-colors"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-colors"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:bg-red-50 hover:text-danger transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
