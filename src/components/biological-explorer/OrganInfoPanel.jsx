import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Compass,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';
import { ORGANS_DATA } from '../../data/anatomyData';

const OrganInfoPanel = ({ organId, onResetSelection }) => {
  const organ = organId ? ORGANS_DATA[organId] : null;

  if (!organ) {
    return (
      <Card padding="lg" className="flex flex-col items-center justify-center text-center h-full min-h-[420px]">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-4 shadow-soft">
          <Activity size={32} />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1">
          Select an Anatomical Structure
        </h3>
        <p className="text-xs text-text-secondary max-w-sm leading-relaxed mb-6">
          Click directly on the human body visualization or choose any organ from the anatomical list to inspect its biological processes, systems, and clinical pathology.
        </p>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-border text-[11px] text-text-secondary max-w-xs text-left space-y-1">
          <p className="font-semibold text-text-primary">Featured Organs:</p>
          <p>&bull; Brain, Heart, Lungs, Liver, Stomach</p>
          <p>&bull; Kidneys, Intestines, Skin, Bones</p>
        </div>
      </Card>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={organ.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="space-y-5"
      >
        {/* Organ Identity Header */}
        <Card padding="md" className="border-primary/20 shadow-soft">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: organ.color }}
                />
                <h3 className="text-xl font-bold text-text-primary">
                  {organ.name}
                </h3>
                <span className="text-xs font-mono text-text-secondary italic">
                  ({organ.latinName})
                </span>
              </div>
              <p className="text-xs font-semibold text-primary">
                {organ.system} &middot; {organ.region}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={onResetSelection}
              className="text-text-secondary hover:text-text-primary text-xs"
            >
              Reset
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {organ.summary}
          </p>
        </Card>

        {/* Main Functions */}
        <Card padding="md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-success" /> Primary Physiological Functions
          </h4>
          <ul className="space-y-2 text-xs text-text-secondary">
            {organ.functions.map((func, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{func}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* System Connection */}
        <Card padding="md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2 flex items-center gap-2">
            <Compass size={15} className="text-secondary" /> Organ System Integration
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {organ.systemConnection}
          </p>
        </Card>

        {/* Biological Processes & Pathological Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Biological Processes */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2.5 flex items-center gap-2">
              <Sparkles size={15} className="text-primary" /> Key Biological Processes
            </h4>
            <ul className="space-y-1.5 text-[11px] text-text-secondary">
              {organ.biologicalProcesses.map((proc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">&bull;</span>
                  <span className="leading-snug">{proc}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Clinical Conditions */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2.5 flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-600" /> Conditions Affecting It
            </h4>
            <ul className="space-y-1.5 text-[11px] text-text-secondary">
              {organ.conditions.map((cond, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">&bull;</span>
                  <span className="leading-snug">{cond}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { OrganInfoPanel };
export default OrganInfoPanel;
