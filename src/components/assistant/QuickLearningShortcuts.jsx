import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  Activity,
  Microscope,
  ExternalLink,
} from 'lucide-react';

const SHORTCUTS = [
  {
    title: 'Explore Human Anatomy',
    description: 'Interactive 3D model with 9 selectable organs and front/back views.',
    path: '/biological-explorer#anatomy-section',
    icon: Compass,
    color: '#2563EB',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    title: 'Explore Organ Systems',
    description: 'Detailed profiles of 10 human physiological organ systems.',
    path: '/biological-explorer#systems-section',
    icon: Layers,
    color: '#0D9488',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    title: 'Biological Processes',
    description: 'Interactive stepped diagrams for 6 vital bodily pathways.',
    path: '/biological-explorer#processes-section',
    icon: Activity,
    color: '#8B5CF6',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    title: 'Pathology & Disease',
    description: 'Understand cellular mechanisms for 6 major human conditions.',
    path: '/biological-explorer#diseases-section',
    icon: Microscope,
    color: '#EF4444',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
];

export const QuickLearningShortcuts = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Biological Explorer Reference Hub
        </h4>
        <Link
          to="/biological-explorer"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
        >
          <span>Open Full Explorer</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SHORTCUTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              to={item.path}
              className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all group block"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLearningShortcuts;
