import React from 'react';
import { Users, XCircle, ShieldCheck, AlertTriangle, Network, Lock, ExternalLink } from './Icons';
import { collusionNodes } from '../data/mockData';

export const CollusionGraphModal = ({ bidder, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-6 overflow-y-auto">
      <div className="bg-[#0B132B] border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 lg:px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Network className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                NetworkX Bipartite Collusion & Cartel Detector
              </h3>
              <p className="text-xs text-slate-400">
                Cross-Bidder Attribute Proximity Graph (Shared Bank IFSC, Director DIN & IP Address)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Visual Graph Render Area */}
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[360px] relative border-b border-slate-800">
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <span>Cluster Risk Score: <strong className="text-amber-400 font-mono">0.86 (HIGH)</strong></span>
          </div>

          {/* Graphical Network Mockup */}
          <div className="w-full max-w-2xl py-8 flex flex-col items-center gap-8 relative">
            
            {/* Top Row: Connected Bidders */}
            <div className="flex items-center justify-between w-full px-12">
              <div className="p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-500 text-amber-200 shadow-xl flex flex-col items-center gap-1 z-10 hover:scale-105 transition-all">
                <Users className="w-6 h-6 text-amber-400" />
                <span className="text-xs font-bold">BID-8903</span>
                <span className="text-[11px] text-amber-300 font-semibold">Apex InfraTech</span>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
                BIPARTITE CARTEL LINK
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-500 text-amber-200 shadow-xl flex flex-col items-center gap-1 z-10 hover:scale-105 transition-all">
                <Users className="w-6 h-6 text-amber-400" />
                <span className="text-xs font-bold">BID-8904</span>
                <span className="text-[11px] text-amber-300 font-semibold">Nova Green Tech</span>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="w-full h-12 relative flex justify-around">
              <div className="w-0.5 bg-gradient-to-b from-amber-500 to-rose-500 h-full transform -rotate-12"></div>
              <div className="w-0.5 bg-gradient-to-b from-amber-500 to-rose-500 h-full transform rotate-12"></div>
            </div>

            {/* Bottom Row: Shared Attributes */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {collusionNodes.filter(n => n.type !== 'BIDDER').map((attr) => (
                <div 
                  key={attr.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-amber-500/50 transition-all"
                >
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    {attr.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 line-clamp-1" title={attr.label}>
                    {attr.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Details & Recommendation */}
        <div className="p-4 lg:p-6 bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> AI Recommendation: DISQUALIFY / INITIATE INVESTIGATION
            </div>
            <p className="text-slate-400">
              Both bidders share identical Director DIN (08912344) and HDFC Bank account IFSC (HDFC0001290), violating Competition Act & GeM anti-cartel provisions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
          >
            Close Graph
          </button>
        </div>

      </div>
    </div>
  );
};
