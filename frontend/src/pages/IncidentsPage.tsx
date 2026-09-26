import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { IncidentStatus } from '../types';
import { Search, Filter, Plus } from 'lucide-react';

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
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Incidents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage active security incidents and response actions.
          </p>
        </div>

        <button
          onClick={() => navigate('/analyzer')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Incident</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                filterSeverity === s ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-slate-300">|</span>
          {['ALL', 'OPEN', 'INVESTIGATING', 'QUARANTINED', 'RESOLVED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                filterStatus === st ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
            placeholder="Search incident ID or source IP..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Incidents Queue ({filteredIncidents.length} Active)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-mono">
                <th className="pb-3 font-semibold">Incident</th>
                <th className="pb-3 font-semibold">Classification & Sender</th>
                <th className="pb-3 font-semibold">Source IP / Location</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Assigned To</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td
                    onClick={() => navigate(`/investigations?id=${inc.id}`)}
                    className="py-3 font-bold font-mono text-blue-600 cursor-pointer hover:underline"
                  >
                    {inc.id}
                  </td>
                  <td className="py-3">
                    <div className="font-semibold text-slate-900">{inc.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{inc.sender}</div>
                  </td>
                  <td className="py-3">
                    <span className="text-slate-900 font-mono font-semibold">{inc.sourceIP}</span>
                    <span className="text-slate-500 text-[11px] block">{inc.sourceLocation}</span>
                  </td>
                  <td className="py-3">
                    <ThreatBadge severity={inc.severity} size="sm" />
                  </td>
                  <td className="py-3 font-mono">
                    <select
                      value={inc.status}
                      onChange={(e) => updateIncidentStatus(inc.id, e.target.value as IncidentStatus)}
                      className="bg-slate-50 text-slate-900 text-xs p-1 rounded border border-slate-200 focus:outline-none focus:border-blue-600"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="QUARANTINED">QUARANTINED</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                  <td className="py-3 text-slate-600 text-[11px]">
                    {inc.assignedTo || 'Unassigned'}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate(`/investigations?id=${inc.id}`)}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-semibold"
                    >
                      Investigate
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
