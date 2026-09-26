import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Bell,
  User,
  Settings,
  Shield,
  LogOut,
  ChevronDown
} from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Security Overview',
  '/analyzer': 'Email Analyzer',
  '/intelligence': 'Threat Intelligence',
  '/investigations': 'Investigations',
  '/evidence': 'Evidence Ledger',
  '/incidents': 'Incidents',
  '/reports': 'Incident Reports',
  '/settings': 'Account Settings'
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, setIsSearchOpen, setIsNotificationOpen, addNotification } = useApp();
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

  const handleSignOut = () => {
    setProfileDropdownOpen(false);
    logout();
    addNotification('Signed Out', 'Signed out successfully.', 'info');
    navigate('/signin');
  };

  const currentPageTitle = PAGE_TITLES[location.pathname] || 'Security Platform';
  const userName = currentUser?.name || 'Ravendra Patel';
  const userRole = currentUser?.role || 'Security Analyst';
  const userInitials = userName.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() || 'RP';

  return (
    <header className="h-14 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 font-sans">
      {/* Current Page Title */}
      <div className="font-semibold text-sm text-slate-800">
        {currentPageTitle}
      </div>

      {/* Center/Right controls */}
      <div className="flex items-center gap-3">
        {/* Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 text-xs w-48 sm:w-64 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search incidents, IPs, domains or evidence...</span>
          <kbd className="hidden sm:inline-block ml-auto px-1.5 py-0.5 text-[10px] rounded bg-white text-slate-400 border border-slate-200 font-mono">⌘K</kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown Menu */}
        <div className="relative border-l border-slate-200 pl-3" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center">
              {userInitials}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">{userName}</div>
              <div className="text-[11px] text-slate-500 truncate max-w-[120px]">{userRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu Container */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-slate-900 truncate">{userName}</div>
                <div className="text-[11px] text-slate-500 truncate">{currentUser?.email || 'analyst@cybermail.demo'}</div>
                <div className="text-[10px] text-blue-700 font-semibold mt-0.5">{userRole}</div>
              </div>

              <div className="py-1">
                <Link
                  to="/settings?tab=profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings?tab=account"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/settings?tab=security"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Security</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
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
