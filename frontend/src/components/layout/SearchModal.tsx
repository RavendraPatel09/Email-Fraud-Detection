import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, X, ShieldAlert, AlertOctagon, Database, Globe, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, incidents, iocs, ledgerBlocks } = useApp();
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedIncidents = trimmed ? incidents.filter(i =>
    i.id.toLowerCase().includes(trimmed) ||
    i.title.toLowerCase().includes(trimmed) ||
    i.sourceIP.includes(trimmed) ||
    i.sender.toLowerCase().includes(trimmed)
  ) : incidents.slice(0, 3);

  const matchedIOCs = trimmed ? iocs.filter(i =>
    i.value.toLowerCase().includes(trimmed) ||
    i.type.toLowerCase().includes(trimmed) ||
    i.reputation.toLowerCase().includes(trimmed)
  ) : iocs.slice(0, 3);

  const matchedBlocks = trimmed ? ledgerBlocks.filter(b =>
    b.blockNumber.toString().includes(trimmed) ||
    b.evidenceId.toLowerCase().includes(trimmed) ||
    b.blockHash.toLowerCase().includes(trimmed)
  ) : ledgerBlocks.slice(0, 2);

  const handleSelectIncident = (incId: string) => {
    setIsSearchOpen(false);
    navigate(`/investigations?id=${incId}`);
  };

  const handleSelectIOC = () => {
    setIsSearchOpen(false);
    navigate('/intelligence');
  };

  const handleSelectEvidence = () => {
    setIsSearchOpen(false);
    navigate('/evidence');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-[#0D121F] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search Incident IDs (INC-2026-1042), IPs (185.220.101.45), Domains, Hashes..."
            autoFocus
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => setIsSearchOpen(false)} className="px-2 py-1 text-xs font-mono rounded bg-slate-800 text-slate-400 hover:text-slate-200">
            ESC
          </button>
        </div>

        {/* Results container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 font-mono">
          {/* Incidents Section */}
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-orange-400" />
              <span>Incidents ({matchedIncidents.length})</span>
            </div>
            <div className="space-y-1.5">
              {matchedIncidents.map(inc => (
                <div
                  key={inc.id}
                  onClick={() => handleSelectIncident(inc.id)}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <span className="text-blue-400">{inc.id}</span>
                      <span>•</span>
                      <span>{inc.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      IP: <span className="text-slate-300">{inc.sourceIP}</span> ({inc.sourceLocation})
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* IOCs Section */}
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>Threat Intelligence IOCs ({matchedIOCs.length})</span>
            </div>
            <div className="space-y-1.5">
              {matchedIOCs.map(ioc => (
                <div
                  key={ioc.id}
                  onClick={handleSelectIOC}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 uppercase">{ioc.type}</span>
                    <span className="text-xs text-slate-200 font-bold">{ioc.value}</span>
                  </div>
                  <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{ioc.reputation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Ledger Section */}
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Evidence Ledger Blocks ({matchedBlocks.length})</span>
            </div>
            <div className="space-y-1.5">
              {matchedBlocks.map(block => (
                <div
                  key={block.blockNumber}
                  onClick={handleSelectEvidence}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-blue-400">BLOCK #{block.blockNumber}</span>
                    <span className="text-slate-400">({block.evidenceId})</span>
                    <span className="text-slate-500 text-[10px] truncate max-w-[200px]">{block.dataSummary}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10">VERIFIED</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-950 text-slate-500 text-xs flex justify-between">
          <span>Search indexing 2,481 analyzed emails</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
