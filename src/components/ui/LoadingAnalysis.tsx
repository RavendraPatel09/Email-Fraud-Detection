import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Shield } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Parsing email structure & MIME parts…',
  'Extracting RFC822 headers…',
  'Verifying SPF, DKIM & DMARC DNS records…',
  'Extracting embedded URLs & domain anchors…',
  'Analyzing sender domain reputation & typosquatting…',
  'Checking global threat intelligence feeds…',
  'Resolving approximate source IP geolocation…',
  'Calculating AI-assisted risk score…',
  'Generating forensic investigation summary…'
];

interface LoadingAnalysisProps {
  onComplete: () => void;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex < ANALYSIS_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 240); // 240ms per step = ~2.1 seconds total sequence
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStepIndex, onComplete]);

  const progressPercent = Math.round(((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md max-w-xl mx-auto shadow-2xl">
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center"
        >
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
      </div>

      <h3 className="font-mono text-lg font-bold text-slate-100 tracking-wide mb-1">
        AI THREAT ANALYSIS IN PROGRESS
      </h3>
      <p className="text-xs text-slate-400 font-mono mb-6">
        Evaluating security posture & header integrity
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-2 mb-6 border border-slate-800 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Step Sequence List */}
      <div className="w-full space-y-2 text-left font-mono text-xs max-h-48 overflow-y-auto pr-2">
        {ANALYSIS_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 p-1.5 rounded transition-colors ${
                isCurrent ? 'bg-blue-500/10 text-blue-300 font-semibold' : isDone ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-800 inline-block shrink-0" />
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
