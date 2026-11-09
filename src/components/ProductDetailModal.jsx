import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Award,
  Truck,
  Check,
  ChevronRight,
  ZoomIn,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Sun,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import ProgressiveImage from './ProgressiveImage';
import ThreeDrapeInspector from './ThreeDrapeInspector';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  currency,
  onNavigate,
  initialStageMode = '3d',
}) {
  const [stageMode, setStageMode] = useState(initialStageMode); // '3d' | 'zoom'
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'purity' | 'shipping'
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Zoom Loupe State
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovering: false });
  const imageContainerRef = useRef(null);

  const currentImage = product?.thumbnails?.[activeThumb] || product?.image;

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)), isHovering: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, isHovering: false }));
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 3) return;
    setCheckingPincode(true);

    setTimeout(() => {
      setCheckingPincode(false);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      setDeliveryResult({
        verified: true,
        dateString: deliveryDate.toLocaleDateString('en-IN', options),
        location: pincode.startsWith('56') ? 'Bengaluru Express Hub' : pincode.startsWith('11') ? 'Delhi NCR Hub' : 'Pan-India BlueDart Air Express',
      });
    }, 400);
  };

  const handleAddProductToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      onAddToCart && onAddToCart(
        {
          id: product.id,
          name: product.name,
          basePriceINR: product.priceINR,
        },
        {
          id: product.id,
          name: product.name,
          hex: product.hex,
        }
      );
    }
    onClose();
  };

  const handleInstantBuyNow = () => {
    if (!product) return;
    onAddToCart && onAddToCart(
      {
        id: product.id,
        name: product.name,
        basePriceINR: product.priceINR,
      },
      {
        id: product.id,
        name: product.name,
        hex: product.hex,
      }
    );
    if (onBuyNow) {
      onBuyNow(product, { id: product.id, name: product.name, hex: product.hex });
    }
    onClose();
  };

  const handleWhatsAppDrape = () => {
    if (!product) return;
    const msg = encodeURIComponent(
      `Hello Kashika Concierge. I am inspecting the "${product.name}" (${product.category}) on your website. I would like a live 1-on-1 daylight video preview to examine the Kadwa zari and silk luster on camera.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Main Inspection Modal Container: Warm Neutral Luxury */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-[#FAF7F2] text-[#1A1A1A] rounded-3xl overflow-hidden border border-stone-300 shadow-[0_30px_90px_rgba(0,0,0,0.45)] max-h-[92vh] flex flex-col lg:flex-row my-auto font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-300 shadow-md transition-all cursor-pointer"
              aria-label="Close Inspection"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ============================================================== */}
            {/* LEFT COLUMN: 360° 3D Drape Stage OR 2D Macro Loupe Stage */}
            {/* ============================================================== */}
            <div className="lg:w-1/2 p-5 sm:p-7 bg-white/70 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="space-y-3">
                {/* Stage Mode Switcher: 3D Turntable vs 2D Zoom */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs">
                    <button
                      onClick={() => setStageMode('3d')}
                      className={`px-3 py-1 rounded-lg font-semibold text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        stageMode === '3d'
                          ? 'bg-[#7A1C28] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                      <span>360° 3D Drape ✦</span>
                    </button>

                    <button
                      onClick={() => setStageMode('zoom')}
                      className={`px-3 py-1 rounded-lg font-semibold text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        stageMode === 'zoom'
                          ? 'bg-[#7A1C28] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                      <span>2D Macro Loupe</span>
                    </button>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] font-bold border border-[#7A1C28]/20">
                    {product.badge || 'Silk Mark India'}
                  </span>
                </div>

                {/* STAGE DISPLAY */}
                {stageMode === '3d' ? (
                  /* 360° Interactive 3D Drape & Zari Specular Inspector */
                  <ThreeDrapeInspector product={product} />
                ) : (
                  /* 2D Magnifying Loupe Stage */
                  <div className="space-y-3">
                    <div
                      ref={imageContainerRef}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md cursor-crosshair group"
                    >
                      <ProgressiveImage
                        src={currentImage}
                        alt={product.name}
                        aspectRatio="aspect-[3/4]"
                        priority={true}
                        className="w-full h-full"
                      />

                      {/* Cursor Magnified Loupe */}
                      {zoomPos.isHovering && (
                        <div
                          className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-200"
                          style={{
                            backgroundImage: `url(${currentImage})`,
                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                            backgroundSize: '260%',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          <div className="absolute inset-0 border-2 border-[#7A1C28]/40 pointer-events-none" />
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/75 backdrop-blur-sm text-[9px] uppercase tracking-wider text-white flex items-center gap-1 pointer-events-none">
                        <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                        <span>Hover to Magnify 2.5x</span>
                      </div>
                    </div>

                    {/* 4-Thumbnail Strip */}
                    <div className="grid grid-cols-4 gap-2">
                      {(product.thumbnails || [product.image]).map((thumb, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveThumb(idx)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeThumb === idx
                              ? 'border-[#7A1C28] shadow-sm'
                              : 'border-stone-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={thumb} alt="Thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Master Weaver Stamp */}
              <div className="pt-3 border-t border-stone-200 mt-3 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                <span>Varanasi Pit-Loom Guild • Est. 1948</span>
                <span className="text-[#7A1C28] font-bold">144 Loom Hours</span>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: Technical Specs, Hallmark & Direct Checkout */}
            {/* ============================================================== */}
            <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-5">
                {/* Title & Price Banner */}
                <div className="space-y-1.5 pb-4 border-b border-stone-200">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1C28] font-bold block">
                    Authentic Banarasi Handloom
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-950 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-xs font-editorial italic text-stone-600">
                    Sanskrit: <span className="text-[#7A1C28] font-medium">{product.sanskrit || 'राजकुमारी मयूर जांगल'}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl sm:text-3xl font-editorial font-bold text-stone-950">
                      {formatPrice(product.priceINR, currency)}
                    </span>
                    <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Free Insured Courier</span>
                    </span>
                  </div>
                </div>

                {/* 3 Interactive Exploration Tabs */}
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-sans">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === 'specs'
                        ? 'bg-[#7A1C28] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    }`}
                  >
                    Weave Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('purity')}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === 'purity'
                        ? 'bg-[#7A1C28] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    }`}
                  >
                    Zari &amp; Hallmark
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === 'shipping'
                        ? 'bg-[#7A1C28] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    }`}
                  >
                    Delivery Check
                  </button>
                </div>

                {/* Tab 1: Weave Specs */}
                {activeTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-xs font-sans"
                  >
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="text-stone-500">Fabric Composition</span>
                      <span className="font-semibold text-stone-900">{product.fabric}</span>
                    </div>
                    {product.weightGrams && (
                      <div className="flex justify-between py-1.5 border-b border-stone-100">
                        <span className="text-stone-500">Total Fabric Weight</span>
                        <span className="font-semibold text-stone-900">{product.weightGrams} grams pure silk</span>
                      </div>
                    )}
                    {product.occasion && (
                      <div className="flex justify-between py-1.5 border-b border-stone-100">
                        <span className="text-stone-500">Recommended Occasion</span>
                        <span className="font-semibold text-[#7A1C28]">{product.occasion}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="text-stone-500">Zari Purity Certificate</span>
                      <span className="font-semibold text-[#8B6B1B]">{product.zari}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="text-stone-500">Dimensions</span>
                      <span className="font-semibold text-stone-900">{product.dimensions || '5.5m Saree + 0.8m Blouse (45" Width)'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="text-stone-500">Loom Architecture</span>
                      <span className="font-semibold text-stone-900">{product.weave}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="text-stone-500">Reverse Side</span>
                      <span className="font-semibold text-emerald-700">Zero Cut-Work (Interlocked Kadwa)</span>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Hallmark & Purity */}
                {activeTab === 'purity' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 p-4 rounded-xl bg-white border border-stone-200 text-xs font-sans shadow-xs"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                      <ShieldCheck className="w-5 h-5 text-[#7A1C28] shrink-0" />
                      <div>
                        <strong className="text-stone-900 block font-semibold text-xs">Silk Mark India Registry Certified</strong>
                        <span className="text-stone-500 text-[10px]">Ministry of Textiles, Govt. of India (Registry: SMI-VAR-1948)</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Silver Bullion Purity</span>
                        <span className="font-bold text-[#8B6B1B]">98.24% Pure Tested Silver</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Gold Plating Thickness</span>
                        <span className="font-bold text-stone-900">24K Fine Gold Electro-Gilded (1.2µm)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Synthetic Lurex / Copper</span>
                        <span className="font-bold text-emerald-700">0.00% (Guaranteed Pure Craft)</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-stone-500 italic pt-1 border-t border-stone-100">
                      Includes official holographic authenticity card and serialized lab spectrometer test report in every parcel.
                    </p>
                  </motion.div>
                )}

                {/* Tab 3: Delivery Estimator */}
                {activeTab === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-xs font-sans"
                  >
                    <p className="text-stone-600">
                      Enter your delivery postal pincode to calculate transit time:
                    </p>

                    <form onSubmit={handleCheckPincode} className="flex gap-2">
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 560001 or 110001"
                        className="flex-1 px-4 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7A1C28]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#7A1C28] text-white font-bold uppercase tracking-wider text-[10px] hover:bg-[#8F1A2D] transition-all cursor-pointer"
                      >
                        {checkingPincode ? 'Checking...' : 'Check'}
                      </button>
                    </form>

                    {deliveryResult && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1 text-emerald-900">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Delivery by {deliveryResult.dateString}</span>
                        </div>
                        <p className="text-[10px] text-stone-600">
                          Tracked express air delivery ({deliveryResult.location}). Arrives in airtight keepsake box with pre-attached cotton fall &amp; pico.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* ============================================================== */}
              {/* BOTTOM ACTIONS: Direct Checkout (Add to Cart & Buy Now) */}
              {/* ============================================================== */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                {/* Quantity + Buttons Row */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  {/* Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-full px-3 py-2 bg-white text-xs w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-stone-500 hover:text-stone-900 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 font-bold text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(3, quantity + 1))}
                      className="px-2 text-stone-500 hover:text-stone-900 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddProductToCart}
                    className="flex-1 w-full py-3 rounded-xl border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/05 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Instant 1-Click Buy Now */}
                  <button
                    onClick={handleInstantBuyNow}
                    className="flex-1 w-full py-3 rounded-xl bg-[#7A1C28] hover:bg-[#8F1A2D] text-white text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Direct WhatsApp Consultation Alternative */}
                <button
                  onClick={handleWhatsAppDrape}
                  className="w-full py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/35 text-emerald-800 text-[11px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inspect on Live Daylight WhatsApp Video</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
