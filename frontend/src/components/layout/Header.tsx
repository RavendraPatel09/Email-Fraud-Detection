import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';
import { MailShieldMark } from '../ui/MailShieldMark';
import {
  Search,
  Bell,
  User,
  Settings,
  Shield,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
  Globe,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, setIsSearchOpen, setIsNotificationOpen, addNotification } = useApp();
  const { currentUser, logout } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setProfileDropdownOpen(false);
    logout();
    addNotification('Signed Out', t.signOut, 'info');
    navigate('/signin');
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const userName = currentUser?.name || 'Ravendra Patel';
  const userRole = currentUser?.role || 'Security Analyst';
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RP';

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 font-sans">
      {/* Brand / Page Title */}
      <div className="flex items-center gap-2">
        <MailShieldMark size={24} className="sm:hidden" />
        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
          {location.pathname === '/' && t.overview}
          {location.pathname === '/analyzer' && t.emailAnalyzer}
          {location.pathname === '/intelligence' && t.threatIntelligence}
          {location.pathname === '/investigations' && t.investigations}
          {location.pathname === '/evidence' && t.evidence}
          {location.pathname === '/incidents' && t.incidents}
          {location.pathname === '/reports' && t.reports}
          {location.pathname === '/feedback' && t.feedback}
          {location.pathname.startsWith('/settings') && t.settings}
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs w-40 sm:w-60 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">{t.searchPlaceholder}</span>
          <kbd className="hidden sm:inline-block ml-auto px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 font-mono">⌘K</kbd>
        </button>

        {/* Compact Theme Toggle Button (Light/Dark/System) */}
        <button
          onClick={toggleTheme}
          title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </button>

        {/* Bilingual Language Switcher Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1 text-xs z-50 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  setLanguage('en');
                  setLangDropdownOpen(false);
                }}
                className={`w-full px-3 py-1.5 text-left transition-colors flex items-center justify-between ${
                  language === 'en' ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>English</span>
                {language === 'en' && <span>✓</span>}
              </button>
              <button
                onClick={() => {
                  setLanguage('hi');
                  setLangDropdownOpen(false);
                }}
                className={`w-full px-3 py-1.5 text-left transition-colors flex items-center justify-between ${
                  language === 'hi' ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>हिन्दी</span>
                {language === 'hi' && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown Menu */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 pl-3" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-200 dark:border-blue-800">
              {userInitials}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">{userName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{userRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu Container */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white truncate">{userName}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser?.email || 'analyst@cybermail.demo'}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{userRole}</div>
              </div>

              <div className="py-1">
                <Link
                  to="/settings?tab=profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings?tab=account"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.settings}</span>
                </Link>

                <Link
                  to="/feedback"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.giveFeedback}</span>
                </Link>

                <Link
                  to="/settings?tab=security"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Security</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
