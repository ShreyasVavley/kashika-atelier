import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trash2, CheckCircle2, Gift, ShieldCheck, ArrowRight, MessageCircle, Plus } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
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
    { title: 'The Sacred Muhurtham', subtitle: 'Vedic Wedding Vows', defaultImg: BRAND_ASSETS.bridalEditorial },
    { title: 'The Imperial Reception', subtitle: 'Grand Durbar Banquet', defaultImg: BRAND_ASSETS.jewelryGold },
    { title: 'The Festive Sangeet', subtitle: 'Celebration of Joy', defaultImg: BRAND_ASSETS.heroBanner },
  ];

  const filledCount = trousseauSlots.filter(Boolean).length;
  const isTrunkComplete = filledCount === 3;
  const subtotalINR = filledCount * masterSaree.basePriceINR;
  const discountINR = isTrunkComplete ? subtotalINR * 0.15 : 0;
  const finalTotalINR = subtotalINR - discountINR;

  const handleSelectForSlot = (colorway) => {
    if (activeSelectSlotIndex !== null) {
      onUpdateSlot(activeSelectSlotIndex, colorway);
      setActiveSelectSlotIndex(null);

      if (filledCount === 2) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#B8860B', '#D4AF37', '#781224', '#FBF4DE']
        });
      }
    }
  };

  const handleWhatsAppBooking = () => {
    const lines = trousseauSlots
      .map((s, idx) => s ? `Slot ${idx + 1} (${slotLabels[idx].title}): ${s.name}` : `Slot ${idx + 1}: Unassigned`)
      .join('%0A');

    const msg = `Pranam Kashika Bridal Concierge.%0A%0AI would like to commission the Imperial 3-Piece Bridal Trousseau Trunk:%0A${lines}%0A%0AEngraved Brass Monogram Plate: "${encodeURIComponent(monogramText)}"%0AEstimated Investment: ${formatPrice(finalTotalINR, currency)} (with 15% Royal Privilege applied)%0A%0APlease connect me with the Bridal Atelier.`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-32 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> The Imperial Bridal Trunk <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight">
          The Three-Piece Trousseau
        </h1>
        <p className="text-sm sm:text-base font-editorial italic text-[#44403C] leading-relaxed">
          Curate three sacred colorways to unlock your 15% Royal Courtesy privilege and a complimentary hand-carved Sheesham wood velvet trunk.
        </p>

        {/* Visual Metric Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs font-sans">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#B8860B]/30 text-[#1C1917] shadow-sm">
            <span>🪵</span> Sheesham Wood Trunk Included
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#B8860B]/30 text-[#1C1917] shadow-sm">
            <span>🪙</span> 24K Engraved Monogram
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#B8860B]/30 text-[#1C1917] shadow-sm">
            <span>✨</span> 15% Bridal Courtesy
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#B8860B]/30 text-[#1C1917] shadow-sm">
            <span>📦</span> Free Insured Delivery
          </span>
        </div>
      </div>

      {/* Main Visual Trunk Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: 3 Visual Velvet Compartments */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-10 rounded border border-[#B8860B]/30 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#B8860B]/20 gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-bold block">
                  Velvet Trunk Assembly
                </span>
                <span className="text-2xl font-editorial font-bold text-[#1C1917]">
                  {filledCount} of 3 Masterpieces Placed
                </span>
              </div>

              {isTrunkComplete ? (
                <div className="bg-emerald-800 text-white text-xs uppercase tracking-widest px-4 py-2 rounded font-sans font-bold flex items-center gap-2 shadow-sm animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>15% Royal Courtesy Privilege Applied</span>
                </div>
              ) : (
                <div className="text-xs font-sans text-[#8A661C] bg-[#F4EFEA] px-3.5 py-1.5 rounded border border-[#B8860B]/20">
                  Select {3 - filledCount} more saree{3 - filledCount > 1 ? 's' : ''} to unlock Sheesham trunk
                </div>
              )}
            </div>

            {/* 3 Visual Photographic Slots */}
            <div className="space-y-6">
              {slotLabels.map((lbl, idx) => {
                const selected = trousseauSlots[idx];
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded border transition-all ${
                      selected
                        ? 'bg-[#FAF8F5] border-[#781224]/40 shadow-sm'
                        : 'bg-[#F4EFEA]/40 border-dashed border-[#B8860B]/40 hover:border-[#781224]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Photo Thumbnail */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-24 rounded overflow-hidden border border-black/15 shadow-sm bg-stone-900 shrink-0 relative">
                          <img
                            src={selected ? selected.image : lbl.defaultImg}
                            alt={lbl.title}
                            className={`w-full h-full object-cover ${!selected && 'opacity-35 grayscale'}`}
                          />
                          {!selected && (
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-sans">
                              Slot 0{idx + 1}
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-sans font-bold block">
                            Slot 0{idx + 1} • {lbl.subtitle}
                          </span>
                          <h3 className="text-xl font-editorial font-bold text-[#1C1917]">
                            {lbl.title}
                          </h3>
                          {selected ? (
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="w-3 h-3 rounded-full border border-black/20"
                                style={{ backgroundColor: selected.hex }}
                              />
                              <span className="text-xs font-sans font-bold text-[#781224]">
                                {selected.name} ({selected.zariName})
                              </span>
                            </div>
                          ) : (
                            <p className="text-xs font-sans text-stone-500 italic mt-0.5">
                              Click below to select your colorway
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
                            className="px-5 py-2.5 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-bold rounded hover:bg-[#580B17] transition-all shadow flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Select Colorway</span>
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
              <label className="block text-xs uppercase tracking-widest font-sans font-bold text-[#8A661C] mb-2">
                ⚜ Complimentary 24K Gold-Plated Brass Monogram Plate Engraving:
              </label>
              <input
                type="text"
                value={monogramText}
                onChange={(e) => setMonogramText(e.target.value)}
                placeholder="Bride & Groom Names / Wedding Year"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/40 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224] mb-3"
              />

              {/* Monogram Live Preview */}
              <div className="p-4 bg-[#1C1917] text-[#FAF8F5] rounded border-2 border-[#B8860B] text-center shadow-lg">
                <span className="text-[10px] uppercase tracking-widest text-[#B8860B] block font-sans">
                  Engraved Brass Monogram Nameplate
                </span>
                <span className="text-base font-editorial tracking-[0.25em] text-[#FBF4DE] uppercase font-bold mt-1 block">
                  {monogramText || 'YOUR NAMES • 2026'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Investment Privilege Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-md">
            <h2 className="text-xl font-editorial font-bold text-[#1C1917] mb-4 pb-3 border-b border-[#B8860B]/20">
              Trousseau Privileges
            </h2>

            <div className="space-y-3 text-xs font-sans mb-6">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Sarees Selected ({filledCount} of 3)</span>
                <span className="font-semibold text-[#1C1917]">{formatPrice(subtotalINR, currency)}</span>
              </div>

              {isTrunkComplete ? (
                <div className="flex justify-between py-1.5 border-b border-stone-100 text-emerald-800 font-bold">
                  <span>15% Royal Bridal Courtesy</span>
                  <span>- {formatPrice(discountINR, currency)}</span>
                </div>
              ) : (
                <div className="flex justify-between py-1.5 border-b border-stone-100 text-stone-400 italic">
                  <span>15% Courtesy (Add {3 - filledCount} more)</span>
                  <span>Unlocked at 3</span>
                </div>
              )}

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">Hand-Carved Sheesham Trunk</span>
                <span className="font-semibold text-[#781224]">Complimentary</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">24K Brass Monogram Plate</span>
                <span className="font-semibold text-[#781224]">Complimentary</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#78716C]">White-Glove Insured Courier</span>
                <span className="font-semibold text-emerald-800">Free Worldwide</span>
              </div>

              <div className="pt-3 flex justify-between text-base font-editorial font-bold text-[#1C1917]">
                <span>Total Investment</span>
                <span className="text-2xl text-[#781224]">{formatPrice(finalTotalINR, currency)}</span>
              </div>
            </div>

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

          {/* Unboxing Trunk Photo Card */}
          <div className="rounded overflow-hidden shadow-md border border-[#B8860B]/20 bg-white">
            <img
              src={BRAND_ASSETS.trousseauTrunk}
              alt="Velvet Trousseau Trunk Unboxing"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-xs font-sans text-center text-[#78716C]">
              Every trunk is lined in pure raw silk velvet with solid brass latches and custom monogramming.
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Select Colorway for Active Slot */}
      {activeSelectSlotIndex !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded max-w-2xl w-full border border-[#B8860B] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#B8860B]/20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-bold block">
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
                  className="p-3 bg-white rounded border border-[#B8860B]/30 hover:border-[#781224] cursor-pointer transition-all flex items-center gap-3 group shadow-sm hover:shadow"
                >
                  <img
                    src={cw.image}
                    alt={cw.name}
                    className="w-14 h-16 rounded object-cover border border-black/10 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-editorial font-bold text-[#1C1917] group-hover:text-[#781224]">
                      {cw.name}
                    </h4>
                    <p className="text-[11px] font-sans text-[#781224] font-medium">{cw.sanskrit}</p>
                    <span className="text-[10px] font-sans text-[#8A661C] block">{cw.zariTone}</span>
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
