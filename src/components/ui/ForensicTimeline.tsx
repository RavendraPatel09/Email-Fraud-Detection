import React from 'react';
import { ForensicTimelineEvent } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ForensicTimelineProps {
  timeline: ForensicTimelineEvent[];
}

export const ForensicTimeline: React.FC<ForensicTimelineProps> = ({ timeline }) => {
  return (
    <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 font-sans">
      {timeline.map((event, idx) => (
        <div
          key={event.id || idx}
          className="relative flex items-start gap-3 group"
        >
          {/* Node Icon */}
          <div className="absolute -left-6 top-0.5 flex items-center justify-center">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white border border-slate-300">
              {event.status === 'completed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              ) : event.status === 'flagged' ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-amber-600" />
              )}
            </span>
          </div>

          <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-slate-900">
                {event.stage}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {event.timestamp}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              {event.description}
            </p>
            {event.details && (
              <div className="mt-1.5 p-2 rounded bg-slate-50 font-mono text-[11px] text-slate-700 border border-slate-200">
                {event.details}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
