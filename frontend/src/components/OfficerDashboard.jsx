import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Database, 
  Sparkles, 
  FileText, 
  Lock, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  ArrowRight, 
  Download, 
  RefreshCw, 
  Sliders, 
  Layers, 
  Bot, 
  Send, 
  Check, 
  Building, 
  Clock, 
  MapPin, 
  UploadCloud 
} from './Icons';

export function OfficerDashboard({ 
  activeTender, 
  bidders, 
  auditLedger, 
  onOfficerDecision, 
  onCreateTender 
}) {
  // Navigation & Sub-views in Officer Dashboard
  const [subTab, setSubTab] = useState('evaluation'); // evaluation | comparison | documents | collusion | ledger
  const [inspectedBidder, setInspectedBidder] = useState(null);
  const [collusionBidder, setCollusionBidder] = useState(null);
  
  // Create Bid (Tender Ingestion) Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [newTenderData, setNewTenderData] = useState({
    title: 'High-Efficiency Monocrystalline Bifacial Solar Modules (100MW)',
    organisation: 'NTPC Vidyut Vyapar Nigam Ltd (NVVN)',
    estimatedValue: '₹98,50,00,000',
    closingDate: '2026-10-15',
    category: 'Solar & Renewable Power Equipment',
    emdAmount: '₹1,97,00,000',
    minTurnover: '₹29.5 Cr (30% of contract)',
    minExperience: '3 completed solar projects >= 40MW',
    makeInIndiaMin: 50,
    allowMsmeExemption: true,
    allowStartupExemption: true,
    mandatoryDocs: [
      'CA Certified Turnover Certificate (FY22, FY23, FY24 with UDIN)',
      'ALMM Listed OEM Authorization Certificate',
      'Tier-1 Module Reliability & Flash Test Reports',
      'Class-I Local Supplier (Make in India >= 50%) Declaration',
      'Non-Debarment Affidavit on ₹100 Stamp Paper'
    ]
  });

  // Table Filter & Search State
  const [tableFilter, setTableFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Document Inspection State
  const [selectedBidderForDoc, setSelectedBidderForDoc] = useState(bidders[0] || null);
  const [selectedDocType, setSelectedDocType] = useState('CA Turnover Certificate');
  const [isScanningForensics, setIsScanningForensics] = useState(false);

  // Side-by-Side Comparison State (select up to 4 bidders)
  const [comparedBidderIds, setComparedBidderIds] = useState(['BID-8901', 'BID-8902', 'BID-8903']);

  // Air-Gapped AI Assistant Co-Pilot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste Officer. I am your PRAMAN Air-Gapped Verification Co-Pilot. I can answer queries about NIT rules, statutory exemptions, turnover claims, or document forensics across all submitted bids.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // Officer Decision Modal State inside 3-Pane
  const [decisionNotes, setDecisionNotes] = useState('');

  // Handle Tender Creation Submission
  const handleSimulateParsing = () => {
    setCreateStep(2);
    setParsingProgress(15);
    setTimeout(() => setParsingProgress(50), 400);
    setTimeout(() => setParsingProgress(85), 800);
    setTimeout(() => {
      setParsingProgress(100);
      setCreateStep(3);
    }, 1200);
  };

  const handlePublishNewTender = () => {
    if (onCreateTender) {
      onCreateTender({
        id: `GEM/2026/B/${Math.floor(800000 + Math.random() * 99999)}`,
        ...newTenderData,
        publishedDate: new Date().toISOString().split('T')[0],
        mandatoryRequirements: newTenderData.mandatoryDocs
      });
    }
    setShowCreateModal(false);
    setCreateStep(1);
    alert('Tender successfully created, signed with Officer DSC, and Merkle root anchored to SHA-256 Audit Ledger!');
  };

  // Toggle comparison selection
  const toggleBidderComparison = (id) => {
    setComparedBidderIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter(bId => bId !== id);
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  // Send message in AI Assistant
  const handleSendChat = (text) => {
    const query = text || inputQuery;
    if (!query.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInputQuery('');

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();
      if (lower.includes('msme') || lower.includes('waiver')) {
        reply = 'Clause Ref: NIT Page 14, Sec 4.2 & GeM GTC. Solarix Green (BID-8901) holds valid Micro Enterprise Udyam Registration (UDYAM-DL-03-0049281). As per Public Procurement Policy for MSEs Order 2012, prior turnover and EMD conditions are statutory waived. Recommended: QUALIFIED.';
      } else if (lower.includes('apex') || lower.includes('collusion') || lower.includes('cartel')) {
        reply = 'Alert Ref: NetworkX Cluster #C-104. Apex InfraTech (BID-8903) and GreenVolt Power (BID-8904) share common Director DIN 08912441 (Sunil Singhania) and submitted bids from identical physical IP address within 4 minutes. High cartel collusion alert flagged.';
      } else if (lower.includes('photoshop') || lower.includes('tamper') || lower.includes('forge') || lower.includes('greenvolt')) {
        reply = 'Forensic Ref: PyMuPDF Scan on GreenVolt CA Turnover PDF. XMP metadata reveals "Adobe Photoshop 24.1 (Windows)" modification history on 2026-09-24. Digital font kerning anomaly detected on Turnover field (altered from ₹40 Lakh to ₹4.80 Cr). Status: CRITICAL_FORGERY.';
      } else {
        reply = `Analysis based on active tender ${activeTender.id}: 5 bids submitted. 2 Qualified, 1 Needs Review (UDIN format flag), 2 Disqualified (1 Cartel suspect, 1 Forensic forgery). All verification artifacts hashed on SHA-256 block ledger.`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 500);
  };

  // Filtered Bidders for Table
  const filteredBidders = bidders.filter(bidder => {
    const matchesSearch = bidder.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bidder.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bidder.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tableFilter === 'ALL') return matchesSearch;
    if (tableFilter === 'QUALIFIED') return matchesSearch && bidder.aiRecommendation === 'QUALIFIED';
    if (tableFilter === 'NEEDS_REVIEW') return matchesSearch && bidder.aiRecommendation === 'NEEDS_REVIEW';
    if (tableFilter === 'DISQUALIFIED') return matchesSearch && bidder.aiRecommendation === 'DISQUALIFIED';
    if (tableFilter === 'COLLUSION') return matchesSearch && bidder.collusionAlert;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* STRIPE-INSPIRED LIGHT OFFICER HERO BANNER */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-50/50 to-blue-50/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#635BFF] font-mono text-xs font-bold border border-indigo-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#635BFF]" />
                GeM Procurement Officer Console
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                DSC Token Valid (e-Sign 256-bit)
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Officer ID: <strong className="text-slate-700 font-bold">PO-GOV-DEL-7712</strong>
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
              Procurement & Statutory Compliance Workspace
            </h1>

            <p className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700">Dr. Vikramaditya Malhotra (Chief Procurement Officer, NTPC)</span>
              <span>•</span>
              <span className="text-[#635BFF] font-semibold">{activeTender.title}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold text-xs shadow-sm hover:shadow active:scale-98 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Bid (Ingest NIT)
            </button>

            <button
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                isChatOpen 
                  ? 'bg-indigo-50 text-[#635BFF] border-indigo-200 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
              }`}
            >
              <Bot className="w-4 h-4 text-[#635BFF]" />
              AI Officer Co-Pilot
            </button>
          </div>

        </div>

        {/* Live Tender Metadata Summary & Rule Gates */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span>Tender: <strong className="text-[#0A2540] font-mono">{activeTender.id}</strong></span>
            <span>Est. Value: <strong className="text-[#635BFF] font-semibold">{activeTender.estimatedValue}</strong></span>
            <span>EMD: <strong className="text-amber-700 font-semibold">{activeTender.emdAmount}</strong></span>
            <span>Closing: <strong className="text-slate-700 font-mono">{activeTender.closingDate}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">Rule Gates:</span>
            {activeTender.mandatoryRequirements.slice(0, 3).map((req, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 text-[11px] font-medium border border-slate-200">
                ✓ {req.split(' ')[0]} {req.split(' ')[1]}...
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STRIPE-LIKE SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
        
        <button
          onClick={() => setSubTab('evaluation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            subTab === 'evaluation'
              ? 'bg-[#635BFF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          1. Bid Compliance Evaluation
        </button>

        <button
          onClick={() => setSubTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            subTab === 'comparison'
              ? 'bg-[#635BFF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          2. Bidder Comparison Matrix
        </button>

        <button
          onClick={() => setSubTab('documents')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            subTab === 'documents'
              ? 'bg-[#635BFF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          3. Check Documents & Forensics
        </button>

        <button
          onClick={() => setSubTab('collusion')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            subTab === 'collusion'
              ? 'bg-[#635BFF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          4. Cartel Graph (NetworkX)
        </button>

        <button
          onClick={() => setSubTab('ledger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            subTab === 'ledger'
              ? 'bg-[#635BFF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" />
          5. Cryptographic Ledger (SHA-256)
        </button>

      </div>

      {/* STRIPE-STYLE STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Bidders</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-[#0A2540]">{bidders.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Submitted bid packages for active tender</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Qualified</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {bidders.filter(b => b.aiRecommendation === 'QUALIFIED').length}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">Meets 100% statutory & NIT rule gates</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Under Officer Review</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {bidders.filter(b => b.aiRecommendation === 'NEEDS_REVIEW').length}
          </div>
          <p className="text-[11px] text-amber-700 mt-1">Minor OCR/format discrepancy</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Disqualified / Collusion</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {bidders.filter(b => b.aiRecommendation === 'DISQUALIFIED' || b.collusionAlert).length}
          </div>
          <p className="text-[11px] text-rose-700 mt-1">Tampered certificate or cartel link</p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* VIEW 1: BID COMPLIANCE EVALUATION (MAIN TABLE)          */}
      {/* ======================================================== */}
      {subTab === 'evaluation' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Table Search & Filter Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by company, GSTIN, or Bid ID..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
              {['ALL', 'QUALIFIED', 'NEEDS_REVIEW', 'DISQUALIFIED', 'COLLUSION'].map((f) => (
                <button
                  key={f}
                  onClick={() => setTableFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    tableFilter === f
                      ? 'bg-[#635BFF] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {f === 'ALL' ? 'All Bidders' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <th className="p-4 w-12">Rank</th>
                  <th className="p-4">Bidder Details</th>
                  <th className="p-4">Statutory & MSME Status</th>
                  <th className="p-4">AI Score</th>
                  <th className="p-4">Forensics Check</th>
                  <th className="p-4">Government Registry</th>
                  <th className="p-4">AI Recommendation</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBidders.map((bidder) => {
                  const isQualified = bidder.aiRecommendation === 'QUALIFIED';
                  const isReview = bidder.aiRecommendation === 'NEEDS_REVIEW';

                  return (
                    <tr key={bidder.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-500">
                        #{bidder.rank}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-[#0A2540] text-sm">{bidder.companyName}</div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                          <span className="text-[#635BFF] font-semibold">{bidder.id}</span>
                          <span>•</span>
                          <span>GSTIN: {bidder.gstin}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-slate-700">{bidder.type}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{bidder.exemptionStatus}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            bidder.complianceScore >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            bidder.complianceScore >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {bidder.complianceScore}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {bidder.ocrConfidence}% OCR
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        {bidder.forensicScan === 'CLEAN_PASS' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Clean Pass
                          </span>
                        )}
                        {bidder.forensicScan === 'MINOR_ANOMALY' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Font Anomaly
                          </span>
                        )}
                        {bidder.forensicScan === 'CRITICAL_FORGERY' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Photoshop Edit
                          </span>
                        )}
                      </td>

                      <td className="p-4 font-mono text-[11px]">
                        <div className="text-emerald-700 font-semibold">GSTN: {bidder.portalMatch.gstn}</div>
                        <div className="text-slate-500">Debarment: {bidder.portalMatch.debarment}</div>
                      </td>

                      <td className="p-4">
                        {isQualified && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> QUALIFIED
                          </span>
                        )}
                        {isReview && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> NEEDS REVIEW
                          </span>
                        )}
                        {!isQualified && !isReview && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" /> DISQUALIFIED
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setInspectedBidder(bidder)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#635BFF]" />
                          Inspect Evidence
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: SIDE-BY-SIDE BIDDER COMPARISON MATRIX           */}
      {/* ======================================================== */}
      {subTab === 'comparison' && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#635BFF]" />
                Side-by-Side Bidder Statutory Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Compare statutory compliance, financial criteria, Make-in-India content, and forensic checks head-to-head.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-1 font-mono">Select to compare:</span>
              {bidders.map(b => (
                <button
                  key={b.id}
                  onClick={() => toggleBidderComparison(b.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    comparedBidderIds.includes(b.id)
                      ? 'bg-[#635BFF] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {b.id}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-slate-500 uppercase tracking-wider font-semibold w-56 bg-slate-50 sticky left-0 z-10">
                      Parameter / Criteria
                    </th>
                    {bidders
                      .filter(b => comparedBidderIds.includes(b.id))
                      .map(b => (
                        <th key={b.id} className="p-4 border-l border-slate-200 min-w-[260px]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[#635BFF] font-bold text-sm">{b.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                              b.aiRecommendation === 'QUALIFIED' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : b.aiRecommendation === 'NEEDS_REVIEW'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {b.aiRecommendation}
                            </span>
                          </div>
                          <div className="font-bold text-[#0A2540] text-xs truncate">{b.companyName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{b.gstin}</div>
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  
                  {/* Row: Score */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-[#0A2540] bg-slate-50/40 sticky left-0">
                      AI Compliance Score
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                            b.complianceScore >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            b.complianceScore >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {b.complianceScore}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">
                              {b.complianceScore >= 85 ? 'High Compliance' : b.complianceScore >= 50 ? 'Partial Pass' : 'Non-Compliant'}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">Confidence: {b.ocrConfidence}%</div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Entity */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50/40 sticky left-0">
                      Entity & Preferential Status
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100">
                        <div className="font-medium text-slate-800">{b.type}</div>
                        <div className="text-[11px] text-[#635BFF] font-mono mt-0.5">{b.udyam}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Exemptions */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50/40 sticky left-0">
                      EMD & Turnover Exemption
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs border border-slate-200 font-medium">
                          {b.exemptionStatus}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Forensics */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50/40 sticky left-0">
                      Document Forensics (PyMuPDF)
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100">
                        <div className="flex items-center gap-1.5 mb-1 font-bold text-xs">
                          {b.forensicScan === 'CLEAN_PASS' && <span className="text-emerald-700">✓ Clean Pass</span>}
                          {b.forensicScan === 'MINOR_ANOMALY' && <span className="text-amber-700">⚠ Font Anomaly</span>}
                          {b.forensicScan === 'CRITICAL_FORGERY' && <span className="text-rose-700">✕ Critical Forgery</span>}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-2">{b.forensicDetails}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Ground Truth */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700 bg-slate-50/40 sticky left-0">
                      Government Registry Ground-Truth
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100 font-mono text-[11px] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">GSTN:</span>
                          <span className="text-emerald-700 font-semibold">{b.portalMatch.gstn}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Debarment:</span>
                          <span className={b.portalMatch.debarment === 'CLEAN' ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                            {b.portalMatch.debarment}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr className="bg-slate-50/70">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50 sticky left-0">
                      Actions
                    </td>
                    {bidders.filter(b => comparedBidderIds.includes(b.id)).map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100">
                        <button
                          type="button"
                          onClick={() => setInspectedBidder(b)}
                          className="w-full py-2 px-3 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Launch 3-Pane Evidence
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: CHECK DOCUMENTS & FORENSICS                      */}
      {/* ======================================================== */}
      {subTab === 'documents' && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#635BFF]" />
                Document Intelligence & Zero-Trust Forensics Scrutiny
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Deep scrutiny of submitted certificates, PaddleOCR spatial bounding boxes, and metadata anti-tamper forensics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">Bidder:</span>
                <select
                  value={selectedBidderForDoc?.id}
                  onChange={(e) => {
                    const found = bidders.find(b => b.id === e.target.value);
                    if (found) setSelectedBidderForDoc(found);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#635BFF] font-mono shadow-2xs"
                >
                  {bidders.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} - {b.companyName.substring(0, 24)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">Doc:</span>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#635BFF] font-mono shadow-2xs"
                >
                  <option value="CA Turnover Certificate">CA Turnover Certificate (UDIN)</option>
                  <option value="GST Certificate">GST REG-06 Registration</option>
                  <option value="Udyam Registration">Udyam / MSME Certificate</option>
                  <option value="OEM Authorization">OEM Authorization Letter</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsScanningForensics(true);
                  setTimeout(() => setIsScanningForensics(false), 800);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#635BFF] text-xs font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanningForensics ? 'animate-spin' : ''}`} />
                Re-Run Forensic Scan
              </button>
            </div>
          </div>

          {/* 3-Column Document Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Document Canvas */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  1. Document Canvas & OCR Bounding Boxes
                </span>
                <span className="text-[11px] font-mono text-[#635BFF]">Page 1 of 2</span>
              </div>

              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex-1 flex flex-col justify-between font-mono text-[11px] relative overflow-hidden select-none">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  PaddleOCR 98.4%
                </div>

                <div className="space-y-3">
                  <div className="text-center font-bold text-slate-800 border-b border-slate-200 pb-2">
                    {selectedDocType.toUpperCase()}
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Legal Entity:</span>
                    <div className="text-[#0A2540] font-bold">{selectedBidderForDoc?.companyName}</div>
                  </div>

                  <div className="p-2.5 bg-indigo-50/60 rounded-lg border border-indigo-200 relative">
                    <span className="text-[#635BFF] font-bold text-[10px] block">Extracted Identifier:</span>
                    <div className="text-indigo-950 font-bold">{selectedBidderForDoc?.gstin}</div>
                    <span className="absolute right-2 top-2 text-[10px] text-[#635BFF]">bbox [120, 340]</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Declared Turnover (3-Yr Avg):</span>
                    <div className="text-emerald-700 font-bold">₹4,28,00,000 / annum</div>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">UDIN / Registration Number:</span>
                    <div className="text-slate-700">24089124AAAAAA9912</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>SHA-256: 0x9f8c...3b1a</span>
                  <span className="text-emerald-700 font-semibold">✓ Client Signature Verified</span>
                </div>
              </div>
            </div>

            {/* Column 2: Forensics Analysis */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  2. Zero-Trust Forensics Analysis
                </span>
                <span className="text-[11px] font-mono text-[#635BFF]">PyMuPDF / Exif</span>
              </div>

              <div className="space-y-3 flex-1">
                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">PDF Producer / Software Trace</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      CLEAN
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Created via: <span className="font-mono text-slate-800">Skia/PDF m122 (Official Government Portal)</span>. No Adobe Photoshop or Canva traces detected.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">Font Baseline & Glyph Uniformity</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      MATCH
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Digitized font glyph baselines match document master font family. No pasted or spliced numerical tokens.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">2D Barcode Cryptographic QR Match</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    QR decoded payload targets official domain <span className="text-[#635BFF] font-mono">https://services.gst.gov.in</span>. Decoded GSTIN matches printed header string.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">Tamper Risk Probability</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
                      0.02 (VERY LOW)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Ground Truth Snapshot */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  3. Live Government Ground Truth
                </span>
                <span className="text-[11px] font-mono text-emerald-700">LIVE SYNC</span>
              </div>

              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex-1 font-mono text-[11px] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <span className="text-slate-500">Gateway:</span>
                  <span className="text-[#635BFF] font-bold">GSTN Portal Adapter API</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registry Status:</span>
                    <span className="text-emerald-700 font-bold">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Taxpayer Type:</span>
                    <span className="text-slate-800">Regular</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last GSTR-3B Filed:</span>
                    <span className="text-emerald-700 font-semibold">August 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Udyam MSME Registry:</span>
                    <span className="text-[#635BFF] font-semibold">Micro (Services)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">GeM Debarment List:</span>
                    <span className="text-emerald-700 font-bold">CLEAN</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                  Query ID: <span className="text-slate-700">Q-GSTN-2026-99214</span> • Live Query
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setInspectedBidder(selectedBidderForDoc)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Open in Full 3-Pane Evidence Modal
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 4: CARTEL GRAPH & COLLUSION (NETWORKX)             */}
      {/* ======================================================== */}
      {subTab === 'collusion' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-[#0A2540] mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" /> Cartel & Collusion Bipartite Network View
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              NetworkX graph algorithm detects shared bank account IFSCs, Director DINs, physical address tokens, and PDF author metadata across submitted bid packages.
            </p>
            <button
              onClick={() => setCollusionBidder(bidders.find(b => b.collusionAlert))}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Launch Collusion Cartel Graph Inspector
            </button>
          </div>

          {/* Collusion flagged table */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-amber-50/40 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Bidders Flagged for High Risk Cartelization / Syndicate Clustering
              </span>
              <span className="text-xs font-mono text-amber-700">Algorithm: Connected Components & Jaccard &gt; 0.70</span>
            </div>

            <div className="divide-y divide-slate-100">
              {bidders.filter(b => b.collusionAlert).map(b => (
                <div key={b.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-bold text-[#0A2540] text-sm">{b.companyName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {b.id} • GSTIN: {b.gstin} • Director DIN shared with competing bidder
                    </div>
                  </div>
                  <button
                    onClick={() => setCollusionBidder(b)}
                    className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs border border-amber-200 transition-colors"
                  >
                    View Cluster Graph
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 5: AUDIT LEDGER (SHA-256 HASH CHAIN)                */}
      {/* ======================================================== */}
      {subTab === 'ledger' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#635BFF]" />
                Cryptographic Append-Only Audit Ledger (SHA-256 Hash Chain)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every tender ingestion, OCR output, government adapter query, and officer override is cryptographically anchored.
              </p>
            </div>

            <button
              onClick={() => alert('Generating CAG-Compliant Audit Certificate PDF stamped with Merkle Root hash...')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-[#635BFF]" />
              Export CAG Compliance Certificate (PDF)
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {auditLedger.map((block, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-[#635BFF] font-bold text-[11px] border border-indigo-100">
                      Block #{block.blockIndex}
                    </span>
                    <span className="font-bold text-slate-800">{block.actionType}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{block.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400">Actor:</span> {block.actor}
                  </div>
                  <div>
                    <span className="text-slate-400">Current Block Hash:</span>{' '}
                    <span className="text-emerald-700 font-bold">{block.currentHash}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">Previous Hash:</span> {block.previousHash}
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">Payload Hash:</span> {block.payloadHash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CREATE NEW BID (NIT INGESTION) MODAL                     */}
      {/* ======================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#635BFF] font-mono text-xs font-semibold border border-indigo-100">
                  Tender Ingestion & Rule Checklist Studio (Sec 7.1)
                </span>
                <h3 className="text-lg font-black text-[#0A2540] mt-2">
                  Create New Bid / Ingest NIT Specification Document
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload Notice Inviting Tender (NIT/RFP) PDF. AI parser will automatically extract rules, thresholds, and mandatory checklists.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={createStep >= 1 ? 'text-[#635BFF]' : 'text-slate-400'}>1. Upload NIT PDF</span>
                <span className="text-slate-300">→</span>
                <span className={createStep >= 2 ? 'text-[#635BFF]' : 'text-slate-400'}>2. AI NLP Extraction</span>
                <span className="text-slate-300">→</span>
                <span className={createStep >= 3 ? 'text-[#635BFF]' : 'text-slate-400'}>3. Checklist & Gate Rules</span>
              </div>

              {createStep === 1 && (
                <div className="space-y-4">
                  <div 
                    onClick={handleSimulateParsing}
                    className="border-2 border-dashed border-indigo-200 hover:border-[#635BFF] rounded-2xl p-8 text-center cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition-all"
                  >
                    <UploadCloud className="w-10 h-10 text-[#635BFF] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#0A2540]">Click or drag NIT / RFP document here</h4>
                    <p className="text-xs text-slate-500 mt-1">Accepted: PDF up to 50MB (GeM Standard NIT / CPPP RFP)</p>
                    <div className="mt-4">
                      <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-[#635BFF] text-xs font-bold border border-indigo-200">
                        ⚡ Click to Auto-Load Sample 100MW Solar NIT Document
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="font-bold text-slate-700">Preset Detected NIT Parameters:</div>
                    <div className="text-slate-600">Title: <span className="text-slate-900 font-semibold">{newTenderData.title}</span></div>
                    <div className="text-slate-600">Authority: <span className="text-slate-900 font-semibold">{newTenderData.organisation}</span></div>
                    <div className="text-slate-600">Est. Value: <span className="text-[#635BFF] font-mono font-bold">{newTenderData.estimatedValue}</span></div>
                  </div>
                </div>
              )}

              {createStep === 2 && (
                <div className="py-8 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#635BFF] flex items-center justify-center mx-auto animate-spin">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0A2540]">PyMuPDF & AI Extraction In Progress...</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Scanning contract clauses, financial turnover equations, Make-in-India percentages, and statutory certificates manifest.
                  </p>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div 
                      className="bg-[#635BFF] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${parsingProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#635BFF] font-bold">{parsingProgress}% completed</span>
                </div>
              )}

              {createStep === 3 && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-800 font-medium">
                      AI successfully parsed 5 eligibility rules and 2 statutory exemptions from NIT text.
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                        Tender Title
                      </label>
                      <input
                        type="text"
                        value={newTenderData.title}
                        onChange={(e) => setNewTenderData({ ...newTenderData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#635BFF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                          Estimated Value (INR)
                        </label>
                        <input
                          type="text"
                          value={newTenderData.estimatedValue}
                          onChange={(e) => setNewTenderData({ ...newTenderData, estimatedValue: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                          EMD Amount (INR)
                        </label>
                        <input
                          type="text"
                          value={newTenderData.emdAmount}
                          onChange={(e) => setNewTenderData({ ...newTenderData, emdAmount: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                      <span className="text-xs font-bold text-slate-800 block">Statutory Preferential Exemptions:</span>
                      <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                        <span>Allow MSME Turnover & EMD Waiver (MSE Order 2012)</span>
                        <input 
                          type="checkbox" 
                          checked={newTenderData.allowMsmeExemption}
                          onChange={(e) => setNewTenderData({ ...newTenderData, allowMsmeExemption: e.target.checked })}
                          className="rounded text-[#635BFF] focus:ring-0" 
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                        <span>Allow DPIIT Startup Exemption (Turnover & Prior Experience)</span>
                        <input 
                          type="checkbox" 
                          checked={newTenderData.allowStartupExemption}
                          onChange={(e) => setNewTenderData({ ...newTenderData, allowStartupExemption: e.target.checked })}
                          className="rounded text-[#635BFF] focus:ring-0" 
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-800 block mb-1.5">
                        Mandatory Document Checklist for Bidders:
                      </span>
                      <div className="space-y-1.5">
                        {newTenderData.mandatoryDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-[#635BFF]" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Cancel
              </button>

              {createStep === 3 ? (
                <button
                  type="button"
                  onClick={handlePublishNewTender}
                  className="px-6 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold text-xs shadow-sm flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Sign with DSC & Publish Tender
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateParsing}
                  className="px-6 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold text-xs shadow-sm flex items-center gap-2"
                >
                  Parse NIT & Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3-PANE EVIDENCE VERIFICATION MODAL                       */}
      {/* ======================================================== */}
      {inspectedBidder && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#635BFF] px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                    {inspectedBidder.id}
                  </span>
                  <h3 className="text-base font-bold text-[#0A2540]">{inspectedBidder.companyName}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  GSTIN: {inspectedBidder.gstin} • Pan: {inspectedBidder.pan} • Score: {inspectedBidder.complianceScore}/100
                </p>
              </div>

              <button
                onClick={() => setInspectedBidder(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* 3 Panes Body */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
              
              {/* Pane 1: Document Visual Canvas */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Pane 1: Document Image
                    </span>
                    <span className="text-[10px] font-mono text-[#635BFF] bg-white px-2 py-0.5 rounded border border-slate-200">
                      OCR Match 98.4%
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 font-mono text-xs shadow-2xs">
                    <div className="text-center font-bold text-slate-800 pb-2 border-b border-slate-100">
                      GOVERNMENT OF INDIA • FORM GST REG-06
                    </div>
                    <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <span className="text-[10px] text-[#635BFF] font-bold block">Extracted GSTIN Token:</span>
                      <span className="text-indigo-950 font-bold">{inspectedBidder.gstin}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 block">Legal Name:</span>
                      <span className="text-slate-800 font-semibold">{inspectedBidder.companyName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between">
                  <span>SHA-256: 0x9f8c...3b1a</span>
                  <span className="text-emerald-700 font-semibold">✓ Signature Valid</span>
                </div>
              </div>

              {/* Pane 2: Extracted Claims JSON */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Pane 2: AI Extracted Claims
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Normalized JSON
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-2 text-slate-700 shadow-2xs">
                    <div><span className="text-slate-400">entity_type:</span> "{inspectedBidder.type}"</div>
                    <div><span className="text-slate-400">gstin_string:</span> "{inspectedBidder.gstin}"</div>
                    <div><span className="text-slate-400">udyam_number:</span> "{inspectedBidder.udyam}"</div>
                    <div><span className="text-slate-400">exemption_claimed:</span> "{inspectedBidder.exemptionStatus}"</div>
                    <div><span className="text-slate-400">forensic_result:</span> "{inspectedBidder.forensicScan}"</div>
                    <div><span className="text-slate-400">compliance_score:</span> {inspectedBidder.complianceScore}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                  Model: <span className="text-slate-700 font-semibold">PaddleOCR-v4 + LayoutLM-v3</span>
                </div>
              </div>

              {/* Pane 3: Portal Ground Truth */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Pane 3: Government Ground Truth
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      LIVE API MATCH
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">GSTN Status:</span>
                      <span className="text-emerald-700 font-bold">{inspectedBidder.portalMatch.gstn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">MCA Registry:</span>
                      <span className="text-emerald-700 font-bold">{inspectedBidder.portalMatch.mca}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Udyam Verification:</span>
                      <span className="text-emerald-700 font-bold">{inspectedBidder.portalMatch.udyam}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Debarment List:</span>
                      <span className="text-emerald-700 font-bold">{inspectedBidder.portalMatch.debarment}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                  Cache: Verified 24m ago via NIC / GSTN Gateway
                </div>
              </div>

            </div>

            {/* Officer Decision Footer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Officer override / justification remarks..."
                  className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 w-full sm:w-80 focus:outline-none focus:border-[#635BFF]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (onOfficerDecision) onOfficerDecision(inspectedBidder.id, 'DISQUALIFIED', decisionNotes || 'Disqualified by officer review');
                    setInspectedBidder(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors"
                >
                  Disqualify Bidder
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOfficerDecision) onOfficerDecision(inspectedBidder.id, 'QUALIFIED', decisionNotes || 'Qualified by officer review');
                    setInspectedBidder(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Accept & Qualify Bidder
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* COLLUSION NETWORK GRAPH MODAL                            */}
      {/* ======================================================== */}
      {collusionBidder && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-[#0A2540]">
                  Cartel Ring Analysis: {collusionBidder.companyName}
                </h3>
              </div>
              <button
                onClick={() => setCollusionBidder(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  Cluster #C-104: Shared DIN & IP Submission Ring
                </div>
                <p className="leading-relaxed">
                  The NetworkX bipartite graph detected a direct shared director connection (DIN: 08912441) between <strong>{collusionBidder.companyName}</strong> and competing bidder <strong>GreenVolt Power Systems Pvt Ltd</strong>. Both submissions occurred within 4 minutes from identical IP subnet.
                </p>
              </div>

              {/* Visual Nodes Simulation */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center gap-8 flex-wrap justify-center">
                  <div className="p-4 bg-white border-2 border-[#635BFF] rounded-2xl text-center shadow-xs">
                    <span className="text-[10px] font-mono text-[#635BFF] font-bold block">{collusionBidder.id}</span>
                    <span className="text-xs font-bold text-slate-800">{collusionBidder.companyName}</span>
                  </div>

                  <div className="p-3 bg-amber-100 text-amber-900 rounded-xl font-mono text-xs font-bold border border-amber-300">
                    🔗 Shared DIN: 08912441
                  </div>

                  <div className="p-4 bg-white border-2 border-rose-500 rounded-2xl text-center shadow-xs">
                    <span className="text-[10px] font-mono text-rose-600 font-bold block">BID-8904</span>
                    <span className="text-xs font-bold text-slate-800">GreenVolt Power Systems Pvt Ltd</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-center">
                  Bipartite Centrality Score: 0.89 • High Syndicate Risk
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setCollusionBidder(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* AIR-GAPPED OFFICER AI ASSISTANT (RAG CHATBOT DOCK)      */}
      {/* ======================================================== */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#635BFF] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0A2540]">PRAMAN AI Officer Co-Pilot</h4>
                <p className="text-[10px] text-emerald-700 font-mono">Air-Gapped Local LLM (Llama-3)</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#635BFF] text-white rounded-br-none shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none font-mono text-[11px] shadow-2xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSendChat('Is Solarix eligible for MSME waiver?')}
              className="px-2 py-1 rounded bg-slate-100 text-[#635BFF] border border-slate-200 whitespace-nowrap hover:bg-slate-200"
            >
              MSME Waiver Check?
            </button>
            <button
              onClick={() => handleSendChat('Why was Apex flagged for collusion?')}
              className="px-2 py-1 rounded bg-slate-100 text-[#635BFF] border border-slate-200 whitespace-nowrap hover:bg-slate-200"
            >
              Apex Collusion Ring?
            </button>
            <button
              onClick={() => handleSendChat('Show Photoshop tampering on GreenVolt')}
              className="px-2 py-1 rounded bg-slate-100 text-[#635BFF] border border-slate-200 whitespace-nowrap hover:bg-slate-200"
            >
              GreenVolt Forgery?
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask about NIT rules, documents, or bids..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF]"
            />
            <button
              type="button"
              onClick={() => handleSendChat()}
              className="p-2 rounded-xl bg-[#635BFF] hover:bg-[#5349DF] text-white font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default OfficerDashboard;
