import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Check, Trash2, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import confetti from "canvas-confetti";

export default function TrousseauBox({
  trousseauItems,
  onRemoveItem,
  onCheckoutTrousseau,
  currency,
  masterDesign
}) {
  const isComplete = trousseauItems.length === 3;
  const totalPrice = trousseauItems.reduce((acc, item) => acc + item.masterDesign.basePriceINR, 0);
  const discountPrice = Math.round(totalPrice * 0.85); // 15% bridal bundle discount
  const savings = totalPrice - discountPrice;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#881326", "#ffffff"]
    });
  };

  const formatPrice = (priceINR) => {
    if (currency === "USD") return `$${Math.round(priceINR / 83)}`;
    if (currency === "GBP") return `£${Math.round(priceINR / 105)}`;
    if (currency === "AED") return `AED ${Math.round(priceINR / 22.6)}`;
    return `₹${priceINR.toLocaleString("en-IN")}`;
  };

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 md:px-8 border-t border-[var(--border-gold)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-400/15 text-amber-200 border border-amber-400/30 mb-3">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            Interactive Bridal Suite
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-black text-white tracking-tight">
            The Royal Bridal Trousseau Box
          </h2>
          <p className="text-sm font-editorial italic text-white/70 mt-2">
            Curate your 3-event ceremonial wardrobe across our heritage colorways. Complete the heirloom box to unlock our 15% Royal Bridal Privilege & bespoke handcrafted brass trunk.
          </p>
        </div>

        {/* 3-Slot Royal Velvet Trunk Stage */}
        <div className="royal-glass p-6 sm:p-10 rounded-3xl border border-amber-500/30 relative overflow-hidden">
          {/* Subtle Brass Corner Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

          {/* Slots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[0, 1, 2].map((slotIndex) => {
              const item = trousseauItems[slotIndex];
              const slotLabels = [
                { event: "01 // Haldi & Morning Rituals", def: "Pitambari Saffron / Gold" },
                { event: "02 // Muhurtham & Sacred Vows", def: "Sindoor Crimson / Ruby" },
                { event: "03 // Evening Sangeet & Reception", def: "Neelambari Indigo / Emerald" }
              ];

              return (
                <div
                  key={slotIndex}
                  className={`min-h-[220px] rounded-2xl p-5 border flex flex-col justify-between transition-all duration-500 ${
                    item
                      ? "bg-black/50 border-amber-400/50 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                      : "bg-white/[0.02] border-white/10 border-dashed"
                  }`}
                >
                  {/* Slot Header */}
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-royal font-bold uppercase tracking-wider text-amber-200/90">
                      {slotLabels[slotIndex].event}
                    </span>
                    {item && (
                      <button
                        type="button"
                        onClick={() => onRemoveItem(slotIndex)}
                        className="text-white/40 hover:text-red-400 transition-colors p-1"
                        title="Remove Saree"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Slot Body */}
                  {item ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="my-3 flex items-center gap-3.5 p-3 rounded-xl bg-black/40 border border-white/10"
                    >
                      {/* Swatch Bubble */}
                      <div
                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-md shrink-0 relative overflow-hidden"
                        style={{ background: item.colorway.hex }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-royal font-bold text-white truncate">
                          {item.masterDesign.name}
                        </div>
                        <div className="text-[11px] text-amber-300 font-editorial italic truncate">
                          {item.colorway.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-white/90 mt-0.5">
                          {formatPrice(item.masterDesign.basePriceINR)}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="my-auto py-4 text-center">
                      <div className="w-10 h-10 rounded-full border border-white/15 mx-auto mb-2 flex items-center justify-center text-white/30 text-xs">
                        {slotIndex + 1}
                      </div>
                      <p className="text-xs text-white/40 font-editorial italic">
                        Empty Slot &bull; {slotLabels[slotIndex].def}
                      </p>
                    </div>
                  )}

                  {/* Slot Footer */}
                  <div className="text-[11px] font-mono text-white/50 flex justify-between items-center">
                    <span>{item ? "Slot Confirmed" : "Awaiting Selection"}</span>
                    {item && <span className="text-emerald-400 font-bold">✓ Bound</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trousseau Summary & Privilege Unlocking Bar */}
          <div className="mt-8 pt-8 border-t border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="text-sm font-royal font-bold text-white">
                  {isComplete
                    ? "✨ Royal Bridal Privilege Unlocked (15% Off)"
                    : `Select ${3 - trousseauItems.length} more saree(s) to complete your bridal trunk`}
                </div>
                <p className="text-xs text-white/60 font-editorial italic">
                  Includes complimentary Handcrafted Velvet & Brass Keepsake Trunk (Worth ₹8,500)
                </p>
              </div>
            </div>

            {/* Price & Checkout Action */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              {trousseauItems.length > 0 && (
                <div className="text-right">
                  {isComplete ? (
                    <div>
                      <div className="text-xs text-white/50 line-through">
                        {formatPrice(totalPrice)}
                      </div>
                      <div className="text-2xl font-royal font-bold text-gold-gradient">
                        {formatPrice(discountPrice)}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        Save {formatPrice(savings)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs text-white/50">Current Total</div>
                      <div className="text-2xl font-royal font-bold text-white">
                        {formatPrice(totalPrice)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                disabled={trousseauItems.length === 0}
                onClick={() => {
                  if (isComplete) triggerConfetti();
                  onCheckoutTrousseau(trousseauItems, isComplete ? discountPrice : totalPrice);
                }}
                className={`py-3.5 px-6 rounded-full font-royal font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                  trousseauItems.length === 0
                    ? "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"
                    : "btn-royal-gold shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                }`}
              >
                <span>{isComplete ? "Reserve Complete Trousseau" : "Reserve Selected Sarees"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
