import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { SYMPTOM_CATEGORIES } from '../../data/symptomData';
import { Badge } from '../common';

const SymptomCategorySelector = ({
  selectedSymptoms = [],
  onToggleSymptom,
  error,
}) => {
  // Store which categories are expanded (all expanded by default for rapid discovery)
  const [expandedCategories, setExpandedCategories] = useState(
    SYMPTOM_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );

  const toggleCategory = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const getCategoryCount = (symptomList) => {
    return symptomList.filter((s) => selectedSymptoms.includes(s.id)).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
            <Layers size={16} className="text-primary" /> Select Active Symptoms
          </h4>
          <p className="text-xs text-text-secondary mt-0.5">
            Choose all symptoms currently experienced. At least one selection is required.
          </p>
        </div>

        <Badge variant={selectedSymptoms.length > 0 ? 'primary' : 'neutral'} size="sm">
          {selectedSymptoms.length} Selected
        </Badge>
      </div>

      {error && (
        <p className="text-xs font-semibold text-danger bg-red-50 p-2.5 rounded-xl border border-red-200">
          {error}
        </p>
      )}

      <div className="space-y-3">
        {SYMPTOM_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories[category.id];
          const selectedInCat = getCategoryCount(category.symptoms);

          return (
            <div
              key={category.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                selectedInCat > 0
                  ? 'bg-surface border-primary/30 shadow-soft'
                  : 'bg-surface border-border hover:border-slate-300'
              }`}
            >
              {/* Category Header Accordion */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/60 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">
                        {category.name}
                      </span>
                      {selectedInCat > 0 && (
                        <span className="text-[11px] font-semibold text-primary bg-primary-50 border border-primary-200/60 px-2 py-0.2 rounded-full">
                          {selectedInCat} active
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-text-secondary hidden sm:inline-block">
                      {category.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-text-secondary">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Chips Grid */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 pt-1 border-t border-border/60 bg-slate-50/30">
                      <div className="flex flex-wrap gap-2">
                        {category.symptoms.map((symptom) => {
                          const isSelected = selectedSymptoms.includes(symptom.id);

                          return (
                            <button
                              key={symptom.id}
                              type="button"
                              onClick={() => onToggleSymptom(symptom.id)}
                              className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none border ${
                                isSelected
                                  ? 'bg-primary text-white border-primary shadow-soft scale-[1.02]'
                                  : 'bg-surface text-text-primary border-border hover:border-primary/40 hover:bg-white'
                              }`}
                              title={symptom.description}
                            >
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-transparent group-hover:text-slate-300'
                                }`}
                              >
                                <Check size={11} strokeWidth={3} />
                              </span>
                              <span>{symptom.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SymptomCategorySelector;
