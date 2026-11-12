import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  ChevronRight,
  ShieldAlert,
  Info,
  Sparkles,
  Layers,
  Activity,
  Microscope,
} from 'lucide-react';
import { PageHeader, Badge, Card } from '../components/common';
import {
  AnatomyViewer,
  OrganInfoPanel,
  OrganSystemExplorer,
  BiologicalProcessViewer,
  DiseaseConnectionsSection,
  ExplorerSearchBar,
} from '../components/biological-explorer';
import { ANATOMY_ORGANS_DATA } from '../data/anatomyData';
import { useActivity } from '../context/ActivityContext';
import { ACTIVITY_CATEGORIES, ACTIVITY_STATUS } from '../data/activityTypes';

export const BiologicalExplorerPage = () => {
  const { addActivity } = useActivity();
  const [selectedOrganId, setSelectedOrganId] = useState('heart');

  // Section references for smooth scrolling from search
  const anatomyRef = useRef(null);
  const systemsRef = useRef(null);
  const processesRef = useRef(null);
  const diseasesRef = useRef(null);

  const handleSelectOrgan = (organId) => {
    const organ = ANATOMY_ORGANS_DATA[organId];
    if (organ) {
      setSelectedOrganId(organId);
      try {
        addActivity({
          category: ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION,
          title: `Biological Study: ${organ.name} (${organ.latinName})`,
          status: ACTIVITY_STATUS.EXPLORATION_COMPLETED,
          moduleId: organId,
          data: {
            organName: organ.name,
            latinName: organ.latinName,
            system: organ.system,
            cavity: organ.region,
          },
        });
      } catch (e) {
        console.warn('Failed to record exploration activity:', e);
      }
    }
  };

  const handleSelectSearchResult = (item) => {
    if (item.type === 'organ') {
      setSelectedOrganId(item.id);
      anatomyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.type === 'system') {
      systemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.type === 'process') {
      processesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.type === 'disease') {
      diseasesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto">
      {/* Page Header with Breadcrumbs */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Biological Explorer</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Interactive Biological Explorer
                </h1>
                <Badge variant="teal" size="sm">
                  Interactive Anatomy
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Explore human anatomy, understand organ systems, and discover the biological processes behind human health and disease.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Explorer Live Search & Filter Bar */}
      <section className="bg-gradient-to-r from-blue-50/70 via-teal-50/40 to-slate-50/70 p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="text-center max-w-lg mx-auto mb-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Biomedical Knowledge Search
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant search across 9 major organs, 10 organ systems, 6 physiological pathways, and clinical conditions.
          </p>
        </div>
        <ExplorerSearchBar onSelectResult={handleSelectSearchResult} />
      </section>

      {/* SECTION 1: Interactive Human Anatomy & Organ Detail Panel */}
      <section ref={anatomyRef} id="anatomy-section" className="space-y-4 scroll-mt-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Interactive Human Anatomy
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select any organ on the anatomical model or click its label to inspect physiological details, system connections, and functions.
            </p>
          </div>
          <Badge variant="secondary" size="sm">
            Interactive SVG Canvas
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Anatomy Viewer SVG Canvas (7 cols) */}
          <div className="lg:col-span-7">
            <AnatomyViewer
              selectedOrganId={selectedOrganId}
              onSelectOrgan={handleSelectOrgan}
            />
          </div>

          {/* Organ Information Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <OrganInfoPanel organId={selectedOrganId} />
          </div>
        </div>
      </section>

      {/* SECTION 2: Organ System Explorer */}
      <section ref={systemsRef} id="systems-section" className="pt-4 scroll-mt-20 border-t border-slate-200">
        <OrganSystemExplorer onSelectOrgan={handleSelectOrgan} />
      </section>

      {/* SECTION 3: Biological Process Explorer */}
      <section ref={processesRef} id="processes-section" className="pt-4 scroll-mt-20 border-t border-slate-200">
        <BiologicalProcessViewer onSelectOrgan={handleSelectOrgan} />
      </section>

      {/* SECTION 4: Understanding Disease Through Biology */}
      <section ref={diseasesRef} id="diseases-section" className="pt-4 scroll-mt-20 border-t border-slate-200">
        <DiseaseConnectionsSection onSelectOrgan={handleSelectOrgan} />
      </section>

      {/* SECTION 5: Educational Disclaimer Banner */}
      <section className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Educational Reference & Research Prototype Disclaimer
            </h3>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              MEDISCAN AI’s Interactive Biological Explorer is developed strictly for educational, informational, and biomedical research demonstration purposes. It does not formulate individualized medical diagnoses, prescribe therapeutic regimens, or replace the diagnostic judgment of licensed healthcare practitioners. If you have clinical questions or acute physical symptoms, always consult a qualified medical professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BiologicalExplorerPage;
