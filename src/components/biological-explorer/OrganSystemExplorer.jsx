import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ORGAN_SYSTEMS_DATA } from '../../data/organSystemsData';
import { OrganSystemModal } from './OrganSystemModal';
import { Button, Badge, Card } from '../common';
import { ChevronRight, Layers, Sparkles } from 'lucide-react';

export const OrganSystemExplorer = ({ onSelectOrgan }) => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSystem = (system) => {
    setSelectedSystem(system);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Organ System Explorer
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Explore 10 major human physiological organ systems, their constituent organs, and functional interconnections.
          </p>
        </div>
        <Badge variant="teal" size="sm">
          10 Major Biological Systems
        </Badge>
      </div>

      {/* Grid of systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ORGAN_SYSTEMS_DATA.map((system) => {
          const Icon = system.icon || Layers;
          return (
            <motion.div
              key={system.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                hover
                className="h-full flex flex-col justify-between border-slate-200/80 hover:border-slate-300 transition-all p-5"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: `${system.color}15`, color: system.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      System
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {system.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {system.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Main Organs & Components:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {system.mainOrgans.slice(0, 3).map((organ, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {organ}
                        </span>
                      ))}
                      {system.mainOrgans.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 font-medium">
                          +{system.mainOrgans.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/60"
                    onClick={() => handleOpenSystem(system)}
                  >
                    <span>Explore System Details</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <OrganSystemModal
        system={selectedSystem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectOrgan={onSelectOrgan}
      />
    </div>
  );
};
