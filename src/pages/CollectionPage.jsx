import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ShieldCheck, Check, ShoppingBag, Eye, Sun, Flame, Gem, ArrowRight, MessageCircle, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

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

    // Dynamic Lighting Sheen
    const lx = lightX * width;
    const ly = lightY * height;
    const rad = width * 0.7;

    const sheenGrad = ctx.createRadialGradient(lx, ly, 10, lx, ly, rad);
    const sheenColor = activeColorway.zariTone.includes('Silver') ? '255, 255, 255' : '235, 195, 90';
    const sheenIntensity = lightingMode === 'chandelier' ? 0.38 : lightingMode === 'candlelight' ? 0.28 : 0.2;

    sheenGrad.addColorStop(0, `rgba(${sheenColor}, ${sheenIntensity})`);
    sheenGrad.addColorStop(0.4, `rgba(${sheenColor}, ${sheenIntensity * 0.4})`);
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Intricate Jaal Lattice lines
    ctx.strokeStyle = activeColorway.zariColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = lightingMode === 'chandelier' ? 0.7 : 0.55;

    const step = 45;
    for (let x = -height; x < width + height; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height, 0);
      ctx.stroke();
    }

    // Heavy Royal Zari Pallu Border
    const palluHeight = 110;
    const palluGrad = ctx.createLinearGradient(0, height - palluHeight, 0, height);
    palluGrad.addColorStop(0, activeColorway.zariColor);
    palluGrad.addColorStop(0.5, '#FFFFFF');
    palluGrad.addColorStop(1, activeColorway.zariColor);

    ctx.globalAlpha = 0.88;
    ctx.fillStyle = palluGrad;
    ctx.fillRect(0, height - palluHeight, width, palluHeight);

    // Pallu Motif Details
    ctx.fillStyle = activeColorway.hex;
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    for (let i = 25; i < width; i += 50) {
      ctx.fillText('⚜', i, height - 55);
      ctx.fillText('🦚', i, height - 20);
    }

    ctx.globalAlpha = 1.0;
  }, [viewMode, activeColorway, lightingMode, lightX, lightY]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setLightX(x);
    setLightY(y);
  };

  const handleAcquire = () => {
    onAddToCart(masterSaree, activeColorway);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const handleWhatsAppConsult = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Atelier. I am inspecting the master design "${masterSaree.name}" in the "${activeColorway.name}" colorway (${formatPrice(masterSaree.basePriceINR, currency)}). Please connect me with a senior saree draper for a high-definition video inspection.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> The Masterpiece Studio <span>⚜</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight">
          {masterSaree.name}
        </h1>
        <p className="text-sm font-editorial italic text-[#44403C] leading-relaxed">
          One supreme Kadwa naksha. Select any of the 5 heritage colorways to inspect the drape, zari alloy, and blouse piece.
        </p>
      </div>

      {/* 5 Visual Colorway Selector Cards */}
      <div className="mb-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {masterSaree.colorways.map((cw) => {
            const isSelected = cw.id === activeColorway.id;
            return (
              <button
                key={cw.id}
                onClick={() => onSelectColorway(cw.id)}
                className={`p-2 rounded border transition-all text-left flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#781224] text-white border-[#781224] shadow-md scale-102 font-semibold'
                    : 'bg-white text-[#1C1917] border-[#B8860B]/30 hover:border-[#781224]'
                }`}
              >
                <img
                  src={cw.image}
                  alt={cw.name}
                  className="w-10 h-10 rounded object-cover border border-black/10 shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="text-[11px] font-editorial font-bold block truncate leading-tight">
                    {cw.name}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider block truncate ${isSelected ? 'text-[#FBF4DE]' : 'text-[#8A661C]'}`}>
                    {cw.sanskrit}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual-Column Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
        {/* Left Column: Visual Saree Showcase */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-md">
          {/* View Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#B8860B]/20 text-xs font-sans">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('drape')}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'drape'
                    ? 'bg-[#781224] text-white shadow-sm'
                    : 'bg-[#F4EFEA] text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Model Drape</span>
              </button>

              <button
                onClick={() => setViewMode('shimmer')}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'shimmer'
                    ? 'bg-[#781224] text-white shadow-sm'
                    : 'bg-[#F4EFEA] text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zari Shimmer Physics</span>
              </button>

              <button
                onClick={() => setViewMode('macro')}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'macro'
                    ? 'bg-[#781224] text-white shadow-sm'
                    : 'bg-[#F4EFEA] text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Zari Macro</span>
              </button>
            </div>

            {/* Lighting Mode (Only in Shimmer view) */}
            {viewMode === 'shimmer' && (
              <div className="flex items-center gap-1 bg-[#F4EFEA] p-1 rounded border border-[#B8860B]/20">
                <button
                  onClick={() => setLightingMode('sunlight')}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                    lightingMode === 'sunlight' ? 'bg-[#781224] text-white' : 'text-[#44403C]'
                  }`}
                >
                  Daylight
                </button>
                <button
                  onClick={() => setLightingMode('candlelight')}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                    lightingMode === 'candlelight' ? 'bg-[#781224] text-white' : 'text-[#44403C]'
                  }`}
                >
                  Diya
                </button>
                <button
                  onClick={() => setLightingMode('chandelier')}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                    lightingMode === 'chandelier' ? 'bg-[#781224] text-white' : 'text-[#44403C]'
                  }`}
                >
                  Chandelier
                </button>
              </div>
            )}
          </div>

          {/* Main Display Frame */}
          <div className="relative w-full aspect-[4/5] rounded overflow-hidden shadow-inner border border-[#B8860B]/30 bg-stone-900">
            {viewMode === 'drape' && (
              <img
                src={activeColorway.image}
                alt={`${masterSaree.name} - ${activeColorway.name}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            )}

            {viewMode === 'macro' && (
              <img
                src={activeColorway.zariDetail}
                alt="Kadwa Handloom Zari Macro Detail"
                className="w-full h-full object-cover scale-110 transition-transform duration-700"
              />
            )}

            {viewMode === 'shimmer' && (
              <div onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Floating Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans font-semibold">
                Colorway 0{masterSaree.colorways.findIndex(c => c.id === activeColorway.id) + 1}
              </span>
              <span className="text-sm font-editorial font-bold">{activeColorway.name}</span>
            </div>

            <div className="absolute top-4 right-4 bg-[#781224]/90 backdrop-blur-md px-3 py-1.5 rounded text-white text-right shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#FBF4DE] block font-sans">
                Tested Zari
              </span>
              <span className="text-xs font-sans font-bold text-white">{activeColorway.zariTone}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded text-white text-center text-xs font-sans flex items-center justify-between">
              <span>{activeColorway.tagline}</span>
              <span className="text-[#D4AF37] font-semibold">144 Loom Hours</span>
            </div>
          </div>

          {/* Clean Metric Pills under Frame */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#B8860B]/20 text-[#1C1917]">
              <span>🪡</span> 2,400 Silk Warp / meter
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#B8860B]/20 text-[#1C1917]">
              <span>🪙</span> 98.2% Tested Silver Zari
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#B8860B]/20 text-[#1C1917]">
              <span>👔</span> 0.8m Brocade Blouse Included
            </span>
          </div>
        </div>

        {/* Right Column: Acquisition Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A661C] font-sans font-bold">
                  Masterpiece No. 01
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-[#781224]/10 text-[#781224] px-2.5 py-1 rounded font-sans font-bold border border-[#781224]/20">
                  Only {activeColorway.stockCount} Available
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917]">
                {masterSaree.name}
              </h2>
              <p className="text-xs font-editorial italic text-[#781224] mt-0.5">
                {activeColorway.name} • {activeColorway.sanskrit}
              </p>
            </div>

            {/* Price Banner */}
            <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#78716C] block font-sans">
                  Acquisition Privilege
                </span>
                <span className="text-2xl font-editorial font-bold text-[#1C1917]">
                  {formatPrice(masterSaree.basePriceINR, currency)}
                </span>
              </div>
              <div className="text-right text-[11px] text-emerald-800 font-sans">
                <span className="block font-semibold">✓ Free Insured Courier</span>
                <span className="text-stone-500">Includes Muslin Wrap</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAcquire}
                className={`w-full py-4 text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded transition-all shadow-md flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? 'bg-emerald-800 text-white'
                    : 'bg-[#781224] text-[#FAF8F5] hover:bg-[#580B17]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? '✓ Masterpiece Placed in Bag' : 'Acquire Masterpiece (Add to Bag)'}</span>
              </button>

              <button
                onClick={() => onAddToTrousseau(activeColorway)}
                className="w-full py-3.5 bg-transparent text-[#781224] border border-[#B8860B] text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-2"
              >
                <span>⚜ Curate in 3-Piece Bridal Trunk (15% Off)</span>
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full py-3 bg-[#25D366]/10 text-[#1E7E34] border border-[#25D366]/40 text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>VIP Video Consultation on WhatsApp</span>
              </button>
            </div>

            {/* Expandable Accordion for Specs */}
            <div className="pt-2 border-t border-[#B8860B]/20">
              <button
                onClick={() => setSpecsAccordionOpen(!specsAccordionOpen)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-sans font-bold text-[#8A661C] py-2"
              >
                <span>Detailed Weave & Blouse Specifications</span>
                {specsAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {specsAccordionOpen && (
                <div className="mt-3 space-y-2 text-xs font-sans text-[#44403C] animate-fadeIn">
                  {masterSaree.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-[#78716C]">{s.label}</span>
                      <span className="font-semibold text-[#1C1917]">{s.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-[#78716C]">Blouse Fabric</span>
                    <span className="font-semibold text-[#781224]">{activeColorway.blousePiece}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Real Brides Customer Lookbook */}
      <section className="pt-24 border-t border-[#B8860B]/20">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold block">
            ⚜ Real Dynastic Weddings
          </span>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#1C1917]">
            Patrons in The Rajkumari Mayil Jangla
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="group rounded overflow-hidden shadow border border-[#B8860B]/20 bg-white">
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.bridalEditorial}
                alt="Sindoor Crimson Bride"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#1C1917]">Radhika Singhal</p>
              <p className="text-xs text-[#78716C] font-sans">Sindoor Crimson • Udaipur Palace Wedding</p>
            </div>
          </div>

          <div className="group rounded overflow-hidden shadow border border-[#B8860B]/20 bg-white">
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.jewelryGold}
                alt="Ganga-Jamuna Zari Pallu"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#1C1917]">Kavita Verma</p>
              <p className="text-xs text-[#78716C] font-sans">Neelambari Indigo • Mayfair Reception, London</p>
            </div>
          </div>

          <div className="group rounded overflow-hidden shadow border border-[#B8860B]/20 bg-white">
            <div className="h-72 overflow-hidden">
              <img
                src={BRAND_ASSETS.heroBanner}
                alt="Temple Wedding Bride"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="text-base font-editorial font-bold text-[#1C1917]">Ananya Hegde</p>
              <p className="text-xs text-[#78716C] font-sans">Mor-Pankhi Emerald • Bangalore Temple Vows</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
