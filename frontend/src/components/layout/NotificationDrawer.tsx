import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen, notifications } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Bell className="w-4 h-4 text-blue-600" />
            <span>Notifications</span>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans">
          {notifications.length === 0 ? (
            <div className="text-center text-slate-500 py-12 text-xs">
              No recent notifications
            </div>
          ) : (
            notifications.map((n) => {
              let Icon = Info;
              let colors = 'bg-blue-50 text-blue-800 border-blue-200';
              if (n.type === 'danger') {
                Icon = ShieldAlert;
                colors = 'bg-red-50 text-red-800 border-red-200';
              } else if (n.type === 'warning') {
                Icon = AlertTriangle;
                colors = 'bg-amber-50 text-amber-800 border-amber-200';
              } else if (n.type === 'success') {
                Icon = CheckCircle;
                colors = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              }

              return (
                <div key={n.id} className={`p-3 rounded-lg border ${colors} space-y-1`}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{n.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center text-[11px] text-slate-500">
          Security Operations Notification Dispatch
        </div>
      </div>
    </div>
  );
};
