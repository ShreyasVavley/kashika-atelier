import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  X,
  Video,
  ShieldCheck,
  Sparkles,
  ZoomIn,
  Check,
  ChevronRight,
  MessageCircle,
  Heart,
  ShoppingBag,
  Eye,
  SlidersHorizontal,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS, CATALOG_PRODUCTS } from '../data/sarees';
import { formatPrice } from '../utils/currency';

export default function AtelierPage({
  onNavigate,
  onSelectColorway,
  onAddToCart,
  currency,
  wishlist = [],
  onToggleWishlist,
}) {
  const masterSaree = MASTER_DESIGNS[0];
  const [expandedLookbookIndex, setExpandedLookbookIndex] = useState(0);

  // Catalog Filter State (Fresh Weaves, Timeless Grace)
  const [selectedCategory, setSelectedCategory] = useState('All Sarees');

  // Quick View / Detail Modal State (Matching sec_30.jpg from video)
  const [inspectModalProduct, setInspectModalProduct] = useState(null);
  const [modalActiveThumb, setModalActiveThumb] = useState(0);

  // Contact Form State (We'd Love to Hear From You - sec_09.jpg)
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Categories
  const categories = ['All Sarees', 'Banarasi Katan', 'Royal Kadwa', 'Organza Silk', 'Bridal Trousseau'];

  const filteredProducts = selectedCategory === 'All Sarees'
    ? CATALOG_PRODUCTS
    : CATALOG_PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleWishlist = (id) => {
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. Inquiring from website:%0A- Name: ${contactName}%0A- Phone: ${contactPhone}%0A- Message: ${contactMessage}`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5] font-sans min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: Exactly matching monitor_hero.jpg from video */}
      {/* ============================================================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D060F] via-[#1A0308] to-[#0D0104] pt-24 pb-16">
        {/* Subtle Decorative Arch / Jali Motif on Left */}
        <div className="absolute left-0 top-0 bottom-0 w-72 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Left-Aligned Editorial Text matching video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-8 text-left pt-6 sm:pt-0"
          >
            {/* Eyebrow */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#D4AF37] font-royal font-semibold flex items-center gap-2">
              <span className="text-sm">⚜</span>
              <span>SAREES WOVEN WITH</span>
            </p>

            {/* Massive Display Title with EXACT sweeping flourish underline from video */}
            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-editorial font-normal tracking-[0.08em] sm:tracking-[0.12em] uppercase text-[#FBF9F5] leading-none drop-shadow-2xl">
                CULTURE
              </h1>
              {/* Custom calligraphic underline bowl flourish curve matching video */}
              <svg
                className="w-full h-8 sm:h-10 text-[#D4AF37] -mt-2 sm:-mt-3"
                viewBox="0 0 340 32"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 12 12 C 70 28, 170 32, 275 14 C 300 9, 320 8, 328 16"
                  stroke="#D4AF37"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-editorial italic text-stone-200 tracking-wide font-normal max-w-lg">
              Heirloom Drapes for Modern Stories
            </p>

            {/* CTA Pill Button (Light/Ivory Pill matching video screenshot) */}
            <div className="pt-2">
              <a
                href="#fresh-weaves"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#FAF7F2] hover:bg-[#D4AF37] text-[#1A0308] hover:text-black font-sans text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-2xl hover:scale-105 btn-shimmer"
              >
                <span>DISCOVER NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3 Metric Features in clean horizontal row with thin dividers matching video */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 flex items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-300">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✦</span>
                <span>FINEST FABRICS</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✦</span>
                <span>AUTHENTIC WEAVE</span>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[#D4AF37]">✦</span>
                <span>PAN INDIA SHIPPING</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fashion Model Drape matching video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              <img
                src={BRAND_ASSETS.heroBanner}
                alt="Imperial Indian Bridal Drape - House of Kashika"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 filter brightness-95"
              />
              {/* Subtle ambient lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Monogram Badge on Drape */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-semibold">
                Banarasi Katan Pure Silk
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans">
                    The Rajkumari Collection
                  </span>
                  <span className="text-sm font-editorial text-white">
                    Pure Gold Kadwa Saree • 144 Loom Hours
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-4 py-2 rounded-full bg-[#D4AF37] text-black text-[10px] uppercase tracking-wider font-sans font-bold hover:bg-[#C5A059] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE 5-COLUMN EXPANDING LOOKBOOK: matching sec_6.jpg from video */}
      {/* ============================================================== */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] border-y border-[0.5px] border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10 text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
            The Dynastic Lookbook
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
            Five Sacred Weaves. One Imperial Heritage.
          </h2>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
            Hover any column to preview the weave and explore pure zari shades.
          </p>
        </div>

        {/* 5 Vertical Expanding Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row h-[600px] sm:h-[660px] w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-black shadow-2xl">
            {masterSaree.colorways.map((cw, idx) => {
              const isExpanded = expandedLookbookIndex === idx;
              return (
                <div
                  key={cw.id}
                  onMouseEnter={() => setExpandedLookbookIndex(idx)}
                  onClick={() => setExpandedLookbookIndex(idx)}
                  className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[0.5px] border-white/10 ${
                    isExpanded ? 'flex-[3.5] md:flex-[3.5]' : 'flex-1 md:flex-1'
                  }`}
                >
                  <img
                    src={cw.image}
                    alt={cw.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isExpanded
                        ? 'filter brightness-[0.92] contrast-[1.08] scale-105'
                        : 'filter brightness-[0.45] contrast-[1.0] scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35 pointer-events-none" />

                  {/* Collapsed Spine Typography */}
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

                  {/* Expanded Content Overlay */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between text-white pointer-events-none"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30">
                          Colorway 0{idx + 1} • {cw.zariTone}
                        </span>
                        <span
                          className="w-4 h-4 rounded-full border border-white/50 shadow-md ring-2 ring-[#D4AF37]"
                          style={{ backgroundColor: cw.hex }}
                        />
                      </div>

                      <div className="space-y-3 max-w-md pointer-events-auto">
                        <div className="space-y-1">
                          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] block font-sans font-semibold">
                            {cw.occasion}
                          </span>
                          <h3 className="text-2xl sm:text-4xl font-editorial font-normal tracking-wide text-[#FBF9F5]">
                            {cw.name}
                          </h3>
                          <p className="text-xs font-editorial italic text-stone-300">
                            {cw.sanskrit} • {cw.tagline}
                          </p>
                        </div>

                        {/* Minimal Spec Chips instead of long sentences */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-wider text-stone-200 font-sans">
                            144 Loom Hours
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-wider text-stone-200 font-sans">
                            98.2% Silver Zari
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-wider text-stone-200 font-sans">
                            Silk Mark
                          </span>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                          <button
                            onClick={() => {
                              onSelectColorway(cw.id);
                              onNavigate('collection');
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.22em] font-sans font-bold transition-all shadow-xl flex items-center gap-1.5 btn-shimmer"
                          >
                            <span>Explore Colorway</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. ANCIENT CRAFT, MODERN SOUL: matching sec_05s.jpg from video */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 bg-[#FAF7F2] text-[#1C1917] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Stacked Editorial Text + Arched Burgundy Medallion from video */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
                Heritage Lineage
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-[#1C1917] leading-[1.08] tracking-tight">
                ANCIENT<br />
                CRAFT,<br />
                MODERN<br />
                SOUL
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-editorial italic text-stone-600 max-w-xs">
              76 years of pit loom mastery. Woven for dynasties.
            </p>

            {/* Arched Burgundy Medallion from sec_05s.jpg */}
            <div className="relative w-48 h-56 rounded-t-full bg-[#6A1424] text-white p-6 flex flex-col justify-between overflow-hidden shadow-xl border border-[#D4AF37]/40">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,white_0%,transparent_80%)]" />
              <div className="text-center pt-2">
                <span className="text-xl text-[#D4AF37]">⚜</span>
              </div>
              <div className="text-center space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block font-sans font-bold">
                  PIT LOOM ARCHIVE
                </span>
                <span className="text-xs font-editorial tracking-wider">
                  Shivala Ghat, Varanasi
                </span>
              </div>
            </div>
          </div>

          {/* Right: 4 Horizontal Craft Cards matching video */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5 hover:shadow-md transition-shadow">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#881326] block">
                01 • Silk Warp
              </span>
              <h3 className="text-base font-editorial font-bold text-[#1C1917]">
                Grade-A Mulberry Silk
              </h3>
              <p className="text-xs font-sans text-stone-500">
                Hand-reeled Sidlaghatta warp. Butter-smooth drape with unbroken strength.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5 hover:shadow-md transition-shadow">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#881326] block">
                02 • Zari Core
              </span>
              <h3 className="text-base font-editorial font-bold text-[#1C1917]">
                98.2% Tested Silver Zari
              </h3>
              <p className="text-xs font-sans text-stone-500">
                Silver bullion dipped in liquid 24K gold. 100-year heirloom longevity.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5 hover:shadow-md transition-shadow">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#881326] block">
                03 • Kadwa Technique
              </span>
              <h3 className="text-base font-editorial font-bold text-[#1C1917]">
                Hand-Locked Motifs
              </h3>
              <p className="text-xs font-sans text-stone-500">
                Zero loose reverse threads. Every motif individually locked by hand.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5 hover:shadow-md transition-shadow">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#881326] block">
                04 • Provenance
              </span>
              <h3 className="text-base font-editorial font-bold text-[#1C1917]">
                Silk Mark Certified
              </h3>
              <p className="text-xs font-sans text-stone-500">
                Government-verified pure silk mark and weaver registry QR seal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. FRESH WEAVES, TIMELESS GRACE: Catalog Grid matching sec_15 & sec_22 */}
      {/* ============================================================== */}
      <section id="fresh-weaves" className="py-24 md:py-32 bg-[#F7F4EB] text-[#1C1917] border-b border-stone-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header matching video */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
              Curated Collection • 2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight">
              Fresh Weaves, Timeless Grace
            </h2>
            <p className="text-xs sm:text-sm font-editorial italic text-stone-600">
              Handcrafted in Varanasi • Limited Seasonal Loom Runs
            </p>
          </div>

          {/* Filter Pills matching video */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] uppercase tracking-wider font-sans font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#6A1424] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:text-black border border-stone-200 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Saree Catalog Grid matching video screenshots */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* Corner Swatch Indicator Disc */}
                    <div
                      className="absolute top-3 left-3 w-5 h-5 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: product.hex }}
                      title={product.sanskrit}
                    />

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-[#881326] backdrop-blur-sm transition-colors shadow"
                      aria-label="Wishlist Saree"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#881326] text-[#881326]' : ''
                        }`}
                      />
                    </button>

                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-sans font-medium">
                      {product.badge}
                    </span>

                    {/* Quick View Hover Pill */}
                    <button
                      onClick={() => {
                        setInspectModalProduct(product);
                        setModalActiveThumb(0);
                      }}
                      className="absolute inset-x-4 bottom-4 py-2.5 rounded-full bg-white/95 text-stone-900 text-[10px] uppercase tracking-widest font-sans font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Weave</span>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#881326] font-sans font-bold block">
                      {product.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-editorial font-bold text-stone-900 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[11px] font-sans text-stone-500 line-clamp-1">
                      {product.fabric} • {product.weave}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-base sm:text-lg font-editorial font-bold text-stone-900">
                        {formatPrice(product.priceINR, currency)}
                      </span>
                      <button
                        onClick={() => {
                          setInspectModalProduct(product);
                          setModalActiveThumb(0);
                        }}
                        className="text-xs uppercase tracking-wider font-sans font-bold text-[#881326] hover:underline"
                      >
                        Inspect &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. ATELIER DESK: Direct Concierge & Inquiry */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] text-[#1C1917] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
                Atelier Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1C1917] leading-tight">
                Connect With Our Master Drapers
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-editorial italic text-stone-600">
              1-on-1 private video draping and bridal trousseau consultations.
            </p>

            <div className="space-y-2.5 pt-1 text-xs font-sans text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#881326] shrink-0 mt-0.5" />
                <span className="text-stone-700">Shivala Ghat, Varanasi • Lavelle Road, Bengaluru</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#881326] shrink-0" />
                <a
                  href="https://wa.me/917676721111"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#881326] hover:underline font-bold"
                >
                  +91 76767 21111 (WhatsApp Senior Draper)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl">
            {contactSent ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-3xl text-emerald-600">✓</span>
                <h3 className="text-xl font-editorial font-normal text-stone-900">
                  Inquiry Transmitted
                </h3>
                <p className="text-xs font-sans text-stone-600">
                  Our Senior Draper will connect with you directly via WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Lady / Mr. Name"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#881326]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 / +1 / +44 ..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#881326]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                    Your Saree / Bridal Inquiry
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Saree shade, weave, or wedding dates..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#881326]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#6A1424] hover:bg-[#881326] text-white text-[11px] uppercase tracking-[0.22em] font-sans font-bold shadow-lg transition-all flex items-center justify-center gap-2 btn-shimmer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp &rarr;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* QUICK VIEW / DETAIL MODAL: matching sec_30.jpg from video */}
      {/* ============================================================== */}
      <AnimatePresence>
        {inspectModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectModalProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 bg-white text-stone-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectModalProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Big Image + 4-Thumbnail Strip matching sec_30.jpg */}
              <div className="md:w-1/2 p-6 bg-stone-50 flex flex-col justify-between">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-200 shadow-inner">
                  <img
                    src={inspectModalProduct.thumbnails[modalActiveThumb] || inspectModalProduct.image}
                    alt={inspectModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-sans font-bold uppercase tracking-wider">
                    {inspectModalProduct.badge}
                  </span>
                </div>

                {/* 4-Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-2 pt-4">
                  {inspectModalProduct.thumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalActiveThumb(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        modalActiveThumb === idx
                          ? 'border-[#881326] scale-105 shadow'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Saree Details & Add to Bag */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#881326] font-sans font-bold block">
                      {inspectModalProduct.category}
                    </span>
                    <h3 className="text-2xl font-editorial font-bold text-stone-900">
                      {inspectModalProduct.name}
                    </h3>
                    <p className="text-xs font-editorial italic text-stone-500">
                      Sanskrit: {inspectModalProduct.sanskrit}
                    </p>
                  </div>

                  <div className="text-2xl font-editorial font-bold text-[#881326]">
                    {formatPrice(inspectModalProduct.priceINR, currency)}
                  </div>

                  <div className="space-y-2 text-xs font-sans border-y border-stone-200 py-4 divide-y divide-stone-100">
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Fabric Composition</span>
                      <span className="font-semibold text-stone-800">{inspectModalProduct.fabric}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Zari Alloy</span>
                      <span className="font-semibold text-stone-800">{inspectModalProduct.zari}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Weave Duration</span>
                      <span className="font-semibold text-stone-800">{inspectModalProduct.weave}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-sans font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Silk Mark India Authenticated & Verified</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3">
                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart(
                          {
                            id: inspectModalProduct.id,
                            name: inspectModalProduct.name,
                            basePriceINR: inspectModalProduct.priceINR,
                          },
                          {
                            id: inspectModalProduct.id,
                            name: inspectModalProduct.name,
                            hex: inspectModalProduct.hex,
                          }
                        );
                      }
                      setInspectModalProduct(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.22em] font-sans font-bold shadow-xl transition-all flex items-center justify-center gap-2 btn-shimmer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Silk Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      setInspectModalProduct(null);
                      onSelectColorway('sindoor-crimson');
                      onNavigate('collection');
                    }}
                    className="w-full py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect in 3D Light Studio &rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
