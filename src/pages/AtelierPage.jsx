import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, ShieldCheck, Clock, Award, X, Check, Eye } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [heritageModalOpen, setHeritageModalOpen] = useState(false);

  const activeColorway = masterSaree.colorways[activeVariantIndex];

  const handlePrevVariant = () => {
    setActiveVariantIndex((prev) => (prev === 0 ? masterSaree.colorways.length - 1 : prev - 1));
  };

  const handleNextVariant = () => {
    setActiveVariantIndex((prev) => (prev === masterSaree.colorways.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* 1. Grand Full-Bleed Editorial Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-32 md:py-40">
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.heroBanner}
            alt="Royal Banarasi Silk Bride"
            className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.1] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#B8860B]/50 text-[#FBF4DE] text-[11px] uppercase tracking-[0.3em] font-sans mb-8 shadow-2xl">
            <span className="text-[#D4AF37]">⚜</span>
            <span>The 2026 Imperial Rajkumari Collection</span>
            <span className="text-[#D4AF37]">⚜</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-editorial font-normal tracking-tight leading-[1.08] mb-6 drop-shadow-2xl">
            Woven for <br />
            <span className="italic font-normal text-[#D4AF37] font-editorial">Dynasties.</span>
          </h1>

          <p className="text-base sm:text-xl font-editorial italic text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            One supreme Kadwa handloom masterpiece. Handcrafted over 144 hours with 98.2% pure silver zari across five dynastic colorways.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => onNavigate('collection')}
              className="w-full sm:w-auto px-10 py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#92182e] transition-all shadow-2xl flex items-center justify-center gap-2 border border-[#B8860B]/40 hover:scale-105"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('trousseau')}
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-[#FAF8F5] border border-white/30 text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-white/20 transition-all shadow-xl hover:scale-105"
            >
              <span>Curate Bridal Trunk</span>
            </button>
          </div>

          {/* Visual Chips Strip */}
          <div className="mt-16 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-xs text-stone-200 font-sans tracking-wide">
              <span>⏳</span> 144 Loom Hours
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-xs text-stone-200 font-sans tracking-wide">
              <span>🪙</span> 98.2% Pure Silver Zari
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-xs text-stone-200 font-sans tracking-wide">
              <span>🪡</span> 2,400 Silk Warp Threads
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-xs text-stone-200 font-sans tracking-wide">
              <span>📜</span> Silk Mark India Certified
            </span>
          </div>
        </div>
      </section>

      {/* 2. Visual Magazine Lookbook Grid */}
      <section className="py-32 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2">
            <span>⚜</span> The Haute Couture Lookbook <span>⚜</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight">
            Pure Heritage. Zero Compromise.
          </h2>
          <p className="text-sm sm:text-base font-editorial italic text-[#44403C] leading-relaxed">
            Generations of unbroken pit-loom discipline, preserved for connoisseurs of authentic handloom.
          </p>
        </div>

        {/* Visual Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div
            onClick={() => onNavigate('collection')}
            className="md:col-span-7 group relative h-[560px] rounded overflow-hidden shadow-xl border border-[#B8860B]/20 cursor-pointer"
          >
            <img
              src={BRAND_ASSETS.bridalEditorial}
              alt="Bridal Banarasi Silk Saree"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold">
                The Auspicious Muhurtham
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold">
                The Sindoor Crimson Drape
              </h3>
              <p className="text-xs font-sans text-stone-300 leading-relaxed max-w-md">
                Woven with 24K liquid gold dipped silver zari. Handcrafted for brides celebrating sacred Vedic vows.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold pt-2 group-hover:translate-x-2 transition-transform">
                <span>Inspect Masterpiece Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-8 justify-between">
            <div
              onClick={() => onNavigate('craft')}
              className="group relative h-[264px] rounded overflow-hidden shadow-lg border border-[#B8860B]/20 cursor-pointer"
            >
              <img
                src={BRAND_ASSETS.craftLoom}
                alt="Handloom Weaving Varanasi Pit Loom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold">
                  Artisan Guild • Varanasi
                </span>
                <h4 className="text-xl font-editorial font-bold">
                  144 Hours on the Pit Loom
                </h4>
                <span className="text-[11px] text-[#D4AF37] font-sans flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read The Karigar Story</span> &rarr;
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('trousseau')}
              className="group relative h-[264px] rounded overflow-hidden shadow-lg border border-[#B8860B]/20 cursor-pointer"
            >
              <img
                src={BRAND_ASSETS.trousseauTrunk}
                alt="Heirloom Bridal Trousseau Trunk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold">
                  The Imperial Privilege
                </span>
                <h4 className="text-xl font-editorial font-bold">
                  The 3-Piece Velvet Trunk
                </h4>
                <span className="text-[11px] text-[#D4AF37] font-sans flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Curate Trunk (15% Privilege)</span> &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Consolidated Interactive Colorway Swatch Carousel (Shows 1 at a time) */}
      <section className="py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] border-y border-[#B8860B]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2">
              <span>⚜</span> The Royal Palette <span>⚜</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917]">
              1 Masterpiece • 5 Sacred Colorways
            </h2>
            <p className="text-sm font-editorial italic text-[#44403C]">
              Select a shade to preview its drape, zari alloy, and occasion.
            </p>
          </div>

          {/* Interactive Horizontal Swatch Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-12">
            {masterSaree.colorways.map((cw, idx) => {
              const isSelected = idx === activeVariantIndex;
              return (
                <button
                  key={cw.id}
                  onClick={() => setActiveVariantIndex(idx)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all border ${
                    isSelected
                      ? 'bg-[#781224] text-white border-[#781224] shadow-md scale-105 font-bold'
                      : 'bg-white text-[#1C1917] border-[#B8860B]/30 hover:border-[#781224]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <span>{cw.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FBF4DE]" />}
                </button>
              );
            })}
          </div>

          {/* Single Active Colorway Spotlight Card */}
          <div className="bg-white rounded-lg border border-[#B8860B]/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Large High-Resolution Drape Image */}
            <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] bg-stone-900 overflow-hidden group">
              <img
                src={activeColorway.image}
                alt={activeColorway.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white text-xs font-sans uppercase tracking-widest">
                <span>{activeColorway.sanskrit}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block font-sans font-semibold">
                    {activeColorway.tagline}
                  </span>
                  <h3 className="text-2xl font-editorial font-bold">
                    {activeColorway.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevVariant}
                    className="p-2.5 rounded-full bg-white/20 hover:bg-[#781224] text-white backdrop-blur-sm transition-all"
                    aria-label="Previous Colorway"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextVariant}
                    className="p-2.5 rounded-full bg-white/20 hover:bg-[#781224] text-white backdrop-blur-sm transition-all"
                    aria-label="Next Colorway"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Chunked Copy, Visual Chips & Action */}
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-sans font-bold block mb-1">
                  Masterpiece Edition No. 0{activeVariantIndex + 1}
                </span>
                <h3 className="text-3xl font-editorial font-bold text-[#1C1917]">
                  {activeColorway.name}
                </h3>
                <p className="text-xs font-editorial italic text-[#781224] mt-0.5">
                  {activeColorway.occasion}
                </p>
              </div>

              {/* Visual Spec Metric Pills */}
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#B8860B]/30 text-[#1C1917]">
                  <span>🪙</span>
                  <span>{activeColorway.zariName}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#B8860B]/30 text-[#1C1917]">
                  <span>🪡</span>
                  <span>144 Loom Hours</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#B8860B]/30 text-[#1C1917]">
                  <span>📦</span>
                  <span>Limited to {activeColorway.stockCount} Looms</span>
                </span>
              </div>

              <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#78716C] block font-sans">Investment</span>
                  <span className="text-2xl font-editorial font-bold text-[#1C1917]">
                    {formatPrice(masterSaree.basePriceINR, currency)}
                  </span>
                </div>
                <span className="text-xs text-emerald-800 font-sans font-semibold">
                  Free Insured Global Courier
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('collection');
                  }}
                  className="w-full py-4 bg-[#781224] text-white text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Inspect in Drape Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('trousseau');
                  }}
                  className="w-full py-3 bg-transparent text-[#781224] border border-[#B8860B] text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all text-center"
                >
                  Curate in 3-Piece Bridal Trunk (15% Off)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Let Imagery Lead: Heritage Provenance Banner */}
      <section className="py-32 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded overflow-hidden shadow-2xl border border-[#B8860B]/30 h-[520px]">
            <img
              src={BRAND_ASSETS.templeHeritage}
              alt="Sacred Banarasi Weaving Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold">
                Madanpura Guild • Varanasi
              </span>
              <h3 className="text-3xl font-editorial font-bold">
                The Lost Art of Kadwa Weft
              </h3>
              <p className="text-xs font-sans text-stone-200 leading-relaxed">
                Every floral motif is individually hand-locked with silver tilis. Zero rough cut-work threads on the reverse.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center gap-2">
                <span>⚜</span> The Single Masterpiece Naksha
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial leading-tight text-[#1C1917]">
                Why Settle for Disposable Fast-Fashion?
              </h2>
              <div className="w-16 h-0.5 bg-[#B8860B]" />
            </div>

            <p className="text-[#44403C] font-editorial text-lg leading-relaxed">
              True royalty never wore factory-printed synthetic fads. We invest 144 hours into perfecting one singular master naksha — <strong className="text-[#781224]">The Rajkumari Mayil Jangla</strong> — dip-dyed into five natural vat colors.
            </p>

            {/* Visual Chips Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3.5 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center gap-2.5">
                <span className="text-lg">🦚</span>
                <div>
                  <span className="font-bold text-[#1C1917] block">Mayil Motif</span>
                  <span className="text-[11px] text-stone-500">Celestial peacocks</span>
                </div>
              </div>
              <div className="p-3.5 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center gap-2.5">
                <span className="text-lg">🪙</span>
                <div>
                  <span className="font-bold text-[#1C1917] block">98.2% Silver Core</span>
                  <span className="text-[11px] text-stone-500">Tested pure bullion wire</span>
                </div>
              </div>
              <div className="p-3.5 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center gap-2.5">
                <span className="text-lg">📜</span>
                <div>
                  <span className="font-bold text-[#1C1917] block">Silk Mark Verified</span>
                  <span className="text-[11px] text-stone-500">100% Katan silk</span>
                </div>
              </div>
              <div className="p-3.5 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center gap-2.5">
                <span className="text-lg">📦</span>
                <div>
                  <span className="font-bold text-[#1C1917] block">Insured Delivery</span>
                  <span className="text-[11px] text-stone-500">45+ countries</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setHeritageModalOpen(true)}
                className="px-6 py-3 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md"
              >
                Read Heritage Provenance Story
              </button>
              <button
                onClick={() => onNavigate('craft')}
                className="text-xs uppercase tracking-widest font-sans font-semibold text-[#781224] hover:underline"
              >
                View Karigar Ledger &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Imperial Salon & Virtual Consultation Banner */}
      <section className="relative py-32 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.salonInterior}
            alt="Private Draping Salon Bengaluru"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-[#781224]/30 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-bold flex items-center justify-center gap-2">
            <span>⚜</span> The Private Salon Experience <span>⚜</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal leading-tight">
            Private Viewings in Bengaluru & Varanasi
          </h2>
          <p className="text-base sm:text-lg font-editorial italic text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Reserve an intimate salon suite with a dedicated master draper over Kashmiri Saffron Kahwa, or schedule an instant HD Video Draping Consultation worldwide.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => onNavigate('salon')}
              className="px-10 py-4 bg-[#FAF8F5] text-[#781224] text-xs uppercase tracking-[0.25em] font-sans font-bold rounded hover:bg-white transition-all shadow-2xl"
            >
              Reserve Salon Appointment
            </button>
            <button
              onClick={() => onNavigate('trousseau')}
              className="px-10 py-4 bg-transparent text-white border border-[#D4AF37] text-xs uppercase tracking-[0.25em] font-sans font-bold rounded hover:bg-white/10 transition-all"
            >
              Curate Bridal Trunk
            </button>
          </div>
        </div>
      </section>

      {/* Heritage Provenance Modal (Clean Expandable Architecture) */}
      {heritageModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded max-w-3xl w-full border border-[#B8860B] shadow-2xl max-h-[85vh] overflow-y-auto space-y-6 text-[#1C1917] font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8860B]/20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A661C] font-bold block">
                  ⚜ Kashika Heritage Archive
                </span>
                <h3 className="text-2xl font-editorial font-bold text-[#1C1917]">
                  The 144-Hour Kadwa Protocol
                </h3>
              </div>
              <button
                onClick={() => setHeritageModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm font-editorial leading-relaxed text-[#44403C]">
              <p>
                In the historic quarter of Varanasi, <strong>Ustad Bashir Ahmed</strong> leads our lineage of 4th-generation weavers. Unlike modern powerlooms that churn out 20 sarees an hour using mechanical cut-work, our pit-loom masters hand-steer each individual weft thread.
              </p>
              <p>
                Each peacock feather and lotus motif in the <strong>Rajkumari Mayil Jangla</strong> is locked using separate wooden tilis. This means the reverse side has zero raw cut edges—it drapes against your skin like liquid silk.
              </p>
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-[#781224] block">Certified Assay Composition:</span>
                <p className="text-xs text-stone-600">
                  Core: 98.2% Tested Sterling Silver Bullion wire • Gilding: 24-Karat Liquid Gold electro-immersion • Base: 100% Grade-A Sidlaghatta Katan Silk.
                </p>
              </div>
            </div>

            <div className="text-right pt-4 border-t border-[#B8860B]/20">
              <button
                onClick={() => setHeritageModalOpen(false)}
                className="px-6 py-2.5 bg-[#781224] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#580B17]"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
