import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ShieldCheck, Check, ShoppingBag, Eye, Sun, Flame, Gem, Info, ArrowRight } from 'lucide-react';
import { MASTER_DESIGNS } from '../data/sarees';
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

  const [lightingMode, setLightingMode] = useState('candlelight'); // sunlight, candlelight, chandelier
  const [lightX, setLightX] = useState(0.5);
  const [lightY, setLightY] = useState(0.5);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // specs, blouse, care

  const canvasRef = useRef(null);

  // Real-time canvas render simulating the zari specular sheen on the master saree
  useEffect(() => {
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

    // Dynamic Lighting Sheen overlay tracking cursor
    const lx = lightX * width;
    const ly = lightY * height;
    const rad = width * 0.7;

    const sheenGrad = ctx.createRadialGradient(lx, ly, 10, lx, ly, rad);
    const sheenColor = activeColorway.zariTone === 'silver' ? '255, 255, 255' : '235, 195, 90';
    const sheenIntensity = lightingMode === 'chandelier' ? 0.35 : lightingMode === 'candlelight' ? 0.25 : 0.18;

    sheenGrad.addColorStop(0, `rgba(${sheenColor}, ${sheenIntensity})`);
    sheenGrad.addColorStop(0.4, `rgba(${sheenColor}, ${sheenIntensity * 0.4})`);
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Render Master Kadwa Jangla Motifs (Peacocks, Vines & Gold Floral Corbels)
    ctx.strokeStyle = activeColorway.zariColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = lightingMode === 'chandelier' ? 0.65 : 0.5;

    // Intricate Jaal Lattice lines
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

    // Heavy Royal Zari Pallu Border at Bottom
    const palluHeight = 110;
    const palluGrad = ctx.createLinearGradient(0, height - palluHeight, 0, height);
    palluGrad.addColorStop(0, activeColorway.zariColor);
    palluGrad.addColorStop(0.5, '#FFFFFF');
    palluGrad.addColorStop(1, activeColorway.zariColor);

    ctx.globalAlpha = 0.85;
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

    // Top Temple Border
    ctx.fillStyle = activeColorway.zariColor;
    ctx.globalAlpha = 0.75;
    ctx.fillRect(0, 0, width, 22);

    ctx.globalAlpha = 1.0;
  }, [activeColorway, lightingMode, lightX, lightY]);

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
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWhatsAppConsult = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Atelier. I am interested in acquiring the master design "${masterSaree.name}" in the "${activeColorway.name}" colorway (${formatPrice(masterSaree.basePriceINR, currency)}). Please connect me with a senior saree draper for high-definition video inspection.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Breadcrumb & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-2">
          <span>⚜</span> The Masterpiece Saree Collection <span>⚜</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight mb-3">
          The Rajkumari Mayil Jangla
        </h1>
        <p className="text-sm sm:text-base font-editorial italic text-[#44403C]">
          One supreme Kadwa naksha graph. Five royal heritage colorways dyed in pure Karnataka mulberry silk.
        </p>
      </div>

      {/* 5 Dynamic Colorway Pill Tabs */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap pb-4">
          {masterSaree.colorways.map((cw) => {
            const isSelected = cw.id === activeColorway.id;
            return (
              <button
                key={cw.id}
                onClick={() => onSelectColorway(cw.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all border ${
                  isSelected
                    ? 'bg-[#781224] text-[#FAF8F5] border-[#781224] shadow-md scale-105 font-bold'
                    : 'bg-white text-[#44403C] border-[#B8860B]/30 hover:border-[#781224]'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm"
                  style={{ backgroundColor: cw.hex }}
                />
                <span>{cw.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#FAF8F5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual-Column Atelier Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Saree Canvas & Lighting Simulator */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-sm">
          {/* Lighting Mode Switcher Bar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#B8860B]/20 text-xs font-sans">
            <span className="uppercase tracking-widest text-[#78716C] font-semibold flex items-center gap-1.5">
              <span>⚜</span>
              <span>Zari Specular Luster:</span>
            </span>

            <div className="flex items-center gap-1.5 bg-[#F4EFEA] p-1 rounded border border-[#B8860B]/20">
              <button
                onClick={() => setLightingMode('sunlight')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                  lightingMode === 'sunlight' ? 'bg-[#781224] text-white shadow-sm' : 'text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Daylight</span>
              </button>
              <button
                onClick={() => setLightingMode('candlelight')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                  lightingMode === 'candlelight' ? 'bg-[#781224] text-white shadow-sm' : 'text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>Diya Glow</span>
              </button>
              <button
                onClick={() => setLightingMode('chandelier')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                  lightingMode === 'chandelier' ? 'bg-[#781224] text-white shadow-sm' : 'text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <Gem className="w-3 h-3" />
                <span>Chandelier</span>
              </button>
            </div>
          </div>

          {/* Interactive Fabric Canvas */}
          <div
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden border border-[#B8860B]/40 shadow-inner cursor-crosshair bg-stone-900"
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />

            {/* Corner Luxury Overlay Badges */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#B8860B]/30 shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] block font-sans">Sanskrit Name</span>
              <span className="text-xs font-editorial font-bold text-[#781224]">{activeColorway.sanskrit}</span>
            </div>

            <div className="absolute top-4 right-4 bg-[#781224]/90 backdrop-blur-md px-3 py-1.5 rounded text-white text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/80 block font-sans">Tested Zari</span>
              <span className="text-xs font-sans font-bold text-[#FBF4DE]">{activeColorway.zariName}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded text-white text-center text-xs font-sans">
              <span>Hover cursor or drag touch across the saree to catch real-time zari reflections</span>
            </div>
          </div>

          {/* Saree Provenance Badges under Canvas */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-center text-xs font-sans">
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#B8860B]/20">
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">Artisan Time</span>
              <span className="font-semibold text-[#1C1917]">144 Handloom Hours</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#B8860B]/20">
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">Silk Purity</span>
              <span className="font-semibold text-[#1C1917]">100% Katan Mulberry</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#B8860B]/20">
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">Loom Technique</span>
              <span className="font-semibold text-[#1C1917]">Authentic Kadwa Weft</span>
            </div>
          </div>
        </div>

        {/* Right Column: Saree Details, Acquisition & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8A661C] font-sans font-semibold">
                Colorway: {activeColorway.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-[#781224]/10 text-[#781224] px-2.5 py-1 rounded font-sans font-semibold border border-[#781224]/20">
                Only {activeColorway.stockCount} Pieces Available
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-2">
              {masterSaree.name}
            </h2>

            <p className="text-sm font-editorial italic text-[#78716C] mb-4">
              {activeColorway.occasion}
            </p>

            {/* Price Box */}
            <div className="p-4 bg-[#F4EFEA] rounded border border-[#B8860B]/20 flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#78716C] block font-sans">
                  Acquisition Privilege
                </span>
                <span className="text-2xl font-editorial font-bold text-[#1C1917]">
                  {formatPrice(masterSaree.basePriceINR, currency)}
                </span>
              </div>
              <div className="text-right text-[11px] text-[#8A661C] font-sans">
                <span className="block font-semibold">Free Insured Global Courier</span>
                <span className="text-stone-500">Includes Muslin Preservation Wrap</span>
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
                <span>{addedAnimation ? 'Masterpiece Added to Silk Bag' : 'Acquire Masterpiece (Add to Bag)'}</span>
              </button>

              <button
                onClick={() => onAddToTrousseau(activeColorway)}
                className="w-full py-3.5 bg-transparent text-[#781224] border border-[#B8860B] text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-2"
              >
                <span>⚜ Place in Bridal Trousseau Trunk</span>
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full py-3 bg-[#25D366]/10 text-[#1E7E34] border border-[#25D366]/40 text-xs uppercase tracking-widest font-sans font-semibold rounded hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Enquire on WhatsApp with Master Draper</span>
              </button>
            </div>
          </div>

          {/* Tabbed Specifications Accordion */}
          <div className="bg-white p-6 rounded border border-[#B8860B]/30 shadow-sm">
            <div className="flex border-b border-[#B8860B]/20 mb-4 text-xs font-sans">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 px-3 uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  activeTab === 'specs' ? 'border-[#781224] text-[#781224]' : 'border-transparent text-[#78716C]'
                }`}
              >
                Handloom Specs
              </button>
              <button
                onClick={() => setActiveTab('blouse')}
                className={`pb-2.5 px-3 uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  activeTab === 'blouse' ? 'border-[#781224] text-[#781224]' : 'border-transparent text-[#78716C]'
                }`}
              >
                Blouse Piece
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 px-3 uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  activeTab === 'care' ? 'border-[#781224] text-[#781224]' : 'border-transparent text-[#78716C]'
                }`}
              >
                Preservation
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="space-y-3 text-xs font-sans">
                {masterSaree.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#78716C] uppercase tracking-wider">{s.label}</span>
                    <span className="font-semibold text-[#1C1917]">{s.value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5">
                  <span className="text-[#78716C] uppercase tracking-wider">Zari Alloy Composition</span>
                  <span className="font-semibold text-[#781224]">{masterSaree.zariPurity}</span>
                </div>
              </div>
            )}

            {activeTab === 'blouse' && (
              <div className="text-xs font-sans space-y-3">
                <p className="text-[#44403C] leading-relaxed">
                  Every Kashika saree includes an unstitched 0.8-meter matching brocade fabric piece crafted specifically for custom couture tailoring.
                </p>
                <div className="p-3 bg-[#F4EFEA] rounded border border-[#B8860B]/20">
                  <span className="font-bold text-[#1C1917] block mb-1">Blouse Styling Detail:</span>
                  <p className="text-[#78716C] italic">{activeColorway.blousePiece}</p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="text-xs font-sans space-y-2 text-[#44403C]">
                <p>• Store only in pure, unbleached cotton or muslin fabric wrap (provided complimentary).</p>
                <p>• Dry clean exclusively at specialists familiar with pure silver electroplated zari.</p>
                <p>• Refold along fresh creases every six months to prevent micro-crease thread fatigue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
