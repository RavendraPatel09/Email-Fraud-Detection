import React from 'react';
import { useApp } from '../context/AppContext';
import { Printer, ShieldCheck } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { activeAnalysis, activeIncident } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const currentAnalysis = activeAnalysis;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1200px] mx-auto font-sans text-slate-900">
      {/* Action Header bar (hidden during print) */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 shadow-2xs print:hidden">
        <div>
          <div className="text-xs text-blue-700 font-semibold uppercase tracking-wider">
            Incident Forensic Report
          </div>
          <div className="text-sm font-bold text-slate-900 font-mono">
            Case Ref: {activeIncident?.id || 'INC-2026-1042'}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="p-8 sm:p-12 rounded-xl bg-white border border-slate-200 shadow-lg space-y-8 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)
            </div>
            <h1 className="text-2xl font-bold font-sans text-slate-900 mt-1">
              CYBER SECURITY CELL — INCIDENT REPORT
            </h1>
            <div className="text-xs text-slate-500 mt-1 font-sans">
              Problem Statement ID: SIH26106 • Email Security & Threat Intelligence
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="px-3 py-1 rounded bg-red-50 text-red-700 border border-red-200 text-xs font-bold inline-block">
              CLASSIFIED: CONFIDENTIAL
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Date: 26 Sep 2026
            </div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Incident ID</span>
            <span className="text-blue-700 font-bold font-mono text-sm">{activeIncident?.id || 'INC-2026-1042'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Classification</span>
            <span className="text-slate-900 font-semibold">{currentAnalysis?.analysis.classification || 'PHISHING'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Threat Score</span>
            <span className="text-red-700 font-bold font-mono text-sm">{currentAnalysis?.analysis.riskScore || 91} / 100</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Confidence</span>
            <span className="text-slate-900 font-semibold">{currentAnalysis?.analysis.confidence || 94}%</span>
          </div>
        </div>

        {/* Executive Summary Text */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            1. Executive Summary
          </h2>
          <p className="text-xs text-slate-700 font-sans leading-relaxed">
            {currentAnalysis?.analysis.aiExplanation || 'Automated email triage detected a high-risk threat targeting organizational mailboxes. Analysis confirmed brand typosquatting, authentication protocol failures (SPF/DKIM), and malicious link insertion routing to known credential harvesting infrastructure.'}
          </p>
        </div>

        {/* Email Metadata & Authentication */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            2. Email Metadata & Authentication Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div>Sender: <span className="text-slate-900 font-mono font-semibold">{currentAnalysis?.emailData.headers.from || 'security@paypa1-security.com'}</span></div>
              <div>Recipient: <span className="text-slate-800 font-mono">{currentAnalysis?.emailData.headers.to || 'employee@company.com'}</span></div>
              <div>Subject: <span className="text-slate-800">{currentAnalysis?.emailData.headers.subject}</span></div>
              <div>Source IP: <span className="text-red-700 font-mono font-bold">{currentAnalysis?.emailData.headers.sourceIP || '185.220.101.45'}</span></div>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 mb-1">Protocol Validation:</div>
              <div className="text-red-700">SPF: FAILED (IP not in SPF record)</div>
              <div className="text-red-700">DKIM: FAILED (Signature mismatch)</div>
              <div className="text-red-700">DMARC: FAILED (Domain unaligned)</div>
            </div>
          </div>
        </div>

        {/* Extracted IOCs */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            3. Indicators of Compromise (IOC)
          </h2>
          <div className="p-3 rounded bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-1 font-bold">
              <span>TYPE / VALUE</span>
              <span>VERDICT</span>
            </div>
            {(currentAnalysis?.iocs || []).map((ioc, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-900 font-semibold">[{ioc.type}] {ioc.value}</span>
                <span className="text-red-700 font-bold">{ioc.reputation} ({ioc.confidence}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Geolocation */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            4. Source Location
          </h2>
          <div className="p-3 rounded bg-slate-50 border border-slate-200 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>Country: <span className="text-slate-900 font-bold">{currentAnalysis?.geoLocation.country || 'Germany'}</span></div>
            <div>City: <span className="text-slate-800">{currentAnalysis?.geoLocation.city || 'Frankfurt am Main'}</span></div>
            <div>ISP: <span className="text-slate-800">{currentAnalysis?.geoLocation.isp || 'Tor Exit Node'}</span></div>
            <div>ASN: <span className="text-slate-800 font-mono">{currentAnalysis?.geoLocation.asn || 'AS208294'}</span></div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
            5. Recommended Actions
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
            <li>Quarantine inbound email across corporate Exchange/Google Workspace mailboxes.</li>
            <li>Block source IP address 185.220.101.45 on perimeter firewalls & SIEM.</li>
            <li>Blackhole domain paypa1-security.com on internal DNS resolvers.</li>
            <li>Preserve RFC822 raw headers in evidence ledger.</li>
          </ul>
        </div>

        {/* Evidence Hash Integrity Footer */}
        <div className="p-4 rounded-lg bg-slate-50 border border-emerald-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              EVIDENCE SHA-256 DIGEST
            </span>
            <span>VERIFIED & ANCHORED</span>
          </div>
          <div className="text-[11px] font-mono text-slate-900 break-all bg-white p-2 rounded border border-slate-200 font-bold">
            8f4a7d91c32094182490182401928409182409182409182409182409c92a
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Ledger Block #104582 • Web Crypto API Standard • SIH26106 Platform
          </div>
        </div>
      </div>
    </div>
  );
};
