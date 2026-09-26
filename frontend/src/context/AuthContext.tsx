import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  SessionInfo,
  LoginActivity,
  NotificationPreferences,
  AppearancePreferences,
  UserRole
} from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  sessions: SessionInfo[];
  loginActivity: LoginActivity[];
  notificationPrefs: NotificationPreferences;
  appearancePrefs: AppearancePreferences;
  
  // Actions
  login: (email: string, password?: string) => boolean;
  loginDemo: () => void;
  signup: (data: { name: string; email: string; organization: string; role: UserRole }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  toggleTwoFactor: (enable: boolean) => void;
  updateNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;
  updateAppearancePrefs: (prefs: Partial<AppearancePreferences>) => void;
  revokeSession: (sessionId: string) => void;
  revokeAllOtherSessions: () => void;
  deleteDemoAccount: () => void;
  requestPasswordReset: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'SIH2026_AUTH_USER_V2';
const SESSIONS_STORAGE_KEY = 'SIH2026_SESSIONS_V2';
const NOTIF_PREFS_KEY = 'SIH2026_NOTIF_PREFS_V2';
const APPEARANCE_PREFS_KEY = 'SIH2026_APPEARANCE_PREFS_V2';

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-sih2026-demo',
  name: 'Ravendra Patel',
  email: 'analyst@cybermail.demo',
  organization: 'AICTE Cyber Security Cell',
  role: 'Security Analyst',
  phone: '+91 98765 43210',
  bio: 'Lead SOC triage specialist for SIH 2026 email threat intelligence.',
  accountType: 'Demo Analyst (SIH 2026)',
  createdDate: '15 Aug 2026',
  lastLogin: 'Today, 19:14 IST',
  status: 'Active',
  twoFactorEnabled: false
};

const DEFAULT_SESSIONS: SessionInfo[] = [
  {
    id: 'sess-1',
    device: 'MacBook Pro (macOS)',
    browser: 'Chrome 122.0',
    location: 'Bhopal, India',
    ipAddress: '192.168.1.3',
    lastActive: 'Active Now',
    isCurrent: true
  },
  {
    id: 'sess-2',
    device: 'Windows Workstation',
    browser: 'Edge 121.0',
    location: 'Delhi, India',
    ipAddress: '103.251.167.89',
    lastActive: '2 hours ago',
    isCurrent: false
  }
];

const DEFAULT_LOGIN_ACTIVITY: LoginActivity[] = [
  {
    id: 'log-1',
    device: 'MacBook Pro',
    location: 'Bhopal, India',
    ipAddress: '192.168.1.3',
    date: 'Today, 19:14 IST',
    status: 'Current Session'
  },
  {
    id: 'log-2',
    device: 'Windows Workstation',
    location: 'Delhi, India',
    ipAddress: '103.251.167.89',
    date: 'Yesterday, 14:22 IST',
    status: 'Successful'
  },
  {
    id: 'log-3',
    device: 'iPhone 15 Pro',
    location: 'Mumbai, India',
    ipAddress: '49.36.12.90',
    date: '24 Sep 2026, 09:10 IST',
    status: 'Successful'
  }
];

const DEFAULT_NOTIF_PREFS: NotificationPreferences = {
  criticalThreats: true,
  highRiskPhishing: true,
  suspiciousIOCs: true,
  incidentAssigned: true,
  incidentStatusChanged: true,
  evidenceVerified: true,
  reportGenerated: true,
  investigationCompleted: true,
  productUpdates: true,
  marketingCommunications: false
};

const DEFAULT_APPEARANCE_PREFS: AppearancePreferences = {
  theme: 'dark',
  density: 'comfortable',
  enableAnimations: true,
  language: 'English',
  timezone: 'Asia/Kolkata (IST)',
  dateFormat: 'DD/MM/YYYY',
  defaultDashboard: 'Security Operations Center'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });

  const [sessions, setSessions] = useState<SessionInfo[]>(() => {
    const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SESSIONS;
  });

  const [loginActivity] = useState<LoginActivity[]>(DEFAULT_LOGIN_ACTIVITY);

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem(NOTIF_PREFS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_NOTIF_PREFS;
  });

  const [appearancePrefs, setAppearancePrefs] = useState<AppearancePreferences>(() => {
    const saved = localStorage.getItem(APPEARANCE_PREFS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_APPEARANCE_PREFS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(notificationPrefs));
  }, [notificationPrefs]);

  useEffect(() => {
    localStorage.setItem(APPEARANCE_PREFS_KEY, JSON.stringify(appearancePrefs));
  }, [appearancePrefs]);

  const login = (email: string) => {
    const user: UserProfile = {
      ...DEFAULT_DEMO_USER,
      email: email || 'analyst@cybermail.demo',
      name: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Ravendra Patel',
      lastLogin: 'Just Now'
    };
    setCurrentUser(user);
    return true;
  };

  const loginDemo = () => {
    setCurrentUser(DEFAULT_DEMO_USER);
  };

  const signup = (data: { name: string; email: string; organization: string; role: UserRole }) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      organization: data.organization || 'AICTE Cyber Security Cell',
      role: data.role || 'Security Analyst',
      accountType: 'Registered Analyst (Prototype)',
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastLogin: 'Just Now',
      status: 'Active',
      twoFactorEnabled: false
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setCurrentUser(prev => prev ? { ...prev, ...data } : null);
  };

  const changePassword = () => {
    return true;
  };

  const toggleTwoFactor = (enable: boolean) => {
    setCurrentUser(prev => prev ? { ...prev, twoFactorEnabled: enable } : null);
  };

  const updateNotificationPrefs = (prefs: Partial<NotificationPreferences>) => {
    setNotificationPrefs(prev => ({ ...prev, ...prefs }));
  };

  const updateAppearancePrefs = (prefs: Partial<AppearancePreferences>) => {
    setAppearancePrefs(prev => ({ ...prev, ...prefs }));
  };

  const revokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const revokeAllOtherSessions = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
  };

  const deleteDemoAccount = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const requestPasswordReset = () => {
    // prototype reset logic
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        sessions,
        loginActivity,
        notificationPrefs,
        appearancePrefs,
        login,
        loginDemo,
        signup,
        logout,
        updateProfile,
        changePassword,
        toggleTwoFactor,
        updateNotificationPrefs,
        updateAppearancePrefs,
        revokeSession,
        revokeAllOtherSessions,
        deleteDemoAccount,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
