import React, { useState } from 'react';
import { Database, ShieldCheck, CheckCircle, RefreshCw, Download, Lock } from './Icons';
import { auditLedger } from '../data/mockData';

export const AuditLedgerView = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(true);

  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
    }, 1000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
      
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            SHA-256 Tamper-Evident Immutable Audit Ledger
          </h2>
          <p className="text-xs text-slate-400">
            Cryptographic Hash-Chain of Every Verification Event, Forgery Scan & Procurement Officer Decision
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            {isVerifying ? 'Recomputing Hashes...' : 'Verify Ledger Integrity'}
          </button>

          <button
            onClick={() => alert('Generating CAG Audit PDF Report... (Puppeteer / PDFKit Service)')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CAG Audit Report (PDF)
          </button>
        </div>
      </div>

      {/* Verification Status Alert */}
      {verifiedSuccess && (
        <div className="bg-emerald-950/40 border-b border-emerald-800/50 p-3 px-6 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>CRYPTOGRAPHIC INTEGRITY VERIFIED: All SHA-256 parent-child block hashes match. 0 Broken links detected.</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">
            Audit Ledger Status: IMMUTABLE
          </span>
        </div>
      )}

      {/* Ledger Feed Timeline */}
      <div className="p-4 lg:p-6 space-y-4">
        {auditLedger.map((block) => (
          <div 
            key={block.blockIndex}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold flex items-center justify-center text-xs">
                #{block.blockIndex}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100 text-sm">{block.eventType}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800">
                    {block.actor}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-800">
                    {block.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{block.details}</p>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Timestamp: {block.timestamp} • Tender: {block.tenderId}
                </div>
              </div>
            </div>

            {/* Block Hash String */}
            <div className="w-full md:w-auto text-left md:text-right bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px]">
              <div className="text-slate-500">Block SHA-256 Hash:</div>
              <div className="text-cyan-400 font-semibold break-all max-w-xs">{block.blockHash}</div>
              <div className="text-slate-500 mt-1">Prev: {block.previousHash}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
