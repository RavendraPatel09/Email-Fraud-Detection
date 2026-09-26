import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, Lock, CheckCircle2, ArrowDown, Hash, ShieldCheck, Link2 } from 'lucide-react';

export const EvidenceLedgerPage: React.FC = () => {
  const { ledgerBlocks } = useApp();

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              IMMUTABLE EVIDENCE LEDGER
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Prototype immutable evidence ledger for tamper-evident forensic records & chain of custody verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>LEDGER STATE: VERIFIED & SYNCED</span>
          </span>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs space-y-1">
        <div className="font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>Blockchain Integrity Architecture (SIH 2026 Theme)</span>
        </div>
        <p className="text-slate-300 font-sans leading-relaxed">
          Each forensic evidence payload is cryptographic digest hashed (SHA-256 via Web Crypto API) and chained to the previous block hash. Any unauthorized tampering invalidates downstream block hashes instantly.
        </p>
      </div>

      {/* Visual Chain Timeline */}
      <div className="space-y-6">
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Chain of Custody Blocks ({ledgerBlocks.length} Blocks Mounted)
        </div>

        <div className="space-y-4">
          {ledgerBlocks.map((block, idx) => (
            <React.Fragment key={block.blockNumber}>
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-3 relative group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold shadow">
                      BLOCK #{block.blockNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      EVIDENCE ID: <span className="text-blue-400">{block.evidenceId}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">{block.timestamp}</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{block.status}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-sans font-medium">
                  Summary: <span className="text-slate-100 font-mono">{block.dataSummary}</span>
                </div>

                {/* Hashes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">BLOCK SHA-256 HASH</span>
                    <span className="text-emerald-400 font-mono font-bold select-all break-all text-[11px]">
                      {block.blockHash}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">PREVIOUS BLOCK HASH</span>
                    <span className="text-slate-400 font-mono select-all break-all text-[11px]">
                      {block.previousHash}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linking arrow between blocks */}
              {idx < ledgerBlocks.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <ArrowDown className="w-4 h-4 text-blue-400 animate-bounce" />
                    <span>Cryptographic Link (Merkle Root)</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
