import React from 'react';
import { Severity } from '../../types';
import { AlertTriangle, ShieldAlert, ShieldCheck, AlertCircle, Info } from 'lucide-react';

interface ThreatBadgeProps {
  severity: Severity | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({ severity, size = 'md', showIcon = true }) => {
  const sevUpper = (severity || 'SAFE').toUpperCase();

  let colors = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = Info;

  switch (sevUpper) {
    case 'CRITICAL':
      colors = 'bg-red-500/10 text-red-400 border-red-500/30 font-semibold shadow-sm shadow-red-950/50';
      Icon = ShieldAlert;
      break;
    case 'HIGH':
      colors = 'bg-orange-500/10 text-orange-400 border-orange-500/30 font-semibold shadow-sm shadow-orange-950/50';
      Icon = AlertTriangle;
      break;
    case 'MEDIUM':
      colors = 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-medium';
      Icon = AlertCircle;
      break;
    case 'LOW':
      colors = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium';
      Icon = ShieldCheck;
      break;
    case 'SAFE':
    case 'CLEAN':
      colors = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-medium';
      Icon = ShieldCheck;
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs rounded',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-lg'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 border ${colors} ${sizeClasses} tracking-wide font-mono transition-colors`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5'} />}
      <span>{sevUpper}</span>
    </span>
  );
};
