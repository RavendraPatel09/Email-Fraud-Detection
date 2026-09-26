import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatBadge } from '../components/ui/ThreatBadge';
import { GeoMap } from '../components/ui/GeoMap';
import { RECENT_THREAT_EVENTS } from '../data/demoData';
import {
  Mail,
  ShieldAlert,
  AlertTriangle,
  Database,
  TrendingUp,
  ArrowUpRight,
  Radio,
  ExternalLink,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const activityChartData = [
  { time: '00:00', safe: 320, suspicious: 42, phishing: 12, malicious: 4 },
  { time: '04:00', safe: 210, suspicious: 28, phishing: 8, malicious: 2 },
  { time: '08:00', safe: 450, suspicious: 85, phishing: 24, malicious: 9 },
  { time: '12:00', safe: 680, suspicious: 110, phishing: 45, malicious: 18 },
  { time: '16:00', safe: 540, suspicious: 95, phishing: 38, malicious: 14 },
  { time: '20:00', safe: 380, suspicious: 50, phishing: 18, malicious: 5 },
];

const pieData = [
  { name: 'Safe Emails', value: 2134, color: '#06B6D4' },
  { name: 'Suspicious BEC', value: 161, color: '#F59E0B' },
  { name: 'Phishing Lures', value: 132, color: '#F97316' },
  { name: 'Malicious Droppers', value: 54, color: '#EF4444' },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, activeAnalysis, loadDemoScenario } = useApp();

  const handleIncidentClick = (id: string) => {
    navigate(`/investigations?id=${id}`);
  };

  const handleLaunchAnalyzer = () => {
    loadDemoScenario('demo-phishing-1');
    navigate('/analyzer');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 tracking-wide">
              SECURITY OPERATIONS CENTER
            </h1>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-mono border border-blue-500/30">
              SIH26106
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            AI-powered email threat detection, IP geolocation and forensic intelligence platform.
          </p>
        </div>

        <button
          onClick={handleLaunchAnalyzer}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-900/50 transition-all self-start md:self-center"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Launch Phishing Triage Engine</span>
        </button>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Emails Analyzed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-100">
            2,481
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4%
            </span>
            <span className="text-slate-500">vs last 24 hours</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Threats Detected</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-orange-400">
            347
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            <span className="text-orange-400 flex items-center gap-0.5 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.1%
            </span>
            <span className="text-slate-500">phishing & malware</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">High-Risk Incidents</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-red-400">
            86
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            <span className="text-red-400 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +2.3%
            </span>
            <span className="text-slate-500">requiring triage</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">IOC Matches</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
            529
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +18.5%
            </span>
            <span className="text-slate-500">intelligence feeds</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Activity Area Chart (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide">
                Threat Activity Over Time
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                24-hour volume breakdown of safe vs malicious emails
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"/> Safe</span>
              <span className="flex items-center gap-1 text-orange-400"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"/> Phishing</span>
              <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"/> Malicious</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPhish" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMalic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="safe" stroke="#06B6D4" fillOpacity={1} fill="url(#colorSafe)" />
                <Area type="monotone" dataKey="phishing" stroke="#F97316" fillOpacity={1} fill="url(#colorPhish)" />
                <Area type="monotone" dataKey="malicious" stroke="#EF4444" fillOpacity={1} fill="url(#colorMalic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Distribution Donut Chart (1 Col) */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide">
              Threat Distribution
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Classification by severity proportion
            </p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-xl font-bold text-slate-100">2,481</span>
              <span className="text-[10px] text-slate-500 font-mono">TOTAL</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 truncate">{item.name}</span>
                <span className="text-slate-200 font-bold ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map & Live Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Map (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>Geographic Threat Origin Map</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Source IP: 185.220.101.45 (Tor Node)</span>
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
            height="320px"
          />
        </div>

        {/* Live Detection Event Feed (1 Col) */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide">
                Live Detection Feed
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              REAL-TIME
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-72 pr-1 font-mono">
            {RECENT_THREAT_EVENTS.map((evt) => (
              <div key={evt.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px]">{evt.timestamp}</span>
                  <ThreatBadge severity={evt.severity} size="sm" showIcon={false} />
                </div>
                <div className="text-slate-200 font-medium">
                  {evt.type}
                </div>
                <div className="text-slate-400 text-[11px] leading-tight font-sans">
                  {evt.message}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
            Automated SOC triage queue operational
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide">
              Recent High-Risk Incidents
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Active cases requiring forensic investigation & response
            </p>
          </div>
          <button
            onClick={() => navigate('/incidents')}
            className="flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
          >
            <span>View All Incidents</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Incident ID</th>
                <th className="pb-3 font-semibold">Classification</th>
                <th className="pb-3 font-semibold">Source IP / Geography</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Created</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {incidents.slice(0, 5).map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => handleIncidentClick(inc.id)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 font-bold text-blue-400 group-hover:underline">
                    {inc.id}
                  </td>
                  <td className="py-3 text-slate-200">
                    {inc.classification}
                  </td>
                  <td className="py-3 text-slate-400">
                    <span className="text-slate-200 font-semibold">{inc.sourceIP}</span>
                    <span className="text-slate-500 text-[11px] block">{inc.sourceLocation}</span>
                  </td>
                  <td className="py-3">
                    <ThreatBadge severity={inc.severity} size="sm" />
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 text-[11px]">
                    {inc.createdAt}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300">
                      <span>Investigate</span>
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
