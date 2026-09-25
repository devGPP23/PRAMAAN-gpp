import React, { useState } from 'react';
import { 
  XCircle, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Eye, 
  FileText, 
  Sparkles, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Scale
} from './Icons';

export const ThreePaneModal = ({ bidder, onClose, onOfficerDecision }) => {
  if (!bidder) return null;

  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [decision, setDecision] = useState(bidder.aiRecommendation);
  const [justification, setJustification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentDoc = bidder.documents[selectedDocIndex] || bidder.documents[0];

  const handleDecisionSubmit = () => {
    if (decision !== bidder.aiRecommendation && !justification.trim()) {
      alert('Officer justification is mandatory when overriding AI recommendation!');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      onOfficerDecision(bidder.id, decision, justification);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 lg:p-6 overflow-y-auto">
      <div className="bg-[#0B132B] border border-slate-800 rounded-3xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 lg:px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{bidder.companyName}</h3>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-xs border border-slate-700">
                  {bidder.id}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs border border-amber-500/30">
                  Rank L{bidder.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PRAMAN 3-Pane Evidence Verification: Visual Document OCR vs Live Portal Ground Truth
              </p>
            </div>
          </div>

          {/* Document Tab Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {bidder.documents.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDocIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedDocIndex === idx
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  {doc.type}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all ml-2"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal 3-Pane Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-hidden min-h-[500px]">
          
          {/* PANE 1: Visual PDF Viewer & Bounding Box Overlay (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-950 p-4 border-r border-slate-800 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" /> Pane 1: Document PDF & OCR Bounding Box
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
                PyMuPDF Render
              </span>
            </div>

            {/* Mock PDF Document Page with Bounding Box Overlay */}
            <div className="relative bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 shadow-inner min-h-[380px] flex flex-col justify-between overflow-hidden group">
              
              {/* Document Header Representation */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>GOVERNMENT OF INDIA</span>
                  <span>{currentDoc.type.toUpperCase()}</span>
                </div>
                <div className="text-center my-3">
                  <h4 className="text-sm font-bold text-slate-200">VERIFICATION EVIDENCE DOCUMENT</h4>
                  <p className="text-[10px] text-slate-400">Issued to: {bidder.companyName}</p>
                </div>
              </div>

              {/* Document Text Body */}
              <div className="space-y-3 my-4 text-xs font-mono text-slate-300">
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500">GSTIN / TAX ID:</span> <span className="text-cyan-400 font-bold">{bidder.gstin}</span>
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500">CLAIMED ANNUAL TURNOVER:</span>{' '}
                  <span className={`font-bold ${bidder.forensicScan === 'CRITICAL_FORGERY' ? 'text-rose-400 line-through' : 'text-emerald-400'}`}>
                    {bidder.forensicScan === 'CRITICAL_FORGERY' ? '₹18,50,00,000 (EDITED)' : '₹14,80,00,000'}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500">UDYAM / REG NO:</span> <span className="text-slate-200">{bidder.udyam}</span>
                </div>

                {/* Highlighted Bounding Box Overlay Simulation */}
                <div className="relative border-2 border-dashed border-cyan-400 bg-cyan-500/10 rounded-xl p-3 shadow-lg shadow-cyan-500/20">
                  <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                    PaddleOCR Bounding Box [x:120, y:340, w:360, h:80]
                  </span>
                  <div className="text-[11px] text-cyan-200 font-semibold pt-1">
                    Spatial Key: <span className="text-white">"Average Annual Turnover (FY 2024-25)"</span>
                  </div>
                  <div className="text-xs text-amber-300 font-mono mt-1 font-bold">
                    Extracted Value: {bidder.forensicScan === 'CRITICAL_FORGERY' ? '₹18,50,00,000' : '₹14,80,00,000'}
                  </div>
                </div>
              </div>

              {/* Watermark / Digital Seal */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>SHA-256: {bidder.id}-HASH</span>
                <span className="text-cyan-400">OCR Confidence: {bidder.ocrConfidence}%</span>
              </div>
            </div>

          </div>

          {/* PANE 2: Structured Extracted Claims (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900/60 p-4 border-r border-slate-800 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Pane 2: Extracted Key-Values & Confidence
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-800">
                PaddleOCR Output
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Legal Entity Name</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    99.2% Conf
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{bidder.companyName}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Statutory GSTIN</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    98.8% Conf
                  </span>
                </div>
                <div className="text-sm font-bold text-cyan-400 font-mono">{bidder.gstin}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Exemption Category</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    97.5% Conf
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200">{bidder.type}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Extracted Turnover (3 Yr Avg)</span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    bidder.forensicScan === 'CRITICAL_FORGERY' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {bidder.forensicScan === 'CRITICAL_FORGERY' ? '91.2% Conf (Tampered)' : '98.1% Conf'}
                  </span>
                </div>
                <div className={`text-sm font-bold font-mono ${
                  bidder.forensicScan === 'CRITICAL_FORGERY' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {bidder.forensicScan === 'CRITICAL_FORGERY' ? '₹18,50,00,000 (Claimed)' : '₹14,80,00,000'}
                </div>
              </div>

              {/* Statutory Rules Gate Result */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <h5 className="text-xs font-bold text-slate-300 mb-2">Deterministic Statutory Rules Gate:</h5>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-center justify-between text-slate-300">
                    <span>MSME EMD Waiver:</span>
                    <span className="text-emerald-400 font-semibold font-mono">VALIDATED (Udyam)</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>Make In India Threshold (&ge;50%):</span>
                    <span className="text-emerald-400 font-semibold font-mono">PASSED (68% MII)</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>Debarment Check:</span>
                    <span className="text-emerald-400 font-semibold font-mono">CLEAN (No Flags)</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* PANE 3: Government Portal Ground Truth & Forensics (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-950 p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Pane 3: Portal Ground Truth & Forensics
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-mono border border-amber-800">
                Live Simulator
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Forensics Tamper Detection Alert Card */}
              <div className={`p-4 rounded-2xl border ${
                bidder.forensicScan === 'CRITICAL_FORGERY'
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : bidder.forensicScan === 'MINOR_ANOMALY' || bidder.collusionAlert
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {bidder.forensicScan === 'CRITICAL_FORGERY' ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    )}
                    AI Forensics Scan Analysis
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase">
                    {bidder.forensicScan}
                  </span>
                </div>
                <p className="text-xs font-medium leading-relaxed mb-2">
                  {bidder.forensicDetails}
                </p>
                {bidder.forensicScan === 'CRITICAL_FORGERY' && (
                  <div className="mt-2 p-2 rounded bg-rose-900/60 text-[11px] font-mono border border-rose-700">
                    ⚠️ <strong>Photoshop Tag:</strong> Software "Adobe Photoshop CS6 (Windows)" detected in PDF XMP Metadata header. Font size ratio anomaly in turnover numeral.
                  </div>
                )}
              </div>

              {/* Portal Ground Truth Side-by-Side */}
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-slate-300">Live API Ground Truth Comparison</h5>

                <div className="space-y-2 text-xs">
                  {/* GSTN */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-300">GSTN Taxpayer API</div>
                      <div className="text-[10px] text-slate-500 font-mono">GSTIN: {bidder.gstin}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      bidder.portalMatch.gstn.includes('ACTIVE')
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {bidder.portalMatch.gstn}
                    </span>
                  </div>

                  {/* MCA */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-300">MCA Corporate Registry</div>
                      <div className="text-[10px] text-slate-500 font-mono">DIN / CIN Verified</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ACTIVE_VERIFIED
                    </span>
                  </div>

                  {/* Udyam */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-300">Udyam MSME Registry</div>
                      <div className="text-[10px] text-slate-500 font-mono">Waiver Certificate Validated</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      VERIFIED
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Modal Bottom Footer: Officer Decisioning Bar */}
        <div className="p-4 lg:px-6 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Procurement Officer Final Decision:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['QUALIFIED', 'NEEDS_REVIEW', 'DISQUALIFIED'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDecision(opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    decision === opt
                      ? opt === 'QUALIFIED'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : opt === 'NEEDS_REVIEW'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Override Justification Input */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-xl">
            {decision !== bidder.aiRecommendation && (
              <input
                type="text"
                placeholder="Mandatory justification required to override AI..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-xl border border-amber-500/50 focus:outline-none focus:border-amber-400 font-mono"
              />
            )}

            <button
              onClick={handleDecisionSubmit}
              disabled={isSubmitted}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 whitespace-nowrap transition-all"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-spin" />
                  Committing to SHA-256 Ledger...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Commit Decision & Sign Block
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
