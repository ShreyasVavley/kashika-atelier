import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Compass, HeartHandshake } from 'lucide-react';
import { MASTER_DESIGNS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* 1. Grand Editorial Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-[#B8860B]/20 overflow-hidden">
        {/* Subtle royal background atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(184,134,11,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#781224]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#B8860B]/30 text-[#8A661C] text-xs uppercase tracking-[0.25em] font-sans mb-8 shadow-sm">
            <span>⚜</span>
            <span>The 2026 Imperial Rajkumari Collection</span>
            <span>⚜</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-[#1C1917] leading-[1.08] mb-6">
            Heirloom Silks <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#781224]">Woven for Dynasties.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-editorial italic text-[#44403C] max-w-2xl mx-auto mb-10 leading-relaxed">
            An ode to five centuries of unbroken Banarasi handloom artistry. We weave one singular masterpiece Kadwa design across five sacred heritage colorways — spending over 144 hours on a wooden pit loom with 98.2% pure silver zari.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('collection')}
              className="w-full sm:w-auto px-8 py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded-sm hover:bg-[#580B17] transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 border border-[#781224]"
            >
              <span>Explore The Collection (5 Colors)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('trousseau')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#781224] border border-[#B8860B]/60 text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded-sm hover:bg-[#F4EFEA] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Curate Bridal Trousseau Trunk</span>
            </button>
          </div>

          {/* Quick Provenance Badges */}
          <div className="mt-16 pt-10 border-t border-[#B8860B]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-editorial font-bold text-[#781224]">144 Hours</p>
              <p className="text-[11px] uppercase tracking-widest text-[#78716C] font-sans mt-1">Loom Duration</p>
            </div>
            <div>
              <p className="text-2xl font-editorial font-bold text-[#781224]">98.2%</p>
              <p className="text-[11px] uppercase tracking-widest text-[#78716C] font-sans mt-1">Pure Silver Zari</p>
            </div>
            <div>
              <p className="text-2xl font-editorial font-bold text-[#781224]">2,400</p>
              <p className="text-[11px] uppercase tracking-widest text-[#78716C] font-sans mt-1">Warp Silk Threads</p>
            </div>
            <div>
              <p className="text-2xl font-editorial font-bold text-[#781224]">100%</p>
              <p className="text-[11px] uppercase tracking-widest text-[#78716C] font-sans mt-1">Silk Mark India</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Philosophy of the Single Masterpiece */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#B8860B]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A661C] font-sans font-semibold flex items-center gap-2">
              <span>⚜</span> The Atelier Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial leading-tight text-[#1C1917]">
              Why Only One Master Design?
            </h2>
            <div className="w-16 h-0.5 bg-[#B8860B]" />
            <p className="text-[#44403C] font-editorial text-lg leading-relaxed">
              In the royal courts of Awadh and Varanasi, master karigars never manufactured endless disposable collections. A court weaver spent months drafting and punching <strong className="text-[#1C1917] font-semibold">one supreme naksha graph</strong> — perfecting every curve of the celestial peacock and lotus blossom.
            </p>
            <p className="text-[#44403C] font-editorial text-lg leading-relaxed">
              At Kashika, we honor this dynastic discipline. We weave <strong className="text-[#781224]">The Rajkumari Mayil Jangla</strong> — a single timeless pattern — hand-dipped into the five sacred natural dye vats of India. One masterpiece, five royal souls.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('craft')}
                className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#781224] hover:text-[#580B17] flex items-center gap-2 group underline"
              >
                <span>Read The Karigar Provenance Ledger</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-10 rounded-sm border border-[#B8860B]/30 shadow-sm relative">
            <div className="absolute top-4 right-4 text-xs font-sans uppercase tracking-widest text-[#8A661C] bg-[#B8860B]/10 px-3 py-1 rounded-full border border-[#B8860B]/20">
              The Master Naksha
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A661C] font-sans mb-2">Master Design No. 01</p>
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-1">
              The Rajkumari Mayil Jangla
            </h3>
            <p className="text-sm font-editorial italic text-[#78716C] mb-6">
              राजकुमारी मयूर जांगल • Handcrafted on Wooden Pit Loom
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans mb-8">
              <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20">
                <span className="text-xs uppercase tracking-widest text-[#78716C] block mb-1">Base Weave</span>
                <span className="font-semibold text-[#1C1917]">Pure Katan Mulberry Silk</span>
              </div>
              <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20">
                <span className="text-xs uppercase tracking-widest text-[#78716C] block mb-1">Zari Specification</span>
                <span className="font-semibold text-[#1C1917]">98.2% Silver dipped in 24K Gold</span>
              </div>
              <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20">
                <span className="text-xs uppercase tracking-widest text-[#78716C] block mb-1">Technique</span>
                <span className="font-semibold text-[#1C1917]">True Kadwa Weft Embroidery</span>
              </div>
              <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20">
                <span className="text-xs uppercase tracking-widest text-[#78716C] block mb-1">Seasonal Edition</span>
                <span className="font-semibold text-[#781224]">Only 12 Looms Active</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('collection')}
              className="w-full py-3.5 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All 5 Colorways & Drape Physics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The 5 Heritage Colorways Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#B8860B]/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-3">
            <span>⚜</span> The Royal Palette
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] mb-4">
            Five Sacred Colorways
          </h2>
          <p className="text-base sm:text-lg font-editorial italic text-[#44403C]">
            One singular design, brought to life through centuries-old natural vat dyeing traditions. Click any shade to inspect its zari luster and drape notes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {masterSaree.colorways.map((cw, idx) => (
            <div
              key={cw.id}
              onClick={() => {
                onSelectColorway(cw.id);
                onNavigate('collection');
              }}
              className="group cursor-pointer atelier-card p-5 text-center flex flex-col justify-between hover:border-[#781224] transition-all"
            >
              <div>
                {/* Fabric Swatch Container */}
                <div
                  className="w-full h-44 rounded-sm mb-4 relative overflow-hidden shadow-inner border border-black/10 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    backgroundColor: cw.hex,
                    backgroundImage: `radial-gradient(circle at 50% 30%, ${cw.zariColor}33, transparent 70%)`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="text-center p-3 relative z-10">
                    <span className="text-2xl block mb-1">⚜</span>
                    <span className="text-xs font-editorial text-white/95 tracking-widest uppercase">
                      {cw.sanskrit}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-white/80 font-sans tracking-widest uppercase bg-black/40 py-1 rounded">
                    {cw.zariTone} Zari
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-sans block mb-1">
                  Colorway 0{idx + 1}
                </span>
                <h3 className="text-lg font-editorial font-bold text-[#1C1917] mb-1 group-hover:text-[#781224] transition-colors">
                  {cw.name}
                </h3>
                <p className="text-xs text-[#78716C] font-sans mb-3 line-clamp-2">
                  {cw.occasion}
                </p>
              </div>

              <div className="pt-3 border-t border-[#B8860B]/20">
                <span className="text-sm font-editorial font-semibold text-[#1C1917] block mb-2">
                  {formatPrice(masterSaree.basePriceINR, currency)}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-sans font-semibold text-[#781224] group-hover:underline flex items-center justify-center gap-1">
                  <span>Inspect Saree</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bridal Trousseau Trunk Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] border-b border-[#B8860B]/20">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2">
            <span>⚜</span> Bespoke Bridal Trunk
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial text-[#1C1917]">
            The Imperial Three-Piece Trousseau
          </h2>
          <p className="text-base sm:text-lg font-editorial italic text-[#44403C] max-w-2xl mx-auto leading-relaxed">
            Curate your wedding festivities across three master colorways — Muhurtham, Reception, and Sangeet. Includes a complimentary hand-carved Sheesham wood velvet trunk, 24K gold-plated monogram nameplate, and a 15% royal courtesy privilege.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('trousseau')}
              className="px-8 py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md"
            >
              Open Trousseau Trunk Curator
            </button>
            <button
              onClick={() => onNavigate('salon')}
              className="px-8 py-4 bg-transparent text-[#781224] border border-[#781224] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all"
            >
              Book Private Salon Viewing
            </button>
          </div>
        </div>
      </section>

      {/* 5. Royal Patronage / Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-2">
            <span>⚜</span> Patron Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#1C1917]">
            Words From Dynastic Brides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-[#B8860B]/20 rounded shadow-sm text-center">
            <p className="text-sm font-editorial italic text-[#44403C] mb-6 leading-relaxed">
              "The weight of the pure silver zari in the Sindoor Crimson is unlike any commercial saree in India. It drapes with an unmistakable royal gravity that silenced the room during my Muhurtham."
            </p>
            <p className="text-xs uppercase tracking-widest font-sans font-bold text-[#1C1917]">Aditi R. Singhania</p>
            <p className="text-[10px] tracking-wider text-[#78716C] font-sans">Bengaluru • Muhurtham Bride</p>
          </div>

          <div className="p-8 bg-white border border-[#B8860B]/20 rounded shadow-sm text-center">
            <p className="text-sm font-editorial italic text-[#44403C] mb-6 leading-relaxed">
              "We ordered the Three-Piece Trousseau to London. The hand-carved Sheesham trunk arrived with our brass monogram engraved flawlessly. An absolute masterwork of Indian heritage."
            </p>
            <p className="text-xs uppercase tracking-widest font-sans font-bold text-[#1C1917]">Kavita & Devraj V.</p>
            <p className="text-[10px] tracking-wider text-[#78716C] font-sans">Mayfair, London • Trousseau Patrons</p>
          </div>

          <div className="p-8 bg-white border border-[#B8860B]/20 rounded shadow-sm text-center">
            <p className="text-sm font-editorial italic text-[#44403C] mb-6 leading-relaxed">
              "The Neelambari Indigo caught the chandeliers during our reception banquet with the most subtle, elegant silver glimmer. You can tell this was made by an ustad, not a machine."
            </p>
            <p className="text-xs uppercase tracking-widest font-sans font-bold text-[#1C1917]">Meera Nambiar</p>
            <p className="text-[10px] tracking-wider text-[#78716C] font-sans">Mumbai • Reception Gala</p>
          </div>
        </div>
      </section>
    </div>
  );
}
