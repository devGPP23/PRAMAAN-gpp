import React, { useState } from 'react';
import { Header } from './components/Header';
import { MetricsCards } from './components/MetricsCards';
import { BiddersTable } from './components/BiddersTable';
import { ThreePaneModal } from './components/ThreePaneModal';
import { CollusionGraphModal } from './components/CollusionGraphModal';
import { AuditLedgerView } from './components/AuditLedgerView';
import { activeTender, biddersData as initialBidders, auditLedger } from './data/mockData';
import { ShieldCheck, Activity, Users, Database, Sparkles, FileText, Lock, ChevronRight } from './components/Icons';

export function App() {
  const [currentRole, setRole] = useState('OFFICER'); // OFFICER | CAG_AUDITOR | BIDDER
  const [activeTab, setActiveTab] = useState('evaluation'); // evaluation | collusion | ledger
  const [bidders, setBidders] = useState(initialBidders);
  const [inspectedBidder, setInspectedBidder] = useState(null);
  const [collusionBidder, setCollusionBidder] = useState(null);

  const handleOfficerDecision = (bidderId, newDecision, justification) => {
    setBidders(prev => prev.map(b => {
      if (b.id === bidderId) {
        return {
          ...b,
          aiRecommendation: newDecision,
          officerDecision: newDecision,
          officerJustification: justification
        };
      }
      return b;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col">
      
      {/* Header Bar */}
      <Header
        currentRole={currentRole}
        setRole={setRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Active Tender Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 rounded-2xl p-4 lg:p-6 mb-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  {activeTender.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  LIVE COMPLIANCE VERIFICATION
                </span>
                <span className="text-xs text-slate-400 font-mono">Closing: {activeTender.closingDate}</span>
              </div>

              <h2 className="text-lg lg:text-xl font-extrabold text-white tracking-tight">
                {activeTender.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{activeTender.organisation}</span> • <span className="text-cyan-400 font-semibold">{activeTender.estimatedValue}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => alert('NIT Rule Specification Modal: AI parsed 5 mandatory requirements from NIT PDF.')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                View NIT Checklist Specs
              </button>
            </div>
          </div>

          {/* Mandatory Rule Gates */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">AI Rules Gates:</span>
            {activeTender.mandatoryRequirements.map((req, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-[11px] border border-slate-800 font-medium">
                ✓ {req}
              </span>
            ))}
          </div>
        </div>

        {/* Top Summary Metrics Cards */}
        <MetricsCards bidders={bidders} ledger={auditLedger} />

        {/* Dynamic Tab Views */}
        {activeTab === 'evaluation' && (
          <BiddersTable
            bidders={bidders}
            onInspectBidder={(bidder) => setInspectedBidder(bidder)}
            onOpenCollusion={(bidder) => setCollusionBidder(bidder)}
          />
        )}

        {activeTab === 'collusion' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" /> Cartel & Collusion Bipartite Network View
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                NetworkX graph algorithm detects shared bank account IFSCs, Director DINs, physical address tokens, and PDF author metadata across submitted bid packages.
              </p>
              <button
                onClick={() => setCollusionBidder(bidders.find(b => b.collusionAlert))}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                Launch Collusion Cartel Graph Inspector
              </button>
            </div>
            <BiddersTable
              bidders={bidders.filter(b => b.collusionAlert)}
              onInspectBidder={(bidder) => setInspectedBidder(bidder)}
              onOpenCollusion={(bidder) => setCollusionBidder(bidder)}
            />
          </div>
        )}

        {activeTab === 'ledger' && (
          <AuditLedgerView />
        )}

        {/* 3-Pane Evidence Verification Modal */}
        {inspectedBidder && (
          <ThreePaneModal
            bidder={inspectedBidder}
            onClose={() => setInspectedBidder(null)}
            onOfficerDecision={handleOfficerDecision}
          />
        )}

        {/* Collusion Network Graph Modal */}
        {collusionBidder && (
          <CollusionGraphModal
            bidder={collusionBidder}
            onClose={() => setCollusionBidder(null)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">PRAMAN Architecture Prototype</span>
            <span>•</span>
            <span>SIH PS 26100 GeM Procurement Compliance</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>PaddleOCR Spatial Vision</span>
            <span>PyMuPDF Forensics</span>
            <span>NetworkX Graph Engine</span>
            <span>SHA-256 Hash Chain</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
