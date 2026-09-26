import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import {
  User,
  Shield,
  Bell,
  Palette,
  Laptop,
  Key,
  QrCode,
  AlertTriangle,
  Upload,
  Globe,
  Sliders,
  X,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

const ROLES: UserRole[] = [
  'Security Analyst',
  'SOC Analyst',
  'Incident Responder',
  'Administrator',
  'Researcher',
  'Student / Trainee',
  'Other'
];

export const SettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    currentUser,
    updateProfile,
    changePassword,
    toggleTwoFactor,
    sessions,
    revokeSession,
    revokeAllOtherSessions,
    loginActivity,
    notificationPrefs,
    updateNotificationPrefs,
    logout,
    deleteDemoAccount
  } = useAuth();

  const { addNotification } = useApp();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || 'Ravendra Patel');
  const [email, setEmail] = useState(currentUser?.email || 'analyst@cybermail.demo');
  const [organization, setOrganization] = useState(currentUser?.organization || 'AICTE Cyber Security Cell');
  const [role, setRole] = useState<UserRole>(currentUser?.role || 'Security Analyst');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [bio, setBio] = useState(currentUser?.bio || 'Lead SOC triage specialist for MailShield threat intelligence.');

  // Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // Modals
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isRevokeAllModalOpen, setIsRevokeAllModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, organization, role, phone, bio });
    addNotification('Profile Updated', 'Profile updated successfully.', 'success');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmNewPass) {
      addNotification('Error', 'New passwords do not match.', 'danger');
      return;
    }
    changePassword(currentPass, newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmNewPass('');
    addNotification('Password Changed', 'Password changed successfully.', 'success');
  };

  const handleConfirm2FA = () => {
    toggleTwoFactor(!currentUser?.twoFactorEnabled);
    setIs2FAModalOpen(false);
    addNotification(
      '2FA Status Updated',
      currentUser?.twoFactorEnabled ? 'Two-Factor Authentication disabled.' : 'Prototype 2FA enabled successfully.',
      'success'
    );
  };

  const handleConfirmRevokeAll = () => {
    revokeAllOtherSessions();
    setIsRevokeAllModalOpen(false);
    addNotification('Sessions Revoked', 'All other active sessions have been revoked.', 'success');
  };

  const handleConfirmDeleteAccount = () => {
    setIsDeleteModalOpen(false);
    deleteDemoAccount();
    addNotification('Account Deleted', 'Demo account cleared.', 'info');
    navigate('/signin');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-sans">
            {t.settings}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Manage your MailShield analyst profile, security credentials, 2FA, theme, language, and notification preferences.
          </p>
        </div>
      </div>

      {/* Main Settings Layout (Sidebar + Tab Content) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-3 space-y-1 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 self-start shadow-xs">
          {[
            { key: 'profile', label: 'Profile Management', icon: User },
            { key: 'account', label: 'Account Information', icon: Sliders },
            { key: 'security', label: 'Security & 2FA', icon: Shield },
            { key: 'sessions', label: 'Active Sessions', icon: Laptop },
            { key: 'notifications', label: 'Notification Settings', icon: Bell },
            { key: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { key: 'language', label: 'Language / भाषा', icon: Globe }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all font-medium text-left ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Tab Content */}
        <div className="md:col-span-9 space-y-6">
          {/* TAB 1: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <User className="w-4 h-4 text-blue-600" />
                <span>Profile Information</span>
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-500/40 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xl font-mono">
                  {name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{name}</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addNotification('Photo Upload', 'Avatar updated.', 'info')}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Upload Avatar</span>
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Organization</label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                    >
                      {ROLES.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bio / Notes</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-sans leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    {t.saveChanges}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ACCOUNT INFORMATION */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  Account Overview
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Account ID</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">{currentUser?.id}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Account Type</span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{currentUser?.accountType}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Status</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {currentUser?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-2 border-b border-red-200 dark:border-red-900 pb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Danger Zone</span>
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">Sign Out of Console</div>
                    <div className="text-slate-500 text-xs">End current session and return to Sign In screen.</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/signin');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs border border-slate-200 dark:border-slate-700"
                  >
                    {t.signOut}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & 2FA */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <Key className="w-4 h-4 text-blue-600" />
                  <span>Change Password</span>
                </h2>

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                  >
                    Change Password
                  </button>
                </form>
              </div>

              {/* 2FA */}
              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <span>Two-Factor Authentication (2FA)</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      TOTP Authenticator security layer.
                    </p>
                  </div>

                  <button
                    onClick={() => setIs2FAModalOpen(true)}
                    className="px-4 py-2 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  >
                    {currentUser?.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVE SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>Active Login Sessions</span>
                </h2>

                {sessions.length > 1 && (
                  <button
                    onClick={() => setIsRevokeAllModalOpen(true)}
                    className="px-3.5 py-2 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900 text-xs font-bold"
                  >
                    Sign Out All Other Sessions
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div key={sess.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <span>{sess.device}</span>
                        <span>•</span>
                        <span className="text-slate-500 font-normal">{sess.browser}</span>
                        {sess.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[10px]">
                            THIS DEVICE
                          </span>
                        )}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        IP: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{sess.ipAddress}</span> ({sess.location})
                      </div>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        onClick={() => {
                          revokeSession(sess.id);
                          addNotification('Session Revoked', `Revoked ${sess.device}`, 'info');
                        }}
                        className="px-3 py-1.5 rounded bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                      >
                        REVOKE
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATION SETTINGS */}
          {activeTab === 'notifications' && (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Notification Preferences</span>
              </h2>

              <div className="space-y-3 text-xs">
                {[
                  { key: 'criticalThreats', label: 'Critical Threat Alerts', desc: 'Push alert when high-risk phishing email is ingested.' },
                  { key: 'highRiskPhishing', label: 'High-Risk Phishing Detection', desc: 'Alert when threat score exceeds 75/100 threshold.' },
                  { key: 'evidenceVerified', label: 'Evidence Verification', desc: 'Notification when evidence SHA-256 block digest is anchored.' }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.label}</div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={(notificationPrefs as any)[item.key]}
                      onChange={(e) => updateNotificationPrefs({ [item.key]: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-500" />
                <span>Theme & Appearance</span>
              </h2>

              <div className="space-y-4 text-xs">
                <label className="font-bold text-slate-900 dark:text-white block">Console Theme Mode</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: 'light', label: '☀️ Light Mode', icon: Sun },
                    { key: 'dark', label: '🌙 Dark Mode', icon: Moon },
                    { key: 'system', label: '⚙️ System Mode', icon: Monitor }
                  ].map(t => {
                    const Icon = t.icon;
                    const isSelected = theme === t.key;
                    return (
                      <div
                        key={t.key}
                        onClick={() => setTheme(t.key as ThemeMode)}
                        className={`p-4 rounded-xl border cursor-pointer font-bold text-center transition-all flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{t.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LANGUAGE SELECTOR */}
          {activeTab === 'language' && (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Language / भाषा चयन</span>
              </h2>

              <div className="space-y-4 text-xs">
                <label className="font-bold text-slate-900 dark:text-white block">Select Preferred Language</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setLanguage('en')}
                    className={`p-4 rounded-xl border cursor-pointer text-center font-bold transition-all ${
                      language === 'en'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    English (EN)
                  </div>
                  <div
                    onClick={() => setLanguage('hi')}
                    className={`p-4 rounded-xl border cursor-pointer text-center font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    हिन्दी (HI)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
