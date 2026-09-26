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
  ChevronRight,
  Shield,
  Ban,
  FileSpreadsheet,
  FileSearch,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const EmailAnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeAnalysis,
    analyzeCustomEmail,
    addEvidenceToLedger,
    executeResponseAction,
    addNotification
  } = useApp();

  const [inputTab, setInputTab] = useState<'paste' | 'upload'>('paste');
  const [rawInput, setRawInput] = useState<string>(
    activeAnalysis ? activeAnalysis.emailData.rawText : DEMO_SCENARIOS[0].email.rawText
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [activeTechTab, setActiveTechTab] = useState<'headers' | 'iocs' | 'geo' | 'timeline' | 'evidence'>('headers');
  const [isEvidenceCommitted, setIsEvidenceCommitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setRawInput(content);
          addNotification('File Loaded', `Loaded '${file.name}' into analyzer.`, 'info');
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
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Email Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Check an email for phishing indicators, suspicious links, authentication failures, and other threats.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Input Area (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setInputTab('paste')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    inputTab === 'paste' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Paste Email
                </button>
                <button
                  onClick={() => setInputTab('upload')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    inputTab === 'upload' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upload .eml
                </button>
              </div>
            </div>

            {inputTab === 'paste' ? (
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="Paste the email content or email headers here..."
                rows={14}
                className="w-full p-3 rounded-lg bg-slate-50 text-slate-900 font-mono text-xs border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 leading-relaxed resize-y"
              />
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg space-y-3">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-600 font-medium">Select or drag an .eml payload file here</div>
                <label className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer shadow-xs">
                  Browse Files
                  <input type="file" accept=".eml,.txt,.msg" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => setRawInput('')}
                className="px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200"
              >
                Clear Input
              </button>

              <button
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing || !rawInput.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Analyze Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Results Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {isAnalyzing ? (
            <LoadingAnalysis onComplete={handleAnalysisComplete} />
          ) : !currentAnalysis ? (
            <div className="p-12 text-center rounded-xl bg-white border border-slate-200 text-slate-500 space-y-2">
              <FileSearch className="w-10 h-10 mx-auto text-slate-400" />
              <div className="text-xs font-medium">Click "Analyze Email" to start threat assessment</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* FIRST LAYER: Threat Summary Box */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Assessment Verdict
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-0.5">
                      {currentAnalysis.analysis.riskScore >= 75 ? 'Threat Detected' : 'Email Assessment Complete'}
                    </h2>
                  </div>

                  <ThreatBadge severity={currentAnalysis.analysis.severity} size="lg" />
                </div>

                <ThreatScore
                  score={currentAnalysis.analysis.riskScore}
                  severity={currentAnalysis.analysis.severity}
                  classification={currentAnalysis.analysis.classification}
                  confidence={currentAnalysis.analysis.confidence}
                />

                <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {currentAnalysis.analysis.aiExplanation}
                </p>
              </div>

              {/* SECOND LAYER: Why was this flagged? */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Why was this flagged?
                </h3>
                <div className="space-y-2">
                  {currentAnalysis.analysis.factors.map((factor) => (
                    <div key={factor.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900">{factor.name}</div>
                        <div className="text-slate-600 text-xs mt-0.5">{factor.explanation}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Details Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>{showTechnicalDetails ? 'Hide technical details' : 'View technical details'}</span>
                    {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* THIRD LAYER: Advanced Technical Details */}
              {showTechnicalDetails && (
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-1 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
                    {[
                      { key: 'headers', label: 'Email & Authentication' },
                      { key: 'iocs', label: `Indicators (${currentAnalysis.iocs.length})` },
                      { key: 'geo', label: 'Source Location' },
                      { key: 'timeline', label: 'Forensic Timeline' },
                      { key: 'evidence', label: 'Evidence Preservation' }
                    ].map(t => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTechTab(t.key as any)}
                        className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                          activeTechTab === t.key
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {activeTechTab === 'headers' && (
                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                          <div className="font-bold text-slate-900">SPF Protocol</div>
                          <div className={`font-semibold ${currentAnalysis.emailData.auth.spf === 'PASSED' ? 'text-emerald-700' : 'text-red-700'}`}>
                            {currentAnalysis.emailData.auth.spf}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {currentAnalysis.emailData.auth.spf === 'PASSED'
                              ? 'SPF validated source IP address.'
                              : 'SPF failed because the sending server was not authorized by the domain’s SPF policy.'}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                          <div className="font-bold text-slate-900">DKIM Signature</div>
                          <div className={`font-semibold ${currentAnalysis.emailData.auth.dkim === 'PASSED' ? 'text-emerald-700' : 'text-red-700'}`}>
                            {currentAnalysis.emailData.auth.dkim}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {currentAnalysis.emailData.auth.dkim === 'PASSED'
                              ? 'Cryptographic DKIM signature verified.'
                              : 'DKIM signature verification failed or selector DNS key missing.'}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                          <div className="font-bold text-slate-900">DMARC Policy</div>
                          <div className={`font-semibold ${currentAnalysis.emailData.auth.dmarc === 'PASSED' ? 'text-emerald-700' : 'text-red-700'}`}>
                            {currentAnalysis.emailData.auth.dmarc}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Header alignment check verdict.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2 font-mono">
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span className="text-slate-500">From:</span>
                          <span className="text-slate-900 font-semibold">{currentAnalysis.emailData.headers.from}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span className="text-slate-500">To:</span>
                          <span className="text-slate-900">{currentAnalysis.emailData.headers.to}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span className="text-slate-500">Reply-To:</span>
                          <span className="text-orange-700 font-semibold">{currentAnalysis.emailData.headers.replyTo || 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Source IP:</span>
                          <span className="text-red-700 font-bold">{currentAnalysis.emailData.headers.sourceIP}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTechTab === 'iocs' && (
                    <div className="space-y-2">
                      {currentAnalysis.iocs.map(ioc => (
                        <IOCChip key={ioc.id} ioc={ioc} onInvestigate={() => navigate('/intelligence')} />
                      ))}
                    </div>
                  )}

                  {activeTechTab === 'geo' && (
                    <GeoMap location={currentAnalysis.geoLocation} height="300px" />
                  )}

                  {activeTechTab === 'timeline' && (
                    <ForensicTimeline timeline={currentAnalysis.timeline} />
                  )}

                  {activeTechTab === 'evidence' && (
                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">SHA-256 Digest</span>
                        <div className="text-emerald-700 font-bold break-all select-all">
                          8f4a7d91c32094182490182401928409182409182409182409182409c92a
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {isEvidenceCommitted ? (
                          <span className="px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            <span>Evidence Committed to Ledger</span>
                          </span>
                        ) : (
                          <button
                            onClick={handleCommitEvidence}
                            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                          >
                            Commit Evidence to Ledger
                          </button>
                        )}
                        <button
                          onClick={handleGenerateReport}
                          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                        >
                          Generate Incident Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recommended Response Actions */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Recommended Actions
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => handleResponseClick('Quarantine Email')}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 font-semibold hover:bg-red-100 transition-colors"
                  >
                    Quarantine Email
                  </button>
                  <button
                    onClick={() => handleResponseClick('Block Domain')}
                    className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 font-semibold hover:bg-orange-100 transition-colors"
                  >
                    Block Domain
                  </button>
                  <button
                    onClick={() => handleResponseClick('Block IP')}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 font-semibold hover:bg-amber-100 transition-colors"
                  >
                    Block Source IP
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
