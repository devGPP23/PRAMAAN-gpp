export const activeTender = {
  id: "GEM/2026/B/849201",
  title: "Supply, Installation & Commissioning of 500kW Solar Grid Inverters & Transformers",
  organisation: "NTPC Limited - Renewable Energy Division",
  publishedDate: "2026-09-15",
  closingDate: "2026-09-28",
  estimatedValue: "₹4,20,00,000",
  category: "Solar & Renewable Power Equipment",
  emdAmount: "₹8,40,000 (MSME/Startup Exempt)",
  mandatoryRequirements: [
    "Minimum 3 Years Average Financial Turnover >= ₹1.25 Cr",
    "Valid GSTIN Registration & Active Tax Filing (24 Months)",
    "Valid OEM Authorization Certificate for Grid Inverters",
    "Class-I Local Supplier Preference (Make in India >= 50%)",
    "No Debarment/Blacklisting on GeM / CPPP Portals"
  ]
};

export const biddersData = [
  {
    id: "BID-8901",
    rank: 1,
    companyName: "Solarix Green Energy Solutions Pvt Ltd",
    gstin: "07AAACS9981F1Z2",
    pan: "AAACS9981F",
    udyam: "UDYAM-DL-03-0049281",
    type: "MSME (Micro) + Class-I MII (68%)",
    exemptionStatus: "EMD & Turnover Waived",
    complianceScore: 94,
    ocrConfidence: 98.4,
    forensicScan: "CLEAN_PASS",
    forensicDetails: "Digital signature valid. No image tampering detected. Metadata consistent.",
    portalMatch: {
      gstn: "ACTIVE_VERIFIED",
      mca: "ACTIVE_VERIFIED",
      udyam: "VERIFIED",
      debarment: "CLEAN"
    },
    riskLevel: "LOW",
    aiRecommendation: "QUALIFIED",
    collusionAlert: false,
    submittedAt: "2026-09-22 14:30 IST",
    documents: [
      { type: "GST Certificate", status: "VERIFIED", page: 1, bbox: [120, 340, 480, 420] },
      { type: "Udyam Registration", status: "VERIFIED", page: 1, bbox: [90, 210, 510, 310] },
      { type: "CA Turnover Certificate", status: "VERIFIED", page: 2, bbox: [200, 500, 400, 580] },
      { type: "OEM Authorization", status: "VERIFIED", page: 1, bbox: [150, 180, 450, 260] }
    ]
  },
  {
    id: "BID-8902",
    rank: 2,
    companyName: "Vayu Dynamics Power Systems Ltd",
    gstin: "27AAACV4412K1Z9",
    pan: "AAACV4412K",
    udyam: "N/A (General)",
    type: "Class-I Local Supplier (55%)",
    exemptionStatus: "None (Full EMD Paid)",
    complianceScore: 88,
    ocrConfidence: 96.2,
    forensicScan: "CLEAN_PASS",
    forensicDetails: "PDF XMP metadata verified. Font glyphs consistent.",
    portalMatch: {
      gstn: "ACTIVE_VERIFIED",
      mca: "ACTIVE_VERIFIED",
      udyam: "N/A",
      debarment: "CLEAN"
    },
    riskLevel: "LOW",
    aiRecommendation: "QUALIFIED",
    collusionAlert: false,
    submittedAt: "2026-09-23 11:15 IST",
    documents: [
      { type: "GST Certificate", status: "VERIFIED", page: 1, bbox: [100, 300, 450, 390] },
      { type: "Audited Financials 2024-25", status: "VERIFIED", page: 4, bbox: [180, 450, 420, 530] },
      { type: "OEM Authorization", status: "VERIFIED", page: 1, bbox: [140, 200, 460, 280] }
    ]
  },
  {
    id: "BID-8903",
    rank: 3,
    companyName: "Apex InfraTech Solutions India",
    gstin: "07AABCA3310P1Z4",
    pan: "AABCA3310P",
    udyam: "UDYAM-DL-01-0012894",
    type: "MSME (Small)",
    exemptionStatus: "Turnover Waived",
    complianceScore: 62,
    ocrConfidence: 91.0,
    forensicScan: "MINOR_ANOMALY",
    forensicDetails: "Font size variance in CA UDIN stamp. Soft warning.",
    portalMatch: {
      gstn: "ACTIVE_VERIFIED",
      mca: "ACTIVE_VERIFIED",
      udyam: "VERIFIED",
      debarment: "CLEAN"
    },
    riskLevel: "MEDIUM",
    aiRecommendation: "NEEDS_REVIEW",
    collusionAlert: true,
    collusionDetail: "Shared Bank IFSC & Branch Code with Nova Green Technologies",
    submittedAt: "2026-09-24 09:45 IST",
    documents: [
      { type: "GST Certificate", status: "VERIFIED", page: 1, bbox: [110, 310, 470, 400] },
      { type: "CA Turnover Certificate", status: "FLAGGED_REVIEW", page: 1, bbox: [190, 480, 410, 560] }
    ]
  },
  {
    id: "BID-8904",
    rank: 4,
    companyName: "Nova Green Technologies Pvt Ltd",
    gstin: "07AABCN8819L1Z8",
    pan: "AABCN8819L",
    udyam: "UDYAM-DL-01-0099412",
    type: "MSME (Micro)",
    exemptionStatus: "EMD Exempt",
    complianceScore: 54,
    ocrConfidence: 89.5,
    forensicScan: "COLLUSION_SUSPECT",
    forensicDetails: "Identical PDF Creator Software Tag & IP Hash as Apex InfraTech",
    portalMatch: {
      gstn: "ACTIVE_VERIFIED",
      mca: "ACTIVE_VERIFIED",
      udyam: "VERIFIED",
      debarment: "CLEAN"
    },
    riskLevel: "HIGH",
    aiRecommendation: "NEEDS_REVIEW",
    collusionAlert: true,
    collusionDetail: "Cartel Cluster Identified (Shares Director DIN 08912344 with Apex Infra)",
    submittedAt: "2026-09-24 10:12 IST",
    documents: [
      { type: "GST Certificate", status: "VERIFIED", page: 1, bbox: [110, 310, 470, 400] },
      { type: "Turnover Cert", status: "VERIFIED", page: 1, bbox: [190, 480, 410, 560] }
    ]
  },
  {
    id: "BID-8905",
    rank: 5,
    companyName: "Zenith Solar Equipments Enterprise",
    gstin: "09AAFCZ7712M1Z0",
    pan: "AAFCZ7712M",
    udyam: "N/A",
    type: "Non-MII / Importer",
    exemptionStatus: "None",
    complianceScore: 0,
    ocrConfidence: 97.8,
    forensicScan: "CRITICAL_FORGERY",
    forensicDetails: "Adobe Photoshop CS6 Metadata Tag found. Turnover figure edited from ₹18.5 Lacs to ₹18.5 Crores!",
    portalMatch: {
      gstn: "CANCELLED_TAX_DEFAULT",
      mca: "ACTIVE_VERIFIED",
      udyam: "N/A",
      debarment: "CLEAN"
    },
    riskLevel: "CRITICAL",
    aiRecommendation: "DISQUALIFIED",
    collusionAlert: false,
    submittedAt: "2026-09-23 16:50 IST",
    documents: [
      { type: "GST Certificate", status: "PORTAL_MISMATCH", page: 1, bbox: [100, 320, 460, 410] },
      { type: "CA Turnover Certificate", status: "FORGERY_DETECTED", page: 1, bbox: [220, 520, 440, 610] }
    ]
  }
];

export const auditLedger = [
  {
    blockIndex: 104,
    timestamp: "2026-09-26 00:45:12 UTC",
    eventType: "SCORE_CALCULATED",
    tenderId: "GEM/2026/B/849201",
    bidderId: "BID-8905",
    actor: "PRAMAN-AI-FORENSICS-V2",
    details: "Disqualified Zenith Solar: Forgery flag (Photoshop Edit) + GSTN Cancelled",
    previousHash: "0x8f1a...4b9c",
    blockHash: "0x3e9a4f21b78910cd4a619283e1f0a9bc412356789abcdef0123456789abcdef",
    status: "IMMUTABLE_PASS"
  },
  {
    blockIndex: 103,
    timestamp: "2026-09-24 10:15:00 UTC",
    eventType: "CARTEL_CLUSTER_DETECTED",
    tenderId: "GEM/2026/B/849201",
    bidderId: "BID-8904 & BID-8903",
    actor: "NETWORKX-COLLUSION-ENGINE",
    details: "Connected component flagged: Shared Director DIN 08912344 & HDFC Bank IFSC HDFC0001290",
    previousHash: "0x1d4e...9a0c",
    blockHash: "0x8f1a42b109c8d76e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e",
    status: "IMMUTABLE_PASS"
  },
  {
    blockIndex: 102,
    timestamp: "2026-09-22 14:35:00 UTC",
    eventType: "BID_VERIFICATION_COMPLETE",
    tenderId: "GEM/2026/B/849201",
    bidderId: "BID-8901",
    actor: "PRAMAN-PIPELINE-WORKER",
    details: "Solarix Green: Score 94/100, MSME EMD Exemption Validated via Udyam Portal",
    previousHash: "0x0000...0000",
    blockHash: "0x1d4e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    status: "IMMUTABLE_PASS"
  }
];

export const collusionNodes = [
  { id: "BID-8903", label: "Apex InfraTech", type: "BIDDER", risk: "MEDIUM" },
  { id: "BID-8904", label: "Nova Green Tech", type: "BIDDER", risk: "HIGH" },
  { id: "ATTR-DIN", label: "DIN: 08912344 (Shared Director)", type: "DIRECTOR", risk: "CRITICAL" },
  { id: "ATTR-BANK", label: "HDFC0001290 (Shared Bank Account)", type: "BANK", risk: "CRITICAL" },
  { id: "ATTR-IP", label: "IP 182.73.14.90 (Same Upload Network)", type: "IP_HASH", risk: "MEDIUM" }
];
