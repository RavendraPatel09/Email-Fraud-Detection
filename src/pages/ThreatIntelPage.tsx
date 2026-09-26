import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IOCChip } from '../components/ui/IOCChip';
import { ShieldAlert, Search, Filter } from 'lucide-react';

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
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Threat Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review suspicious IPs, domains, URLs and file indicators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs">
            Total Threat Indicators: <span className="text-blue-700 font-bold font-mono">{iocs.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['ALL', 'IP', 'DOMAIN', 'URL', 'HASH'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IP, domain, URL or hash..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
          />
        </div>
      </div>

      {/* IOC Table / List */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Related Threat Indicators ({filtered.length} Matches)
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
