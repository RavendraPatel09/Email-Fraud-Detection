import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { MailShieldLogo } from '../ui/MailShieldLogo';
import {
  LayoutDashboard,
  MailCheck,
  ShieldAlert,
  Search,
  Database,
  AlertOctagon,
  FileText,
  MessageSquare,
  Settings
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const navItems = [
    { path: '/', label: t.overview, icon: LayoutDashboard },
    { path: '/analyzer', label: t.emailAnalyzer, icon: MailCheck },
    { path: '/intelligence', label: t.threatIntelligence, icon: ShieldAlert },
    { path: '/investigations', label: t.investigations, icon: Search },
    { path: '/evidence', label: t.evidence, icon: Database },
    { path: '/incidents', label: t.incidents, icon: AlertOctagon },
    { path: '/reports', label: t.reports, icon: FileText },
    { path: '/feedback', label: t.feedback, icon: MessageSquare },
    { path: '/settings', label: t.settings, icon: Settings }
  ];

  const userName = currentUser?.name || 'Ravendra Patel';
  const userRole = currentUser?.role || 'Security Analyst';
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RP';

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none">
      <div>
        {/* Brand / Logo Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center">
          <MailShieldLogo showTagline={true} size="md" />
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 font-sans">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Console
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
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom User Profile */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <NavLink
          to="/settings?tab=profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold font-mono text-xs flex items-center justify-center border border-blue-200 dark:border-blue-800">
            {userInitials}
          </div>
          <div className="min-w-0 font-sans">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{userName}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userRole}</div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
