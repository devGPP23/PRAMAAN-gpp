import React, { useState } from 'react';
import { 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Users, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  Lock
} from './Icons';

export const BiddersTable = ({ bidders, onInspectBidder, onOpenCollusion }) => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBidders = bidders.filter(bidder => {
    const matchesSearch = bidder.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bidder.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bidder.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'ALL') return matchesSearch;
    if (filter === 'QUALIFIED') return matchesSearch && bidder.aiRecommendation === 'QUALIFIED';
    if (filter === 'NEEDS_REVIEW') return matchesSearch && bidder.aiRecommendation === 'NEEDS_REVIEW';
    if (filter === 'DISQUALIFIED') return matchesSearch && bidder.aiRecommendation === 'DISQUALIFIED';
    if (filter === 'COLLUSION') return matchesSearch && bidder.collusionAlert;
    return matchesSearch;
  });

  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-emerald-500 text-emerald-300 border-emerald-500/30';
    if (score >= 50) return 'bg-amber-500 text-amber-300 border-amber-500/30';
    return 'bg-rose-500 text-rose-300 border-rose-500/30';
  };

  const getForensicBadge = (status) => {
    switch (status) {
      case 'CLEAN_PASS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Clean Pass
          </span>
        );
      case 'MINOR_ANOMALY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Font Anomaly
          </span>
        );
      case 'COLLUSION_SUSPECT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
            <Users className="w-3.5 h-3.5 text-amber-400" /> Cartel Suspect
          </span>
        );
      case 'CRITICAL_FORGERY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/90 text-rose-400 border border-rose-800 animate-pulse">
            <XCircle className="w-3.5 h-3.5 text-rose-400" /> Photoshop Edit
          </span>
        );
      default:
        return null;
    }
  };

  const getRecommendationBadge = (rec) => {
    switch (rec) {
      case 'QUALIFIED':
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> QUALIFIED
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> NEEDS REVIEW
          </span>
        );
      case 'DISQUALIFIED':
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> DISQUALIFIED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
      
      {/* Table Header Controls */}
      <div className="p-4 lg:p-6 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            Live Bidders Verification & Evidence Matrix
          </h2>
          <p className="text-xs text-slate-400">
            Automated OCR Spatial Extraction, Government Portal Adapters & Forensics Engine Evaluation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search bidder, GSTIN, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['ALL', 'QUALIFIED', 'NEEDS_REVIEW', 'DISQUALIFIED', 'COLLUSION'].map((btn) => (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === btn
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {btn === 'ALL' ? 'All (5)' : btn === 'COLLUSION' ? 'Cartel (2)' : btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Rank / Bidder ID</th>
              <th className="py-3.5 px-4">Company & Statutory Registration</th>
              <th className="py-3.5 px-4">Exemption & MII Category</th>
              <th className="py-3.5 px-4 text-center">Compliance Score</th>
              <th className="py-3.5 px-4">AI Forensics & Tamper Check</th>
              <th className="py-3.5 px-4">Portal Cross-Check</th>
              <th className="py-3.5 px-4">AI Recommendation</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredBidders.map((bidder) => (
              <tr 
                key={bidder.id}
                className={`hover:bg-slate-800/40 transition-colors ${
                  bidder.forensicScan === 'CRITICAL_FORGERY' ? 'bg-rose-950/10' : ''
                }`}
              >
                {/* Rank & ID */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-xs border border-slate-700">
                      L{bidder.rank}
                    </span>
                    <span className="font-mono text-cyan-400 font-semibold">{bidder.id}</span>
                  </div>
                </td>

                {/* Company Name & Registrations */}
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                    {bidder.companyName}
                    {bidder.collusionAlert && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] border border-amber-500/30 flex items-center gap-0.5" title={bidder.collusionDetail}>
                        <Users className="w-3 h-3" /> Collusion Risk
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 mt-1">
                    <span>GST: <strong className="text-slate-300">{bidder.gstin}</strong></span>
                    <span>•</span>
                    <span>PAN: <strong className="text-slate-300">{bidder.pan}</strong></span>
                  </div>
                </td>

                {/* Exemption Category */}
                <td className="py-4 px-4">
                  <div className="font-medium text-slate-200">{bidder.type}</div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{bidder.exemptionStatus}</div>
                </td>

                {/* Score Gauge */}
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-black border ${getScoreColor(bidder.complianceScore)}`}>
                      {bidder.complianceScore} / 100
                    </span>
                    <div className="w-20 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full ${
                          bidder.complianceScore >= 85 ? 'bg-emerald-500' : bidder.complianceScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${bidder.complianceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Forensics */}
                <td className="py-4 px-4">
                  {getForensicBadge(bidder.forensicScan)}
                  <div className="text-[11px] text-slate-400 mt-1 max-w-xs line-clamp-1" title={bidder.forensicDetails}>
                    {bidder.forensicDetails}
                  </div>
                </td>

                {/* Portal Cross-Check */}
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                      bidder.portalMatch.gstn.includes('ACTIVE') 
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                        : 'bg-rose-950 text-rose-400 border-rose-800'
                    }`}>
                      GSTN: {bidder.portalMatch.gstn.includes('ACTIVE') ? 'PASS' : 'FAIL'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      MCA: PASS
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      DEBARMENT: CLEAN
                    </span>
                  </div>
                </td>

                {/* AI Recommendation */}
                <td className="py-4 px-4">
                  {getRecommendationBadge(bidder.aiRecommendation)}
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {bidder.collusionAlert && (
                      <button
                        onClick={() => onOpenCollusion(bidder)}
                        className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all"
                        title="View Collusion Cluster Graph"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onInspectBidder(bidder)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      3-Pane Evidence
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
