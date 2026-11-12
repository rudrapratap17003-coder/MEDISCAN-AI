import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  Info,
} from 'lucide-react';
import { Button, Badge } from '../common';
import { ORGANS_DATA } from '../../data/anatomyData';

const organsList = Object.values(ORGANS_DATA);

/**
 * Interactive SVG-based simplified human anatomy visualization.
 * Supports Anterior (Front) and Posterior (Back) views, hover states,
 * organ selection highlighting, and anatomical callouts.
 */
const AnatomyViewer = ({
  selectedOrganId,
  onSelectOrgan,
  onResetSelection,
}) => {
  const [viewMode, setViewMode] = useState('front'); // 'front' | 'back'
  const [hoveredOrganId, setHoveredOrganId] = useState(null);
  const [showLayer, setShowLayer] = useState('all'); // 'all' | 'organs' | 'skeleton' | 'skin'

  const activeOrgan = selectedOrganId ? ORGANS_DATA[selectedOrganId] : null;
  const hoveredOrgan = hoveredOrganId ? ORGANS_DATA[hoveredOrganId] : null;

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft flex flex-col justify-between h-full">
      {/* Viewer Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Badge variant="primary" dot>Interactive Model</Badge>
          <span className="text-xs text-text-secondary font-medium">
            {viewMode === 'front' ? 'Anterior (Front) View' : 'Posterior (Back) View'}
          </span>
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-background rounded-xl border border-border p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('front')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'front'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Anterior (Front)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('back')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'back'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Posterior (Back)
            </button>
          </div>

          {selectedOrganId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={onResetSelection}
              className="text-text-secondary hover:text-danger hover:bg-red-50 text-xs"
              title="Reset organ selection"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative py-4 flex items-center justify-center min-h-[460px] select-none">
        {/* Layer Filter Pills */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 bg-surface/90 backdrop-blur-md p-1.5 rounded-xl border border-border text-[11px] shadow-soft">
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider px-2 pt-1">
            Anatomical Layers
          </span>
          {[
            { id: 'all', label: 'Composite View' },
            { id: 'organs', label: 'Visceral Organs' },
            { id: 'skeleton', label: 'Skeletal Frame' },
            { id: 'skin', label: 'Dermal Envelope' },
          ].map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => {
                setShowLayer(layer.id);
                if (layer.id === 'skin') onSelectOrgan('skin');
                if (layer.id === 'skeleton') onSelectOrgan('bones');
              }}
              className={`text-left px-2.5 py-1 rounded-lg transition-colors ${
                showLayer === layer.id
                  ? 'bg-primary-50 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-slate-50'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>

        {/* Hover / Active floating label */}
        <AnimatePresence>
          {(hoveredOrgan || activeOrgan) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute top-2 right-2 z-10 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-large flex items-center gap-2 pointer-events-none"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: (hoveredOrgan || activeOrgan).color,
                }}
              />
              <span>{(hoveredOrgan || activeOrgan).name}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {(hoveredOrgan || activeOrgan).region}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main SVG Anatomy Graphic */}
        <svg
          viewBox="0 0 320 560"
          className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-md"
          role="img"
          aria-label="Simplified human anatomical diagram"
        >
          <defs>
            {/* Glow filter for selected organ */}
            <filter id="organGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Gradients */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="skinGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#BE123C" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* ── 1. Human Body Silhouette / Outer Skin Boundary ── */}
          <path
            d="M160,25 C145,25 132,38 132,60 C132,75 140,86 146,92 C135,98 115,108 100,125 C82,145 74,185 70,230 C66,270 54,340 50,370 C48,382 58,386 64,375 C72,360 88,290 94,250 C96,270 98,310 98,340 C98,370 102,440 106,480 C110,510 114,535 116,540 C118,546 128,546 130,540 C136,515 142,430 148,370 C154,310 156,290 160,290 C164,290 166,310 172,370 C178,430 184,515 190,540 C192,546 202,546 204,540 C206,535 210,510 214,480 C218,440 222,370 222,340 C222,310 224,270 226,250 C232,290 248,360 256,375 C262,386 272,382 270,370 C266,340 254,270 250,230 C246,185 238,145 220,125 C205,108 185,98 174,92 C180,86 188,75 188,60 C188,38 175,25 160,25 Z"
            fill="url(#bodyGradient)"
            stroke={selectedOrganId === 'skin' ? '#F43F5E' : '#94A3B8'}
            strokeWidth={selectedOrganId === 'skin' ? 3.5 : 1.5}
            strokeDasharray={selectedOrganId === 'skin' ? 'none' : 'none'}
            className="transition-all duration-300 cursor-pointer"
            onClick={() => onSelectOrgan('skin')}
            onMouseEnter={() => setHoveredOrganId('skin')}
            onMouseLeave={() => setHoveredOrganId(null)}
          />

          {/* ── 2. Skeletal Frame (Ribcage, Spine, Pelvis) ── */}
          {(showLayer === 'all' || showLayer === 'skeleton') && (
            <g
              id="skeleton-layer"
              className="cursor-pointer transition-opacity"
              onClick={() => onSelectOrgan('bones')}
              onMouseEnter={() => setHoveredOrganId('bones')}
              onMouseLeave={() => setHoveredOrganId(null)}
            >
              {/* Vertebral column / Spine */}
              <line
                x1="160"
                y1="90"
                x2="160"
                y2="280"
                stroke={selectedOrganId === 'bones' ? '#3B82F6' : '#94A3B8'}
                strokeWidth={selectedOrganId === 'bones' ? 4 : 2.5}
                strokeDasharray="4 3"
              />
              {/* Clavicles */}
              <path
                d="M130,102 Q160,108 190,102"
                fill="none"
                stroke={selectedOrganId === 'bones' ? '#3B82F6' : '#94A3B8'}
                strokeWidth="2"
              />
              {/* Ribcage Outline */}
              <path
                d="M136,120 Q160,128 184,120 M132,136 Q160,146 188,136 M130,154 Q160,166 190,154 M132,172 Q160,184 188,172 M136,190 Q160,200 184,190"
                fill="none"
                stroke={selectedOrganId === 'bones' ? '#3B82F6' : '#CBD5E1'}
                strokeWidth="1.8"
                opacity={viewMode === 'front' ? 0.45 : 0.65}
              />
              {/* Pelvic girdle */}
              <path
                d="M132,270 Q160,295 188,270 Q176,305 160,310 Q144,305 132,270 Z"
                fill={selectedOrganId === 'bones' ? 'rgba(59, 130, 246, 0.25)' : 'none'}
                stroke={selectedOrganId === 'bones' ? '#3B82F6' : '#94A3B8'}
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* ── 3. VISCERAL ORGANS (Front vs Back conditional placement) ── */}
          {(showLayer === 'all' || showLayer === 'organs') && (
            <g id="organs-layer">
              {/* BRAIN */}
              <g
                id="organ-brain"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('brain')}
                onMouseEnter={() => setHoveredOrganId('brain')}
                onMouseLeave={() => setHoveredOrganId(null)}
              >
                <path
                  d="M144,45 C144,36 150,32 160,32 C170,32 176,36 176,45 C178,52 176,66 172,72 C168,75 164,74 160,74 C156,74 152,75 148,72 C144,66 142,52 144,45 Z"
                  fill={selectedOrganId === 'brain' ? '#8B5CF6' : hoveredOrganId === 'brain' ? '#A78BFA' : '#C4B5FD'}
                  stroke="#7C3AED"
                  strokeWidth={selectedOrganId === 'brain' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'brain' ? 'url(#organGlow)' : 'none'}
                />
                {/* Sulci details */}
                <path
                  d="M152,42 Q158,46 156,56 Q162,54 164,46 M156,60 Q160,66 166,62"
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </g>

              {/* LUNGS (Front: Prominent bilateral; Back: visible posterior lobes) */}
              <g
                id="organ-lungs"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('lungs')}
                onMouseEnter={() => setHoveredOrganId('lungs')}
                onMouseLeave={() => setHoveredOrganId(null)}
              >
                {/* Left lung (anatomical right, viewer left) */}
                <path
                  d="M136,118 C144,118 152,126 152,142 C152,166 150,188 138,196 C128,198 122,185 120,165 C118,142 124,118 136,118 Z"
                  fill={selectedOrganId === 'lungs' ? '#0D9488' : hoveredOrganId === 'lungs' ? '#2DD4BF' : '#99F6E4'}
                  stroke="#0F766E"
                  strokeWidth={selectedOrganId === 'lungs' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'lungs' ? 'url(#organGlow)' : 'none'}
                />
                {/* Right lung (anatomical left, viewer right with cardiac notch on front view) */}
                <path
                  d="M184,118 C176,118 168,126 168,142 C168,162 172,180 182,196 C192,198 198,185 200,165 C202,142 196,118 184,118 Z"
                  fill={selectedOrganId === 'lungs' ? '#0D9488' : hoveredOrganId === 'lungs' ? '#2DD4BF' : '#99F6E4'}
                  stroke="#0F766E"
                  strokeWidth={selectedOrganId === 'lungs' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'lungs' ? 'url(#organGlow)' : 'none'}
                />
              </g>

              {/* HEART (Front: anterior mediastinum; Back: obscured or posterior projection) */}
              <g
                id="organ-heart"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('heart')}
                onMouseEnter={() => setHoveredOrganId('heart')}
                onMouseLeave={() => setHoveredOrganId(null)}
                opacity={viewMode === 'front' ? 1 : 0.4}
              >
                <path
                  d="M160,140 C156,134 148,134 146,142 C144,152 152,164 160,172 C168,164 176,152 174,142 C172,134 164,134 160,140 Z"
                  fill={selectedOrganId === 'heart' ? '#EF4444' : hoveredOrganId === 'heart' ? '#F87171' : '#FCA5A5'}
                  stroke="#B91C1C"
                  strokeWidth={selectedOrganId === 'heart' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'heart' ? 'url(#organGlow)' : 'none'}
                />
                {/* Aortic arch branch */}
                <path
                  d="M158,136 Q160,128 164,126"
                  fill="none"
                  stroke="#991B1B"
                  strokeWidth="2"
                />
              </g>

              {/* LIVER (Anterior right upper quadrant) */}
              <g
                id="organ-liver"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('liver')}
                onMouseEnter={() => setHoveredOrganId('liver')}
                onMouseLeave={() => setHoveredOrganId(null)}
                opacity={viewMode === 'front' ? 1 : 0.6}
              >
                <path
                  d="M136,196 C148,192 165,192 170,198 C172,212 166,224 146,226 C134,226 130,215 136,196 Z"
                  fill={selectedOrganId === 'liver' ? '#B45309' : hoveredOrganId === 'liver' ? '#D97706' : '#FDE68A'}
                  stroke="#92400E"
                  strokeWidth={selectedOrganId === 'liver' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'liver' ? 'url(#organGlow)' : 'none'}
                />
              </g>

              {/* STOMACH (Left upper quadrant; behind liver on right) */}
              <g
                id="organ-stomach"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('stomach')}
                onMouseEnter={() => setHoveredOrganId('stomach')}
                onMouseLeave={() => setHoveredOrganId(null)}
                opacity={viewMode === 'front' ? 1 : 0.5}
              >
                <path
                  d="M166,196 C176,196 186,202 184,218 C182,230 172,234 162,230 C158,222 160,204 166,196 Z"
                  fill={selectedOrganId === 'stomach' ? '#EA580C' : hoveredOrganId === 'stomach' ? '#FB923C' : '#FED7AA'}
                  stroke="#C2410C"
                  strokeWidth={selectedOrganId === 'stomach' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'stomach' ? 'url(#organGlow)' : 'none'}
                />
              </g>

              {/* KIDNEYS (Posterior view: HIGH prominence; Front view: retroperitoneal behind viscera) */}
              <g
                id="organ-kidneys"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('kidneys')}
                onMouseEnter={() => setHoveredOrganId('kidneys')}
                onMouseLeave={() => setHoveredOrganId(null)}
              >
                {/* Left Kidney */}
                <ellipse
                  cx={viewMode === 'front' ? 142 : 178}
                  cy="222"
                  rx="7"
                  ry="12"
                  fill={selectedOrganId === 'kidneys' ? '#0284C7' : hoveredOrganId === 'kidneys' ? '#38BDF8' : '#BAE6FD'}
                  stroke="#0369A1"
                  strokeWidth={selectedOrganId === 'kidneys' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'kidneys' ? 'url(#organGlow)' : 'none'}
                  strokeDasharray={viewMode === 'front' ? '2 1' : 'none'}
                />
                {/* Right Kidney (slightly lower due to liver) */}
                <ellipse
                  cx={viewMode === 'front' ? 178 : 142}
                  cy="226"
                  rx="7"
                  ry="12"
                  fill={selectedOrganId === 'kidneys' ? '#0284C7' : hoveredOrganId === 'kidneys' ? '#38BDF8' : '#BAE6FD'}
                  stroke="#0369A1"
                  strokeWidth={selectedOrganId === 'kidneys' ? 2.5 : 1.2}
                  filter={selectedOrganId === 'kidneys' ? 'url(#organGlow)' : 'none'}
                  strokeDasharray={viewMode === 'front' ? '2 1' : 'none'}
                />
              </g>

              {/* INTESTINES (Small + Large Intestinal coils) */}
              <g
                id="organ-intestines"
                className="cursor-pointer"
                onClick={() => onSelectOrgan('intestines')}
                onMouseEnter={() => setHoveredOrganId('intestines')}
                onMouseLeave={() => setHoveredOrganId(null)}
                opacity={viewMode === 'front' ? 1 : 0.6}
              >
                {/* Large Colon Frame */}
                <path
                  d="M136,236 Q134,268 136,274 M184,236 Q186,268 184,274 M136,236 Q160,232 184,236"
                  fill="none"
                  stroke={selectedOrganId === 'intestines' ? '#D97706' : '#F59E0B'}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Small Intestine Center Mesentery */}
                <rect
                  x="142"
                  y="242"
                  width="36"
                  height="30"
                  rx="6"
                  fill={selectedOrganId === 'intestines' ? '#F59E0B' : hoveredOrganId === 'intestines' ? '#FCD34D' : '#FEF08A'}
                  stroke="#B45309"
                  strokeWidth={selectedOrganId === 'intestines' ? 2.2 : 1}
                  filter={selectedOrganId === 'intestines' ? 'url(#organGlow)' : 'none'}
                />
                {/* Intestinal folds */}
                <path
                  d="M146,248 Q154,252 162,248 Q170,252 174,248 M146,258 Q160,264 174,258 M148,266 Q160,262 172,266"
                  fill="none"
                  stroke="#92400E"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              </g>
            </g>
          )}

          {/* ── Visual Callout Markers & Connecting Pointers for Selected Organ ── */}
          {activeOrgan && (
            <g id="callout-indicator" pointerEvents="none">
              {activeOrgan.id === 'brain' && (
                <circle cx="160" cy="50" r="16" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
              {activeOrgan.id === 'heart' && (
                <circle cx="160" cy="154" r="16" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
              {activeOrgan.id === 'lungs' && (
                <circle cx="160" cy="155" r="32" fill="none" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {activeOrgan.id === 'liver' && (
                <circle cx="150" cy="208" r="18" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
              {activeOrgan.id === 'stomach' && (
                <circle cx="172" cy="214" r="16" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
              {activeOrgan.id === 'kidneys' && (
                <circle cx="160" cy="224" r="28" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {activeOrgan.id === 'intestines' && (
                <circle cx="160" cy="256" r="24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Quick Organ Selector Grid (Footer of the Viewer) */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            Quick Select Anatomy
          </span>
          <span className="text-[10px] text-text-secondary">
            Click any organ or body region to inspect
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {organsList.map((organ) => {
            const isSelected = selectedOrganId === organ.id;
            return (
              <button
                key={organ.id}
                type="button"
                onClick={() => onSelectOrgan(organ.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-soft scale-105 font-bold'
                    : 'bg-background border border-border text-text-secondary hover:text-text-primary hover:border-slate-300'
                }`}
              >
                {organ.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { AnatomyViewer };
export default AnatomyViewer;
