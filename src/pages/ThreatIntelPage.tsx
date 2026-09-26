import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IOCChip } from '../components/ui/IOCChip';
import { IOCType } from '../types';
import { ShieldAlert, Search, Filter, Database, Ban } from 'lucide-react';

export const ThreatIntelPage: React.FC = () => {
  const { iocs, searchQuery } = useApp();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState<string>(searchQuery);

  const filtered = iocs.filter((item) => {
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesQuery =
      item.value.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.reputation.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              GLOBAL THREAT INTELLIGENCE REPUTATION
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Aggregated indicators of compromise (IOCs) synced with CERT-In, OpenPhish, and Tor threat feeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs">
            Total IOC Records: <span className="text-blue-400 font-bold">{iocs.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['ALL', 'IP', 'DOMAIN', 'URL', 'HASH'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                filterType === t
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IOC value or source..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* IOC Table View */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Active Intelligence Feeds ({filtered.length} Matches)
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching indicators found for current query.
            </div>
          ) : (
            filtered.map((ioc) => (
              <IOCChip key={ioc.id} ioc={ioc} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
