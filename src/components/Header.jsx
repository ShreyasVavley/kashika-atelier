import React from "react";
import { ShoppingBag, Globe, ArrowLeft, Sparkles } from "lucide-react";

export default function Header({
  cartCount,
  onOpenCart,
  currency,
  setCurrency
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#07070a]/90 backdrop-blur-xl border-b border-[var(--border-gold)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex flex-col text-decoration-none group">
            <span className="font-regal text-2xl sm:text-3xl font-black tracking-wider text-gold-gradient group-hover:brightness-110 transition-all">
              KASHIKA<span className="text-amber-400">.</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-royal uppercase tracking-[0.3em] text-amber-200/60 -mt-1">
              The Royal Silk Atelier
            </span>
          </a>

          {/* Rizora Agency Signature Pill */}
          <a
            href="https://rizora-liart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-white/50 hover:text-white border border-white/10 hover:border-amber-400/40 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Engineered by Rizora</span>
          </a>
        </div>

        {/* Right: Controls & Bag */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency Switcher */}
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 text-xs text-white/70">
            <Globe className="w-3 h-3 text-amber-300 mr-1.5" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer text-xs"
              style={{ colorScheme: "dark" }}
            >
              <option value="INR" className="bg-[#0c0d12] text-white">₹ INR</option>
              <option value="USD" className="bg-[#0c0d12] text-white">$ USD</option>
              <option value="GBP" className="bg-[#0c0d12] text-white">£ GBP</option>
              <option value="AED" className="bg-[#0c0d12] text-white">AED</option>
            </select>
          </div>

          {/* Bag Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-200 hover:bg-amber-400/25 hover:border-amber-400/60 transition-all duration-300"
            aria-label="Open Silk Bag"
          >
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-[11px] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
