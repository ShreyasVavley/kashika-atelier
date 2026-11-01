import React from "react";
import { Sparkles, Heart, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050508] border-t border-[var(--border-gold)] py-16 px-4 sm:px-6 md:px-8 text-white/70">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Brand Crest */}
        <div className="flex flex-col items-center">
          <span className="font-regal text-3xl sm:text-4xl font-black text-gold-gradient tracking-wider">
            KASHIKA<span className="text-amber-400">.</span>
          </span>
          <span className="text-xs font-royal uppercase tracking-[0.3em] text-amber-200/60 mt-1">
            The Royal Silk Atelier &bull; Varanasi &bull; Kanchipuram
          </span>
          <p className="text-xs sm:text-sm font-editorial italic text-white/50 max-w-md mt-3">
            Preserving centuries of sacred Indian weaving traditions with sub-second digital precision.
          </p>
        </div>

        {/* Heritage Trust Marks */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-white/60">
          <span>100% PURE MULBERRY SILK</span>
          <span>&bull;</span>
          <span>98.2% TESTED SILVER ZARI</span>
          <span>&bull;</span>
          <span>KADWA HANDLOOM GUILD</span>
          <span>&bull;</span>
          <span>CERTIFIED SILKMARK INDIA</span>
        </div>

        {/* Rizora Agency Showcase Attribution Banner */}
        <div className="w-full max-w-xl p-4 rounded-2xl bg-gradient-to-r from-amber-950/20 via-black/40 to-amber-950/20 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-left">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <span className="font-bold text-white font-royal">Engineered by Rizora Agency</span>
              <p className="text-[11px] text-white/50">Next-gen luxury D2C e-commerce with sub-second edge speeds</p>
            </div>
          </div>

          <a
            href="https://rizora-liart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold hover:bg-amber-400/30 transition-colors inline-flex items-center gap-1 shrink-0"
          >
            <span>Visit Rizora</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-white/40 font-mono pt-4 border-t border-white/5 w-full flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 KASHIKA SILK ATELIER. ALL RIGHTS RESERVED.</span>
          <span>HANDCRAFTED IN INDIA &bull; DEPLOYED ON GLOBAL EDGE NETWORKS</span>
        </div>
      </div>
    </footer>
  );
}
