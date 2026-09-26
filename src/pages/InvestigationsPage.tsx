import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { GeoMap } from '../components/ui/GeoMap';
import { ForensicTimeline } from '../components/ui/ForensicTimeline';
import { IOCChip } from '../components/ui/IOCChip';
import {
  Search,
  AlertOctagon,
  FileText,
  User,
  Calendar,
  Clock,
  MapPin,
  Mail,
  ShieldAlert,
  Database,
  CheckCircle,
  Ban,
  Lock,
  Plus
} from 'lucide-react';

export const InvestigationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { incidents, activeIncident, setActiveIncident, executeResponseAction, addNotification } = useApp();

  const requestedId = searchParams.get('id') || 'INC-2026-1042';
  const incident = incidents.find(i => i.id === requestedId) || incidents[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'email' | 'headers' | 'iocs' | 'timeline' | 'evidence'>('overview');
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    incident.notes = [...(incident.notes || []), newNote];
    setNewNote('');
    addNotification('Note Added', `Investigative note saved for case ${incident.id}`, 'info');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-mono">
      {/* Case Header */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <Search className="w-4 h-4" />
              <span>FORENSIC INVESTIGATION WORKSPACE</span>
              <span>•</span>
              <span className="text-slate-400">CASE #{incident.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              {incident.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ThreatBadge severity={incident.severity} size="lg" />
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold">
              STATUS: {incident.status}
            </span>
          </div>
        </div>

        {/* Case Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">SENDER</span>
            <span className="text-slate-200 truncate block font-semibold">{incident.sender}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">SOURCE IP</span>
            <span className="text-red-400 font-bold block">{incident.sourceIP}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">LOCATION</span>
            <span className="text-slate-300 block">{incident.sourceLocation}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ASSIGNED ANALYST</span>
            <span className="text-blue-400 font-semibold block">{incident.assignedTo || 'SOC Triage Desk'}</span>
          </div>
        </div>
      </div>

      {/* Case Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto text-xs">
        {[
          { key: 'overview', label: 'Case Overview' },
          { key: 'email', label: 'Email Payload' },
          { key: 'headers', label: 'Headers' },
          { key: 'iocs', label: 'Associated IOCs' },
          { key: 'timeline', label: 'Forensic Timeline' },
          { key: 'evidence', label: 'Preserved Evidence' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === t.key
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Notes & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Investigative Notes & Findings
              </h3>
              <div className="space-y-2">
                {(incident.notes || []).map((note, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
                    {note}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add analyst note to case..."
                  className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            {/* Incident Response Trigger */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Response Actions Taken
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {(incident.actionsTaken || []).map((act, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{act}</span>
                  </span>
                ))}
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => executeResponseAction(incident.id, 'Quarantine Email Payload')}
                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold"
                >
                  Quarantine Payload
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold"
                >
                  Generate Incident Report
                </button>
              </div>
            </div>
          </div>

          {/* Geo Location Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Source Geography Map
            </h3>
            <GeoMap
              location={{
                ip: incident.sourceIP,
                country: 'Germany',
                countryCode: 'DE',
                city: 'Frankfurt am Main',
                region: 'Hesse',
                isp: 'Tor Exit Node',
                asn: 'AS208294',
                timezone: 'Europe/Berlin',
                latitude: 50.1109,
                longitude: 8.6821,
                isApproximate: true
              }}
              height="300px"
            />
          </div>
        </div>
      )}

      {activeTab === 'email' && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-slate-100 uppercase tracking-wider">Raw Email Payload Content</h3>
          <pre className="p-4 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 overflow-x-auto leading-relaxed select-all">
{`From: ${incident.sender}
To: ${incident.recipient}
Subject: ${incident.title}
Date: ${incident.createdAt}
Source-IP: ${incident.sourceIP}

Dear User,
Your account requires urgent identity verification. Failure to comply within 24 hours will result in permanent suspension.`}
          </pre>
        </div>
      )}

      {activeTab === 'headers' && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-slate-100 uppercase tracking-wider">SMTP Header Validation</h3>
          <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-red-400 font-bold">SPF RESULT: FAILED</div>
            <div className="text-slate-400">IP {incident.sourceIP} not authorized in DNS record.</div>
          </div>
        </div>
      )}

      {activeTab === 'iocs' && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-slate-100 uppercase tracking-wider">Associated IOCs</h3>
          <IOCChip
            ioc={{
              id: 'ioc-inc',
              type: 'IP',
              value: incident.sourceIP,
              reputation: 'MALICIOUS',
              confidence: 94,
              source: 'CERT-In Threat Stream',
              lastSeen: 'Today'
            }}
          />
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <ForensicTimeline
            timeline={[
              { id: '1', timestamp: '16:32:10', stage: 'Email received', description: 'Inbound message received by gateway.', status: 'completed' },
              { id: '2', timestamp: '16:32:11', stage: 'Headers parsed', description: 'Extracted From, To, Subject, and Received path.', status: 'completed' },
              { id: '3', timestamp: '16:32:11', stage: 'SPF validation failed', description: 'Source IP not in domain SPF record.', status: 'completed' },
              { id: '4', timestamp: '16:32:12', stage: 'DKIM validation failed', description: 'Cryptographic signature mismatch.', status: 'completed' },
              { id: '5', timestamp: '16:32:17', stage: 'Risk score calculated', description: 'Calculated 91/100 HIGH RISK score.', status: 'completed' }
            ]}
          />
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="font-bold text-slate-100 uppercase">SHA-256 Integrity Verification</div>
          <div className="p-3 rounded bg-slate-950 text-emerald-400 border border-slate-800 font-bold select-all">
            8f4a7d91c32094182490182401928409182409182409182409182409c92a
          </div>
          <div className="text-slate-400">Verifiably anchored to Evidence Ledger Block #104582.</div>
        </div>
      )}
    </div>
  );
};
