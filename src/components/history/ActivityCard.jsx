import React from 'react';
import { motion } from 'framer-motion';
import {
  Bookmark,
  BookmarkCheck,
  Eye,
  Trash2,
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CATEGORY_CONFIG, STATUS_CONFIG } from '../../data/activityTypes';
import { Button, Badge, Card } from '../common';
import { Link } from 'react-router-dom';

export const ActivityCard = ({
  activity,
  onViewDetails,
  onToggleSave,
  onDelete,
}) => {
  const categoryConf = CATEGORY_CONFIG[activity.category] || CATEGORY_CONFIG.biological_exploration;
  const statusConf = STATUS_CONFIG[activity.status] || {
    label: activity.status,
    badgeVariant: 'warning',
    description: '',
  };
  const CategoryIcon = categoryConf.icon;

  const formattedDate = new Date(activity.timestamp).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = new Date(activity.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hover
        className="p-5 border-slate-200/90 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        {/* Left: Category Icon & Core Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs mt-0.5"
            style={{ backgroundColor: `${categoryConf.color}15`, color: categoryConf.color }}
          >
            <CategoryIcon className="w-6 h-6" />
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={categoryConf.badgeVariant} size="sm">
                {categoryConf.shortLabel}
              </Badge>
              <Badge variant={statusConf.badgeVariant} size="sm">
                {statusConf.label}
              </Badge>
              {activity.isSaved && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  <BookmarkCheck className="w-3 h-3 text-teal-600" />
                  Saved
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {activity.title}
            </h4>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formattedTime}
              </span>
              <span>•</span>
              <span className="capitalize font-medium text-slate-500">
                Module: {activity.moduleId || 'General'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleSave(activity.id)}
            className={`text-xs px-2.5 py-1.5 h-8 ${
              activity.isSaved
                ? 'text-teal-700 bg-teal-50/50 border-teal-200 hover:bg-teal-100/50'
                : 'text-slate-600 hover:text-slate-800'
            }`}
            title={activity.isSaved ? 'Remove from Saved Reports' : 'Save to Reports'}
          >
            {activity.isSaved ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline ml-1">
              {activity.isSaved ? 'Saved' : 'Save'}
            </span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(activity)}
            className="text-xs px-3 py-1.5 h-8 font-semibold"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            <span>Details</span>
          </Button>

          {onDelete && (
            <button
              onClick={() => onDelete(activity.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityCard;
