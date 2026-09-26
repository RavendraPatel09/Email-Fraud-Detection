import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Shield } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Reading email structure & MIME parts…',
  'Checking sender domain & headers…',
  'Verifying SPF, DKIM & DMARC authentication…',
  'Extracting embedded links & domain anchors…',
  'Checking threat indicators…',
  'Calculating risk assessment…'
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
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 250);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStepIndex, onComplete]);

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl max-w-lg mx-auto shadow-sm space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <Shield className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Analyzing Email Payload
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Checking indicators, sender validation, and domain reputation
          </p>
        </div>
      </div>

      <div className="space-y-2 font-sans text-xs">
        {ANALYSIS_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 p-2 rounded transition-colors ${
                isCurrent ? 'bg-blue-50 text-blue-800 font-semibold' : isDone ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-200 inline-block shrink-0" />
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
