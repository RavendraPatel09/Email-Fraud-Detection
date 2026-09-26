import React from 'react';
import { motion } from 'framer-motion';
import { ForensicTimelineEvent } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ForensicTimelineProps {
  timeline: ForensicTimelineEvent[];
}

export const ForensicTimeline: React.FC<ForensicTimelineProps> = ({ timeline }) => {
  return (
    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {timeline.map((event, idx) => (
        <motion.div
          key={event.id || idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          className="relative flex items-start gap-4 group"
        >
          {/* Node Icon */}
          <div className="absolute -left-6 top-0.5 flex items-center justify-center">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border border-slate-700 group-hover:border-blue-500 transition-colors">
              {event.status === 'completed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              ) : event.status === 'flagged' ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              )}
            </span>
          </div>

          <div className="flex-1 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-slate-200">
                {event.stage}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {event.timestamp}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {event.description}
            </p>
            {event.details && (
              <div className="mt-2 p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800/50">
                {event.details}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
