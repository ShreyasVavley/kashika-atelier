import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, ChevronDown, CheckCircle, FileText, Sparkles, MapPin } from "lucide-react";

export default function KarigarLedger({ masterDesign, selectedColorway }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full py-10 px-4 sm:px-6 md:px-8 border-t border-[var(--border-gold)]">
      <div className="max-w-6xl mx-auto">
        {/* Accordion / Expandable Dossier Card */}
        <div className="royal-glass p-6 sm:p-8 rounded-3xl border border-amber-500/25 transition-all duration-500">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/35 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-royal font-bold uppercase tracking-widest text-amber-300">
                    Heirloom Provenance & Zari Assay
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-royal font-bold text-white mt-0.5">
                  The Master Karigar Provenance Ledger
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto sm:ml-0">
              <span className="text-xs font-semibold text-amber-200 hidden sm:inline">
                {isOpen ? "Collapse Atelier Dossier" : "Inspect Purity Certificate"}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Expandable Ledger Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-8 mt-6 border-t border-amber-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Master Weaver Bio */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        Loom Origin
                      </div>
                      <div className="text-base font-royal font-bold text-white">
                        {masterDesign.karigar}
                      </div>
                      <p className="text-xs text-white/70 font-editorial italic mt-2 leading-relaxed">
                        Hand-woven on a traditional cedarwood drawloom in Varanasi. Every warp thread is hand-tied using time-honored Kadwa techniques, ensuring no loose floats on the reverse.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
                      LOOM NO: VNS-KDW-144
                    </div>
                  </div>

                  {/* Column 2: Zari Metallurgy & Assay */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Metallurgy Assay Report
                      </div>
                      <div className="text-base font-royal font-bold text-white">
                        {selectedColorway.zariName}
                      </div>
                      <p className="text-xs text-white/70 font-editorial italic mt-2 leading-relaxed">
                        Tested Core: 98.2% Fine Silver wire flattened and wound around pure silk core, electroplated with 24-Karat liquid yellow gold. Certified tarnish-resistant for up to 60 years.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-amber-300/80 font-bold">
                      ASSAY REF: ZAR-982-AU24K
                    </div>
                  </div>

                  {/* Column 3: SilkMark India Hologram */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-black/60 border border-amber-400/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
                        <Award className="w-3.5 h-3.5" />
                        Govt. SilkMark India Seal
                      </div>
                      <div className="text-base font-royal font-bold text-white">
                        100% Pure Mulberry Silk
                      </div>
                      <p className="text-xs text-white/70 font-editorial italic mt-2 leading-relaxed">
                        Affixed with the official SilkMark India cryptographic QR seal guaranteeing 100% natural mulberry silk with zero synthetic or polyester filaments.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[11px]">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified Heirloom
                      </span>
                      <span className="text-white/40 font-mono">SM-IND-88219</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
