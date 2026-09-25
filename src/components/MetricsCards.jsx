import React from 'react';
import { ShieldCheck, AlertTriangle, Users, Database, Sparkles, Activity } from './Icons';

export const MetricsCards = ({ bidders, ledger }) => {
  const totalBids = bidders.length;
  const criticalForgeries = bidders.filter(b => b.forensicScan === 'CRITICAL_FORGERY').length;
  const collusionAlerts = bidders.filter(b => b.collusionAlert).length;
  const qualifiedBids = bidders.filter(b => b.aiRecommendation === 'QUALIFIED').length;
  const needsReviewBids = bidders.filter(b => b.aiRecommendation === 'NEEDS_REVIEW').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
      
      {/* Metric 1 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active GeM Tender</span>
          <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-4 h-4" />
          </span>
        </div>
        <div className="text-xl font-bold text-white tracking-tight">GEM/2026/B/849201</div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span className="text-cyan-400 font-semibold">₹4.20 Crore</span> • NTPC Renewable
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Bids Evaluated</span>
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{totalBids}</span>
          <span className="text-xs text-emerald-400 font-medium">({qualifiedBids} Qualified)</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span className="text-amber-400 font-medium">{needsReviewBids} Needs Review</span>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Forgery / Tamper Flags</span>
          <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-400">{criticalForgeries}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
            HIGH RISK
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span className="text-rose-400 font-mono">1 Photoshop Edit Auto-Blocked</span>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cartel Collusion Clusters</span>
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-400">{collusionAlerts}</span>
          <span className="text-xs text-slate-400">Cartel Linkage</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span className="text-amber-400 font-mono">Shared IFSC & Director DIN</span>
        </div>
      </div>

      {/* Metric 5 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-4 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Audit Ledger (SHA-256)</span>
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Database className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400">100%</span>
          <span className="text-xs text-emerald-400 font-mono">INTEGRITY PASS</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span className="font-mono text-slate-400">Latest Hash: 0x3e9a...bc41</span>
        </div>
      </div>

    </div>
  );
};
