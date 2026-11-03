import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  Check,
  ChevronRight,
  ZoomIn,
  Sparkles,
  MessageCircle,
  Clock,
  Layers,
  MapPin,
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import ProgressiveImage from './ProgressiveImage';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  currency,
  onNavigate,
  onSelectColorway,
}) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'purity' | 'shipping'
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Zoom Loupe State
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovering: false });
  const imageContainerRef = useRef(null);

  if (!product) return null;

  const currentImage = product.thumbnails?.[activeThumb] || product.image;

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
        location: pincode.startsWith('56') ? 'Bengaluru & South Hub' : pincode.startsWith('11') ? 'Delhi NCR Express Hub' : 'Pan-India BlueDart Apex',
      });
    }, 450);
  };

  const handleAddProductToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(
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

  const handleWhatsAppDrape = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I am inspecting the "${product.name}" (${product.category}) on your website. I would like to schedule an immediate 1-on-1 HD Video Draping session to review the Kadwa zari and silk luster live on camera.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Main Rich Inspection Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-[#140307] text-[#FBF9F5] rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col lg:flex-row my-auto font-sans"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-stone-300 hover:text-white border border-white/10 transition-colors shadow-lg"
          aria-label="Close Product Inspection"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ============================================================== */}
        {/* LEFT COLUMN: Zoomable Main Stage + 4-Thumbnail Gallery */}
        {/* ============================================================== */}
        <div className="lg:w-1/2 p-6 sm:p-8 bg-black/60 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            {/* Header Eyebrow on Stage */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#D4AF37] flex items-center gap-1.5">
                <span>⚜</span>
                <span>{product.category}</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                {product.badge || 'Muhurtham Heirloom'}
              </span>
            </div>

            {/* Interactive Zoom Stage */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-stone-900 shadow-2xl cursor-crosshair group"
            >
              <ProgressiveImage
                src={currentImage}
                alt={product.name}
                aspectRatio="aspect-[3/4]"
                priority={true}
                className="w-full h-full"
              />

              {/* Cursor-follow Magnified Macro Loupe (Desktop) */}
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
                  {/* Subtle golden viewfinder border */}
                  <div className="absolute inset-0 border-2 border-[#D4AF37]/40 pointer-events-none" />
                </div>
              )}

              {/* Bottom Stage Hint */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-sm border border-white/10 text-[9px] uppercase tracking-wider text-stone-300 flex items-center gap-1 pointer-events-none">
                <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Hover to Magnify 2.5x</span>
              </div>
            </div>

            {/* 4-Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 pt-4">
              {(product.thumbnails || [product.image]).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeThumb === idx
                      ? 'border-[#D4AF37] scale-102 shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={thumb} alt="Weave Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Master Weaver Stamp */}
          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] text-stone-400">
            <span>Provenance: Shivala Ghat, Varanasi</span>
            <span className="text-[#D4AF37] font-semibold">144 Loom Hours</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Technical Specs, Hallmark & Delivery Tabs */}
        {/* ============================================================== */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div className="space-y-5">
            {/* Title & Price Banner */}
            <div className="space-y-1.5 pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-bold block">
                Varanasi Royal Guild
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-xs font-editorial italic text-stone-400">
                Sanskrit: <span className="text-[#D4AF37]">{product.sanskrit}</span>
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                  {formatPrice(product.priceINR, currency)}
                </span>
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  ✓ Insured Global Courier
                </span>
              </div>
            </div>

            {/* 3 Interactive Exploration Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-sans">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all ${
                  activeTab === 'specs'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Weave Specs
              </button>
              <button
                onClick={() => setActiveTab('purity')}
                className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all ${
                  activeTab === 'purity'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Zari & Hallmark
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all ${
                  activeTab === 'shipping'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Delivery Check
              </button>
            </div>

            {/* Tab 1: Weave Specs */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2.5 text-xs font-sans"
              >
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Fabric Composition</span>
                  <span className="font-semibold text-stone-200">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Zari Metallurgy</span>
                  <span className="font-semibold text-[#D4AF37]">{product.zari}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Loom Architecture</span>
                  <span className="font-semibold text-stone-200">{product.weave}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Dimensions</span>
                  <span className="font-semibold text-stone-200">5.5m Saree + 0.8m Brocade Blouse</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Reverse Side</span>
                  <span className="font-semibold text-emerald-400">Zero Cut-Work (Smooth Butter Kadwa)</span>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Hallmark & Purity */}
            {activeTab === 'purity' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-sans"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <div>
                    <strong className="text-white block">Silk Mark India Registry Certified</strong>
                    <span className="text-stone-400 text-[11px]">Central Silk Board, Ministry of Textiles, Govt. of India</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Silver Bullion Purity</span>
                    <span className="font-bold text-[#D4AF37]">98.24% Pure Silver Core</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Gold Plating Alloy</span>
                    <span className="font-bold text-white">24K Liquid Surya Gold (1.2µm)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Synthetic Lurex / Plastic</span>
                    <span className="font-bold text-emerald-400">0.00% (Guaranteed Pure Handloom)</span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 italic pt-1 border-t border-white/5">
                  Every saree is accompanied by a serialized hologram purity card and a physical weaver guild registry certificate.
                </p>
              </motion.div>
            )}

            {/* Tab 3: Delivery Estimator */}
            {activeTab === 'shipping' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 text-xs font-sans"
              >
                <p className="text-stone-300">
                  Enter your delivery postal / pincode to estimate dispatch & transit:
                </p>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 560001 or 110001"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-black/60 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-[10px] hover:bg-[#C5A059] transition-all"
                  >
                    {checkingPincode ? 'Checking...' : 'Check'}
                  </button>
                </form>

                {deliveryResult && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg space-y-1 text-emerald-300">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Delivery by {deliveryResult.dateString}</span>
                    </div>
                    <p className="text-[10px] text-stone-400">
                      Dispatched via Insured Express Courier ({deliveryResult.location}). Handled in temperature-controlled pure muslin wrap.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* ============================================================== */}
          {/* BOTTOM ACTIONS: Quantity, Add to Bag & Assisted WhatsApp Buy */}
          {/* ============================================================== */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            {/* Quantity Selector + Add to Bag Button */}
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-white/20 rounded-full px-3 py-2 bg-black/40 text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-stone-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-2 font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(3, quantity + 1))}
                  className="px-2 text-stone-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddProductToCart}
                className="flex-1 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold shadow-xl transition-all flex items-center justify-center gap-2 btn-shimmer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Silk Bag</span>
              </button>
            </div>

            {/* Assisted Video Drape Consultation Alternative */}
            <button
              onClick={handleWhatsAppDrape}
              className="w-full py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-emerald-300 text-[10px] uppercase tracking-widest font-sans font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Inspect on Live WhatsApp Video Drape</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
