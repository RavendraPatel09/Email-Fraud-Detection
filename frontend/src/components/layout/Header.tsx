import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Bell,
  RotateCcw,
  Presentation,
  User,
  Settings,
  Shield,
  Palette,
  LogOut,
  Sparkles,
  ChevronDown
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
    setIsNotificationOpen,
    addNotification
  } = useApp();

  const { currentUser, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickDemo = () => {
    loadDemoScenario('demo-phishing-1');
    navigate('/analyzer');
  };

  const handleSignOut = () => {
    setProfileDropdownOpen(false);
    logout();
    addNotification('Signed Out', 'Signed out successfully.', 'info');
    navigate('/signin');
  };

  const userName = currentUser?.name || 'Ravendra Patel';
  const userRole = currentUser?.role || 'Security Analyst';
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RP';

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

        {/* User Profile Dropdown Menu */}
        <div className="relative border-l border-slate-800 pl-2" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/60 transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
              {userInitials}
            </div>
            <div className="hidden xl:block text-left font-mono">
              <div className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">{userName}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{userRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu Container */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0E131F] border border-slate-800 shadow-2xl py-1 font-mono text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <div className="font-bold text-slate-100 truncate">{userName}</div>
                <div className="text-[11px] text-slate-400 truncate">{currentUser?.email || 'analyst@cybermail.demo'}</div>
                <div className="text-[10px] text-blue-400 font-semibold mt-0.5">{userRole}</div>
              </div>

              <div className="py-1">
                <Link
                  to="/settings?tab=profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings?tab=account"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  to="/settings?tab=security"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Security & 2FA</span>
                </Link>

                <Link
                  to="/settings?tab=notifications"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Notifications</span>
                </Link>

                <Link
                  to="/settings?tab=appearance"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                >
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Appearance</span>
                </Link>
              </div>

              <div className="border-t border-slate-800/80 pt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
