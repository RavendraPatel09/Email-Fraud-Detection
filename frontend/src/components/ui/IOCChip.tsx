import React, { useState } from 'react';
import { IOC } from '../../types';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Ban, Search } from 'lucide-react';

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

  let repBadge = 'bg-slate-100 text-slate-700 border-slate-200';
  if (ioc.reputation === 'MALICIOUS') repBadge = 'bg-red-50 text-red-700 border-red-200';
  if (ioc.reputation === 'SUSPICIOUS') repBadge = 'bg-amber-50 text-amber-700 border-amber-200';
  if (ioc.reputation === 'CLEAN') repBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs">
      <div className="flex items-start sm:items-center gap-3 overflow-hidden">
        <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase shrink-0">
          {ioc.type}
        </span>
        <div className="min-w-0">
          <div className="font-mono text-xs text-slate-900 truncate font-semibold select-all">
            {ioc.value}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
            <span>Risk: <span className={`px-1.5 py-0.2 rounded text-[10px] border font-medium ${repBadge}`}>{ioc.reputation}</span></span>
            <span>•</span>
            <span>Confidence: <span className="text-slate-700 font-semibold">{ioc.confidence}%</span></span>
            <span>•</span>
            <span className="truncate max-w-[160px] text-slate-500">{ioc.source}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          onClick={handleCopy}
          title="Copy IOC value"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>Copy</span>
        </button>

        {onInvestigate && (
          <button
            onClick={() => onInvestigate(ioc)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Investigate</span>
          </button>
        )}
      </div>
    </div>
  );
};
