import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Check, Calendar, Video, Clock, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [inspectDrawerOpen, setInspectDrawerOpen] = useState(false);

  // Booking Card States
  const [bookingDate, setBookingDate] = useState('2026-11-05');
  const [bookingTime, setBookingTime] = useState('11:00 AM');

  const activeColorway = masterSaree.colorways[activeVariantIndex];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const msg = `Pranam Kashika Atelier.%0A%0A*Bengaluru Flagship Suite Reservation:*%0A- Date: ${bookingDate}%0A- Slot: ${bookingTime}%0A- Interested in: The Rajkumari Mayil Jangla (${activeColorway.name})`;
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  const handleVirtualConsult = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I would like to request an immediate Virtual HD Video Draping Consultation for the "${activeColorway.name}" colorway.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B8860B]/20 selection:text-[#781224] font-sans">
      {/* 1. Hero Section (Above the Fold) - Full-Bleed Visual & Minimalist Copy */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Full-Bleed Edge-to-Edge Cinematic Hero Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.heroBanner}
            alt="Royal Banarasi Silk Drape - House of Kashika"
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.08] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Minimalist Hero Typography */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center text-white py-20">
          {/* Eyebrow */}
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-bold mb-5">
            Varanasi • Since 1948
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-editorial font-normal tracking-[0.06em] leading-[1.08] mb-5 drop-shadow-2xl">
            Woven for Dynasties
          </h1>

          {/* Subtitle (Strictly One Line) */}
          <p className="text-sm sm:text-base md:text-lg font-editorial italic text-stone-200 max-w-xl mx-auto mb-10 tracking-wide drop-shadow truncate">
            Handcrafted pure mulberry silk & tested silver bullion.
          </p>

          {/* Single Refined Pill CTA */}
          <div>
            <a
              href="#swatch-switcher"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-[#781224] text-white backdrop-blur-md border border-[#D4AF37]/60 text-xs uppercase tracking-[0.25em] font-sans font-semibold transition-all shadow-xl hover:scale-105"
            >
              <span>Explore the 5 Colorways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Float Metrics Below the Fold: Subtle Horizontal Ticker Strip */}
      <div className="bg-[#141210] text-[#FAF8F5] border-y border-white/10 py-5 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs font-sans tracking-widest uppercase text-stone-300">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">⏳</span>
            <span>144 Loom Hours</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">🪙</span>
            <span>98.2% Tested Silver Zari</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">🪡</span>
            <span>2,400 Silk Warp Threads / m</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">📜</span>
            <span>Silk Mark India Certified</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37]">✈️</span>
            <span>Insured Worldwide Courier</span>
          </div>
        </div>
      </div>

      {/* 2. Asymmetric Editorial Grid (60/40 Split) with Line-Drawn Icons */}
      <section className="py-28 md:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 60% Full-Height Model Shot */}
          <div className="lg:col-span-7 relative h-[560px] sm:h-[620px] rounded overflow-hidden shadow-2xl border border-black/10 group">
            <img
              src={BRAND_ASSETS.bridalEditorial}
              alt="The Auspicious Muhurtham Banarasi Saree"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                Heritage Bridal Masterpiece
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold">
                The Sindoor Crimson Drape
              </h3>
            </div>
          </div>

          {/* Right: 40% Sticky Minimal Narrative Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A661C] font-bold">
                The Singular Naksha
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal leading-[1.15] text-[#1C1917]">
                The Lost Art of Kadwa Weft
              </h2>
              <div className="w-12 h-0.5 bg-[#B8860B]" />
            </div>

            <p className="text-base font-editorial italic text-[#44403C] leading-relaxed">
              We devote 144 hours to one singular master design. Every floral peacock buti is hand-locked with silver tilis—leaving zero scratchy cut threads on the reverse.
            </p>

            {/* 4 Line-Drawn Minimal Heritage Icons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm space-y-1">
                <span className="text-xl block">🪡</span>
                <span className="text-xs font-bold text-[#1C1917] block">Hand-Locked Kadwa</span>
                <span className="text-[11px] text-stone-500 block leading-tight">Zero float scissors cut</span>
              </div>

              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm space-y-1">
                <span className="text-xl block">🪙</span>
                <span className="text-xs font-bold text-[#1C1917] block">98.2% Bullion Core</span>
                <span className="text-[11px] text-stone-500 block leading-tight">Tested pure silver wire</span>
              </div>

              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm space-y-1">
                <span className="text-xl block">📜</span>
                <span className="text-xs font-bold text-[#1C1917] block">Silk Mark Certified</span>
                <span className="text-[11px] text-stone-500 block leading-tight">100% Katan silk warp</span>
              </div>

              <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm space-y-1">
                <span className="text-xl block">✈️</span>
                <span className="text-xs font-bold text-[#1C1917] block">Worldwide Insured</span>
                <span className="text-[11px] text-stone-500 block leading-tight">White-glove delivery</span>
              </div>
            </div>

            {/* Slide-over Drawer Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setInspectDrawerOpen(true)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#781224] hover:text-[#580B17] group underline"
              >
                <span>Inspect Naksha Details & Provenance</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product & Palette Presentation: Interactive Swatch Switcher */}
      <section id="swatch-switcher" className="py-28 md:py-36 px-6 sm:px-8 lg:px-12 bg-[#F4EFEA] border-y border-[#B8860B]/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A661C] font-bold">
              The 5 Sacred Colorways
            </p>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1C1917]">
              The Rajkumari Mayil Jangla
            </h2>
            <p className="text-xs font-editorial italic text-[#781224]">
              {activeColorway.name} • {activeColorway.sanskrit} ({activeColorway.tagline})
            </p>
          </div>

          {/* Central High-Res View of Saree */}
          <div className="bg-white rounded-lg border border-[#B8860B]/30 shadow-xl overflow-hidden mb-8">
            <div className="relative h-[440px] sm:h-[520px] bg-stone-900 group">
              <img
                src={activeColorway.image}
                alt={activeColorway.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-white text-xs font-sans tracking-widest uppercase border border-white/20">
                {activeColorway.zariTone}
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block font-semibold">
                    {activeColorway.occasion}
                  </span>
                  <h3 className="text-2xl font-editorial font-bold">
                    {activeColorway.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 block">Acquisition</span>
                  <span className="text-xl font-editorial font-bold text-white">
                    {formatPrice(masterSaree.basePriceINR, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
              <button
                onClick={() => setInspectDrawerOpen(true)}
                className="text-xs uppercase tracking-widest font-sans font-bold text-[#8A661C] hover:text-[#781224] transition-colors"
              >
                Inspect Naksha & Quick View &rarr;
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('collection');
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow"
                >
                  Acquire Piece
                </button>
                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('trousseau');
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-transparent text-[#781224] border border-[#B8860B] text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all"
                >
                  Add to Trousseau
                </button>
              </div>
            </div>
          </div>

          {/* Five Minimalist Color Discs / Swatches */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
            {masterSaree.colorways.map((cw, idx) => {
              const isSelected = idx === activeVariantIndex;
              return (
                <button
                  key={cw.id}
                  onClick={() => setActiveVariantIndex(idx)}
                  className={`group flex flex-col items-center gap-2 p-1.5 transition-all focus:outline-none`}
                  title={cw.name}
                  aria-label={cw.name}
                >
                  <span
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                      isSelected
                        ? 'border-[#781224] scale-115 ring-2 ring-[#D4AF37]/50'
                        : 'border-white hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: cw.hex }}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-sans font-semibold hidden sm:inline ${isSelected ? 'text-[#781224]' : 'text-stone-500'}`}>
                    {cw.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Heritage & Craft Storytelling: Horizontal Scroll / Timeline */}
      <section className="py-28 md:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A661C] font-bold">
              Artisan Provenance
            </p>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1C1917]">
              The 144-Hour Handloom Journey
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-sans">
            Swipe timeline horizontally &rarr;
          </span>
        </div>

        {/* Horizontal-Swipe Craft Ledger Container */}
        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-none snap-x snap-mandatory">
          {/* Card 1 */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-white rounded border border-[#B8860B]/20 shadow-md p-6 snap-start flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-editorial font-bold text-[#D4AF37]">01</span>
              <p className="text-[10px] uppercase tracking-widest text-[#8A661C] font-bold">Sidlaghatta, Karnataka</p>
              <h3 className="text-lg font-editorial font-bold text-[#1C1917]">Mulberry Silk Reeling</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Hand-reeled Grade-A Karnataka cocoons delivering unbroken tensile strength for an authentic royal drape.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] text-emerald-800 font-bold">
              ✓ 100% Katan Silk
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-white rounded border border-[#B8860B]/20 shadow-md p-6 snap-start flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-editorial font-bold text-[#D4AF37]">02</span>
              <p className="text-[10px] uppercase tracking-widest text-[#8A661C] font-bold">Ghats of Varanasi</p>
              <h3 className="text-lg font-editorial font-bold text-[#1C1917]">Copper Vat Dyeing</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Steeped in pure kumkuma vermilion, indigo cakes, and sun-dried saffron turmeric boiled in copper cauldrons.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] text-emerald-800 font-bold">
              ✓ Natural Vat Dyeing
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-white rounded border border-[#B8860B]/20 shadow-md p-6 snap-start flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-editorial font-bold text-[#D4AF37]">03</span>
              <p className="text-[10px] uppercase tracking-widest text-[#8A661C] font-bold">Madanpura Guild</p>
              <h3 className="text-lg font-editorial font-bold text-[#1C1917]">The Naksha Graph</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Mathematical naksha graphs punched into thousands of individual cards to guide the jacquard harness.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] text-emerald-800 font-bold">
              ✓ 2,400 Warp Threads
            </div>
          </div>

          {/* Card 4 */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-white rounded border border-[#B8860B]/20 shadow-md p-6 snap-start flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-editorial font-bold text-[#D4AF37]">04</span>
              <p className="text-[10px] uppercase tracking-widest text-[#8A661C] font-bold">Atelier Shivala, Varanasi</p>
              <h3 className="text-lg font-editorial font-bold text-[#1C1917]">144-Hour Pit Loom</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Hand-manipulated Kadwa weft embroidery where every single peacock buti is individually locked with silver tilis.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] text-emerald-800 font-bold">
              ✓ Ustad Bashir Lineage
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services & Appointments: Two-Column Clean Booking Cards */}
      <section className="py-28 md:py-36 px-6 sm:px-8 lg:px-12 bg-[#F4EFEA] border-t border-[#B8860B]/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A661C] font-bold">
              Private Concierge
            </p>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1C1917]">
              Experience Kashika Firsthand
            </h2>
          </div>

          {/* Two-Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Bengaluru Flagship Suite */}
            <div className="bg-white p-8 rounded-lg border border-[#B8860B]/30 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#781224] text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>In-Person Viewing</span>
                  </div>
                  <span className="text-[10px] bg-[#B8860B]/15 text-[#8A661C] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Lavelle Rd Suite
                  </span>
                </div>

                <h3 className="text-2xl font-editorial font-bold text-[#1C1917]">
                  Bengaluru Flagship Suite
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Private one-on-one viewing of the Rajkumari Mayil Jangla with a master draper over Kashmiri Saffron Kahwa.
                </p>

                {/* Direct Time-Slot Selector Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-stone-400" />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded text-xs font-sans text-[#1C1917] focus:outline-none focus:border-[#781224]"
                    />
                  </div>

                  <div className="flex gap-2">
                    {['11:00 AM', '2:30 PM', '5:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingTime(slot)}
                        className={`flex-1 py-1.5 rounded text-xs font-sans border transition-all ${
                          bookingTime === slot
                            ? 'bg-[#781224] text-white border-[#781224] font-bold'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-sm mt-3"
                  >
                    Reserve Private Suite &rarr;
                  </button>
                </form>
              </div>
            </div>

            {/* Card 2: Virtual HD Consultation */}
            <div className="bg-white p-8 rounded-lg border border-[#B8860B]/30 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    <Video className="w-4 h-4" />
                    <span>Worldwide Video</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Drapers Online
                  </span>
                </div>

                <h3 className="text-2xl font-editorial font-bold text-[#1C1917]">
                  Virtual HD Video Draping
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Connect live over WhatsApp Video. We inspect the zari sheen and drape your chosen colorways under calibrated daylight lamps.
                </p>

                <div className="p-4 bg-[#FAF8F5] rounded border border-stone-200 space-y-1 text-xs font-sans">
                  <span className="text-[#8A661C] font-bold block">Available Globally:</span>
                  <p className="text-stone-500">Pan-India, North America, UK, UAE & Singapore.</p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleVirtualConsult}
                  className="w-full py-3.5 bg-emerald-800 text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-emerald-900 transition-all shadow flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Request Instant Video Call &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-Over Drawer: Inspect Naksha & Technical Weaving Specifications */}
      {inspectDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={() => setInspectDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#B8860B]/30 shadow-2xl flex flex-col text-[#1C1917] font-sans">
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#B8860B]/20 flex items-center justify-between bg-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-bold block">
                    ⚜ Provenance Archive
                  </span>
                  <h3 className="text-xl font-editorial font-bold text-[#1C1917]">
                    Inspect Naksha Details
                  </h3>
                </div>
                <button
                  onClick={() => setInspectDrawerOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Active Colorway Preview */}
                <div className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center gap-4">
                  <img
                    src={activeColorway.image}
                    alt={activeColorway.name}
                    className="w-16 h-20 rounded object-cover border border-black/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#781224] font-bold block">
                      Active Selection
                    </span>
                    <h4 className="text-base font-editorial font-bold text-[#1C1917]">
                      {activeColorway.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-sans">{activeColorway.sanskrit}</p>
                    <span className="text-xs font-editorial font-bold text-[#1C1917] mt-1 block">
                      {formatPrice(masterSaree.basePriceINR, currency)}
                    </span>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#8A661C] font-bold">
                    Technical Specifications
                  </h4>
                  <div className="bg-white p-4 rounded border border-[#B8860B]/20 space-y-2 text-xs">
                    {masterSaree.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">{s.label}</span>
                        <span className="font-semibold text-[#1C1917]">{s.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Blouse Fabric</span>
                      <span className="font-semibold text-[#781224]">{activeColorway.blousePiece}</span>
                    </div>
                  </div>
                </div>

                {/* Assay & Certification */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#8A661C] font-bold">
                    Bullion Assay Certificate
                  </h4>
                  <div className="p-4 bg-white rounded border border-[#B8860B]/20 space-y-2 text-xs">
                    <p className="text-stone-600 leading-relaxed">
                      <strong>98.2% Tested Silver Zari:</strong> Electroplated in 24K liquid gold bullion. Guaranteed dynastic lifespan exceeding 80–120 years.
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-emerald-800 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Silk Mark India QR Code Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-white border-t border-[#B8860B]/20 space-y-3">
                <button
                  onClick={() => {
                    setInspectDrawerOpen(false);
                    onSelectColorway(activeColorway.id);
                    onNavigate('collection');
                  }}
                  className="w-full py-3.5 bg-[#781224] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#580B17] transition-all"
                >
                  Acquire Masterpiece ({formatPrice(masterSaree.basePriceINR, currency)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
