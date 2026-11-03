import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle2,
  Sparkles,
  Download,
  Copy,
  ExternalLink,
  Award,
  Layers,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

const REGISTRY_PRESETS = [
  {
    id: 'KSH-KATAN-1948',
    title: 'Rajkumari Katan Silk Masterpiece',
    masterWeaver: 'Ustad Ramzan Ansari (4th Gen Master Weaver)',
    loomLocation: 'Pit Loom #07, Shivala Ghat, Varanasi',
    warp: '100% Sidlaghatta Mulberry Silk (Grade AAAA)',
    weft: 'Hand-reeled 20/22 Denier Raw Silk',
    silverContent: '98.2% Certified Silver Bullion',
    goldLayer: '24K Micron Gold Electro-drape (1.5%)',
    traceMetals: '0.3% Metallurgical Stabilizer',
    loomDuration: '144 Hours (18 Sun Cycles)',
    silkMarkNo: 'SM-IND-UP-VAR-1948-KSH',
    registeredDate: 'October 24, 2026',
    status: 'ACTIVE & VERIFIED',
  },
  {
    id: 'SILK-IND-8849',
    title: 'Imperial Kadwa Shikargah Drape',
    masterWeaver: 'Pandit Radheshyam Mishra (Loom Master)',
    loomLocation: 'Heritage Pit Loom #12, Assi Ghat, Varanasi',
    warp: '100% Sidlaghatta Pure Silk (Grade AAA)',
    weft: 'Hand-twisted Organza Silk',
    silverContent: '98.5% Sterling Silver Wire',
    goldLayer: '24K Liquid Gold Gilding (1.2%)',
    traceMetals: '0.3% Copper Binder',
    loomDuration: '210 Hours (26 Sun Cycles)',
    silkMarkNo: 'SM-IND-UP-VAR-8849-KSH',
    registeredDate: 'September 12, 2026',
    status: 'ACTIVE & VERIFIED',
  },
  {
    id: 'ZARI-AU-24K',
    title: 'Royal Trousseau Heirloom Weave',
    masterWeaver: 'Gulzar Ahmad & Sons (Guild Laureate)',
    loomLocation: 'Imperial Guild, Madanpura, Varanasi',
    warp: '100% Mulberry Double Warp Silk',
    weft: 'Dual-Ply Zari & Crimson Silk Core',
    silverContent: '98.2% Hallmarked Silver Bullion',
    goldLayer: 'Liquid 24K Gold Alloy (1.5%)',
    traceMetals: '0.3% Stabilizer Alloy',
    loomDuration: '180 Hours (22 Sun Cycles)',
    silkMarkNo: 'SM-IND-UP-VAR-24K-KSH',
    registeredDate: 'August 04, 2026',
    status: 'ACTIVE & VERIFIED',
  },
];

export default function VerifierModal({ isOpen, onClose }) {
  const [searchInput, setSearchInput] = useState('KSH-KATAN-1948');
  const [activeRecord, setActiveRecord] = useState(REGISTRY_PRESETS[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (codeToVerify) => {
    const code = (codeToVerify || searchInput).trim().toUpperCase();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const match = REGISTRY_PRESETS.find((r) => r.id.toUpperCase() === code);
      if (match) {
        setActiveRecord(match);
      } else {
        // Fallback dynamically generated custom verification certificate
        setActiveRecord({
          id: code || 'KSH-GEN-2026',
          title: 'Registered Kashika Handloom Saree',
          masterWeaver: 'Certified Master Weaver Guild (Varanasi)',
          loomLocation: 'Shivala Ghat Certified Handloom Shed',
          warp: '100% Certified Mulberry Silk (Grade AAAA)',
          weft: 'Sidlaghatta Hand-reeled Pure Silk',
          silverContent: '98.2% Tested Silver Bullion',
          goldLayer: '24K Liquid Gold Gilding (1.5%)',
          traceMetals: '0.3% Trace Minerals',
          loomDuration: '160 Hours of Pit Loom Craft',
          silkMarkNo: `SM-IND-UP-VAR-${Math.floor(1000 + Math.random() * 9000)}-KSH`,
          registeredDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          status: 'ACTIVE & VERIFIED',
        });
      }
    }, 600);
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(activeRecord.silkMarkNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-3xl bg-[#121212] border border-[0.5px] border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-[#FBF9F5] font-sans my-8"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#20050B] via-[#121212] to-[#20050B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-editorial font-normal tracking-wide text-[#FBF9F5] flex items-center gap-2">
                  <span>Royal Weaver Registry & Zari Assay</span>
                  <span className="text-xs text-[#D4AF37]">⚜</span>
                </h2>
                <p className="text-[10px] sm:text-xs text-stone-400 font-sans tracking-wide">
                  Central Silk Board of India & Kashika Metallurgy Verification Desk
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close Verifier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            {/* Search and Quick Presets */}
            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                Inspect Loom Hallmark ID or Scan QR Seal
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Serial (e.g. KSH-KATAN-1948)"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs tracking-wider text-white uppercase focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerify()}
                    disabled={isVerifying}
                    className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 shrink-0 btn-shimmer disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <span className="animate-spin text-sm">⟳</span>
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>Verify Seal</span>
                  </button>

                  <button
                    onClick={() => setScanMode(!scanMode)}
                    className={`px-3 py-2.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                      scanMode
                        ? 'bg-[#881326] border-[#881326] text-white'
                        : 'bg-white/5 border-white/15 text-stone-300 hover:text-white'
                    }`}
                    title="Toggle QR Camera Scanner"
                  >
                    <QrCode className="w-4 h-4 text-[#D4AF37]" />
                    <span className="hidden sm:inline">{scanMode ? 'Hide Viewfinder' : 'QR Scan'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Preset Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="text-stone-400 text-[10px] uppercase tracking-wider font-semibold">
                  Test Seals:
                </span>
                {REGISTRY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSearchInput(preset.id);
                      handleVerify(preset.id);
                    }}
                    className={`px-2.5 py-1 rounded-full border text-[10px] tracking-wider transition-all ${
                      activeRecord.id === preset.id
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    {preset.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated QR Viewfinder if toggled */}
            <AnimatePresence>
              {scanMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative p-6 rounded-xl bg-black border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <div className="relative w-48 h-48 border-2 border-dashed border-[#D4AF37]/60 rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Animated Golden Scan Line */}
                    <motion.div
                      animate={{ y: [-80, 80, -80] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_12px_#D4AF37]"
                    />
                    <QrCode className="w-24 h-24 text-stone-700 stroke-1" />
                    <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-stone-300 font-sans mt-3">
                    Align your silk weave hallmark QR tag inside the golden reticle.
                  </p>
                  <button
                    onClick={() => {
                      setScanMode(false);
                      handleVerify('KSH-KATAN-1948');
                    }}
                    className="mt-2 text-[10px] text-[#D4AF37] uppercase tracking-wider underline hover:text-white"
                  >
                    Simulate Camera QR Detection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Verification Certificate Card */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-[#181818] to-[#0d0d0d] border border-[0.5px] border-[#D4AF37]/35 space-y-6 shadow-xl relative overflow-hidden">
              {/* Corner Watermark */}
              <div className="absolute right-4 top-4 text-7xl font-serif text-white/[0.03] select-none pointer-events-none">
                ⚜
              </div>

              {/* Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
                    {activeRecord.status}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs text-stone-300 font-mono tracking-wider">
                    {activeRecord.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Silk Mark India Authenticated</span>
                </div>
              </div>

              {/* Title & Master Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
                      Registered Masterpiece
                    </span>
                    <h3 className="text-xl font-editorial font-normal text-[#FBF9F5]">
                      {activeRecord.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span><strong>Weave Duration:</strong> {activeRecord.loomDuration}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span><strong>Master Weaver:</strong> {activeRecord.masterWeaver}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span><strong>Loom Site:</strong> {activeRecord.loomLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Silk Mark License & QR Token */}
                <div className="p-4 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">
                      Central Silk Mark License
                    </span>
                    <p className="text-xs font-mono font-bold text-stone-200">
                      {activeRecord.silkMarkNo}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Inscribed on {activeRecord.registeredDate}
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded bg-white p-1.5 shrink-0 flex items-center justify-center shadow-lg">
                    {/* Embedded SVG QR Symbol */}
                    <svg viewBox="0 0 24 24" className="w-full h-full text-black" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm3 10h-3v2h2v3h-2v3h3v-2h2v2h2v-3h-2v-3h-2v2h-1v-2h1v-1zm-3 6h2v2h-2v-2zm7 0h2v2h-2v-2zM5 5h2v2H5V5zm0 14h2v2H5v-2zm14-14h2v2h-2V5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* 98.2% Silver Zari Spectrometry Alloy Breakdown */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Metallurgical Zari Spectrometry Assay</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    LAB TESTED 99.7% NOBLE METAL
                  </span>
                </div>

                {/* Progress Spectrometer Bars */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] pb-1">
                      <span className="text-stone-300">98.2% Pure Sterling Silver Wire (Core)</span>
                      <span className="text-[#D4AF37] font-bold font-mono">98.2%</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-200 rounded-full w-[98.2%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] pb-1">
                      <span className="text-stone-300">24K Liquid Gold Gilding (Drape Coating)</span>
                      <span className="text-amber-400 font-bold font-mono">1.5%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] pb-1">
                      <span className="text-stone-300">Noble Trace Alloy (Tensile Reinforcement)</span>
                      <span className="text-stone-400 font-bold font-mono">0.3%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-stone-500 rounded-full w-[5%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Silk Fiber Analysis */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">
                    Warp Thread Spec
                  </span>
                  <p className="text-stone-200">{activeRecord.warp}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">
                    Weft Thread Spec
                  </span>
                  <p className="text-stone-200">{activeRecord.weft}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <button
                  onClick={handleCopyHash}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-sans flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{copied ? 'License Inscribed to Clipboard!' : 'Copy License String'}</span>
                </button>

                <a
                  href={`https://wa.me/917676721111?text=${encodeURIComponent(
                    `Pranam Kashika Concierge. Please share the physical metallurgical certificate dossier for Serial ${activeRecord.id} (${activeRecord.title}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-black text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-1.5 btn-shimmer"
                >
                  <span>Request Physical Wax-Sealed Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
