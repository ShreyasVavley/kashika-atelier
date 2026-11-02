import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Video, ShieldCheck, Sparkles, ZoomIn, Check, ChevronRight } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({ onNavigate, onSelectColorway, currency }) {
  const masterSaree = MASTER_DESIGNS[0];
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [expandedLookbookIndex, setExpandedLookbookIndex] = useState(0);
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
  const handleSwatchSelect = (index) => {
    if (index === activeVariantIndex) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveVariantIndex(index);
      setIsCrossfading(false);
    }, 180);
  };

  // Cursor Tracking for Macro Inspection Lens
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Appointment Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I wish to book a private Sanctuary Suite viewing at "${sanctuaryLocation}" on ${bookingDate} for the ${bookingTime} slot. Saree of interest: "${activeColorway.name}".`
    );
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
      {/* 1. High-Fashion Editorial Hero (Full Viewport h-screen) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Full-Bleed Cinematic Hero Visual with Ambient Slow Zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_ASSETS.heroBanner}
            alt="The Imperial Bridal Drape - House of Kashika"
            className="w-full h-full object-cover object-center filter brightness-[0.66] contrast-[1.10] animate-slow-zoom"
          />
          {/* Subtle Dark Vignette & Atmospheric Radial Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.55)_100%)]" />
        </div>

        {/* Centered Minimal Statement with Choreographed Entrance */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center pt-16">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-royal font-semibold mb-5 flex items-center justify-center gap-2"
          >
            <span>⚜</span>
            <span>VARANASI &nbsp;•&nbsp; EST. 1948 &nbsp;•&nbsp; SAREES WOVEN WITH</span>
            <span>⚜</span>
          </motion.p>

          {/* Flourished Main Headline with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative inline-block mb-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-editorial font-normal tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#FBF9F5] leading-[1.06] drop-shadow-2xl">
              CULTURE & DYNASTIES
            </h1>
            {/* Elegant Calligraphic Flourish Underline */}
            <motion.svg
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.9 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-4 sm:h-6 text-[#D4AF37] mt-1 mx-auto origin-center"
              viewBox="0 0 400 20"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 15 12 Q 100 2 200 12 Q 300 22 385 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-sm sm:text-base md:text-lg font-editorial italic text-stone-300 max-w-xl mx-auto mb-10 tracking-wide font-normal"
          >
            Heirloom Drapes for Modern Stories
          </motion.p>

          {/* Minimal Transparent Glassmorphic / Gold-Wire CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#expanding-lookbook"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-black/45 hover:bg-[#D4AF37]/15 text-[#FBF9F5] hover:text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[11px] uppercase tracking-[0.28em] font-sans font-medium transition-all duration-300 shadow-2xl btn-shimmer"
            >
              <span>EXPLORE THE 5 COLORWAYS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </motion.a>
          </motion.div>

          {/* Floating Hero Stat Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-12 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.2em] text-stone-300 shadow-lg"
          >
            <span>Finest Mulberry Silk</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Hand-Locked Kadwa</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>98.2% Tested Silver Zari</span>
          </motion.div>
        </div>

        {/* Seamless bottom transition: Soft dark vignette fading into obsidian */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* 2. Horizontal Craft Ticker: Infinite Seamless Marquee Strip */}
      <div className="bg-[#0A0A0A] border-y border-[0.5px] border-[#D4AF37]/20 py-3.5 overflow-hidden relative select-none">
        <div className="animate-marquee-scroll flex items-center whitespace-nowrap text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-stone-300">
          {/* Segment 1 */}
          <div className="flex items-center gap-8 mx-6">
            <span>144 Handloom Hours</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>98.2% Tested Silver Zari</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>2,400 Warp Threads / m</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Silk Mark India Authenticated</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Zero Reverse Float (Kadwa)</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Insured White-Glove Courier</span>
            <span className="text-[#D4AF37]">◆</span>
          </div>
          {/* Segment 2 (Continuous Loop Match) */}
          <div className="flex items-center gap-8 mx-6">
            <span>144 Handloom Hours</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>98.2% Tested Silver Zari</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>2,400 Warp Threads / m</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Silk Mark India Authenticated</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Zero Reverse Float (Kadwa)</span>
            <span className="text-[#D4AF37]">◆</span>
            <span>Insured White-Glove Courier</span>
            <span className="text-[#D4AF37]">◆</span>
          </div>
        </div>
      </div>

      {/* 3. The 5-Column Expanding Kinetic Accordion Lookbook (Showstopper from Video Inspiration!) */}
      <section id="expanding-lookbook" className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-[0.5px] border-white/10 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10 text-center space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
            The 2026 Dynastic Lookbook
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
            Five Sacred Weaves. One Imperial Naksha.
          </h2>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
            Hover any column to expand the drape and explore the bullion metallurgy.
          </p>
        </motion.div>

        {/* Full-Width 5-Column Kinetic Expanding Accordion Spread */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row h-[620px] sm:h-[680px] w-full rounded-lg overflow-hidden border-[0.5px] border-[#D4AF37]/30 bg-black shadow-2xl">
            {masterSaree.colorways.map((cw, idx) => {
              const isExpanded = expandedLookbookIndex === idx;
              return (
                <div
                  key={cw.id}
                  onMouseEnter={() => setExpandedLookbookIndex(idx)}
                  onClick={() => {
                    setActiveVariantIndex(idx);
                    document.getElementById('swatch-studio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[0.5px] border-white/10 ${
                    isExpanded ? 'flex-[3.5] md:flex-[3.5]' : 'flex-1 md:flex-1'
                  }`}
                >
                  {/* Background Saree Drape Image */}
                  <img
                    src={cw.image}
                    alt={cw.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isExpanded
                        ? 'filter brightness-[0.92] contrast-[1.08] scale-105'
                        : 'filter brightness-[0.45] contrast-[1.0] scale-100'
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />

                  {/* Collapsed State: Vertical Typography Spine */}
                  {!isExpanded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none">
                      <span className="text-[10px] font-sans font-bold text-[#D4AF37]">0{idx + 1}</span>
                      <div className="[writing-mode:vertical-rl] rotate-180 text-xs sm:text-sm font-editorial tracking-[0.25em] uppercase text-stone-300">
                        {cw.name}
                      </div>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: cw.hex }}
                      />
                    </div>
                  )}

                  {/* Expanded State Content Overlay */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between text-white pointer-events-none"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30">
                          Colorway 0{idx + 1} • {cw.zariTone}
                        </span>
                        <span
                          className="w-4 h-4 rounded-full border border-white/50 shadow-md ring-2 ring-[#D4AF37]"
                          style={{ backgroundColor: cw.hex }}
                        />
                      </div>

                      {/* Bottom Details Panel */}
                      <div className="space-y-4 max-w-md pointer-events-auto">
                        <div className="space-y-1">
                          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] block font-sans font-semibold">
                            {cw.occasion}
                          </span>
                          <h3 className="text-2xl sm:text-4xl font-editorial font-normal tracking-wide text-[#FBF9F5]">
                            {cw.name}
                          </h3>
                          <p className="text-xs font-editorial italic text-stone-300">
                            Sanskrit: <span className="text-[#D4AF37]">{cw.sanskrit}</span> ({cw.tagline})
                          </p>
                        </div>

                        <p className="text-xs font-sans text-stone-300 line-clamp-2 leading-relaxed">
                          Blouse: {cw.blousePiece} • 144 Hours on the pit loom with 98.2% pure bullion zari.
                        </p>

                        <div className="pt-2 flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVariantIndex(idx);
                              document.getElementById('swatch-studio')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.22em] font-sans font-bold transition-all shadow-xl flex items-center gap-1.5 btn-shimmer"
                          >
                            <span>Inspect Shade</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectColorway(cw.id);
                              onNavigate('collection');
                            }}
                            className="px-4 py-2.5 rounded-full bg-black/60 hover:bg-white/10 text-stone-200 border border-white/20 text-[10px] uppercase tracking-[0.22em] font-sans font-medium transition-all"
                          >
                            Acquire Piece ({formatPrice(masterSaree.basePriceINR, currency)})
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 4. Royal Jharokha (Arched Mughal Palace Window) Gallery (From Video Inspiration!) */}
      <section className="py-28 md:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[0.5px] border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (40%): Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
                Imperial Best Sellers
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] leading-[1.12] tracking-wide">
                Architectural Jharokha Framing
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37]" />
            </div>

            <p className="text-sm sm:text-base font-editorial italic text-stone-300 leading-relaxed">
              Echoing the palace archways of Varanasi and Rajasthan, our master drapes are presented in signature Mughal Jharokha silhouettes.
            </p>

            <p className="text-xs font-sans text-stone-400 leading-relaxed">
              Every drape captures the interplay of liquid gold zari against raw silk warp, verified by Silk Mark India with unbroken dynastic durability.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('collection')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#121212] hover:bg-[#D4AF37] text-stone-200 hover:text-black border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.25em] font-sans font-bold transition-all shadow-lg btn-shimmer"
              >
                <span>View Full Imperial Collection</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column (60%): Staggered Royal Arched Jharokha Windows */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6 items-end">
            {/* Arch 1 (Tallest): Sindoor Crimson */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-[420px] sm:h-[480px] rounded-t-[100px] sm:rounded-t-[130px] overflow-hidden border-[0.5px] border-[#D4AF37]/40 shadow-2xl bg-[#121212] transition-all duration-500"
            >
              <img
                src={BRAND_ASSETS.heroBanner}
                alt="Sindoor Crimson Drape"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              {/* Floating Swatch Disc in Corner */}
              <div className="absolute top-4 right-3 w-6 h-6 rounded-full bg-[#881326] border-2 border-white/60 shadow-lg" />
              <div className="absolute bottom-4 left-3 right-3 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-sans block font-semibold">
                  Sindoor
                </span>
                <span className="text-xs font-editorial font-normal text-white">Muhurtham</span>
              </div>
            </motion.div>

            {/* Arch 2 (Medium, Offset): Mor-Pankhi Emerald */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.25 }}
              whileHover={{ y: -8 }}
              className="group relative h-[380px] sm:h-[430px] rounded-t-[90px] sm:rounded-t-[120px] overflow-hidden border-[0.5px] border-[#D4AF37]/40 shadow-2xl bg-[#121212] mb-4 transition-all duration-500"
            >
              <img
                src={masterSaree.colorways[2].image}
                alt="Mor-Pankhi Emerald Drape"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute top-4 right-3 w-6 h-6 rounded-full bg-[#082d20] border-2 border-white/60 shadow-lg" />
              <div className="absolute bottom-4 left-3 right-3 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-sans block font-semibold">
                  Mor-Pankhi
                </span>
                <span className="text-xs font-editorial font-normal text-white">Temple Grove</span>
              </div>
            </motion.div>

            {/* Arch 3 (Compact, Offset): Pitambari Saffron */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="group relative h-[340px] sm:h-[390px] rounded-t-[80px] sm:rounded-t-[110px] overflow-hidden border-[0.5px] border-[#D4AF37]/40 shadow-2xl bg-[#121212] mb-8 transition-all duration-500"
            >
              <img
                src={masterSaree.colorways[4].image}
                alt="Pitambari Saffron Drape"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute top-4 right-3 w-6 h-6 rounded-full bg-[#a86a08] border-2 border-white/60 shadow-lg" />
              <div className="absolute bottom-4 left-3 right-3 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-sans block font-semibold">
                  Pitambari
                </span>
                <span className="text-xs font-editorial font-normal text-white">Haldi Gold</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Masterpiece Swatch Studio: Lookbook Viewer */}
      <section id="swatch-studio" className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Stage (60%): High-Resolution Portrait Stage with Cursor-Follow Macro Lens Inspection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
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
          </motion.div>

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
                    <motion.button
                      key={cw.id}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwatchSelect(idx)}
                      className="group flex flex-col items-center gap-2 focus:outline-none"
                      title={`${cw.name} (${cw.sanskrit})`}
                      aria-label={cw.name}
                    >
                      <span
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center relative ${
                          isSelected
                            ? 'ring-1 ring-[#D4AF37] ring-offset-3 ring-offset-[#0A0A0A] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                            : 'opacity-70 hover:opacity-100 border-[0.5px] border-white/20'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                      >
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-white shadow" />
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Quick Spec Chips */}
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
                className="w-full py-3.5 bg-transparent hover:bg-white/[0.04] text-[#D4AF37] border border-[0.5px] border-[#D4AF37]/40 hover:border-[#D4AF37] text-[11px] uppercase tracking-[0.25em] font-sans font-semibold rounded transition-all flex items-center justify-center gap-2 btn-shimmer"
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
                  className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.22em] font-sans font-bold rounded transition-all shadow-xl btn-shimmer"
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

      {/* 6. Storytelling Grid: Clean 2-Column Asymmetric Layout */}
      <section className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 bg-[#121212] border-y border-[0.5px] border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Raw Loom Documentary Photograph */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-lg overflow-hidden border-[0.5px] border-[#D4AF37]/30 shadow-2xl group"
          >
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
          </motion.div>

          {/* Right: Concise Poetic Craft Storytelling (2 Punchy Sentences) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8 font-sans"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block">
                The Karigar Lineage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#FBF9F5] leading-[1.12] tracking-wide">
                144 Hours on the Pit Loom
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37]" />
            </div>

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
          </motion.div>
        </div>
      </section>

      {/* 7. Private Salon & Trunk Booking: Modernized Boutique Concierge */}
      <section className="py-32 md:py-40 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl mx-auto space-y-3"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
              Private Concierge
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
              Experience Kashika Firsthand
            </h2>
            <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
              Personalized one-on-one appointments for discerning brides and royal patrons.
            </p>
          </motion.div>

          {/* Side-by-Side Modern Concierge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Sanctuary Suite Card */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="bg-[#121212] p-8 sm:p-10 rounded-lg border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6"
            >
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
                    Private draping suite appointment with our senior master draper over warm Kashmiri Saffron Kahwa. One party hosted at a time.
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
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all mt-3 shadow-lg btn-shimmer"
                  >
                    Reserve Sanctuary Suite &rarr;
                  </button>
                </form>
              </div>
            </motion.div>

            {/* HD Video Concierge Card */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              className="bg-[#121212] p-8 sm:p-10 rounded-lg border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between space-y-6"
            >
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
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl flex items-center justify-center gap-2.5 btn-shimmer"
                >
                  <Video className="w-4 h-4" />
                  <span>Request Instant Video Draping &rarr;</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slide-Over Drawer: Inspect Naksha & Zari Metallurgy with AnimatePresence */}
      <AnimatePresence>
        {inspectDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Dark Backdrop with Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setInspectDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-[#121212] border-l border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col text-[#FBF9F5] font-sans pointer-events-auto"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block">
                      ⚜ Provenance Archive
                    </span>
                    <h3 className="text-lg font-editorial font-normal text-[#FBF9F5]">
                      Naksha & Zari Assay
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
                  <div className="p-4 bg-[#0A0A0A] rounded border-[0.5px] border-white/10 space-y-3">
                    <div className="flex gap-4">
                      <img
                        src={activeColorway.image}
                        alt={activeColorway.name}
                        className="w-20 h-24 object-cover rounded border border-white/15 shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
                          {activeColorway.sanskrit}
                        </span>
                        <h4 className="text-base font-editorial font-normal text-[#FBF9F5]">
                          {activeColorway.name}
                        </h4>
                        <p className="text-xs text-stone-400 font-sans">
                          {activeColorway.tagline}
                        </p>
                        <span className="text-sm font-editorial font-bold text-stone-200 block pt-1">
                          {formatPrice(masterSaree.basePriceINR, currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Naksha & Motif Specifications */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                      Master Weaver Technical Ledger
                    </h4>
                    <div className="divide-y divide-white/5 border-y border-white/5 text-xs font-sans">
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Naksha Architecture</span>
                        <span className="text-[#FBF9F5] font-medium">{masterSaree.specs.naksha}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Weft Technique</span>
                        <span className="text-[#FBF9F5] font-medium">{masterSaree.specs.technique}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Total Loom Hours</span>
                        <span className="text-[#FBF9F5] font-medium">{masterSaree.specs.loomHours}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Warp Density</span>
                        <span className="text-[#FBF9F5] font-medium">{masterSaree.specs.warpThreads}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Zari Composition</span>
                        <span className="text-[#D4AF37] font-medium">{masterSaree.specs.zariComposition}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-400">Saree Weight</span>
                        <span className="text-[#FBF9F5] font-medium">{masterSaree.specs.sareeWeight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blouse Piece Details */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                      Unstitched Blouse Piece
                    </h4>
                    <div className="p-4 bg-[#0A0A0A] rounded border-[0.5px] border-white/10 space-y-1.5 text-xs font-sans">
                      <p className="text-stone-300">
                        <strong>Fabric:</strong> {activeColorway.blousePiece}
                      </p>
                      <p className="text-stone-400">
                        <strong>Sleeve Borders:</strong> Dual-sided running floral jaal border matching the saree pallu with gold bullion edging.
                      </p>
                    </div>
                  </div>

                  {/* Bullion Assay Certificate */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                      Bullion Assay Certification
                    </h4>
                    <div className="p-4 bg-[#0A0A0A] rounded border-[0.5px] border-white/10 space-y-2 text-xs">
                      <p className="text-stone-300 leading-relaxed font-sans">
                        <strong>98.2% Tested Silver Zari:</strong> Electro-gilded in pure 24K liquid gold bullion. Guaranteed dynastic longevity exceeding 80–120 years without blackening.
                      </p>
                      <div className="flex items-center gap-2 pt-2 text-emerald-400 font-bold font-sans">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Silk Mark India Authenticated & QR Sealed</span>
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
                    className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl btn-shimmer"
                  >
                    Acquire Masterpiece ({formatPrice(masterSaree.basePriceINR, currency)})
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
