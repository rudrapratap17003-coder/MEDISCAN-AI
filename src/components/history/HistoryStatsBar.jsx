import React from 'react';
import {
  Activity,
  ImageIcon,
  Stethoscope,
  Compass,
  BookmarkCheck,
  Bot,
} from 'lucide-react';
import { Card } from '../common';

export const HistoryStatsBar = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Activities',
      value: stats.total,
      icon: Activity,
      color: '#2563EB',
      bg: 'bg-blue-50',
    },
    {
      label: 'Image Analyses',
      value: stats.imageAnalyses,
      icon: ImageIcon,
      color: '#0D9488',
      bg: 'bg-teal-50',
    },
    {
      label: 'Symptom Intakes',
      value: stats.symptomAssessments,
      icon: Stethoscope,
      color: '#0284C7',
      bg: 'bg-sky-50',
    },
    {
      label: 'Biological Studies',
      value: stats.biologicalExplorations,
      icon: Compass,
      color: '#8B5CF6',
      bg: 'bg-violet-50',
    },
    {
      label: 'Saved Reports',
      value: stats.savedReports,
      icon: BookmarkCheck,
      color: '#16A34A',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {statCards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="p-4 border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {item.label}
              </span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {item.value}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default HistoryStatsBar;
