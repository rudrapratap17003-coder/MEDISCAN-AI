import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Heart,
  Microscope,
  Wind,
  Activity,
  Droplets,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SUGGESTED_QUESTIONS = [
  {
    id: 1,
    question: 'How does the human immune system fight infections?',
    category: 'Immunology',
    icon: Shield,
    color: '#0D9488',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    id: 2,
    question: 'Explain how blood circulates through the heart.',
    category: 'Cardiovascular Dynamics',
    icon: Heart,
    color: '#EF4444',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    id: 3,
    question: 'How does malaria affect red blood cells?',
    category: 'Pathophysiology',
    icon: Microscope,
    color: '#8B5CF6',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    id: 4,
    question: 'What happens inside the lungs during pneumonia?',
    category: 'Pulmonary Pathology',
    icon: Wind,
    color: '#2563EB',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    id: 5,
    question: 'Explain insulin and blood glucose regulation.',
    category: 'Endocrinology',
    icon: Activity,
    color: '#D97706',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    id: 6,
    question: 'How do kidneys filter blood?',
    category: 'Renal Physiology',
    icon: Droplets,
    color: '#0284C7',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
];

export const SuggestedQuestions = ({ onSelectQuestion }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Suggested Biological Explorations
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SUGGESTED_QUESTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectQuestion(item.question)}
              className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xs text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.question}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600 mt-2.5 pt-2 border-t border-slate-100 opacity-90 group-hover:opacity-100">
                <span>Explore question</span>
                <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
