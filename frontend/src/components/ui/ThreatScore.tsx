import React from 'react';
import { motion } from 'framer-motion';
import { Severity } from '../../types';

interface ThreatScoreProps {
  score: number;
  severity: Severity;
  classification: string;
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ThreatScore: React.FC<ThreatScoreProps> = ({
  score,
  severity,
  classification,
  confidence,
  size = 'md'
}) => {
  const radius = size === 'lg' ? 70 : size === 'sm' ? 40 : 56;
  const stroke = size === 'lg' ? 10 : size === 'sm' ? 6 : 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#06B6D4'; // cyan / safe
  let glowColor = 'rgba(6, 182, 212, 0.2)';
  let textColor = 'text-cyan-400';

  if (score >= 90) {
    strokeColor = '#EF4444'; // critical red
    glowColor = 'rgba(239, 68, 68, 0.3)';
    textColor = 'text-red-400';
  } else if (score >= 75) {
    strokeColor = '#F97316'; // high orange
    glowColor = 'rgba(249, 115, 22, 0.3)';
    textColor = 'text-orange-400';
  } else if (score >= 50) {
    strokeColor = '#F59E0B'; // medium yellow
    glowColor = 'rgba(245, 158, 11, 0.3)';
    textColor = 'text-amber-400';
  } else if (score >= 25) {
    strokeColor = '#10B981'; // low green
    glowColor = 'rgba(16, 185, 129, 0.2)';
    textColor = 'text-emerald-400';
  }

  const svgSize = radius * 2;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl">
      <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
        <svg height={svgSize} width={svgSize} className="transform -rotate-90">
          <circle
            stroke="#1E293B"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              filter: `drop-shadow(0px 0px 8px ${glowColor})`
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`font-mono font-bold tracking-tight ${textColor} ${size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-3xl'}`}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-medium">/ 100</span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className={`font-mono font-bold text-sm tracking-wider uppercase ${textColor}`}>
          {severity} RISK
        </div>
        <div className="text-xs text-slate-300 font-medium mt-0.5">
          {classification}
        </div>
        <div className="text-[11px] text-slate-500 font-mono mt-1">
          Confidence: <span className="text-slate-300">{confidence}%</span>
        </div>
      </div>
    </div>
  );
};
