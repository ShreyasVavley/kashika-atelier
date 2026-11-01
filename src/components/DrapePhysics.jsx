import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Sliders, Shield } from "lucide-react";

export default function DrapePhysics({ selectedColorway, masterDesign }) {
  const [pleatCount, setPleatCount] = useState(7);
  const [fluidity, setFluidity] = useState(0.8);

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-8 border-t border-[var(--border-gold)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-400/15 text-amber-200 border border-amber-400/30 mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            Tactile Silk Physics
          </div>
          <h2 className="text-3xl sm:text-4xl font-royal font-black text-white tracking-tight">
            The Drape & Pleat Flow Explorer
          </h2>
          <p className="text-sm font-editorial italic text-white/70 mt-2">
            Pure Mulberry Katan silk possesses a unique architectural weight: crisp enough to hold sculpted pleats, yet fluid enough to cascade with liquid grace.
          </p>
        </div>

        {/* Pleat Simulation Card */}
        <div className="royal-glass p-6 sm:p-10 rounded-3xl border border-amber-500/25 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Interactive Pleat Animation */}
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-6 flex flex-col justify-end">
            <div className="absolute top-4 left-4 text-xs font-mono text-white/60">
              SIMULATED PLEAT DYNAMICS &bull; {selectedColorway.name}
            </div>

            {/* Pleats Wave Visualizer */}
            <div className="flex justify-center items-end h-48 gap-2 sm:gap-3">
              {[...Array(pleatCount)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ["85%", "100%", "90%"],
                    scaleX: [1, 1.05, 1],
                    y: [0, -4, 0]
                  }}
                  transition={{
                    duration: 2.2 + i * 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                  className="w-7 sm:w-9 rounded-t-lg shadow-2xl relative overflow-hidden flex flex-col justify-between border-t-2 border-x border-amber-300/40"
                  style={{
                    background: `linear-gradient(180deg, ${selectedColorway.hex} 0%, ${selectedColorway.secondaryHex} 100%)`,
                    boxShadow: `0 10px 25px -5px ${selectedColorway.accentGlow}`
                  }}
                >
                  {/* Vertical pleat crease shading */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
                  {/* Top zari line */}
                  <div className="w-full h-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
                  {/* Bottom pleat border */}
                  <div className="w-full h-8 bg-black/60 border-t border-amber-400/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedColorway.zariColor }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono text-white/60">
              <span>WEIGHT: 820 GRAMS</span>
              <span className="text-amber-300 font-bold">100% PURE MULBERRY</span>
              <span>KORVAI INTERLOCK</span>
            </div>
          </div>

          {/* Right: Technical Atelier Specifications */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-royal font-bold text-white">
              Why Authentic Kadwa Handloom Doesn't Scratch
            </h3>
            <p className="text-xs sm:text-sm font-editorial italic text-white/70 leading-relaxed">
              Unlike cheap powerloom reproductions where loose zari floats snag your jewelry and skin, Kadwa weaving requires the artisan to hand-engrave each floral motif individually with tiny wooden spools (*tilus*), locking every gold thread seamlessly into the warp.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-royal font-bold text-amber-200">Zero Floats</div>
                <div className="text-[11px] text-white/60 mt-0.5">Smooth against bare skin</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-royal font-bold text-amber-200">Natural Drapability</div>
                <div className="text-[11px] text-white/60 mt-0.5">Forms sculpted pleats effortlessly</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-royal font-bold text-amber-200">Reversible Elegance</div>
                <div className="text-[11px] text-white/60 mt-0.5">Clean underside finish</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-royal font-bold text-amber-200">Generational Heirloom</div>
                <div className="text-[11px] text-white/60 mt-0.5">Preserves value over decades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
