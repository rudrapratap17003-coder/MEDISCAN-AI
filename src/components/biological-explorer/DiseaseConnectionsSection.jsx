import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DISEASE_CONNECTIONS_DATA } from '../../data/diseaseConnectionsData';
import { Button, Badge, Card } from '../common';
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Microscope,
  Stethoscope,
  Activity,
  Layers,
} from 'lucide-react';

export const DiseaseConnectionsSection = ({ onSelectOrgan }) => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(DISEASE_CONNECTIONS_DATA[0].id);

  const selectedDisease =
    DISEASE_CONNECTIONS_DATA.find((d) => d.id === selectedDiseaseId) ||
    DISEASE_CONNECTIONS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
              <Microscope className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Understanding Disease Through Biology
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Examine how structural pathologies alter normal cellular physiology and how clinical diagnostics detect these alterations.
          </p>
        </div>
        <Badge variant="warning" size="sm">
          6 Pathophysiology Case Studies
        </Badge>
      </div>

      {/* Disease Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {DISEASE_CONNECTIONS_DATA.map((disease) => {
          const isSelected = disease.id === selectedDiseaseId;
          return (
            <button
              key={disease.id}
              onClick={() => setSelectedDiseaseId(disease.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: disease.color }}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {disease.category.split(' ')[0]}
                </span>
              </div>
              <h5 className="text-xs font-bold block truncate">{disease.name}</h5>
              <p
                className={`text-[11px] truncate mt-0.5 ${
                  isSelected ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {disease.organName.split('&')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Condition Detail */}
      <Card className="p-6 border-slate-200/90 shadow-sm">
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: selectedDisease.color }}
                />
                <h4 className="text-xl font-bold text-slate-900">
                  {selectedDisease.name}
                </h4>
                <Badge variant="secondary" size="sm">
                  {selectedDisease.category}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {selectedDisease.overview}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                Target: {selectedDisease.organName}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                System: {selectedDisease.systemName}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Biological Mechanism (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Biological & Pathophysiological Mechanism
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedDisease.biologicalMechanism}
                </p>
              </div>

              {/* Educational Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pathophysiological pathways describe general biological phenomena taught in standard medical curricula. Cellular disease manifestations vary widely based on individual genetics, host immunity, and pathogen virulence factors.
                </p>
              </div>
            </div>

            {/* Right: Educational Diagnostic Methods (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Standard Clinical Diagnostic Modalities
                </h5>
              </div>

              <div className="space-y-2">
                {selectedDisease.diagnosticMethods.map((method, idx) => {
                  const [title, desc] = method.split(':');
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-xs font-bold text-slate-900">
                          {title}
                        </span>
                      </div>
                      {desc && (
                        <p className="text-[11px] text-slate-600 pl-3.5 leading-relaxed">
                          {desc.trim()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
