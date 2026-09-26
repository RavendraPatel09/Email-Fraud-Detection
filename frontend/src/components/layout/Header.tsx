import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Play,
  RotateCcw,
  Presentation,
  ShieldCheck,
  User,
  Zap,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    isPresentationMode,
    togglePresentationMode,
    isDemoMode,
    toggleDemoMode,
    loadDemoScenario,
    resetDemo,
    setIsSearchOpen,
    setIsNotificationOpen
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleQuickDemo = () => {
    loadDemoScenario('demo-phishing-1');
    navigate('/analyzer');
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-[#0C101A]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Search trigger */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs font-mono w-48 sm:w-64 transition-all"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="truncate">Search IPs, Domains, Cases...</span>
        <kbd className="hidden sm:inline-block ml-auto px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Load Phishing Demo quick button */}
        <button
          onClick={handleQuickDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Load Phishing Demo</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={resetDemo}
          title="Reset Demo Data"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset</span>
        </button>

        {/* Presentation mode toggle */}
        <button
          onClick={togglePresentationMode}
          title={isPresentationMode ? "Exit Presentation Mode" : "Activate 3-Min Presentation Mode"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
            isPresentationMode
              ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/50'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isPresentationMode ? 'Exit Demo' : 'Presentation Mode'}</span>
        </button>

        {/* Demo Mode Badge */}
        <div
          onClick={toggleDemoMode}
          className="cursor-pointer hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>DEMO MODE ACTIVE</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-mono font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono text-xs font-bold">
            SOC
          </div>
          <div className="hidden xl:block text-left font-mono">
            <div className="text-xs font-semibold text-slate-200">Cyber Officer</div>
            <div className="text-[10px] text-slate-500">AICTE Cell</div>
          </div>
        </div>
      </div>
    </header>
  );
};
