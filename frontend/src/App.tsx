import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
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
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
