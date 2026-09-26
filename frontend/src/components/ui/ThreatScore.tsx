import React from 'react';
import { Severity } from '../../types';

interface ThreatScoreProps {
  score: number;
  severity: Severity;
  classification: string;
  confidence: number;
}

export const ThreatScore: React.FC<ThreatScoreProps> = ({
  score,
  severity,
  classification,
  confidence
}) => {
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-700';

  if (score >= 80) {
    barColor = 'bg-red-600';
    textColor = 'text-red-700';
  } else if (score >= 60) {
    barColor = 'bg-orange-500';
    textColor = 'text-orange-700';
  } else if (score >= 40) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-700';
  } else if (score >= 20) {
    barColor = 'bg-blue-500';
    textColor = 'text-blue-700';
  }

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Threat Assessment
          </span>
          <span className="text-sm font-bold text-slate-900">
            {classification}
          </span>
        </div>

        <div className="text-right">
          <span className={`text-sm font-bold uppercase ${textColor}`}>
            {severity} RISK
          </span>
          <span className="text-xs text-slate-500 block">
            {confidence}% Confidence
          </span>
        </div>
      </div>

      {/* Horizontal Bar Indicator */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Low (0)</span>
          <span>Medium (40)</span>
          <span>High (75)</span>
          <span className="font-bold text-slate-900">{score} / 100</span>
        </div>
      </div>
    </div>
  );
};
