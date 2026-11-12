import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, Layers, Activity, Microscope, CircleDot } from 'lucide-react';
import { ANATOMY_ORGANS_DATA } from '../../data/anatomyData';
import { ORGAN_SYSTEMS_DATA } from '../../data/organSystemsData';
import { BIOLOGICAL_PROCESSES_DATA } from '../../data/biologicalProcessesData';
import { DISEASE_CONNECTIONS_DATA } from '../../data/diseaseConnectionsData';

export const ExplorerSearchBar = ({ onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const items = [];

    // Organs
    if (activeCategory === 'all' || activeCategory === 'organs') {
      Object.values(ANATOMY_ORGANS_DATA).forEach((organ) => {
        if (
          organ.name.toLowerCase().includes(q) ||
          organ.system.toLowerCase().includes(q) ||
          organ.primaryFunction.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'organ',
            id: organ.id,
            title: organ.name,
            subtitle: organ.system,
            desc: organ.primaryFunction,
            icon: CircleDot,
            color: '#2563EB',
          });
        }
      });
    }

    // Systems
    if (activeCategory === 'all' || activeCategory === 'systems') {
      ORGAN_SYSTEMS_DATA.forEach((sys) => {
        if (
          sys.name.toLowerCase().includes(q) ||
          sys.description.toLowerCase().includes(q) ||
          sys.mainOrgans.some((o) => o.toLowerCase().includes(q))
        ) {
          items.push({
            type: 'system',
            id: sys.id,
            title: sys.name,
            subtitle: `${sys.mainOrgans.length} Organs`,
            desc: sys.description,
            icon: Layers,
            color: sys.color,
          });
        }
      });
    }

    // Processes
    if (activeCategory === 'all' || activeCategory === 'processes') {
      BIOLOGICAL_PROCESSES_DATA.forEach((proc) => {
        if (
          proc.name.toLowerCase().includes(q) ||
          proc.category.toLowerCase().includes(q) ||
          proc.summary.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'process',
            id: proc.id,
            title: proc.name,
            subtitle: proc.category,
            desc: proc.summary,
            icon: Activity,
            color: proc.color,
          });
        }
      });
    }

    // Diseases
    if (activeCategory === 'all' || activeCategory === 'diseases') {
      DISEASE_CONNECTIONS_DATA.forEach((dis) => {
        if (
          dis.name.toLowerCase().includes(q) ||
          dis.category.toLowerCase().includes(q) ||
          dis.overview.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'disease',
            id: dis.id,
            title: dis.name,
            subtitle: `${dis.organName} • ${dis.category}`,
            desc: dis.overview,
            icon: Microscope,
            color: dis.color,
          });
        }
      });
    }

    return items;
  }, [query, activeCategory]);

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery('');
    if (onSelectResult) {
      onSelectResult(item);
    }
  };

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'organs', label: 'Organs' },
    { id: 'systems', label: 'Organ Systems' },
    { id: 'processes', label: 'Processes' },
    { id: 'diseases', label: 'Pathologies' },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search organs, biological systems, cellular pathways, or conditions..."
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-full font-medium transition-colors shrink-0 ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-30 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No biological structures or processes match "<span className="font-semibold text-slate-700">{query}</span>" in this filter category.
            </div>
          ) : (
            <div className="py-2 divide-y divide-slate-100">
              {results.map((item, idx) => {
                const ItemIcon = item.icon || Activity;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
