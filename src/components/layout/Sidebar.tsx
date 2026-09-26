import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  MailCheck,
  ShieldAlert,
  Search,
  Database,
  AlertOctagon,
  FileText,
  Settings,
  Shield,
  User
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/analyzer', label: 'Email Analyzer', icon: MailCheck },
  { path: '/intelligence', label: 'Threat Intelligence', icon: ShieldAlert },
  { path: '/investigations', label: 'Investigations', icon: Search },
  { path: '/evidence', label: 'Evidence', icon: Database },
  { path: '/incidents', label: 'Incidents', icon: AlertOctagon },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC = () => {
  const { currentUser } = useAuth();

  const userName = currentUser?.name || 'Ravendra Patel';
  const userRole = currentUser?.role || 'Security Analyst';
  const userInitials = userName.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() || 'RP';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none">
      <div>
        {/* Brand / Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 tracking-tight">
              CYBER SHIELD
            </div>
            <div className="text-xs text-slate-500 font-sans">
              Email Security & Forensics
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 font-sans">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Platform Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom User Profile */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <NavLink
          to="/settings?tab=profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold font-mono text-xs flex items-center justify-center">
            {userInitials}
          </div>
          <div className="min-w-0 font-sans">
            <div className="text-xs font-semibold text-slate-900 truncate">{userName}</div>
            <div className="text-[11px] text-slate-500 truncate">{userRole}</div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
