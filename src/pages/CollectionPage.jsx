import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Check, ShoppingBag, Eye, Sun, Flame, Gem, ArrowRight, MessageCircle, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';
import { royalAudio } from '../utils/soundEngine';

export default function CollectionPage({
  selectedColorwayId,
  onSelectColorway,
  onAddToCart,
  onAddToTrousseau,
  currency,
  onNavigate
}) {
  const masterSaree = MASTER_DESIGNS[0];
  const activeColorway = masterSaree.colorways.find(c => c.id === selectedColorwayId) || masterSaree.colorways[0];

  // View mode: 'drape' (High-Fashion Model), 'shimmer' (Canvas Physics), 'macro' (Zari Detail)
  const [viewMode, setViewMode] = useState('drape');
  const [lightingMode, setLightingMode] = useState('candlelight');
  const [lightX, setLightX] = useState(0.5);
  const [lightY, setLightY] = useState(0.5);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [specsAccordionOpen, setSpecsAccordionOpen] = useState(false);

  const canvasRef = useRef(null);

  // Dynamic canvas render simulating the zari specular sheen on the master saree
  useEffect(() => {
    if (viewMode !== 'shimmer') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Base Saree Fabric Fill
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeColorway.hex);
    gradient.addColorStop(0.7, activeColorway.secondaryHex);
    gradient.addColorStop(1, activeColorway.hex);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Warp & Weft Micro-Texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 4) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Dynamic Zari Specular Highlights
    const radX = lightX * width;
    const radY = lightY * height;
    const lightRadius = lightingMode === 'candlelight' ? 180 : lightingMode === 'chandelier' ? 320 : 250;

    const radialGlow = ctx.createRadialGradient(radX, radY, 10, radX, radY, lightRadius);
    if (lightingMode === 'candlelight') {
      radialGlow.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
      radialGlow.addColorStop(0.5, 'rgba(218, 165, 32, 0.22)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (lightingMode === 'chandelier') {
      radialGlow.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      radialGlow.addColorStop(0.4, 'rgba(212, 175, 55, 0.3)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      radialGlow.addColorStop(0, 'rgba(255, 250, 240, 0.35)');
      radialGlow.addColorStop(0.6, 'rgba(200, 180, 140, 0.15)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }

    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // Peacock Kadwa Motif Specular Reflections
    ctx.fillStyle = 'rgba(255, 223, 0, 0.6)';
    for (let i = 0; i < 35; i++) {
      const px = (i * 73) % width;
      const py = (i * 91) % height;
      const dist = Math.hypot(px - radX, py - radY);
      if (dist < lightRadius) {
        const intensity = (1 - dist / lightRadius) * 0.8;
        ctx.fillStyle = `rgba(255, 235, 150, ${intensity})`;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [viewMode, lightingMode, lightX, lightY, activeColorway]);

  const handleMouseMove = (e) => {
    if (viewMode !== 'shimmer') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLightX((e.clientX - rect.left) / rect.width);
    setLightY((e.clientY - rect.top) / rect.height);
  };

  const handleAcquire = () => {
    onAddToCart(masterSaree, activeColorway);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2400);
  };

  const handleWhatsAppConsult = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I am inspecting the "${activeColorway.name}" (${activeColorway.sanskrit}) shade of the Rajkumari Mayil Jangla. Please connect me with a senior bridal draper.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5]">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> The Masterpiece Studio <span>⚜</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
          {masterSaree.name}
        </h1>
        <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
          Five heritage colorways • Tested 98.2% silver zari • Hand-locked Kadwa
        </p>
      </motion.div>

      {/* 5 Visual Colorway Selector Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mb-14"
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {masterSaree.colorways.map((cw) => {
            const isSelected = cw.id === activeColorway.id;
            return (
              <motion.button
                key={cw.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelectColorway(cw.id);
                  royalAudio.playSilkChord(cw.zariTone);
                }}
                className={`p-2.5 rounded-lg border transition-all text-left flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#181818] text-[#FBF9F5] border-[#D4AF37] shadow-xl ring-1 ring-[#D4AF37]/50'
                    : 'bg-[#121212] text-stone-300 border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                <img
                  src={cw.image}
                  alt={cw.name}
                  className="w-10 h-10 rounded object-cover border border-white/10 shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="text-[11px] font-editorial font-bold block truncate leading-tight">
                    {cw.name}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider block truncate ${isSelected ? 'text-[#D4AF37]' : 'text-stone-400'}`}>
                    {cw.sanskrit}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Dual-Column Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
        {/* Left Column: Visual Saree Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="lg:col-span-7 bg-[#121212] p-6 sm:p-8 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl"
        >
          {/* View Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10 text-xs font-sans">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('drape')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'drape'
                    ? 'bg-[#D4AF37] text-black shadow-lg font-bold'
                    : 'bg-[#0A0A0A] text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Drape</span>
              </button>

              <button
                onClick={() => setViewMode('macro')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'macro'
                    ? 'bg-[#D4AF37] text-black shadow-lg font-bold'
                    : 'bg-[#0A0A0A] text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Zari Macro</span>
              </button>

              <button
                onClick={() => setViewMode('shimmer')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'shimmer'
                    ? 'bg-[#D4AF37] text-black shadow-lg font-bold'
                    : 'bg-[#0A0A0A] text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Light Physics</span>
              </button>
            </div>

            {/* Lighting Mode Selector when in Physics Mode */}
            {viewMode === 'shimmer' && (
              <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setLightingMode('daylight')}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                    lightingMode === 'daylight' ? 'bg-[#D4AF37] text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Daylight
                </button>
                <button
                  onClick={() => setLightingMode('candlelight')}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                    lightingMode === 'candlelight' ? 'bg-[#D4AF37] text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Diya
                </button>
                <button
                  onClick={() => setLightingMode('chandelier')}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                    lightingMode === 'chandelier' ? 'bg-[#D4AF37] text-black font-bold' : 'text-stone-400'
                  }`}
                >
                  Chandelier
                </button>
              </div>
            )}
          </div>

          {/* Main Display Frame */}
          <div className="relative w-full aspect-[4/5] rounded overflow-hidden shadow-inner border border-white/10 bg-black">
            <AnimatePresence mode="wait">
              {viewMode === 'drape' && (
                <motion.img
                  key={`drape-${activeColorway.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={activeColorway.image}
                  alt={`${masterSaree.name} - ${activeColorway.name}`}
                  className="w-full h-full object-cover"
                />
              )}

              {viewMode === 'macro' && (
                <motion.img
                  key={`macro-${activeColorway.id}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  src={activeColorway.zariDetail}
                  alt="Kadwa Handloom Zari Macro Detail"
                  className="w-full h-full object-cover"
                />
              )}

              {viewMode === 'shimmer' && (
                <motion.div
                  key="shimmer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onMouseMove={handleMouseMove}
                  className="w-full h-full cursor-crosshair"
                >
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={750}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans font-semibold">
                Colorway 0{masterSaree.colorways.findIndex(c => c.id === activeColorway.id) + 1}
              </span>
              <span className="text-sm font-editorial font-bold">{activeColorway.name}</span>
            </div>

            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-right border border-[#D4AF37]/30 shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans">
                Tested Zari
              </span>
              <span className="text-xs font-sans font-bold text-white">{activeColorway.zariTone}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded text-white text-center text-xs font-sans flex items-center justify-between border border-white/10">
              <span className="text-stone-300">{activeColorway.tagline}</span>
              <span className="text-[#D4AF37] font-semibold">144 Loom Hours</span>
            </div>
          </div>

          {/* Clean Metric Pills under Frame */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-white/10 text-stone-300">
              <span>🧵</span> 2,400 Silk Warp / meter
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-white/10 text-stone-300">
              <span>🪙</span> 98.2% Tested Silver Zari
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-white/10 text-stone-300">
              <span>🥻</span> 0.8m Brocade Blouse Included
            </span>
          </div>
        </motion.div>

        {/* Right Column: Acquisition Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-[#121212] p-6 sm:p-8 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-sans font-bold">
                  Masterpiece No. 01
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1 rounded-full font-sans font-bold border border-[#D4AF37]/30">
                  Only {activeColorway.stockCount} Available
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
                {masterSaree.name}
              </h2>
              <p className="text-xs font-editorial italic text-stone-400 mt-0.5">
                {activeColorway.name} • {activeColorway.sanskrit}
              </p>
            </div>

            {/* Price Banner */}
            <div className="p-4 bg-[#0A0A0A] rounded border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 block font-sans">
                  Acquisition Privilege
                </span>
                <span className="text-2xl font-editorial font-bold text-[#FBF9F5]">
                  {formatPrice(masterSaree.basePriceINR, currency)}
                </span>
              </div>
              <div className="text-right text-[11px] text-emerald-400 font-sans">
                <span className="block font-semibold">✓ Free Insured Courier</span>
                <span className="text-stone-400">Includes Muslin Wrap</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleAcquire}
                className={`w-full py-3.5 text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl flex items-center justify-center gap-2 btn-shimmer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#C5A059] text-black'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? '✓ Placed in Bag' : 'Acquire Masterpiece'}</span>
              </button>

              <button
                onClick={() => onAddToTrousseau(activeColorway)}
                className="w-full py-3 bg-transparent text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-white/[0.04] transition-all flex items-center justify-center gap-2"
              >
                <span>Curate in 3-Piece Trunk (15% Off)</span>
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full py-3 bg-[#25D366]/10 text-emerald-300 border border-[#25D366]/40 text-[10px] uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Video Drape Consultation</span>
              </button>
            </div>

            {/* Expandable Accordion for Specs with AnimatePresence */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setSpecsAccordionOpen(!specsAccordionOpen)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-sans font-bold text-[#D4AF37] py-2"
              >
                <span>Detailed Weave & Blouse Specifications</span>
                {specsAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {specsAccordionOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2 text-xs font-sans text-stone-300 bg-[#0A0A0A] p-4 rounded border border-white/10">
                      {masterSaree.specs.map((s, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-stone-400">{s.label}</span>
                          <span className="font-semibold text-stone-200">{s.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Blouse Fabric</span>
                        <span className="font-semibold text-[#D4AF37]">{activeColorway.blousePiece}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real Brides Customer Lookbook */}
      <section className="pt-24 border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
            ⚜ Real Dynastic Weddings
          </span>
          <h2 className="text-2xl sm:text-4xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
            Patrons in Kashika Silk
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -6 }}
            className="group rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-white/10 bg-[#121212]"
          >
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.bridalEditorial}
                alt="Sindoor Crimson Bride"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#FBF9F5]">Radhika Singhal</p>
              <p className="text-xs text-stone-400 font-sans">Sindoor Crimson • Udaipur Palace Wedding</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="group rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-white/10 bg-[#121212]"
          >
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.jewelryGold}
                alt="Ganga-Jamuna Zari Pallu"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#FBF9F5]">Kavita Verma</p>
              <p className="text-xs text-stone-400 font-sans">Neelambari Indigo • Mayfair Reception, London</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="group rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-white/10 bg-[#121212]"
          >
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.heroBanner}
                alt="Temple Wedding Bride"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#FBF9F5]">Ananya Hegde</p>
              <p className="text-xs text-stone-400 font-sans">Mor-Pankhi Emerald • Bangalore Temple Vows</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
