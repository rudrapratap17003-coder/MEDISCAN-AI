import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  ScanLine,
  Stethoscope,
  Dna,
  Bot,
  History,
  BookmarkCheck,
  User,
  Settings,
  Palette,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Image Analysis', path: '/image-analysis', icon: ScanLine },
  { label: 'Symptom Analysis', path: '/symptom-analysis', icon: Stethoscope },
  { label: 'Biological Explorer', path: '/biological-explorer', icon: Dna },
  { label: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  { label: 'Analysis History', path: '/history', icon: History },
  { label: 'Saved Reports', path: '/saved-reports', icon: BookmarkCheck },
];

const bottomItems = [
  { label: 'Researcher Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Design System', path: '/design-system', icon: Palette },
];

const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/');
  };

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const isMatched =
      location.pathname === item.path ||
      (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onClose}
        title={collapsed ? item.label : undefined}
        className={() =>
          `flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
          } ${
            isMatched
              ? 'bg-primary-50 text-primary border border-primary/20 font-semibold shadow-soft'
              : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
          }`
        }
      >
        <Icon size={18} className="flex-shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  };

  const sidebarContent = (isCollapsed) => (
    <div className="flex h-full flex-col bg-surface border-r border-border">
      {/* Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-5 border-b border-border`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white">
              <ScanLine size={18} />
            </div>
            <div>
              <h1 className="text-base font-bold text-text-primary leading-none">MediScan</h1>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">AI</span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white">
            <ScanLine size={18} />
          </div>
        )}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(renderNavItem)}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-2 space-y-1 border-t border-border pt-3">
        {bottomItems.map(renderNavItem)}

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-danger transition-all duration-200 ${
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
          }`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      {onToggleCollapse && (
        <div className="hidden lg:block px-3 pb-3">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-xl text-text-secondary hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-30 transition-all duration-300 ${
          collapsed ? 'lg:w-[72px]' : 'lg:w-64'
        }`}
      >
        {sidebarContent(collapsed)}
      </div>

      {/* Mobile sidebar — overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {sidebarContent(false)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
