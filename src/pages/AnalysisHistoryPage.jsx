import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  BookmarkCheck,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  Plus,
  Compass,
  ScanLine,
  Stethoscope,
  X,
} from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { ACTIVITY_CATEGORIES, CATEGORY_CONFIG } from '../data/activityTypes';
import { Button, Badge, Card, Modal } from '../components/common';
import { ActivityCard, ReportDetailsModal, HistoryStatsBar } from '../components/history';

export const AnalysisHistoryPage = () => {
  const { activities, stats, toggleSave, deleteActivity, clearHistory } = useActivity();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // 'all' | 'today' | '7days' | '30days'
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Modal states
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    let result = [...activities];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (act) =>
          act.title.toLowerCase().includes(q) ||
          (act.status && act.status.toLowerCase().includes(q)) ||
          (act.moduleId && act.moduleId.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((act) => act.category === selectedCategory);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      result = result.filter((act) => {
        const itemTime = new Date(act.timestamp).getTime();
        const diffDays = (now - itemTime) / oneDay;

        if (dateFilter === 'today') return diffDays <= 1;
        if (dateFilter === '7days') return diffDays <= 7;
        if (dateFilter === '30days') return diffDays <= 30;
        return true;
      });
    }

    // Sort order
    result.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [activities, searchQuery, selectedCategory, dateFilter, sortOrder]);

  const categoriesList = [
    { id: 'all', label: 'All Activities' },
    { id: ACTIVITY_CATEGORIES.IMAGE_ANALYSIS, label: 'Image Analyses' },
    { id: ACTIVITY_CATEGORIES.SYMPTOM_ASSESSMENT, label: 'Symptom Intakes' },
    { id: ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION, label: 'Biological Studies' },
    { id: ACTIVITY_CATEGORIES.AI_CONVERSATION, label: 'Assistant Chats' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header & Breadcrumbs */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Analysis History & Reports</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-xs">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Analysis History & Reports
                </h1>
                <Badge variant="primary" size="sm">
                  Unified Archive
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Review your previous screening activities, manage saved reports, and access your educational analysis records in one place.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/saved-reports">
              <Button variant="outline" size="sm" className="text-xs">
                <BookmarkCheck className="w-3.5 h-3.5 mr-1 text-teal-600" />
                <span>Saved Reports ({stats.savedReports})</span>
              </Button>
            </Link>

            {activities.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Clear History</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Overview Statistics Bar */}
      <HistoryStatsBar stats={stats} />

      {/* Filter & Search Toolbar */}
      <Card className="p-4 sm:p-5 border-slate-200/90 shadow-2xs space-y-4">
        {/* Search & Select dropdowns */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, screening category, or status..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Date Filter & Sort */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Date filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="7days">Past 7 Days</option>
                <option value="30days">Past 30 Days</option>
              </select>
            </div>

            {/* Sort order */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Activity List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredActivities.length} of {activities.length} activity records
          </span>
          {(searchQuery || selectedCategory !== 'all' || dateFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDateFilter('all');
              }}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredActivities.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-slate-300">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {activities.length === 0
                ? 'No analysis history recorded yet'
                : 'No activities match your active filters'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              {activities.length === 0
                ? 'When you validate medical images, assess symptoms, or explore anatomy, your records will appear here.'
                : 'Try adjusting your search query, category selection, or date range filter.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/image-analysis">
                <Button variant="primary" size="sm" className="text-xs">
                  <ScanLine className="w-3.5 h-3.5 mr-1" />
                  <span>Start Image Screening</span>
                </Button>
              </Link>
              <Link to="/symptom-analysis">
                <Button variant="outline" size="sm" className="text-xs">
                  <Stethoscope className="w-3.5 h-3.5 mr-1" />
                  <span>Assess Symptoms</span>
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onViewDetails={(act) => setSelectedActivity(act)}
                onToggleSave={(id) => toggleSave(id)}
                onDelete={(id) => deleteActivity(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Educational Notice Banner */}
      <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>MEDISCAN AI Educational Archive:</strong> Records stored in this workspace reflect user interaction, image validation milestones, symptom intakes, and biological inquiries conducted within the research prototype. They do not constitute certified electronic medical records or professional diagnostic documentation.
        </p>
      </div>

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
        onToggleSave={(id) => {
          toggleSave(id);
          if (selectedActivity && selectedActivity.id === id) {
            setSelectedActivity((prev) => ({ ...prev, isSaved: !prev.isSaved }));
          }
        }}
        onDelete={(id) => deleteActivity(id)}
      />

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <Modal
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          title="Clear Entire Analysis History?"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently clear all activity records from your local browser session? This action cannot be reversed.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
              >
                Clear All Records
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AnalysisHistoryPage;
