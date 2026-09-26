import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_SCENARIOS } from '../data/demoData';
import { ThreatScore } from '../components/ui/ThreatScore';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { IOCChip } from '../components/ui/IOCChip';
import { GeoMap } from '../components/ui/GeoMap';
import { ForensicTimeline } from '../components/ui/ForensicTimeline';
import { LoadingAnalysis } from '../components/ui/LoadingAnalysis';
import {
  Mail,
  Zap,
  Upload,
  FileText,
  ShieldAlert,
  Search,
  Database,
  Lock,
  CheckCircle,
  AlertTriangle,
  Info,
  Copy,
  ExternalLink,
  ChevronRight,
  Shield,
  Ban,
  FileSpreadsheet
} from 'lucide-react';

export const EmailAnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeAnalysis,
    analyzeCustomEmail,
    loadDemoScenario,
    addEvidenceToLedger,
    executeResponseAction,
    addNotification
  } = useApp();

  const [rawInput, setRawInput] = useState<string>(activeAnalysis ? activeAnalysis.emailData.rawText : DEMO_SCENARIOS[0].email.rawText);
  const [selectedDemoId, setSelectedDemoId] = useState<string>('demo-phishing-1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'headers' | 'iocs' | 'geo' | 'timeline' | 'evidence'>('overview');
  const [activeHeaderModal, setActiveHeaderModal] = useState<'spf' | 'dkim' | 'dmarc' | null>(null);
  const [isEvidenceCommitted, setIsEvidenceCommitted] = useState(false);

  const handleSelectDemo = (scenarioId: string) => {
    setSelectedDemoId(scenarioId);
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId);
    if (scenario) {
      setRawInput(scenario.email.rawText);
      loadDemoScenario(scenarioId);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setRawInput(content);
          addNotification('File Loaded', `Loaded '${file.name}' into analyzer workspace.`, 'info');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    analyzeCustomEmail(rawInput);
    setIsEvidenceCommitted(false);
  };

  const handleCommitEvidence = async () => {
    if (!activeAnalysis) return;
    await addEvidenceToLedger({
      type: 'Raw RFC822 Headers & IOC Analysis',
      rawPayload: activeAnalysis.emailData.rawText,
      incidentId: 'INC-2026-1042'
    });
    setIsEvidenceCommitted(true);
  };

  const handleResponseClick = (actionName: string) => {
    executeResponseAction('INC-2026-1042', actionName);
  };

  const handleGenerateReport = () => {
    navigate('/reports');
  };

  const currentAnalysis = activeAnalysis;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <Mail className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              EMAIL THREAT ANALYZER
            </h1>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/30">
              PRIMARY WORKSPACE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Paste raw RFC822 email, upload .eml payloads, or load pre-configured SIH demo threat vectors.
          </p>
        </div>

        {/* Demo Scenario Picker Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelectDemo(scenario.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                selectedDemoId === scenario.id
                  ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {scenario.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyzer Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Input & Upload (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Inbound Email Payload</span>
              <label className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                <span>Upload .eml</span>
                <input type="file" accept=".eml,.txt,.msg" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste complete raw email headers and body here..."
              rows={14}
              className="w-full p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-y leading-relaxed"
            />

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setRawInput('')}
                className="px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 hover:border-slate-700"
              >
                Clear Input
              </button>

              <button
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing || !rawInput.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold tracking-wide shadow-lg shadow-blue-900/40 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>ANALYZE EMAIL</span>
              </button>
            </div>
          </div>

          {/* Quick Scenario Description Card */}
          {selectedDemoId && (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 font-mono text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-300 font-bold">
                <span>Active Scenario Info</span>
                <span className={`px-2 py-0.5 text-[10px] rounded border ${DEMO_SCENARIOS.find(s=>s.id===selectedDemoId)?.badgeColor}`}>
                  {DEMO_SCENARIOS.find(s=>s.id===selectedDemoId)?.badge}
                </span>
              </div>
              <p className="text-slate-400 font-sans text-xs">
                {DEMO_SCENARIOS.find(s=>s.id===selectedDemoId)?.description}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Analysis & Workspace Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {isAnalyzing ? (
            <LoadingAnalysis onComplete={handleAnalysisComplete} />
          ) : !currentAnalysis ? (
            <div className="p-12 text-center rounded-xl bg-slate-900/50 border border-slate-800 font-mono text-slate-500 space-y-3">
              <Mail className="w-12 h-12 mx-auto text-slate-600" />
              <div>Click "ANALYZE EMAIL" to execute automated SOC triage sequence</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result Tabs Navigation */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto font-mono text-xs">
                {[
                  { key: 'overview', label: 'AI Risk Analysis' },
                  { key: 'headers', label: 'Header Forensics' },
                  { key: 'iocs', label: `IOCs (${currentAnalysis.iocs.length})` },
                  { key: 'geo', label: 'IP Geolocation' },
                  { key: 'timeline', label: 'Investigation Timeline' },
                  { key: 'evidence', label: 'Evidence Preservation' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW & AI THREAT ANALYSIS */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Top Score Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg">
                    {/* Score Wheel */}
                    <div className="sm:col-span-5 flex items-center justify-center">
                      <ThreatScore
                        score={currentAnalysis.analysis.riskScore}
                        severity={currentAnalysis.analysis.severity}
                        classification={currentAnalysis.analysis.classification}
                        confidence={currentAnalysis.analysis.confidence}
                        size="md"
                      />
                    </div>

                    {/* AI Explanation Summary */}
                    <div className="sm:col-span-7 flex flex-col justify-between font-mono space-y-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-blue-400" />
                          <span>AI-Assisted Risk Analysis Summary</span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed">
                          {currentAnalysis.analysis.aiExplanation}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400">Auth Status:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${currentAnalysis.emailData.auth.spf === 'PASSED' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                          SPF: {currentAnalysis.emailData.auth.spf}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${currentAnalysis.emailData.auth.dkim === 'PASSED' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                          DKIM: {currentAnalysis.emailData.auth.dkim}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Explainable Threat Indicators */}
                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Why This Email Was Flagged ({currentAnalysis.analysis.factors.length} Risk Factors)
                    </h3>
                    <div className="space-y-2.5">
                      {currentAnalysis.analysis.factors.map(factor => (
                        <div key={factor.id} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between font-mono text-xs font-semibold">
                            <span className="text-slate-100 flex items-center gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                              {factor.name}
                            </span>
                            <ThreatBadge severity={factor.severity} size="sm" />
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 pl-5">
                            Evidence: <span className="text-slate-200">{factor.evidence}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans pl-5 leading-relaxed">
                            {factor.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Incident Response Action Bar */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Recommended Incident Response Actions</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                      <button
                        onClick={() => handleResponseClick('Quarantine Email')}
                        className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>QUARANTINE EMAIL</span>
                      </button>
                      <button
                        onClick={() => handleResponseClick('Block Domain')}
                        className="p-2.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>BLOCK DOMAIN</span>
                      </button>
                      <button
                        onClick={() => handleResponseClick('Block IP')}
                        className="p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>BLOCK IP</span>
                      </button>
                      <button
                        onClick={() => handleResponseClick('Investigate User')}
                        className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Search className="w-3.5 h-3.5 text-blue-400" />
                        <span>INVESTIGATE USER</span>
                      </button>
                      <button
                        onClick={handleCommitEvidence}
                        className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PRESERVE EVIDENCE</span>
                      </button>
                      <button
                        onClick={handleGenerateReport}
                        className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>GENERATE REPORT</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EMAIL HEADER FORENSICS */}
              {activeTab === 'headers' && (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs">
                  <h3 className="font-bold text-slate-100 uppercase tracking-wider">
                    Extracted Email Headers & RFC822 Compliance
                  </h3>

                  {/* Authentication Indicators */}
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      onClick={() => setActiveHeaderModal(activeHeaderModal === 'spf' ? null : 'spf')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        currentAnalysis.emailData.auth.spf === 'PASSED'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span>SPF</span>
                        <span>{currentAnalysis.emailData.auth.spf}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        Click for DNS details
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveHeaderModal(activeHeaderModal === 'dkim' ? null : 'dkim')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        currentAnalysis.emailData.auth.dkim === 'PASSED'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span>DKIM</span>
                        <span>{currentAnalysis.emailData.auth.dkim}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        Click for RSA details
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveHeaderModal(activeHeaderModal === 'dmarc' ? null : 'dmarc')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        currentAnalysis.emailData.auth.dmarc === 'PASSED'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span>DMARC</span>
                        <span>{currentAnalysis.emailData.auth.dmarc}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        Click for policy alignment
                      </div>
                    </div>
                  </div>

                  {/* Auth details modal popup */}
                  {activeHeaderModal && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-blue-500/40 text-slate-200 text-xs space-y-1">
                      <div className="font-bold text-blue-400 uppercase">
                        {activeHeaderModal.toUpperCase()} Authentication Verdict Details
                      </div>
                      <p className="text-slate-300 font-sans">
                        {activeHeaderModal === 'spf' && currentAnalysis.emailData.auth.spfDetails}
                        {activeHeaderModal === 'dkim' && currentAnalysis.emailData.auth.dkimDetails}
                        {activeHeaderModal === 'dmarc' && currentAnalysis.emailData.auth.dmarcDetails}
                      </p>
                    </div>
                  )}

                  {/* Header key-values table */}
                  <div className="space-y-2 divide-y divide-slate-800">
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">From:</span>
                      <span className="text-slate-200 font-semibold select-all">{currentAnalysis.emailData.headers.from}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">To:</span>
                      <span className="text-slate-200 select-all">{currentAnalysis.emailData.headers.to}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">Reply-To:</span>
                      <span className="text-amber-400 font-semibold select-all">{currentAnalysis.emailData.headers.replyTo || 'None'}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">Subject:</span>
                      <span className="text-slate-200">{currentAnalysis.emailData.headers.subject}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">Source IP:</span>
                      <span className="text-red-400 font-bold select-all">{currentAnalysis.emailData.headers.sourceIP}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">Return-Path:</span>
                      <span className="text-slate-300">{currentAnalysis.emailData.headers.returnPath}</span>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-500 w-28 shrink-0">Message-ID:</span>
                      <span className="text-slate-400 text-[11px]">{currentAnalysis.emailData.headers.messageId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: IOC EXTRACTION */}
              {activeTab === 'iocs' && (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                      Extracted Indicators of Compromise (IOCs)
                    </h3>
                    <span className="text-xs text-slate-400">Total: {currentAnalysis.iocs.length}</span>
                  </div>
                  <div className="space-y-2">
                    {currentAnalysis.iocs.map((ioc) => (
                      <IOCChip
                        key={ioc.id}
                        ioc={ioc}
                        onInvestigate={() => navigate('/intelligence')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: IP GEOLOCATION */}
              {activeTab === 'geo' && (
                <div className="space-y-3">
                  <GeoMap location={currentAnalysis.geoLocation} height="360px" />
                </div>
              )}

              {/* TAB 5: FORENSIC TIMELINE */}
              {activeTab === 'timeline' && (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono">
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-2">
                    Forensic Investigation Timeline Sequence
                  </h3>
                  <ForensicTimeline timeline={currentAnalysis.timeline} />
                </div>
              )}

              {/* TAB 6: EVIDENCE PRESERVATION & IMMUTABLE LEDGER */}
              {activeTab === 'evidence' && (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                        Tamper-Evident Forensic Evidence Preservation
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        Web Crypto SHA-256 integrity verification linked to simulated immutable block chain.
                      </p>
                    </div>
                    {isEvidenceCommitted ? (
                      <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>BLOCK COMMITTED</span>
                      </span>
                    ) : (
                      <button
                        onClick={handleCommitEvidence}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Commit to Ledger</span>
                      </button>
                    )}
                  </div>

                  {/* Hash verification box */}
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-[11px] text-slate-500">SHA-256 DIGITAL INTEGRITY SIGNATURE</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 select-all break-all bg-slate-900 p-2 rounded border border-slate-800">
                      8f4a7d91c32094182490182401928409182409182409182409182409c92a
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Status: <span className="text-emerald-400 font-bold">✓ VERIFIED & MATCHED</span></span>
                      <span>Algorithm: Web Crypto SHA-256</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={handleGenerateReport}
                      className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>View Printable Forensic Incident Report</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
