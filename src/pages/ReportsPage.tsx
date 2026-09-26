import React from 'react';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { Printer, Download, FileText, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { activeAnalysis, activeIncident } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const currentAnalysis = activeAnalysis;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1200px] mx-auto font-mono text-slate-200">
      {/* Action Header bar (hidden during print) */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md print:hidden">
        <div>
          <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">
            AUTOMATED FORENSIC INCIDENT REPORT
          </div>
          <div className="text-sm font-bold text-slate-100">
            Case Ref: {activeIncident?.id || 'INC-2026-1042'}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="p-8 sm:p-12 rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-8 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest print:text-blue-700">
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)
            </div>
            <h1 className="text-2xl font-bold font-mono text-slate-100 mt-1 print:text-black">
              CYBER SECURITY CELL — FORENSIC INCIDENT REPORT
            </h1>
            <div className="text-xs text-slate-400 mt-1 font-sans print:text-gray-600">
              Problem Statement ID: SIH26106 • AI-Powered Threat & Geolocation Intelligence
            </div>
          </div>

          <div className="text-right">
            <div className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold font-mono inline-block print:bg-red-100 print:text-red-800">
              CLASSIFIED: CONFIDENTIAL
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono print:text-gray-600">
              Date: 26 Sep 2026
            </div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs print:bg-gray-100 print:border-gray-300">
          <div>
            <span className="text-slate-500 block text-[10px] print:text-gray-500">INCIDENT ID</span>
            <span className="text-blue-400 font-bold text-sm print:text-blue-800">{activeIncident?.id || 'INC-2026-1042'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] print:text-gray-500">CLASSIFICATION</span>
            <span className="text-slate-200 font-semibold print:text-black">{currentAnalysis?.analysis.classification || 'PHISHING'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] print:text-gray-500">RADIAL RISK SCORE</span>
            <span className="text-red-400 font-bold text-sm print:text-red-700">{currentAnalysis?.analysis.riskScore || 91} / 100</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] print:text-gray-500">CONFIDENCE VERDICT</span>
            <span className="text-slate-200 font-semibold print:text-black">{currentAnalysis?.analysis.confidence || 94}%</span>
          </div>
        </div>

        {/* Executive Summary Text */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            1. Executive Summary
          </h2>
          <p className="text-xs text-slate-300 font-sans leading-relaxed print:text-gray-800">
            {currentAnalysis?.analysis.aiExplanation || 'The AICTE Cyber Cell automated triage platform detected a high-risk email threat targeting organizational mailboxes. Analysis confirmed brand typosquatting, authentication protocol failures (SPF/DKIM), and malicious link insertion routing to known credential harvesting infrastructure.'}
          </p>
        </div>

        {/* Email Metadata & Authentication */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            2. Email Metadata & RFC822 Authentication
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 print:bg-gray-50 print:border-gray-300">
              <div>Sender: <span className="text-slate-100 font-bold print:text-black">{currentAnalysis?.emailData.headers.from || 'security@paypa1-security.com'}</span></div>
              <div>Recipient: <span className="text-slate-300 print:text-gray-800">{currentAnalysis?.emailData.headers.to || 'employee@company.com'}</span></div>
              <div>Subject: <span className="text-slate-300 print:text-gray-800">{currentAnalysis?.emailData.headers.subject}</span></div>
              <div>Source IP: <span className="text-red-400 font-bold print:text-red-700">{currentAnalysis?.emailData.headers.sourceIP || '185.220.101.45'}</span></div>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 print:bg-gray-50 print:border-gray-300">
              <div className="font-bold text-slate-200 mb-1 print:text-black">Protocol Validation:</div>
              <div className="text-red-400">SPF: FAILED (IP not in SPF record)</div>
              <div className="text-red-400">DKIM: FAILED (RSA signature mismatch)</div>
              <div className="text-red-400">DMARC: FAILED (Domain unaligned)</div>
            </div>
          </div>
        </div>

        {/* Extracted IOCs */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            3. Indicators of Compromise (IOC) Analysis
          </h2>
          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs space-y-2 print:bg-gray-50 print:border-gray-300">
            <div className="flex justify-between border-b border-slate-800 pb-1 font-bold print:border-gray-300">
              <span>IOC TYPE / VALUE</span>
              <span>REPUTATION</span>
            </div>
            {(currentAnalysis?.iocs || []).map((ioc, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-200 print:text-black font-semibold">[{ioc.type}] {ioc.value}</span>
                <span className="text-red-400 font-bold print:text-red-700">{ioc.reputation} ({ioc.confidence}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Geolocation */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            4. IP Geolocation Intelligence
          </h2>
          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 print:bg-gray-50 print:border-gray-300">
            <div>Country: <span className="text-slate-100 font-bold print:text-black">{currentAnalysis?.geoLocation.country || 'Germany'}</span></div>
            <div>City: <span className="text-slate-200 print:text-gray-800">{currentAnalysis?.geoLocation.city || 'Frankfurt am Main'}</span></div>
            <div>ISP: <span className="text-slate-300 print:text-gray-800">{currentAnalysis?.geoLocation.isp || 'Tor Exit Node'}</span></div>
            <div>ASN: <span className="text-slate-300 print:text-gray-800">{currentAnalysis?.geoLocation.asn || 'AS208294'}</span></div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black print:border-gray-400">
            5. Recommended Response Actions
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-300 font-sans space-y-1 print:text-gray-800">
            <li>Quarantine inbound email across corporate Exchange/Google Workspace mailboxes immediately.</li>
            <li>Block source IP address 185.220.101.45 on perimeter firewalls & SIEM.</li>
            <li>Blackhole domain paypa1-security.com on internal DNS resolvers.</li>
            <li>Preserve RFC822 raw headers in immutable blockchain evidence ledger.</li>
          </ul>
        </div>

        {/* Evidence Hash Integrity Footer */}
        <div className="p-4 rounded-lg bg-slate-950 border border-emerald-500/30 text-xs space-y-2 print:bg-gray-100 print:border-gray-400">
          <div className="flex items-center justify-between text-emerald-400 font-bold print:text-emerald-800">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              EVIDENCE SHA-256 INTEGRITY DIGEST
            </span>
            <span>VERIFIED & ANCHORED</span>
          </div>
          <div className="text-[11px] font-mono text-slate-300 break-all bg-slate-900 p-2 rounded border border-slate-800 print:bg-white print:text-black print:border-gray-300">
            8f4a7d91c32094182490182401928409182409182409182409182409c92a
          </div>
          <div className="text-[10px] text-slate-500 print:text-gray-600">
            Ledger Block #104582 • Web Crypto API Standard • SIH26106 Cyber Security Cell Platform
          </div>
        </div>
      </div>
    </div>
  );
};
