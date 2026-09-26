import React, { useState } from 'react';
import { IOC } from '../../types';
import { useApp } from '../../context/AppContext';
import { Copy, Check, ShieldAlert, Ban, PlusCircle, Search } from 'lucide-react';

interface IOCChipProps {
  ioc: IOC;
  onInvestigate?: (ioc: IOC) => void;
}

export const IOCChip: React.FC<IOCChipProps> = ({ ioc, onInvestigate }) => {
  const { blockIOC, addNotification } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ioc.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addNotification('Copied to Clipboard', `IOC value '${ioc.value}' copied.`, 'info');
  };

  const handleBlock = () => {
    blockIOC(ioc.id);
  };

  let repColor = 'bg-slate-800 text-slate-300 border-slate-700';
  if (ioc.reputation === 'MALICIOUS') repColor = 'bg-red-500/10 text-red-400 border-red-500/30';
  if (ioc.reputation === 'SUSPICIOUS') repColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  if (ioc.reputation === 'CLEAN') repColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md">
      <div className="flex items-start sm:items-center gap-3 overflow-hidden">
        <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0 uppercase">
          {ioc.type}
        </span>
        <div className="min-w-0">
          <div className="font-mono text-sm text-slate-100 truncate font-medium select-all">
            {ioc.value}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono">
            <span>Rep: <span className={`px-1.5 py-0.2 rounded text-[10px] border ${repColor}`}>{ioc.reputation}</span></span>
            <span>•</span>
            <span>Conf: <span className="text-slate-300">{ioc.confidence}%</span></span>
            <span>•</span>
            <span className="truncate max-w-[140px] text-slate-500">{ioc.source}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
        <button
          onClick={handleCopy}
          title="Copy IOC value"
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {onInvestigate && (
          <button
            onClick={() => onInvestigate(ioc)}
            title="Investigate IOC"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            <Search className="w-3 h-3" />
            <span>Investigate</span>
          </button>
        )}

        <button
          onClick={handleBlock}
          disabled={ioc.blocked}
          title="Block IOC on Perimeter Firewall"
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition-colors ${
            ioc.blocked
              ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
              : 'text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
          }`}
        >
          <Ban className="w-3 h-3" />
          <span>{ioc.blocked ? 'Blocked' : 'Block'}</span>
        </button>
      </div>
    </div>
  );
};
