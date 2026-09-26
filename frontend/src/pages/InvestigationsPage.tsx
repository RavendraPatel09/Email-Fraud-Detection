import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { GeoMap } from '../components/ui/GeoMap';
import { ForensicTimeline } from '../components/ui/ForensicTimeline';
import { IOCChip } from '../components/ui/IOCChip';
import {
  Search,
  CheckCircle,
  Plus
} from 'lucide-react';

export const InvestigationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { incidents, executeResponseAction, addNotification } = useApp();

  const requestedId = searchParams.get('id') || 'INC-2026-1042';
  const incident = incidents.find(i => i.id === requestedId) || incidents[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'email' | 'iocs' | 'location' | 'timeline' | 'evidence'>('overview');
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    incident.notes = [...(incident.notes || []), newNote];
    setNewNote('');
    addNotification('Note Added', `Investigative note saved for case ${incident.id}`, 'info');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900">
      {/* Case Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
              <span>Incident #{incident.id}</span>
              <span>•</span>
              <span className="text-slate-900 font-bold uppercase">{incident.classification}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {incident.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThreatBadge severity={incident.severity} size="lg" />
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold font-mono">
              Status: {incident.status}
            </span>
          </div>
        </div>

        {/* Case Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Sender</span>
            <span className="text-slate-900 truncate block font-mono font-semibold">{incident.sender}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Source IP</span>
            <span className="text-red-700 font-mono font-bold block">{incident.sourceIP}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Source Location</span>
            <span className="text-slate-800 block">{incident.sourceLocation}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Assigned Analyst</span>
            <span className="text-blue-700 font-semibold block">{incident.assignedTo || 'SOC Analyst'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold overflow-x-auto shadow-2xs">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'email', label: 'Email Details' },
          { key: 'iocs', label: 'Indicators' },
          { key: 'location', label: 'Source Location' },
          { key: 'timeline', label: 'Timeline' },
          { key: 'evidence', label: 'Evidence' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.key
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Investigative Notes
              </h3>
              <div className="space-y-2">
                {(incident.notes || []).map((note, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                    {note}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add analyst note..."
                  className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended Actions
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {(incident.actionsTaken || []).map((act, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{act}</span>
                  </span>
                ))}
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => executeResponseAction(incident.id, 'Quarantine Email')}
                  className="px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-xs font-bold"
                >
                  Quarantine Email
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold shadow-xs"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Source Location Map
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
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-xs font-mono">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">Email Payload Content</h3>
          <pre className="p-4 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 overflow-x-auto leading-relaxed select-all">
{`From: ${incident.sender}
To: ${incident.recipient}
Subject: ${incident.title}
Date: ${incident.createdAt}
Source-IP: ${incident.sourceIP}

Dear User,
Your account requires urgent identity verification. Failure to comply within 24 hours will result in permanent account suspension.`}
          </pre>
        </div>
      )}

      {activeTab === 'iocs' && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">Associated Indicators</h3>
          <IOCChip
            ioc={{
              id: 'ioc-inc',
              type: 'IP',
              value: incident.sourceIP,
              reputation: 'MALICIOUS',
              confidence: 94,
              source: 'Threat Intelligence Stream',
              lastSeen: 'Today'
            }}
          />
        </div>
      )}

      {activeTab === 'location' && (
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
          height="360px"
        />
      )}

      {activeTab === 'timeline' && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <ForensicTimeline
            timeline={[
              { id: '1', timestamp: '16:32', stage: 'Email received', description: 'Inbound message received by gateway.', status: 'completed' },
              { id: '2', timestamp: '16:32', stage: 'Headers analyzed', description: 'Extracted From, To, Subject, and Received path.', status: 'completed' },
              { id: '3', timestamp: '16:32', stage: 'Authentication failed', description: 'SPF and DKIM verification failed.', status: 'completed' },
              { id: '4', timestamp: '16:33', stage: 'Suspicious URL found', description: 'Extracted credential harvesting link.', status: 'completed' },
              { id: '5', timestamp: '16:33', stage: 'IP reputation checked', description: 'Matched active Tor exit node feed.', status: 'completed' },
              { id: '6', timestamp: '16:34', stage: 'Incident created', description: 'Incident #INC-2026-1042 created.', status: 'completed' }
            ]}
          />
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 font-mono text-xs">
          <div className="font-bold text-slate-900 uppercase">SHA-256 Digest Integrity</div>
          <div className="p-3 rounded bg-slate-50 text-emerald-700 border border-slate-200 font-bold select-all">
            8f4a7d91c32094182490182401928409182409182409182409182409c92a
          </div>
          <div className="text-slate-500">Anchored to Evidence Ledger Block #104582.</div>
        </div>
      )}
    </div>
  );
};
