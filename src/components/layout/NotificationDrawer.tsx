import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen, notifications } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#0D121F] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
            <Bell className="w-4 h-4 text-blue-400" />
            <span>NOTIFICATION CENTER</span>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3 font-mono">
          {notifications.length === 0 ? (
            <div className="text-center text-slate-500 py-12 text-xs">
              No recent notifications
            </div>
          ) : (
            notifications.map((n) => {
              let Icon = Info;
              let colors = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
              if (n.type === 'danger') {
                Icon = ShieldAlert;
                colors = 'bg-red-500/10 text-red-400 border-red-500/20';
              } else if (n.type === 'warning') {
                Icon = AlertTriangle;
                colors = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
              } else if (n.type === 'success') {
                Icon = CheckCircle;
                colors = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
              }

              return (
                <div key={n.id} className={`p-3 rounded-lg border ${colors} space-y-1`}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{n.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {n.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-950 text-center">
          <span className="text-[11px] font-mono text-slate-500">
            Real-time Threat Dispatch Log • SIH26106
          </span>
        </div>
      </div>
    </div>
  );
};
