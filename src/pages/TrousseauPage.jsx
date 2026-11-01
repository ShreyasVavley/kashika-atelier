import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trash2, CheckCircle2, Gift, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { MASTER_DESIGNS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function TrousseauPage({
  trousseauSlots,
  onUpdateSlot,
  onClearSlot,
  onAddToCart,
  currency,
  onNavigate
}) {
  const masterSaree = MASTER_DESIGNS[0];
  const [monogramText, setMonogramText] = useState('Ananya & Siddharth • 2026');
  const [activeSelectSlotIndex, setActiveSelectSlotIndex] = useState(null);

  const slotLabels = [
    { title: 'The Sacred Muhurtham', subtitle: 'Vedic Wedding Vows & Pooja', recColor: 'sindoor-crimson' },
    { title: 'The Imperial Reception', subtitle: 'Grand Evening Durbar Banquet', recColor: 'neelambari-indigo' },
    { title: 'The Festive Sangeet', subtitle: 'Celebration of Joy & Music', recColor: 'rani-gulabi' },
  ];

  // Calculations
  const filledCount = trousseauSlots.filter(Boolean).length;
  const isTrunkComplete = filledCount === 3;
  const subtotalINR = filledCount * masterSaree.basePriceINR;
  const discountINR = isTrunkComplete ? subtotalINR * 0.15 : 0;
  const finalTotalINR = subtotalINR - discountINR;

  const handleSelectForSlot = (colorway) => {
    if (activeSelectSlotIndex !== null) {
      onUpdateSlot(activeSelectSlotIndex, colorway);
      setActiveSelectSlotIndex(null);

      // Trigger royal golden confetti if trunk just became complete
      if (filledCount === 2) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B8860B', '#D4AF37', '#781224', '#FBF4DE']
        });
      }
    }
  };

  const handleWhatsAppBooking = () => {
    const lines = trousseauSlots
      .map((s, idx) => s ? `Slot ${idx + 1} (${slotLabels[idx].title}): ${s.name}` : `Slot ${idx + 1}: Not Selected`)
      .join('%0A');

    const msg = `Pranam Kashika Bridal Atelier.%0A%0AI would like to commission the Imperial 3-Piece Bridal Trousseau Trunk:%0A${lines}%0A%0ABrass Monogram Engraving: "${encodeURIComponent(monogramText)}"%0AEstimated Investment: ${formatPrice(finalTotalINR, currency)} (with 15% Royal Privilege)%0A%0APlease connect me with the Bridal Concierge.`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-3">
          <span>⚜</span> The Imperial Trousseau <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight mb-4">
          The Three-Piece Bridal Trunk
        </h1>
        <p className="text-base sm:text-lg font-editorial italic text-[#44403C]">
          An heirloom trousseau crafted for a lifetime of celebrations. Curate three sacred colorways to unlock your 15% Royal Privilege and a bespoke hand-carved Sheesham wood trunk.
        </p>
      </div>

      {/* Main Interactive Trunk Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: The 3 Velvet Trunk Slots */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-10 rounded border border-[#B8860B]/30 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B8860B]/20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-semibold block">
                  Velvet Trunk Assembly
                </span>
                <span className="text-xl font-editorial font-bold text-[#1C1917]">
                  {filledCount} of 3 Masterpieces Selected
                </span>
              </div>

              {isTrunkComplete ? (
                <div className="bg-emerald-800 text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded font-sans font-bold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>15% Courtesy Privilege Unlocked</span>
                </div>
              ) : (
                <div className="text-xs font-sans text-[#78716C] italic">
                  Select all 3 to receive complimentary Sheesham trunk
                </div>
              )}
            </div>

            {/* 3 Slots */}
            <div className="space-y-6">
              {slotLabels.map((lbl, idx) => {
                const selected = trousseauSlots[idx];
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded border transition-all ${
                      selected
                        ? 'bg-[#FAF8F5] border-[#781224]/40 shadow-sm'
                        : 'bg-[#F4EFEA]/50 border-dashed border-[#B8860B]/40 hover:border-[#781224]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Swatch or Placeholder */}
                        <div
                          className="w-16 h-16 rounded-sm border border-black/20 shadow-inner flex items-center justify-center text-white text-lg font-crest shrink-0"
                          style={{
                            backgroundColor: selected ? selected.hex : '#E5DFD5',
                            color: selected ? '#FFF' : '#A8A29E'
                          }}
                        >
                          {selected ? '⚜' : idx + 1}
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-sans block">
                            Slot 0{idx + 1} • {lbl.subtitle}
                          </span>
                          <h3 className="text-lg font-editorial font-bold text-[#1C1917]">
                            {lbl.title}
                          </h3>
                          {selected ? (
                            <p className="text-xs font-sans text-[#781224] font-semibold mt-0.5">
                              {selected.name} • {selected.zariName}
                            </p>
                          ) : (
                            <p className="text-xs font-sans text-stone-500 italic mt-0.5">
                              No colorway assigned yet
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {selected ? (
                          <button
                            onClick={() => onClearSlot(idx)}
                            className="p-2 text-stone-400 hover:text-rose-700 transition-colors"
                            title="Remove Colorway"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveSelectSlotIndex(idx)}
                            className="px-4 py-2 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-sm"
                          >
                            Select Colorway &rarr;
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Brass Monogram Customizer */}
            <div className="mt-8 pt-6 border-t border-[#B8860B]/20">
              <label className="block text-xs uppercase tracking-widest font-sans font-semibold text-[#8A661C] mb-2">
                ⚜ Complimentary 24K Gold-Plated Brass Monogram Plate Engraving:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value)}
                  placeholder="Bride & Groom Initials / Wedding Date"
                  className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/40 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                />
              </div>

              {/* Monogram Live Preview */}
              <div className="mt-3 p-3 bg-[#1C1917] text-[#FAF8F5] rounded border border-[#B8860B] text-center shadow-inner">
                <span className="text-[10px] uppercase tracking-widest text-[#B8860B] block font-sans">
                  Engraved Brass Plate Preview:
                </span>
                <span className="text-sm font-editorial tracking-[0.25em] text-[#FBF4DE] uppercase">
                  {monogramText || 'YOUR NAMES • 2026'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Commission Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-sm">
            <h2 className="text-xl font-editorial font-bold text-[#1C1917] mb-4 pb-3 border-b border-[#B8860B]/20">
              Trousseau Privileges
            </h2>

            <div className="space-y-3 text-xs font-sans mb-6">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Sarees Subtotal ({filledCount} of 3)</span>
                <span className="font-semibold text-[#1C1917]">{formatPrice(subtotalINR, currency)}</span>
              </div>

              {isTrunkComplete ? (
                <div className="flex justify-between py-1.5 border-b border-stone-100 text-emerald-800 font-semibold">
                  <span>Royal Bridal Courtesy (15% Off)</span>
                  <span>- {formatPrice(discountINR, currency)}</span>
                </div>
              ) : (
                <div className="flex justify-between py-1.5 border-b border-stone-100 text-stone-400 italic">
                  <span>Bridal Courtesy (Add {3 - filledCount} more)</span>
                  <span>15% Off</span>
                </div>
              )}

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Sheesham Wood Velvet Trunk</span>
                <span className="font-semibold text-[#781224]">Complimentary (₹12,000 value)</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Monogram Engraved Plate</span>
                <span className="font-semibold text-[#781224]">Complimentary</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Insured White-Glove Shipping</span>
                <span className="font-semibold text-emerald-800">Free Worldwide</span>
              </div>

              <div className="pt-3 flex justify-between text-sm font-editorial font-bold text-[#1C1917]">
                <span>Total Investment</span>
                <span className="text-xl text-[#781224]">{formatPrice(finalTotalINR, currency)}</span>
              </div>
            </div>

            {/* Commission & WhatsApp Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-4 bg-[#781224] text-white text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commission Trunk via Concierge</span>
              </button>

              <button
                onClick={() => onNavigate('salon')}
                className="w-full py-3 bg-transparent text-[#781224] border border-[#B8860B] text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all text-center"
              >
                Book Private Salon Draping Session
              </button>
            </div>
          </div>

          <div className="p-6 bg-[#FAF8F5] rounded border border-[#B8860B]/20 text-xs font-sans text-[#78716C] space-y-2">
            <p className="flex items-center gap-2 text-[#1C1917] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#781224]" />
              <span>Silk Mark India & Pure Bullion Certified</span>
            </p>
            <p>Every saree inside the trunk is accompanied by its individualized weaving certificate and loom test report.</p>
          </div>
        </div>
      </div>

      {/* Modal: Select Colorway for Active Slot */}
      {activeSelectSlotIndex !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded max-w-2xl w-full border border-[#B8860B] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#B8860B]/20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-semibold block">
                  Assign Saree Colorway
                </span>
                <h3 className="text-xl font-editorial font-bold text-[#1C1917]">
                  {slotLabels[activeSelectSlotIndex].title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSelectSlotIndex(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {masterSaree.colorways.map((cw) => (
                <div
                  key={cw.id}
                  onClick={() => handleSelectForSlot(cw)}
                  className="p-4 bg-white rounded border border-[#B8860B]/30 hover:border-[#781224] cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div
                    className="w-10 h-10 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <div>
                    <h4 className="text-sm font-editorial font-bold text-[#1C1917] group-hover:text-[#781224]">
                      {cw.name}
                    </h4>
                    <p className="text-[11px] font-sans text-[#78716C] line-clamp-1">{cw.occasion}</p>
                    <span className="text-[10px] font-sans text-[#8A661C] block">{cw.zariName}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setActiveSelectSlotIndex(null)}
                className="px-6 py-2 text-xs uppercase tracking-wider font-sans text-stone-500 hover:text-stone-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
