import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  User,
  Shield,
  Bell,
  Palette,
  Laptop,
  Lock,
  Key,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  LogOut,
  Upload,
  Globe,
  Clock,
  Sliders,
  X
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
    appearancePrefs,
    updateAppearancePrefs,
    logout,
    deleteDemoAccount
  } = useAuth();

  const { addNotification } = useApp();

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
  const [bio, setBio] = useState(currentUser?.bio || 'Lead SOC triage specialist for SIH 2026 threat intelligence.');

  // Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // 2FA Modal State
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // Revoke All Modal State
  const [isRevokeAllModalOpen, setIsRevokeAllModalOpen] = useState(false);

  // Delete Account Modal State
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
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-mono text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-sans">
            ACCOUNT & SYSTEM SETTINGS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Manage your analyst profile, security credentials, 2FA, sessions, and notification preferences.
          </p>
        </div>
      </div>

      {/* Main Settings Layout (Sidebar + Tab Content) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Sidebar (3 Cols) */}
        <div className="md:col-span-3 space-y-1 bg-slate-900/80 p-2 rounded-xl border border-slate-800 self-start">
          {[
            { key: 'profile', label: 'Profile Management', icon: User },
            { key: 'account', label: 'Account Information', icon: Sliders },
            { key: 'security', label: 'Security & 2FA', icon: Shield },
            { key: 'sessions', label: 'Active Sessions', icon: Laptop },
            { key: 'notifications', label: 'Notification Settings', icon: Bell },
            { key: 'appearance', label: 'Appearance & Preferences', icon: Palette }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all font-medium text-left ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Tab Content (9 Cols) */}
        <div className="md:col-span-9 space-y-6">
          {/* TAB 1: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Profile Information</span>
                </h2>
              </div>

              {/* Profile Avatar Upload */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl font-mono">
                  {name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-200">{name}</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addNotification('Photo Upload', 'Local photo uploaded.', 'info')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-400" />
                      <span>Upload Avatar</span>
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded bg-slate-950 text-slate-400 hover:text-slate-200 text-xs border border-slate-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Organization</label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      {ROLES.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Analyst Bio / Notes</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setName(currentUser?.name || '');
                      setEmail(currentUser?.email || '');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ACCOUNT INFORMATION & DANGER ZONE */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-3">
                  Account Details
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">ACCOUNT ID</span>
                    <span className="text-blue-400 font-bold font-mono">{currentUser?.id}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">ACCOUNT TYPE</span>
                    <span className="text-slate-200 font-semibold">{currentUser?.accountType}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">STATUS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {currentUser?.status}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">ROLE</span>
                    <span className="text-slate-200 font-semibold">{currentUser?.role}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">ORGANIZATION</span>
                    <span className="text-slate-200 truncate block">{currentUser?.organization}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">CREATED DATE</span>
                    <span className="text-slate-400">{currentUser?.createdDate}</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2 border-b border-red-500/20 pb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>DANGER ZONE</span>
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-slate-200">Sign Out of Console</div>
                    <div className="text-slate-400 font-sans text-xs">End current session and return to Sign In page.</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/signin');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs"
                  >
                    Sign Out
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs pt-3 border-t border-red-500/20">
                  <div>
                    <div className="font-bold text-red-400">Delete Demo Account</div>
                    <div className="text-slate-400 font-sans text-xs">Clears local user profile and returns system to default baseline.</div>
                  </div>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow"
                  >
                    Delete Demo Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & 2FA */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Password Change Card */}
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Key className="w-4 h-4 text-blue-400" />
                  <span>Change Password</span>
                </h2>

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                  >
                    CHANGE PASSWORD
                  </button>
                </form>
              </div>

              {/* Two-Factor Authentication Card */}
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>Two-Factor Authentication (2FA)</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Add an additional layer of security using TOTP Authenticator apps (Google Authenticator / Authy).
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${
                      currentUser?.twoFactorEnabled
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${currentUser?.twoFactorEnabled ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      <span>{currentUser?.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}</span>
                    </span>

                    <button
                      onClick={() => setIs2FAModalOpen(true)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs shadow transition-all ${
                        currentUser?.twoFactorEnabled
                          ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {currentUser?.twoFactorEnabled ? 'MANAGE 2FA' : 'ENABLE 2FA'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Activity Table */}
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-3">
                  Recent Login Activity
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                        <th className="pb-2 font-semibold">Device</th>
                        <th className="pb-2 font-semibold">Location</th>
                        <th className="pb-2 font-semibold">IP Address</th>
                        <th className="pb-2 font-semibold">Date & Time</th>
                        <th className="pb-2 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {loginActivity.map((log) => (
                        <tr key={log.id}>
                          <td className="py-2.5 font-bold text-slate-200">{log.device}</td>
                          <td className="py-2.5 text-slate-300">{log.location}</td>
                          <td className="py-2.5 font-mono text-slate-400">{log.ipAddress}</td>
                          <td className="py-2.5 text-slate-500 text-[11px]">{log.date}</td>
                          <td className="py-2.5 text-right font-bold text-emerald-400">{log.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVE SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-blue-400" />
                    <span>Active Login Sessions</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Manage active devices connected to your analyst account.
                  </p>
                </div>

                {sessions.length > 1 && (
                  <button
                    onClick={() => setIsRevokeAllModalOpen(true)}
                    className="px-3.5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold"
                  >
                    SIGN OUT ALL OTHER SESSIONS
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div key={sess.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                        <span>{sess.device}</span>
                        <span>•</span>
                        <span className="text-slate-400">{sess.browser}</span>
                        {sess.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                            THIS DEVICE (CURRENT)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        IP: <span className="text-slate-200 font-mono">{sess.ipAddress}</span> ({sess.location}) — Last active: {sess.lastActive}
                      </div>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        onClick={() => {
                          revokeSession(sess.id);
                          addNotification('Session Revoked', `Revoked session ${sess.device}`, 'info');
                        }}
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 text-xs font-bold self-start sm:self-center"
                      >
                        REVOKE
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATION PREFERENCES */}
          {activeTab === 'notifications' && (
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Notification Preferences</span>
              </h2>

              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-2">
                  <div className="font-mono font-bold text-slate-300 uppercase tracking-wider text-[11px]">Threat Alerts</div>
                  {[
                    { key: 'criticalThreats', label: 'Critical Threat Alerts', desc: 'Instant push alert when critical ransomware or zero-day email payload is ingested.' },
                    { key: 'highRiskPhishing', label: 'High-Risk Phishing Detection', desc: 'Alert when email score exceeds 80/100 risk threshold.' },
                    { key: 'suspiciousIOCs', label: 'Suspicious IOC Matches', desc: 'Notification when inbound IP matches active CERT-In or Tor feed.' }
                  ].map(item => (
                    <label key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                      <div>
                        <div className="font-bold text-slate-200">{item.label}</div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={(notificationPrefs as any)[item.key]}
                        onChange={(e) => updateNotificationPrefs({ [item.key]: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-blue-500"
                      />
                    </label>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="font-mono font-bold text-slate-300 uppercase tracking-wider text-[11px]">Incidents & Reports</div>
                  {[
                    { key: 'incidentAssigned', label: 'New Incident Assigned', desc: 'Notify when automated triage assigns a new case.' },
                    { key: 'evidenceVerified', label: 'Evidence Ledger Verification', desc: 'Notify when SHA-256 block hash is anchored to chain.' },
                    { key: 'reportGenerated', label: 'Report Generated', desc: 'Notify when printable forensic report is compiled.' }
                  ].map(item => (
                    <label key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                      <div>
                        <div className="font-bold text-slate-200">{item.label}</div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={(notificationPrefs as any)[item.key]}
                        onChange={(e) => updateNotificationPrefs({ [item.key]: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: APPEARANCE & PREFERENCES */}
          {activeTab === 'appearance' && (
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Appearance & System Preferences</span>
              </h2>

              <div className="space-y-6 text-xs">
                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-200">Console Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'dark', label: 'Dark Mode (SOC Default)' },
                      { key: 'light', label: 'Light Mode (Optional)' },
                      { key: 'system', label: 'System Preference' }
                    ].map(t => (
                      <div
                        key={t.key}
                        onClick={() => updateAppearancePrefs({ theme: t.key as any })}
                        className={`p-3 rounded-lg border cursor-pointer text-center font-bold transition-all ${
                          appearancePrefs.theme === t.key
                            ? 'bg-blue-600 text-white border-blue-500 shadow'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {t.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interface Density */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-200">Interface Layout Density</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'comfortable', label: 'Comfortable Spacing' },
                      { key: 'compact', label: 'Compact Information Density' }
                    ].map(d => (
                      <div
                        key={d.key}
                        onClick={() => updateAppearancePrefs({ density: d.key as any })}
                        className={`p-3 rounded-lg border cursor-pointer text-center font-bold transition-all ${
                          appearancePrefs.density === d.key
                            ? 'bg-blue-600 text-white border-blue-500 shadow'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {d.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animations Toggle */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">Enable Transitions & Gauge Animations</div>
                    <div className="text-[11px] text-slate-400 font-sans">Radial score ring & timeline entrance animations.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={appearancePrefs.enableAnimations}
                    onChange={(e) => updateAppearancePrefs({ enableAnimations: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2FA SETUP MODAL */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Prototype 2FA Setup</span>
              </div>
              <button onClick={() => setIs2FAModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Scan this QR code with your authenticator app (Google Authenticator, Authy, or 1Password) to pair your analyst account.
            </p>

            {/* QR Code Placeholder Graphic */}
            <div className="p-4 rounded-xl bg-white flex items-center justify-center mx-auto w-44 h-44 shadow-inner">
              <div className="w-36 h-36 border-4 border-slate-900 grid grid-cols-6 gap-1 p-1 bg-slate-900">
                <div className="bg-white col-span-2 row-span-2" />
                <div className="bg-[#0D121F]" />
                <div className="bg-white col-span-2" />
                <div className="bg-white col-span-2 row-span-2" />
                <div className="bg-white" />
              </div>
            </div>

            <div className="text-center text-[11px] font-mono text-slate-400">
              Secret Key: <span className="text-blue-400 font-bold select-all">SIH2026-CYBER-SHIELD-2FA</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setIs2FAModalOpen(false)}
                className="flex-1 py-2 rounded bg-slate-950 border border-slate-800 text-slate-400 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm2FA}
                className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                {currentUser?.twoFactorEnabled ? 'Disable 2FA' : 'Confirm 2FA Setup'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVOKE ALL SESSIONS MODAL */}
      {isRevokeAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span>Sign Out All Other Sessions</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Are you sure you want to sign out all other active devices? All other sessions will be revoked immediately.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsRevokeAllModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                Cancel
              </button>
              <button onClick={handleConfirmRevokeAll} className="px-4 py-1.5 rounded bg-red-600 text-white font-bold text-xs">
                Revoke All Other Sessions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE DEMO ACCOUNT MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-red-500/40 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="font-bold text-sm text-red-400 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete Demo Account?</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              This will clear your local user profile and return the system to default baseline state. Unrelated demo data will remain intact.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                Cancel
              </button>
              <button onClick={handleConfirmDeleteAccount} className="px-4 py-1.5 rounded bg-red-600 text-white font-bold text-xs">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
