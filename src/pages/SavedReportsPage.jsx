import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookmarkCheck,
  ChevronRight,
  Search,
  Filter,
  History,
  ShieldAlert,
  Printer,
  Sparkles,
  Layers,
  ArrowRight,
  X,
} from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { ACTIVITY_CATEGORIES, CATEGORY_CONFIG } from '../data/activityTypes';
import { Button, Badge, Card } from '../components/common';
import { ActivityCard, ReportDetailsModal } from '../components/history';

export const SavedReportsPage = () => {
  const { savedReports, toggleSave, deleteActivity } = useActivity();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    let result = [...savedReports];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (rep) =>
          rep.title.toLowerCase().includes(q) ||
          (rep.status && rep.status.toLowerCase().includes(q)) ||
          (rep.moduleId && rep.moduleId.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((rep) => rep.category === selectedCategory);
    }

    return result;
  }, [savedReports, searchQuery, selectedCategory]);

  const categoriesList = [
    { id: 'all', label: 'All Saved' },
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
          <Link to="/analysis-history" className="hover:text-blue-600 transition-colors">
            Analysis History
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Saved Reports</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/10 text-teal-600 flex items-center justify-center shadow-xs">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  My Saved Reports
                </h1>
                <Badge variant="teal" size="sm">
                  {savedReports.length} Saved Records
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Access and organize your saved educational screening summaries and activity records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/analysis-history">
              <Button variant="outline" size="sm" className="text-xs">
                <History className="w-3.5 h-3.5 mr-1" />
                <span>All Analysis History</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 sm:p-5 border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in saved reports..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
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
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Saved Reports List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredReports.length} of {savedReports.length} saved reports
          </span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-teal-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredReports.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-slate-300">
            <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {savedReports.length === 0
                ? 'No saved reports yet'
                : 'No saved reports match your search criteria'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6 leading-relaxed">
              {savedReports.length === 0
                ? 'You can bookmark any screening result or biological inquiry from your Analysis History to pin it here as a permanent saved report.'
                : 'Try adjusting your search terms or selecting another category filter.'}
            </p>

            <Link to="/analysis-history">
              <Button variant="primary" size="sm" className="text-xs">
                <span>Browse Analysis History</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {filteredReports.map((report) => (
              <ActivityCard
                key={report.id}
                activity={report}
                onViewDetails={(rep) => setSelectedReport(rep)}
                onToggleSave={(id) => toggleSave(id)}
                onDelete={(id) => deleteActivity(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        activity={selectedReport}
        onToggleSave={(id) => {
          toggleSave(id);
          if (selectedReport && selectedReport.id === id) {
            setSelectedReport((prev) => ({ ...prev, isSaved: !prev.isSaved }));
          }
        }}
        onDelete={(id) => deleteActivity(id)}
      />
    </div>
  );
};

export default SavedReportsPage;
