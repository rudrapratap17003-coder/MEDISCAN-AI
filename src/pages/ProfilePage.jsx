import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Check,
  ChevronRight,
  Palette,
  Sparkles,
  Award,
  Settings,
  BookOpen,
  Activity,
  BookmarkCheck,
  Clock,
  Camera,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { useActivity } from '../context/ActivityContext';
import { Button, Badge, Card, Input } from '../components/common';

const AVATAR_COLORS = [
  '#2563EB', // Medical Blue
  '#0D9488', // Teal
  '#7C3AED', // Violet
  '#E11D48', // Rose
  '#D97706', // Amber
  '#059669', // Emerald
];

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { preferences } = usePreferences();
  const { stats } = useActivity();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    displayName: user?.displayName || user?.name || '',
    bio: user?.bio || '',
    role: user?.role || 'Health Technology Researcher',
    avatarColor: user?.avatarColor || '#2563EB',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile completion score calculation
  const completionScore = (() => {
    let score = 40; // Base: email and registered account
    if (user?.name && user.name.length > 2) score += 20;
    if (user?.displayName && user.displayName.length > 1) score += 15;
    if (user?.bio && user.bio.length > 5) score += 15;
    if (user?.avatarColor) score += 10;
    return Math.min(score, 100);
  })();

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      displayName: user?.displayName || user?.name || '',
      bio: user?.bio || '',
      role: user?.role || 'Health Technology Researcher',
      avatarColor: user?.avatarColor || '#2563EB',
    });
    setIsEditing(false);
  };

  const initials = user?.avatarInitials || (user?.name || user?.email || 'U').substring(0, 2).toUpperCase();

  const accountCreated = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Active Session';

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header with Breadcrumbs */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">User Profile</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Researcher Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your personal researcher identity, profile avatar, and account preferences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/settings">
              <Button variant="outline" size="sm" className="text-xs">
                <Settings className="w-3.5 h-3.5 mr-1" />
                <span>Account Settings</span>
              </Button>
            </Link>
            {!isEditing && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-xs"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" />
                <span>Edit Profile</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2 shadow-2xs"
        >
          <Check className="w-4 h-4 text-green-600" />
          <span>Profile changes successfully updated and saved locally!</span>
        </motion.div>
      )}

      {/* Main Profile Card */}
      <Card className="p-6 sm:p-8 border-slate-200/90 shadow-2xs relative overflow-hidden">
        {/* Profile Header Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
          {/* Avatar with dynamic color preset */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md transition-colors"
              style={{ backgroundColor: formData.avatarColor }}
            >
              {initials}
            </div>
            {isEditing && (
              <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-lg shadow border border-slate-200 text-slate-600">
                <Palette className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* User Details / Summary */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                {user?.displayName || user?.name || 'Researcher'}
              </h2>
              <Badge variant="primary" size="sm">
                {user?.role || 'Active Researcher'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email}</span>
            </p>
            <p className="text-xs text-slate-600 max-w-xl pt-1 leading-relaxed">
              {user?.bio || 'AI health screening & biological analysis explorer.'}
            </p>
          </div>

          {/* Profile Completion Dial */}
          <div className="sm:self-center shrink-0 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center min-w-[130px]">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Profile Status
            </span>
            <div className="text-lg font-bold text-blue-600 mt-0.5">
              {completionScore}%
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {completionScore === 100 ? 'Fully Detailed' : 'Profile Complete'}
            </span>
          </div>
        </div>

        {/* Edit Form or Read-Only View */}
        {isEditing ? (
          <form onSubmit={handleSave} className="pt-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Edit Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preferred Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="How you appear in greetings"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Research Role / Title
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Avatar Theme Color
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarColor: color })}
                      className={`w-7 h-7 rounded-lg transition-transform ${
                        formData.avatarColor === color ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Bio / Research Background
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief description of your research or educational interests..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Save Profile Changes</span>
              </Button>
            </div>
          </form>
        ) : (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Account Status
              </span>
              <span className="text-xs font-bold text-teal-700 mt-1 block">
                Verified Local Session
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Logged in via frontend auth
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Session Created
              </span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">
                {accountCreated}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Browser storage session
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Theme
              </span>
              <span className="text-xs font-bold text-slate-800 mt-1 block capitalize">
                {preferences.theme} Mode
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Language: {preferences.language.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/analysis-history" className="block group">
          <Card hoverable className="p-5 border-slate-200/90 group-hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900">{stats.total}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Total Screenings & Studies
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Review history records across all categories.
            </p>
          </Card>
        </Link>

        <Link to="/saved-reports" className="block group">
          <Card hoverable className="p-5 border-slate-200/90 group-hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900">{stats.savedReports}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
              Saved Reports
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Access bookmarked summaries and export PDFs.
            </p>
          </Card>
        </Link>

        <Link to="/ai-assistant" className="block group">
          <Card hoverable className="p-5 border-slate-200/90 group-hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900">{stats.conversations}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
              Assistant Inquiries
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Resume conversational biological study threads.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
