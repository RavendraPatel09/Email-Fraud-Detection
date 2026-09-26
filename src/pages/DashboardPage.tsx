import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { GeoMap } from '../components/ui/GeoMap';
import { RECENT_THREAT_EVENTS } from '../data/demoData';
import {
  Mail,
  ShieldAlert,
  AlertTriangle,
  Upload,
  ArrowRight,
  ChevronRight,
  Globe,
  FileSearch
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const activityChartData = [
  { day: 'Mon', safe: 320, suspicious: 42, phishing: 12, malicious: 4 },
  { day: 'Tue', safe: 410, suspicious: 38, phishing: 18, malicious: 6 },
  { day: 'Wed', safe: 450, suspicious: 55, phishing: 24, malicious: 9 },
  { day: 'Thu', safe: 680, suspicious: 70, phishing: 45, malicious: 18 },
  { day: 'Fri', safe: 540, suspicious: 60, phishing: 38, malicious: 14 },
  { day: 'Sat', safe: 380, suspicious: 40, phishing: 18, malicious: 5 },
  { day: 'Sun', safe: 290, suspicious: 25, phishing: 10, malicious: 2 },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, activeAnalysis } = useApp();
  const { t } = useLanguage();

  const handleIncidentClick = (id: string) => {
    navigate(`/investigations?id=${id}`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.overview}
            </h1>
            <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-mono font-semibold border border-blue-200 dark:border-blue-800">
              MailShield
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor and investigate email security threats.
          </p>
        </div>
      </div>

      {/* Four Primary Compact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{t.emailsAnalyzed}</span>
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">2,481</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{t.threatsDetected}</span>
            <span className="text-2xl font-bold font-mono text-orange-600 dark:text-orange-400 mt-1 block">347</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{t.openIncidents}</span>
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">12</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{t.highRiskAlerts}</span>
            <span className="text-2xl font-bold font-mono text-red-600 dark:text-red-400 mt-1 block">8</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 flex items-center justify-center text-red-600 dark:text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Primary Action Card: Investigate a Suspicious Email */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.investigateEmailTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t.investigateEmailDesc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/analyzer')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>{t.analyzeEmail}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/analyzer')}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.uploadEml}</span>
          </button>
        </div>
      </div>

      {/* 7-Day Threat Activity Chart */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              {t.threatActivity}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Volume trends of safe vs phishing and malicious emails
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"/> Safe</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"/> Phishing</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"/> Malicious</span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#F8FAFC' }}
              />
              <Area type="monotone" dataKey="safe" stroke="#2563EB" fill="#EFF6FF" fillOpacity={0.6} />
              <Area type="monotone" dataKey="phishing" stroke="#EA580C" fill="#FFF7ED" fillOpacity={0.6} />
              <Area type="monotone" dataKey="malicious" stroke="#DC2626" fill="#FEF2F2" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-Column Section: Map + Recent Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Threat Activity Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t.threatMap}</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{t.approximateLocation}</span>
          </div>

          <GeoMap
            location={activeAnalysis?.geoLocation || {
              ip: '185.220.101.45',
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
            height="310px"
          />
        </div>

        {/* RIGHT: Recent Threats List (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              {t.recentThreats}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Live Detection</span>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-72 pr-1 text-xs">
            {RECENT_THREAT_EVENTS.map((evt) => (
              <div key={evt.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">{evt.timestamp}</span>
                  <ThreatBadge severity={evt.severity} size="sm" showIcon={false} />
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {evt.type}
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-xs">
                  {evt.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              {t.recentIncidents}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active security incidents requiring investigation
            </p>
          </div>
          <button
            onClick={() => navigate('/incidents')}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800"
          >
            <span>{t.viewAllIncidents}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider font-mono">
                <th className="pb-3 font-semibold">Incident</th>
                <th className="pb-3 font-semibold">Classification</th>
                <th className="pb-3 font-semibold">Source IP / Geography</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Time</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              {incidents.slice(0, 5).map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => handleIncidentClick(inc.id)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 font-bold font-mono text-blue-600 dark:text-blue-400 group-hover:underline">
                    {inc.id}
                  </td>
                  <td className="py-3 font-medium text-slate-900 dark:text-slate-100">
                    {inc.classification}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    <span className="font-mono text-slate-900 dark:text-slate-100 font-semibold">{inc.sourceIP}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{inc.sourceLocation}</span>
                  </td>
                  <td className="py-3">
                    <ThreatBadge severity={inc.severity} size="sm" />
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                    {inc.createdAt}
                  </td>
                  <td className="py-3 text-right font-medium">
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 group-hover:text-blue-800">
                      <span>{t.investigate}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
