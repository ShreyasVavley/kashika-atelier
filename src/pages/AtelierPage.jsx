import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award, Compass, HeartHandshake } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* 1. Grand Full-Bleed Editorial Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* High-Fashion Photographic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.heroBanner}
            alt="Royal Banarasi Silk Bride - House of Kashika"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Hero Floating Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#B8860B]/50 text-[#FBF4DE] text-[11px] uppercase tracking-[0.3em] font-sans mb-8 shadow-2xl">
            <span className="text-[#D4AF37]">⚜</span>
            <span>The 2026 Imperial Rajkumari Collection</span>
            <span className="text-[#D4AF37]">⚜</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-editorial font-normal tracking-tight leading-[1.04] mb-6 drop-shadow-2xl">
            Woven for <br />
            <span className="italic font-normal text-[#D4AF37] font-editorial">Dynasties.</span>
          </h1>

          <p className="text-base sm:text-xl font-editorial italic text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            One supreme Kadwa handloom design. Five sacred royal colorways dyed in 100% pure mulberry silk and woven with 98.2% tested silver bullion zari.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('collection')}
              className="w-full sm:w-auto px-9 py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#92182e] transition-all shadow-2xl flex items-center justify-center gap-2 border border-[#B8860B]/40 hover:scale-105"
            >
              <span>Explore The 5 Colorways</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('trousseau')}
              className="w-full sm:w-auto px-9 py-4 bg-white/10 backdrop-blur-md text-[#FAF8F5] border border-white/30 text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-white/20 transition-all shadow-xl hover:scale-105"
            >
              <span>Curate Bridal Trousseau Trunk</span>
            </button>
          </div>

          {/* Key Stat Pills */}
          <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-3 bg-black/30 backdrop-blur-sm rounded border border-white/10">
              <span className="text-2xl font-editorial font-bold text-[#D4AF37]">144 Hours</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 block font-sans mt-0.5">Loom Duration</span>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-sm rounded border border-white/10">
              <span className="text-2xl font-editorial font-bold text-[#D4AF37]">98.2%</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 block font-sans mt-0.5">Pure Silver Zari</span>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-sm rounded border border-white/10">
              <span className="text-2xl font-editorial font-bold text-[#D4AF37]">2,400</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 block font-sans mt-0.5">Warp Silk Threads</span>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-sm rounded border border-white/10">
              <span className="text-2xl font-editorial font-bold text-[#D4AF37]">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 block font-sans mt-0.5">Silk Mark India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Magazine Lookbook Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-2">
            <span>⚜</span> The Haute Couture Lookbook <span>⚜</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight mb-3">
            Pure Heritage. Zero Compromise.
          </h2>
          <p className="text-base font-editorial italic text-[#44403C]">
            In an era of high-speed synthetic powerlooms, we preserve the unhurried majesty of genuine Indian pit loom weaving.
          </p>
        </div>

        {/* 4-Image Editorial Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Bridal Shot */}
          <div
            onClick={() => onNavigate('collection')}
            className="md:col-span-7 group relative h-[520px] rounded overflow-hidden shadow-lg border border-[#B8860B]/20 cursor-pointer"
          >
            <img
              src={BRAND_ASSETS.bridalEditorial}
              alt="Bridal Banarasi Silk Saree"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block mb-1">
                The Auspicious Muhurtham
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold mb-2">
                The Sindoor Crimson Drape
              </h3>
              <p className="text-xs font-sans text-stone-300 mb-4 max-w-md">
                Woven with 24K liquid gold dipped silver zari. Worn by brides celebrating their sacred vows.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold group-hover:translate-x-2 transition-transform">
                <span>Inspect Masterpiece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Right Column: 2 Stacked Photo Cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Craft Card */}
            <div
              onClick={() => onNavigate('craft')}
              className="group relative h-[245px] rounded overflow-hidden shadow-lg border border-[#B8860B]/20 cursor-pointer"
            >
              <img
                src={BRAND_ASSETS.craftLoom}
                alt="Handloom Weaving Varanasi Pit Loom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
                  Artisan Guild • Varanasi
                </span>
                <h4 className="text-xl font-editorial font-bold mb-1">
                  144 Hours on the Pit Loom
                </h4>
                <span className="text-[11px] text-[#D4AF37] font-sans flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read The Karigar Story</span> &rarr;
                </span>
              </div>
            </div>

            {/* Trousseau Trunk Card */}
            <div
              onClick={() => onNavigate('trousseau')}
              className="group relative h-[245px] rounded overflow-hidden shadow-lg border border-[#B8860B]/20 cursor-pointer"
            >
              <img
                src={BRAND_ASSETS.trousseauTrunk}
                alt="Heirloom Bridal Trousseau Trunk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
                  The Imperial Privilege
                </span>
                <h4 className="text-xl font-editorial font-bold mb-1">
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

      {/* 3. The 5 Royal Colorways: Large Full-Bleed Lookbook Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] border-y border-[#B8860B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center gap-2 mb-2">
                <span>⚜</span> The Royal Palette
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917]">
                1 Master Design • 5 Dynastic Shades
              </h2>
            </div>
            <button
              onClick={() => onNavigate('collection')}
              className="px-6 py-3 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all flex items-center gap-2"
            >
              <span>View Interactive Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Photographic Lookbook Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {masterSaree.colorways.map((cw, idx) => (
              <div
                key={cw.id}
                onClick={() => {
                  onSelectColorway(cw.id);
                  onNavigate('collection');
                }}
                className="group cursor-pointer bg-white rounded overflow-hidden shadow-md border border-[#B8860B]/20 hover:border-[#781224] transition-all duration-300 flex flex-col hover:-translate-y-2"
              >
                {/* Real High-Fashion Photographic Drape Image */}
                <div className="relative h-80 overflow-hidden bg-stone-900">
                  <img
                    src={cw.image}
                    alt={cw.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Corner Swatch & Tag */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white text-[10px] font-sans uppercase tracking-widest flex items-center gap-1.5 border border-white/20">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: cw.hex }}
                    />
                    <span>{cw.sanskrit}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block font-sans font-semibold">
                      {cw.zariTone}
                    </span>
                    <h3 className="text-xl font-editorial font-bold leading-tight">
                      {cw.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-[#78716C] font-sans line-clamp-2">
                    {cw.occasion}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
                    <span className="font-editorial font-bold text-base text-[#1C1917]">
                      {formatPrice(masterSaree.basePriceINR, currency)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#781224] group-hover:underline flex items-center gap-1">
                      <span>Inspect</span> &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Masterpiece Spotlight (Visual Split) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded overflow-hidden shadow-2xl border border-[#B8860B]/30 h-[560px]">
            <img
              src={BRAND_ASSETS.templeHeritage}
              alt="Sacred Banarasi Weaving Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold block mb-1">
                Sacred Handloom Architecture
              </span>
              <h3 className="text-3xl font-editorial font-bold mb-2">
                The Lost Art of Kadwa Weft
              </h3>
              <p className="text-xs font-sans text-stone-200">
                Unlike mass-produced powerlooms that mechanically cut threads, our weavers hand-lock each silver zari buti with individual wooden tilis.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center gap-2">
                <span>⚜</span> The Single Masterpiece Naksha
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial leading-tight text-[#1C1917]">
                Why Settle for Disposable Trends?
              </h2>
              <div className="w-20 h-0.5 bg-[#B8860B]" />
            </div>

            <p className="text-[#44403C] font-editorial text-lg leading-relaxed">
              True Indian royalty never wore factory-printed synthetic fads. We invest 144 hours into perfecting one singular master naksha — <strong className="text-[#781224]">The Rajkumari Mayil Jangla</strong> — dip-dyed into five natural vat colors.
            </p>

            {/* Visual Feature List */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm">
                <span className="text-base text-[#781224] block mb-1">🦚</span>
                <span className="font-bold text-[#1C1917] block">Mayil Motif</span>
                <span className="text-stone-500">Celestial dancing peacocks</span>
              </div>
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm">
                <span className="text-base text-[#781224] block mb-1">🪙</span>
                <span className="font-bold text-[#1C1917] block">98.2% Silver Core</span>
                <span className="text-stone-500">Tested pure bullion wire</span>
              </div>
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm">
                <span className="text-base text-[#781224] block mb-1">📜</span>
                <span className="font-bold text-[#1C1917] block">Silk Mark Verified</span>
                <span className="text-stone-500">100% Katan mulberry silk</span>
              </div>
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm">
                <span className="text-base text-[#781224] block mb-1">📦</span>
                <span className="font-bold text-[#1C1917] block">Insured Courier</span>
                <span className="text-stone-500">Free delivery to 45+ countries</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('collection')}
              className="px-8 py-4 bg-[#781224] text-white text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore The Masterpiece Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Imperial Salon & Virtual Consultation Banner */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
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
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal">
            Private Viewings in Bengaluru & Varanasi
          </h2>
          <p className="text-base sm:text-lg font-editorial italic text-stone-200 max-w-2xl mx-auto">
            Reserve an intimate salon suite with a dedicated master draper over Kashmiri Saffron Kahwa, or schedule an instant HD Video Draping Consultation worldwide.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('salon')}
              className="px-9 py-4 bg-[#FAF8F5] text-[#781224] text-xs uppercase tracking-[0.25em] font-sans font-bold rounded hover:bg-white transition-all shadow-2xl"
            >
              Reserve Salon Appointment
            </button>
            <button
              onClick={() => onNavigate('trousseau')}
              className="px-9 py-4 bg-transparent text-white border border-[#D4AF37] text-xs uppercase tracking-[0.25em] font-sans font-bold rounded hover:bg-white/10 transition-all"
            >
              Curate Bridal Trunk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
