import React, { useState, useRef } from 'react';
import { ArrowRight, X, Calendar, Video, ShieldCheck, Sparkles, ZoomIn, Check } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [inspectDrawerOpen, setInspectDrawerOpen] = useState(false);
  const [isCrossfading, setIsCrossfading] = useState(false);

  // Macro Lens Inspection States
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const imageContainerRef = useRef(null);

  // Booking Card States
  const [bookingDate, setBookingDate] = useState('2026-11-06');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [sanctuaryLocation, setSanctuaryLocation] = useState('Bengaluru Flagship (Lavelle Road)');

  const activeColorway = masterSaree.colorways[activeVariantIndex];

  // Swatch Crossfade Switcher
  const handleSwatchSelect = (idx) => {
    if (idx === activeVariantIndex) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveVariantIndex(idx);
      setIsCrossfading(false);
    }, 200);
  };

  // Cursor Follow Macro Lens
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const msg = `Pranam Kashika Atelier.%0A%0A*Private Sanctuary Suite Reservation:*%0A- Sanctuary: ${encodeURIComponent(sanctuaryLocation)}%0A- Date: ${bookingDate}%0A- Time Slot: ${bookingTime}%0A- Interested In: The Rajkumari Mayil Jangla (${activeColorway.name})`;
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  const handleVirtualConsult = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I would like to request an immediate 1-on-1 Virtual HD Video Draping Consultation for the "${activeColorway.name}" colorway.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5] font-sans min-h-screen">
      {/* 2. High-Fashion Editorial Hero (Full Viewport h-screen) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Full-Bleed Cinematic Hero Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.heroBanner}
            alt="The Imperial Bridal Drape - House of Kashika"
            className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.08] scale-100 transition-transform duration-1000"
          />
          {/* Subtle Dark Vignette & Atmospheric Radial Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.5)_100%)]" />
        </div>

        {/* Centered Minimal Statement */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center pt-16">
          {/* Eyebrow */}
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-royal font-semibold mb-6">
            VARANASI &nbsp;•&nbsp; EST. 1948
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-editorial font-normal tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#FBF9F5] leading-[1.06] mb-6 drop-shadow-2xl">
            WOVEN FOR DYNASTIES
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg font-editorial italic text-stone-300 max-w-xl mx-auto mb-12 tracking-wide font-normal">
            The 2026 Imperial Rajkumari Collection
          </p>

          {/* Minimal Transparent Glassmorphic / Gold-Wire CTA */}
          <div>
            <a
              href="#swatch-studio"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-black/40 hover:bg-[#D4AF37]/15 text-[#FBF9F5] hover:text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[11px] uppercase tracking-[0.28em] font-sans font-medium transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <span>EXPLORE ATELIER</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>
        </div>

        {/* Seamless bottom transition: Soft dark vignette fading into obsidian */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* 4. Horizontal Craft Ticker: Ultra-Refined Single-Line Border Strip */}
      <div className="bg-[#0A0A0A] border-y border-[0.5px] border-[#D4AF37]/20 py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 sm:gap-8 text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-stone-300">
          <div className="flex items-center gap-2">
            <span>144 Handloom Hours</span>
          </div>
          <span className="text-[#D4AF37]/60 text-xs">◆</span>
          <div className="flex items-center gap-2">
            <span>98.2% Tested Silver Zari</span>
          </div>
          <span className="text-[#D4AF37]/60 text-xs hidden sm:inline">◆</span>
          <div className="flex items-center gap-2">
            <span>2,400 Warp Threads / m</span>
          </div>
          <span className="text-[#D4AF37]/60 text-xs hidden sm:inline">◆</span>
          <div className="flex items-center gap-2">
            <span>Silk Mark India</span>
          </div>
          <span className="text-[#D4AF37]/60 text-xs hidden md:inline">◆</span>
          <div className="flex items-center gap-2">
            <span>Insured White-Glove Courier</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Masterpiece Swatch Studio: Editorial Lookbook Viewer */}
      <section id="swatch-studio" className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Stage (60%): High-Resolution Portrait Stage with Cursor-Follow Macro Lens Inspection */}
          <div className="lg:col-span-7">
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative h-[560px] sm:h-[680px] rounded-lg overflow-hidden border-[0.5px] border-[#D4AF37]/25 shadow-2xl bg-[#121212] cursor-crosshair group select-none"
            >
              {/* Main Drape Image with Cursor-Follow Zoom */}
              <img
                src={activeColorway.image}
                alt={activeColorway.name}
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: isHovered ? 'scale(1.45)' : 'scale(1.0)',
                }}
                className={`w-full h-full object-cover transition-transform duration-200 ease-out ${
                  isCrossfading ? 'opacity-30' : 'opacity-100'
                }`}
              />

              {/* Atmospheric Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

              {/* Cursor-Follow Inspection HUD Badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-stone-300 font-sans flex items-center gap-2 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isHovered ? 'Macro Lens Active' : 'Hover to Inspect Weave'}</span>
              </div>

              {/* Zari Metallurgy Pill */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-medium pointer-events-none">
                {activeColorway.zariTone}
              </div>

              {/* Bottom Stage Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-semibold mb-1">
                    Authentic Kadwa Handloom
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-normal tracking-wide">
                    {activeColorway.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block font-sans">Acquisition</span>
                  <span className="text-2xl font-editorial font-bold text-[#FBF9F5]">
                    {formatPrice(masterSaree.basePriceINR, currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (40% - Sticky): Minimalist Narrative, Swatch Discs, Price & CTAs */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            {/* Dynastic Title & Sanskrit Shade Identifier */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-semibold block">
                Dynastic Colorway
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
                {activeColorway.name}
              </h2>
              <p className="text-sm font-editorial italic text-stone-400">
                Sanskrit: <span className="text-[#D4AF37] font-normal">{activeColorway.sanskrit}</span> • {activeColorway.tagline}
              </p>
            </div>

            {/* Five Circular, Silk-Textured Swatch Pills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans font-medium">
                  Select dynastic shade
                </span>
                <span className="text-[11px] font-editorial italic text-[#D4AF37]">
                  {activeColorway.name}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-5 pt-1">
                {masterSaree.colorways.map((cw, idx) => {
                  const isSelected = idx === activeVariantIndex;
                  return (
                    <button
                      key={cw.id}
                      onClick={() => handleSwatchSelect(idx)}
                      className="group flex flex-col items-center gap-2 focus:outline-none"
                      title={`${cw.name} (${cw.sanskrit})`}
                      aria-label={cw.name}
                    >
                      <span
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center relative ${
                          isSelected
                            ? 'ring-1 ring-[#D4AF37] ring-offset-3 ring-offset-[#0A0A0A] scale-110'
                            : 'opacity-70 hover:opacity-100 hover:scale-105 border-[0.5px] border-white/20'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                      >
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-white shadow" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Spec Chips: 144h Loom • 98.2% Silver • Silk Mark */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded bg-[#121212] border-[0.5px] border-white/10 text-center space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans">Craft Duration</span>
                <span className="text-xs font-semibold text-[#FBF9F5] block">144h Loom</span>
              </div>
              <div className="p-3 rounded bg-[#121212] border-[0.5px] border-white/10 text-center space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans">Zari Bullion</span>
                <span className="text-xs font-semibold text-[#D4AF37] block">98.2% Silver</span>
              </div>
              <div className="p-3 rounded bg-[#121212] border-[0.5px] border-white/10 text-center space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans">Authenticity</span>
                <span className="text-xs font-semibold text-emerald-400 block">Silk Mark</span>
              </div>
            </div>

            {/* Occasion & Blouse Piece Info */}
            <div className="p-4 rounded bg-[#121212] border-[0.5px] border-[#D4AF37]/20 space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center text-stone-400">
                <span className="uppercase tracking-wider text-[10px]">Occasion:</span>
                <span className="text-[#FBF9F5] font-medium">{activeColorway.occasion}</span>
              </div>
              <div className="flex justify-between items-center text-stone-400 pt-1 border-t border-white/5">
                <span className="uppercase tracking-wider text-[10px]">Blouse Fabric:</span>
                <span className="text-[#D4AF37] font-medium">{activeColorway.blousePiece}</span>
              </div>
            </div>

            {/* Price & Luxury Slide-Over Trigger Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setInspectDrawerOpen(true)}
                className="w-full py-3.5 bg-transparent hover:bg-white/[0.04] text-[#D4AF37] border border-[0.5px] border-[#D4AF37]/40 hover:border-[#D4AF37] text-[11px] uppercase tracking-[0.25em] font-sans font-semibold rounded transition-all flex items-center justify-center gap-2"
              >
                <span>INSPECT NAKSHA & ZARI</span>
                <span>&rarr;</span>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('collection');
                  }}
                  className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.22em] font-sans font-bold rounded transition-all shadow-xl"
                >
                  Acquire Masterpiece
                </button>
                <button
                  onClick={() => {
                    onSelectColorway(activeColorway.id);
                    onNavigate('trousseau');
                  }}
                  className="flex-1 py-3.5 bg-[#121212] hover:bg-white/[0.08] text-stone-200 border border-[0.5px] border-white/20 text-[11px] uppercase tracking-[0.22em] font-sans font-medium rounded transition-all"
                >
                  Add to Trousseau
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Storytelling Grid: Clean 2-Column Asymmetric Layout */}
      <section className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 bg-[#121212] border-y border-[0.5px] border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Raw Loom Documentary Photograph */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-lg overflow-hidden border-[0.5px] border-[#D4AF37]/30 shadow-2xl group">
            <img
              src={BRAND_ASSETS.craftLoom}
              alt="Ustad Bashir Ahmed on traditional wooden pit loom in Varanasi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-bold block mb-1">
                Pit Loom Archive • Shivala Ghat
              </span>
              <p className="text-base font-editorial italic text-stone-200">
                Weathered hands guiding tested silver bullion threads across raw mulberry silk.
              </p>
            </div>
          </div>

          {/* Right: Concise Poetic Craft Storytelling (2 Punchy Sentences) */}
          <div className="lg:col-span-5 space-y-8 font-sans">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block">
                The Karigar Lineage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#FBF9F5] leading-[1.12] tracking-wide">
                144 Hours on the Pit Loom
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37]" />
            </div>

            {/* 2 Concise Sentences of Poetic Craft Storytelling */}
            <p className="text-base sm:text-lg font-editorial italic text-stone-300 leading-relaxed font-normal">
              Every celestial peacock motif is hand-locked into the warp with individual wooden spools, leaving zero loose cut floats on the reverse.
            </p>
            <p className="text-base sm:text-lg font-editorial italic text-stone-300 leading-relaxed font-normal">
              A single master karigar dedicates eighteen unbroken days to weave one saree, preserving seventy-six years of dynastic Banarasi heritage.
            </p>

            {/* 4 Clean Metric Badges */}
            <div className="grid grid-cols-2 gap-3.5 pt-4">
              <div className="p-4 rounded bg-[#0A0A0A] border-[0.5px] border-white/10 space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">Kadwa Weave</span>
                <span className="text-[11px] text-stone-400 block font-sans">Zero float scissor cut</span>
              </div>
              <div className="p-4 rounded bg-[#0A0A0A] border-[0.5px] border-white/10 space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">98.2% Silver</span>
                <span className="text-[11px] text-stone-400 block font-sans">Electroplated in 24K gold</span>
              </div>
              <div className="p-4 rounded bg-[#0A0A0A] border-[0.5px] border-white/10 space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">Silk Mark India</span>
                <span className="text-[11px] text-stone-400 block font-sans">Pure Grade-A Katan silk</span>
              </div>
              <div className="p-4 rounded bg-[#0A0A0A] border-[0.5px] border-white/10 space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">Dynastic Lifespan</span>
                <span className="text-[11px] text-stone-400 block font-sans">80 to 120 year heirloom</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('craft')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Explore the Karigar Craft Ledger</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Private Salon & Trunk Booking: Modernized Boutique Concierge */}
      <section className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
              Private Concierge
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
              Experience Kashika Firsthand
            </h2>
            <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
              Personalized one-on-one appointments for discerning brides and royal patrons.
            </p>
          </div>

          {/* Side-by-Side Modern Concierge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Sanctuary Suite Card */}
            <div className="bg-[#121212] p-8 sm:p-10 rounded-lg border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Header Image */}
                <div className="relative h-44 -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 rounded-t-lg overflow-hidden border-b border-white/10 group">
                  <img
                    src={BRAND_ASSETS.salonInterior}
                    alt="Private Bridal Draping Salon Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-6 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-bold">
                    Lavelle Road & Shivala Ghat
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
                    Sanctuary Suite In-Person Viewing
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Private private draping suite appointment with our senior master draper over warm Kashmiri Saffron Kahwa. One party hosted at a time.
                  </p>
                </div>

                {/* Direct Calendar Slot Selector Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans mb-1.5">
                      Select Sanctuary Location
                    </label>
                    <select
                      value={sanctuaryLocation}
                      onChange={(e) => setSanctuaryLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border-[0.5px] border-white/20 rounded text-xs font-sans text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Bengaluru Flagship (Lavelle Road)">Bengaluru Flagship Atelier (14 Lavelle Road)</option>
                      <option value="Varanasi Sanctuary (Shivala Ghat)">Varanasi Loom Sanctuary (Shivala Ghat)</option>
                      <option value="London Mayfair Suite (By Invitation)">London Mayfair Suite (By Invitation)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#0A0A0A] border-[0.5px] border-white/20 rounded text-xs font-sans text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans mb-1.5">
                        Time Slot
                      </label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#0A0A0A] border-[0.5px] border-white/20 rounded text-xs font-sans text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="11:00 AM">11:00 AM Morning</option>
                        <option value="2:30 PM">2:30 PM Afternoon</option>
                        <option value="5:30 PM">5:30 PM Sunset Gala</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all mt-3 shadow-lg"
                  >
                    Reserve Sanctuary Suite &rarr;
                  </button>
                </form>
              </div>
            </div>

            {/* HD Video Concierge Card */}
            <div className="bg-[#121212] p-8 sm:p-10 rounded-lg border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-sans">
                    <Video className="w-4 h-4" />
                    <span>Worldwide Video Concierge</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Senior Drapers Live
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
                    1-on-1 Virtual Private Viewing
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Connect directly over calibrated high-definition WhatsApp video from London, New York, Dubai, or Singapore. We inspect each zari fold live under 5000K daylight bulbs.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#0A0A0A] border-[0.5px] border-white/10 space-y-2 text-xs font-sans">
                  <span className="text-[#D4AF37] font-semibold block uppercase tracking-wider text-[10px]">
                    VIP International Patrons:
                  </span>
                  <p className="text-stone-400 leading-relaxed">
                    Custom time zones matched for North America, Western Europe, GCC, and Southeast Asia.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleVirtualConsult}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl flex items-center justify-center gap-2.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Request Instant Video Draping &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-Over Drawer: Inspect Naksha & Zari Metallurgy */}
      {inspectDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          {/* Dark Backdrop */}
          <div
            onClick={() => setInspectDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121212] border-l border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col text-[#FBF9F5] font-sans">
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block">
                    ⚜ Provenance Archive
                  </span>
                  <h3 className="text-xl font-editorial font-normal text-[#FBF9F5]">
                    Inspect Naksha & Zari Metallurgy
                  </h3>
                </div>
                <button
                  onClick={() => setInspectDrawerOpen(false)}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Active Saree Card */}
                <div className="p-4 bg-[#0A0A0A] rounded border-[0.5px] border-[#D4AF37]/30 shadow-sm flex items-center gap-4">
                  <img
                    src={activeColorway.image}
                    alt={activeColorway.name}
                    className="w-16 h-20 rounded object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                      Active Colorway
                    </span>
                    <h4 className="text-base font-editorial font-normal text-[#FBF9F5]">
                      {activeColorway.name}
                    </h4>
                    <p className="text-xs text-stone-400 font-sans">{activeColorway.sanskrit}</p>
                    <span className="text-sm font-editorial font-bold text-[#D4AF37] mt-1 block">
                      {formatPrice(masterSaree.basePriceINR, currency)}
                    </span>
                  </div>
                </div>

                {/* Extreme Macro Zari Detail Photograph */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                    Macro Zari Weave & Bullion Core
                  </span>
                  <div className="relative h-44 rounded overflow-hidden border-[0.5px] border-[#D4AF37]/30 group">
                    <img
                      src="/images/zari_macro_detail.jpg"
                      alt="Extreme Macro Kadwa 98.2% Silver Bullion Zari Weave"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] text-amber-200 uppercase tracking-widest font-sans font-bold">
                      98.2% Pure Silver Wire Dipped in 24K Liquid Gold
                    </span>
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                    Technical Specifications
                  </h4>
                  <div className="bg-[#0A0A0A] p-4 rounded border-[0.5px] border-white/10 space-y-2 text-xs">
                    {masterSaree.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">{s.label}</span>
                        <span className="font-medium text-stone-200">{s.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-1">
                      <span className="text-stone-400">Blouse Fabric</span>
                      <span className="font-medium text-[#D4AF37]">{activeColorway.blousePiece}</span>
                    </div>
                  </div>
                </div>

                {/* Bullion Assay Certificate */}
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                    Bullion Assay Certification
                  </h4>
                  <div className="p-4 bg-[#0A0A0A] rounded border-[0.5px] border-white/10 space-y-2 text-xs">
                    <p className="text-stone-300 leading-relaxed">
                      <strong>98.2% Tested Silver Zari:</strong> Electro-gilded in pure 24K liquid gold bullion. Guaranteed dynastic longevity exceeding 80–120 years without blackening.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Silk Mark India QR Code Authenticated</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-[#0A0A0A] border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setInspectDrawerOpen(false);
                    onSelectColorway(activeColorway.id);
                    onNavigate('collection');
                  }}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl"
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
