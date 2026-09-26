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

  let colors = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Info;

  switch (sevUpper) {
    case 'CRITICAL':
      colors = 'bg-red-50 text-red-700 border-red-200 font-semibold';
      Icon = ShieldAlert;
      break;
    case 'HIGH':
      colors = 'bg-orange-50 text-orange-700 border-orange-200 font-semibold';
      Icon = AlertTriangle;
      break;
    case 'MEDIUM':
      colors = 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
      Icon = AlertCircle;
      break;
    case 'LOW':
      colors = 'bg-blue-50 text-blue-700 border-blue-200 font-medium';
      Icon = ShieldCheck;
      break;
    case 'SAFE':
    case 'CLEAN':
      colors = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium';
      Icon = ShieldCheck;
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs rounded',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-lg'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 border ${colors} ${sizeClasses} font-medium transition-colors`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{sevUpper}</span>
    </span>
  );
};
