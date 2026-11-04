import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Video, ShoppingBag, ShieldCheck, Clock, Award, CheckCircle2, ChevronRight, Gift } from "lucide-react";

export default function ColorwaySelector({
  masterDesign,
  selectedColorway,
  setSelectedColorway,
  currency,
  onAddToCart,
  onAddToTrousseau,
  onOpenWhatsAppVideo
}) {
  const formatPrice = (priceINR) => {
    if (currency === "USD") return `$${Math.round(priceINR / 83)}`;
    if (currency === "GBP") return `£${Math.round(priceINR / 105)}`;
    if (currency === "AED") return `AED ${Math.round(priceINR / 22.6)}`;
    return `₹${priceINR.toLocaleString("en-IN")}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heritage Badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-amber-200 border border-amber-400/30 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          SilkMark India Certified
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/70 border border-white/10 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-white/50" />
          {masterDesign.loomDuration}
        </span>
      </div>

      {/* Saree Master Title */}
      <div>
        <span className="text-xs font-royal uppercase tracking-[0.25em] text-amber-300/80 font-bold">
          Master Atelier Creation • 1 Design // 5 Colorways
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-royal font-black text-white mt-1 tracking-tight leading-tight">
          {masterDesign.name}
        </h1>
        <p className="text-sm font-editorial italic text-amber-100/70 mt-1.5">
          {masterDesign.sanskritName} &bull; {masterDesign.subtitle}
        </p>
      </div>

      {/* Price & Stock Display */}
      <div className="flex items-baseline gap-4 py-3 border-y border-[var(--border-gold)]">
        <div className="text-3xl sm:text-4xl font-bold font-royal text-gold-gradient">
          {formatPrice(masterDesign.basePriceINR)}
        </div>
        <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
          (Inclusive of all luxury taxes & insurance)
        </span>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {selectedColorway.stockCount} Pieces Available
        </div>
      </div>

      {/* THE CORE INNOVATION: 1 Design with 5 Heritage Colorways */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-royal font-bold uppercase tracking-wider text-amber-200 flex items-center gap-2">
            <span>Select Heritage Silk Dye:</span>
            <span className="text-white normal-case font-editorial text-sm font-semibold">
              {selectedColorway.name} ({selectedColorway.sanskrit})
            </span>
          </label>
          <span className="text-xs text-white/40">5 Exclusive Looms</span>
        </div>

        {/* Dynamic Colorway Swatch Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {masterDesign.colorways.map((c) => {
            const isSelected = selectedColorway.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedColorway(c);
                }}
                className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "bg-black/30 border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {/* Round Silk Swatch with Zari Ring */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-inner border-2 border-white/20 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center relative overflow-hidden"
                  style={{ background: c.hex }}
                >
                  {/* Subtle silk weave sheen highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
                  {isSelected && (
                    <motion.div
                      layoutId="swatchIndicator"
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                    />
                  )}
                </div>

                <span className="text-[10px] sm:text-xs font-medium text-white/80 mt-1.5 text-center truncate w-full">
                  {c.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Colorway Occasion & Blouse Spec Dossier */}
      <motion.div
        key={selectedColorway.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="royal-glass-subtle p-4 rounded-xl border border-amber-500/20 flex flex-col gap-2.5 text-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-white/60 font-medium">Recommended Ritual:</span>
          <span className="text-amber-300 font-bold font-royal text-right">
            {selectedColorway.occasion}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-white/60 font-medium">Zari Specification:</span>
          <span className="text-amber-200 font-semibold text-right">
            {selectedColorway.zariName}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-white/60 font-medium">Included Blouse Piece:</span>
          <span className="text-white/90 font-editorial italic text-right max-w-[65%]">
            {selectedColorway.blousePiece}
          </span>
        </div>
      </motion.div>

      {/* Action Buttons: Instant Concierge & Reservation */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {/* Button 1: Add to Bag */}
        <button
          type="button"
          onClick={() => {
            onAddToCart(masterDesign, selectedColorway);
          }}
          className="btn-royal-gold flex-1 py-3.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Reserve Saree in Silk Bag</span>
        </button>

        {/* Button 2: Add to Bridal Trousseau Box */}
        <button
          type="button"
          onClick={() => {
            onAddToTrousseau(masterDesign, selectedColorway);
          }}
          className="btn-royal-outline flex-1 py-3.5"
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span>Add to Trousseau Box</span>
        </button>
      </div>

      {/* VIP 1-on-1 Loom Video Showing on WhatsApp */}
      <button
        type="button"
        onClick={() => onOpenWhatsAppVideo(masterDesign, selectedColorway)}
        className="w-full py-3 px-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center gap-2.5 text-xs font-semibold"
      >
        <Video className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>Request 1-on-1 VIP Video Call on WhatsApp to inspect the Pallu fall</span>
        <ChevronRight className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
      </button>

      {/* Assurance Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px] text-white/60">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Pure Zari Certificate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Worldwide Insured Air Express</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Complimentary Fall & Pico</span>
        </div>
      </div>
    </div>
  );
}
