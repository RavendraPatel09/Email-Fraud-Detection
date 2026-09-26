import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  MailCheck,
  ShieldAlert,
  Search,
  Database,
  AlertOctagon,
  FileText,
  Settings,
  Activity,
  Lock
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, num: '01' },
  { path: '/analyzer', label: 'Email Analyzer', icon: MailCheck, num: '02' },
  { path: '/intelligence', label: 'Threat Intelligence', icon: ShieldAlert, num: '03' },
  { path: '/investigations', label: 'Investigations', icon: Search, num: '04' },
  { path: '/evidence', label: 'Evidence Ledger', icon: Database, num: '05' },
  { path: '/incidents', label: 'Incidents', icon: AlertOctagon, num: '06' },
  { path: '/reports', label: 'Reports', icon: FileText, num: '07' },
  { path: '/settings', label: 'Settings', icon: Settings, num: '08' }
];

export const Sidebar: React.FC = () => {
  const { isPresentationMode } = useApp();

  if (isPresentationMode) return null;

  return (
    <aside className="w-64 bg-[#0E131F] border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none">
      <div>
        {/* Brand / Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md shadow-blue-950/50">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-slate-100 flex items-center gap-1.5">
              <span>CYBER SHIELD</span>
              <span className="px-1.5 py-0.2 text-[9px] rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">SIH26106</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              AICTE Cyber Cell Platform
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            Navigation Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all group ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] opacity-60 font-mono">{item.num}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 space-y-2">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>System Status</span>
          <Activity className="w-3 h-3 text-emerald-400" />
        </div>
        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Threat Engine Online</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Intel Feed Connected</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span className="truncate">Evidence Ledger Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
