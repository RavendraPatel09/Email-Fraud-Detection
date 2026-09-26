import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { SearchModal } from './components/layout/SearchModal';

import { DashboardPage } from './pages/DashboardPage';
import { EmailAnalyzerPage } from './pages/EmailAnalyzerPage';
import { ThreatIntelPage } from './pages/ThreatIntelPage';
import { InvestigationsPage } from './pages/InvestigationsPage';
import { EvidenceLedgerPage } from './pages/EvidenceLedgerPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

const AppLayout: React.FC = () => {
  const { isPresentationMode } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-[#0B0F17] relative">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/analyzer" element={<EmailAnalyzerPage />} />
            <Route path="/intelligence" element={<ThreatIntelPage />} />
            <Route path="/investigations" element={<InvestigationsPage />} />
            <Route path="/evidence" element={<EvidenceLedgerPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/profile" element={<SettingsPage />} />
            <Route path="/settings/security" element={<SettingsPage />} />
            <Route path="/settings/notifications" element={<SettingsPage />} />
            <Route path="/settings/appearance" element={<SettingsPage />} />
            <Route path="/settings/sessions" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Drawers & Modals */}
      <NotificationDrawer />
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Unauthenticated Auth Routes */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Platform Shell */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
