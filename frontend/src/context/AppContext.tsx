import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident, IOC, LedgerBlock, EvidenceItem, Notification, EmailData, ThreatAnalysis, GeoLocation, ForensicTimelineEvent, IncidentStatus } from '../types';
import { DEMO_SCENARIOS, INITIAL_INCIDENTS, INITIAL_IOCS, INITIAL_LEDGER_BLOCKS, RECENT_THREAT_EVENTS } from '../data/demoData';
import { analyzeEmailContent } from '../utils/analyzer';
import { computeSHA256 } from '../utils/crypto';

interface AnalysisState {
  emailData: EmailData;
  analysis: ThreatAnalysis;
  timeline: ForensicTimelineEvent[];
  iocs: IOC[];
  geoLocation: GeoLocation;
}

interface AppContextType {
  incidents: Incident[];
  iocs: IOC[];
  ledgerBlocks: LedgerBlock[];
  evidenceItems: EvidenceItem[];
  notifications: Notification[];
  activeAnalysis: AnalysisState | null;
  activeIncident: Incident | null;
  isPresentationMode: boolean;
  isDemoMode: boolean;
  searchQuery: string;
  isSearchOpen: boolean;
  isNotificationOpen: boolean;
  
  // Actions
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsNotificationOpen: (open: boolean) => void;
  togglePresentationMode: () => void;
  toggleDemoMode: () => void;
  loadDemoScenario: (scenarioId: string) => void;
  analyzeCustomEmail: (rawText: string) => AnalysisState;
  setActiveIncident: (incident: Incident | null) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  executeResponseAction: (incidentId: string, actionName: string) => void;
  blockIOC: (iocId: string) => void;
  addEvidenceToLedger: (evidence: { type: string; rawPayload: string; incidentId: string }) => Promise<LedgerBlock>;
  addNotification: (title: string, message: string, type?: Notification['type']) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'SIH2026_SOC_STATE_V1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [iocs, setIOCs] = useState<IOC[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_iocs');
    return saved ? JSON.parse(saved) : INITIAL_IOCS;
  });

  const [ledgerBlocks, setLedgerBlocks] = useState<LedgerBlock[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER_BLOCKS;
  });

  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n-1',
      timestamp: '16:42',
      title: 'High-Risk Phishing Detected',
      message: 'PayPal impersonation email received from 185.220.101.45',
      type: 'danger',
      read: false
    },
    {
      id: 'n-2',
      timestamp: '16:41',
      title: 'Evidence Hashed',
      message: 'SHA-256 evidence record appended to ledger block #104582',
      type: 'success',
      read: false
    }
  ]);

  // Initial default active analysis (Phishing demo)
  const defaultPhishing = DEMO_SCENARIOS[0];
  const initialAnalysisObj = analyzeEmailContent(defaultPhishing.email.rawText, defaultPhishing.geoLocation);

  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisState | null>(initialAnalysisObj);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_iocs', JSON.stringify(iocs));
  }, [iocs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_ledger', JSON.stringify(ledgerBlocks));
  }, [ledgerBlocks]);

  const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      title,
      message,
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const togglePresentationMode = () => {
    setIsPresentationMode(prev => !prev);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  const loadDemoScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId) || DEMO_SCENARIOS[0];
    const result = analyzeEmailContent(scenario.email.rawText, scenario.geoLocation);
    setActiveAnalysis(result);
    addNotification('Demo Loaded', `Loaded '${scenario.name}' into analyzer context.`, 'info');
  };

  const analyzeCustomEmail = (rawText: string) => {
    const result = analyzeEmailContent(rawText);
    setActiveAnalysis(result);
    
    // Auto sync newly found IOCs to global table
    setIOCs(prev => {
      const existingValues = new Set(prev.map(i => i.value));
      const newItems = result.iocs.filter(i => !existingValues.has(i.value));
      return [...newItems, ...prev];
    });

    addNotification('Analysis Complete', `Email analyzed: ${result.analysis.riskScore}/100 Risk Score (${result.analysis.severity}).`, result.analysis.severity === 'HIGH' || result.analysis.severity === 'CRITICAL' ? 'danger' : 'info');
    return result;
  };

  const updateIncidentStatus = (id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status, updatedAt: new Date().toLocaleString() } : inc));
    if (activeIncident && activeIncident.id === id) {
      setActiveIncident(prev => prev ? { ...prev, status, updatedAt: new Date().toLocaleString() } : null);
    }
    addNotification('Incident Updated', `Incident #${id} status changed to ${status}`, 'success');
  };

  const executeResponseAction = (incidentId: string, actionName: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const actions = inc.actionsTaken || [];
        if (!actions.includes(actionName)) {
          actions.push(actionName);
        }
        let updatedStatus = inc.status;
        if (actionName.toLowerCase().includes('quarantine')) updatedStatus = 'QUARANTINED';
        if (actionName.toLowerCase().includes('resolve')) updatedStatus = 'RESOLVED';
        return {
          ...inc,
          status: updatedStatus,
          actionsTaken: [...actions],
          updatedAt: new Date().toLocaleString()
        };
      }
      return inc;
    }));

    if (activeIncident && activeIncident.id === incidentId) {
      const actions = activeIncident.actionsTaken || [];
      if (!actions.includes(actionName)) actions.push(actionName);
      setActiveIncident({
        ...activeIncident,
        actionsTaken: [...actions],
        status: actionName.toLowerCase().includes('quarantine') ? 'QUARANTINED' : activeIncident.status
      });
    }

    addNotification('Response Action Executed', `[${actionName}] executed for ${incidentId}`, 'success');
  };

  const blockIOC = (iocId: string) => {
    setIOCs(prev => prev.map(item => item.id === iocId ? { ...item, blocked: true, reputation: 'MALICIOUS' } : item));
    addNotification('IOC Blocked', `Indicator ${iocId} added to perimeter blocklist`, 'warning');
  };

  const addEvidenceToLedger = async (evidence: { type: string; rawPayload: string; incidentId: string }) => {
    const hash = await computeSHA256(evidence.rawPayload);
    const newEvdId = `EVD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEvdItem: EvidenceItem = {
      id: newEvdId,
      incidentId: evidence.incidentId,
      timestamp: new Date().toLocaleString(),
      type: evidence.type,
      hash,
      algorithm: 'SHA-256',
      verified: true,
      rawPayload: evidence.rawPayload
    };
    setEvidenceItems(prev => [newEvdItem, ...prev]);

    const lastBlock = ledgerBlocks[ledgerBlocks.length - 1];
    const newBlockNumber = lastBlock ? lastBlock.blockNumber + 1 : 104583;
    const previousHash = lastBlock ? lastBlock.blockHash : '00008f4a7d91c32094182490182401928409182409182409182409182409c92a';
    
    // Compute block hash
    const blockPayload = `${newBlockNumber}:${newEvdId}:${hash}:${previousHash}`;
    const blockHashHex = await computeSHA256(blockPayload);
    const formattedBlockHash = `0000${blockHashHex.slice(4)}`;

    const newBlock: LedgerBlock = {
      blockNumber: newBlockNumber,
      blockHash: formattedBlockHash,
      previousHash,
      evidenceId: newEvdId,
      timestamp: new Date().toLocaleString(),
      status: 'VERIFIED',
      dataSummary: `${evidence.type} preservation for ${evidence.incidentId}`
    };

    setLedgerBlocks(prev => [...prev, newBlock]);
    addNotification('Ledger Block Created', `Block #${newBlockNumber} linked with SHA-256 evidence hash ${hash.slice(0, 10)}...`, 'success');
    return newBlock;
  };

  const resetDemo = () => {
    setIncidents(INITIAL_INCIDENTS);
    setIOCs(INITIAL_IOCS);
    setLedgerBlocks(INITIAL_LEDGER_BLOCKS);
    setActiveAnalysis(initialAnalysisObj);
    setActiveIncident(INITIAL_INCIDENTS[0]);
    addNotification('Demo Reset', 'All states restored to SIH presentation baseline.', 'info');
  };

  return (
    <AppContext.Provider value={{
      incidents,
      iocs,
      ledgerBlocks,
      evidenceItems,
      notifications,
      activeAnalysis,
      activeIncident,
      isPresentationMode,
      isDemoMode,
      searchQuery,
      isSearchOpen,
      isNotificationOpen,
      setSearchQuery,
      setIsSearchOpen,
      setIsNotificationOpen,
      togglePresentationMode,
      toggleDemoMode,
      loadDemoScenario,
      analyzeCustomEmail,
      setActiveIncident,
      updateIncidentStatus,
      executeResponseAction,
      blockIOC,
      addEvidenceToLedger,
      addNotification,
      resetDemo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
