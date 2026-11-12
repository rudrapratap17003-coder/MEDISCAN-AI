import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Activity, GitMerge, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Card } from '../common';

export const OrganSystemModal = ({ system, isOpen, onClose, onSelectOrgan }) => {
  if (!isOpen || !system) return null;

  const Icon = system.icon || Layers;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${system.color}15`, color: system.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{system.name}</h3>
                  <Badge variant="primary" size="sm">System Profile</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{system.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
            {/* Overview */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/70">
              <div className="flex items-center gap-2 font-semibold text-blue-900 mb-1.5 text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-blue-600" />
                System Overview
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {system.overview}
              </p>
            </div>

            {/* Main Organs & Constituents */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Primary Organs & Functional Structures
              </h4>
              <div className="flex flex-wrap gap-2">
                {system.mainOrgans.map((organName, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 hover:bg-slate-200/70 transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: system.color }} />
                    {organName}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Functions */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Core Physiological Functions
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {system.functions.map((func, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{func}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cellular & Molecular Mechanism */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                How the System Functions
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {system.howItWorks}
              </p>
            </div>

            {/* Inter-System Dynamics */}
            <div className="p-4 rounded-xl bg-violet-50/40 border border-violet-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-violet-900 mb-2 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-violet-600" />
                Inter-System Coordination
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {system.relationships}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              MEDISCAN AI • Interactive Biological Explorer
            </span>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close System View
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
