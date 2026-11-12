import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIOLOGICAL_PROCESSES_DATA } from '../../data/biologicalProcessesData';
import { Button, Badge, Card } from '../common';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

export const BiologicalProcessViewer = ({ onSelectOrgan }) => {
  const [activeProcessId, setActiveProcessId] = useState(BIOLOGICAL_PROCESSES_DATA[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeProcess =
    BIOLOGICAL_PROCESSES_DATA.find((p) => p.id === activeProcessId) ||
    BIOLOGICAL_PROCESSES_DATA[0];

  const handleSelectProcess = (id) => {
    setActiveProcessId(id);
    setActiveStepIndex(0);
  };

  const handleNextStep = () => {
    if (activeStepIndex < activeProcess.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      setActiveStepIndex(0);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  const currentStep = activeProcess.steps[activeStepIndex];
  const Icon = activeProcess.icon || Activity;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Biological Process Explorer
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Examine step-by-step physiological pathways, cellular dynamics, and vital biological feedback mechanisms.
          </p>
        </div>
        <Badge variant="primary" size="sm">
          6 Key Physiological Processes
        </Badge>
      </div>

      {/* Process Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {BIOLOGICAL_PROCESSES_DATA.map((proc) => {
          const isSelected = proc.id === activeProcessId;
          const ProcIcon = proc.icon || Activity;
          return (
            <button
              key={proc.id}
              onClick={() => handleSelectProcess(proc.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`p-1.5 rounded-lg text-xs ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ProcIcon className="w-4 h-4" />
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {proc.steps.length} Steps
                </span>
              </div>
              <div>
                <span className="text-xs font-bold block leading-snug line-clamp-1">
                  {proc.name}
                </span>
                <span
                  className={`text-[11px] block mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {proc.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Process Interactive Card */}
      <Card className="p-6 border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Step Visualization & Stepper (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Process Info banner */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs"
                  style={{ backgroundColor: activeProcess.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{activeProcess.name}</h4>
                  <p className="text-xs text-slate-500">{activeProcess.summary}</p>
                </div>
              </div>
              <Badge variant="secondary" size="sm">
                Step {activeStepIndex + 1} of {activeProcess.steps.length}
              </Badge>
            </div>

            {/* Stepper Progression Track */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
              <div
                className="absolute top-4 left-4 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
                style={{
                  width: `${(activeStepIndex / (activeProcess.steps.length - 1)) * 90}%`,
                }}
              />

              <div className="relative z-10 flex justify-between items-center">
                {activeProcess.steps.map((step, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  const isCompleted = idx < activeStepIndex;

                  return (
                    <button
                      key={step.step}
                      onClick={() => setActiveStepIndex(idx)}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                            : isCompleted
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-400 border border-slate-300 group-hover:border-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.step}
                      </div>
                      <span
                        className={`text-[10px] font-semibold mt-1.5 text-center max-w-[60px] truncate ${
                          isCurrent ? 'text-blue-600 font-bold' : 'text-slate-400'
                        }`}
                      >
                        Stage {step.step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Detail Card with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProcess.id + '-' + activeStepIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">
                    Stage {currentStep.step}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <h5 className="text-sm font-bold text-slate-900">{currentStep.title}</h5>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Micro Visual Flow Diagram */}
                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] shrink-0">
                    Flow Pathway:
                  </span>
                  {activeProcess.steps.map((st, i) => (
                    <React.Fragment key={st.step}>
                      <span
                        className={`px-2 py-1 rounded font-medium shrink-0 transition-colors ${
                          i === activeStepIndex
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {st.title.split(' ')[0]}
                      </span>
                      {i < activeProcess.steps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevStep}
                disabled={activeStepIndex === 0}
                className="text-xs"
              >
                Previous Stage
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStepIndex(0)}
                  className="text-xs text-slate-500"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Restart
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextStep}
                  className="text-xs"
                >
                  <span>{activeStepIndex === activeProcess.steps.length - 1 ? 'Start Over' : 'Next Stage'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Relevant Organs & Key Terminology Glossary (4 cols) */}
          <div className="lg:col-span-4 space-y-5 lg:border-l lg:border-slate-100 lg:pl-6">
            {/* Involved Organs */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-600" />
                Anatomical Structures Involved
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {activeProcess.relevantOrgans.map((organ, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 cursor-default"
                  >
                    {organ}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Terminology Glossary */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" />
                Biological Terms Glossary
              </h5>
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {activeProcess.keyTerms.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 block mb-0.5">
                      {item.term}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.def}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
