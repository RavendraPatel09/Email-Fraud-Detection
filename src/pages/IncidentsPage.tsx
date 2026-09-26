import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { IncidentStatus, Severity } from '../types';
import { AlertOctagon, Search, Filter, ChevronRight, Plus, CheckCircle, ShieldAlert } from 'lucide-react';

export const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, searchQuery, updateIncidentStatus } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>(searchQuery);

  const filteredIncidents = incidents.filter(inc => {
    const matchSev = filterSeverity === 'ALL' || inc.severity === filterSeverity;
    const matchStat = filterStatus === 'ALL' || inc.status === filterStatus;
    const matchSearch =
      inc.id.toLowerCase().includes(search.toLowerCase()) ||
      inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.sourceIP.includes(search) ||
      inc.sender.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchStat && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              INCIDENT MANAGEMENT CONSOLE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Real-time triage queue for email security incidents across corporate mailboxes.
          </p>
        </div>

        <button
          onClick={() => navigate('/analyzer')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-center flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Triage Incident</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterSeverity === s ? 'bg-blue-600 text-white font-bold' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-slate-700 font-bold">|</span>
          {['ALL', 'OPEN', 'INVESTIGATING', 'QUARANTINED', 'RESOLVED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterStatus === st ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases or IPs..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Incidents Table / Grid */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Active Case Triage Queue ({filteredIncidents.length} Incidents)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Incident ID</th>
                <th className="pb-3 font-semibold">Title & Classification</th>
                <th className="pb-3 font-semibold">Source IP & Location</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Assigned To</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td
                    onClick={() => navigate(`/investigations?id=${inc.id}`)}
                    className="py-3 font-bold text-blue-400 cursor-pointer hover:underline"
                  >
                    {inc.id}
                  </td>
                  <td className="py-3">
                    <div className="font-bold text-slate-200">{inc.title}</div>
                    <div className="text-[11px] text-slate-400 font-sans">{inc.sender}</div>
                  </td>
                  <td className="py-3">
                    <span className="text-slate-200 font-semibold">{inc.sourceIP}</span>
                    <span className="text-slate-500 text-[11px] block">{inc.sourceLocation}</span>
                  </td>
                  <td className="py-3">
                    <ThreatBadge severity={inc.severity} size="sm" />
                  </td>
                  <td className="py-3">
                    <select
                      value={inc.status}
                      onChange={(e) => updateIncidentStatus(inc.id, e.target.value as IncidentStatus)}
                      className="bg-slate-950 text-slate-200 text-xs p-1 rounded border border-slate-800 font-mono focus:outline-none focus:border-blue-500"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="QUARANTINED">QUARANTINED</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">
                    {inc.assignedTo || 'Unassigned'}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate(`/investigations?id=${inc.id}`)}
                      className="px-2.5 py-1 rounded bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 text-xs font-bold"
                    >
                      Open Workspace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
