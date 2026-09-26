import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, Lock, CheckCircle2, ArrowDown, ShieldCheck } from 'lucide-react';

export const EvidenceLedgerPage: React.FC = () => {
  const { ledgerBlocks } = useApp();

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Evidence Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tamper-evident record of forensic evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Ledger Integrity Verified</span>
          </span>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
        <div className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Chain of Custody Architecture</span>
        </div>
        <p className="text-slate-600 leading-relaxed font-sans">
          Forensic evidence payloads are cryptographic SHA-256 hashed and chained to the previous block hash for tamper-evident verification.
        </p>
      </div>

      {/* Blocks Table / List */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Evidence Blocks ({ledgerBlocks.length} Blocks)
        </div>

        <div className="space-y-4 font-mono text-xs">
          {ledgerBlocks.map((block, idx) => (
            <React.Fragment key={block.blockNumber}>
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-xs">
                      BLOCK #{block.blockNumber}
                    </span>
                    <span className="font-bold text-slate-900">
                      Evidence ID: <span className="text-blue-600">{block.evidenceId}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-sans text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">{block.timestamp}</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{block.status}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 font-sans">
                  Data: <span className="text-slate-900 font-mono font-semibold">{block.dataSummary}</span>
                </div>

                {/* Hashes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Block SHA-256 Hash</span>
                    <span className="text-emerald-700 font-bold select-all break-all text-[11px]">
                      {block.blockHash}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Previous Block Hash</span>
                    <span className="text-slate-600 select-all break-all text-[11px]">
                      {block.previousHash}
                    </span>
                  </div>
                </div>
              </div>

              {idx < ledgerBlocks.length - 1 && (
                <div className="flex items-center justify-center py-0.5">
                  <ArrowDown className="w-4 h-4 text-blue-600" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
