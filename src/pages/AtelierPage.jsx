import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Heart,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { MASTER_DESIGNS, BRAND_ASSETS, CATALOG_PRODUCTS } from '../data/sarees';
import { formatPrice } from '../utils/currency';
import ProgressiveImage from '../components/ProgressiveImage';
import ProductDetailModal from '../components/ProductDetailModal';

const COUNTRY_DIAL_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];

const COLOR_FILTERS = [
  { id: 'all', name: 'All', hex: null },
  { id: 'crimson', name: 'Crimson', hex: '#881326' },
  { id: 'indigo', name: 'Indigo', hex: '#0d1d36' },
  { id: 'emerald', name: 'Emerald', hex: '#082d20' },
  { id: 'saffron', name: 'Saffron', hex: '#a86a08' },
  { id: 'gulabi', name: 'Pink', hex: '#8f144e' },
];

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

  // Faceted Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedColorFilter, setSelectedColorFilter] = useState('all');

  // Detail Modal State
  const [inspectModalProduct, setInspectModalProduct] = useState(null);

  // Concierge Form State
  const [contactName, setContactName] = useState('');
  const [contactDialCode, setContactDialCode] = useState('+91');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  // Categories
  const categories = ['All', 'Banarasi Katan', 'Royal Kadwa', 'Organza Silk', 'Bridal Trousseau'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...CATALOG_PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedColorFilter !== 'all') {
      if (selectedColorFilter === 'crimson') {
        result = result.filter((p) => p.hex === '#881326');
      } else if (selectedColorFilter === 'indigo') {
        result = result.filter((p) => p.hex === '#0d1d36' || p.hex === '#141414');
      } else if (selectedColorFilter === 'emerald') {
        result = result.filter((p) => p.hex === '#082d20');
      } else if (selectedColorFilter === 'saffron') {
        result = result.filter((p) => p.hex === '#a86a08');
      } else if (selectedColorFilter === 'gulabi') {
        result = result.filter((p) => p.hex === '#8f144e');
      }
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'loom-desc') {
      result.sort((a, b) => b.name.length - a.name.length);
    }

    return result;
  }, [selectedCategory, selectedColorFilter, sortBy]);

  const toggleWishlist = (id) => {
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  const handleLookbookPrev = () => {
    setExpandedLookbookIndex((prev) =>
      prev === 0 ? masterSaree.colorways.length - 1 : prev - 1
    );
  };

  const handleLookbookNext = () => {
    setExpandedLookbookIndex((prev) =>
      prev === masterSaree.colorways.length - 1 ? 0 : prev + 1
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone || contactPhone.trim().length < 6) return;

    setContactLoading(true);

    setTimeout(() => {
      setContactLoading(false);
      setContactSent(true);

      const msg = encodeURIComponent(
        `Pranam Kashika Concierge:%0A- Name: ${contactName}%0A- Phone: ${contactDialCode} ${contactPhone}%0A- Inquiry: ${contactMessage || 'Bridal Saree Consultation'}`
      );
      window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
    }, 800);
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5] font-sans min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: monitor_hero.jpg & sec_3.jpg from video */}
      {/* ============================================================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D060F] via-[#1A0308] to-[#0D0104] pt-24 pb-16">
        <div className="absolute left-0 top-0 bottom-0 w-72 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Left-Aligned Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-7 text-left pt-6 sm:pt-0"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#D4AF37] font-semibold flex items-center gap-2">
              <span>⚜</span>
              <span>SAREES WOVEN WITH</span>
            </p>

            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-editorial font-normal tracking-[0.08em] uppercase text-[#FBF9F5] leading-none drop-shadow-2xl">
                CULTURE
              </h1>
              <svg
                className="w-full h-7 sm:h-9 text-[#D4AF37] -mt-2 sm:-mt-3"
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

            <p className="text-base sm:text-lg font-editorial italic text-stone-200 tracking-wide font-normal">
              Heirloom Drapes for Modern Stories
            </p>

            <div className="pt-2">
              <a
                href="#fresh-weaves"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#D4AF37] text-[#1A0308] hover:text-black font-sans text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-2xl hover:scale-105 btn-shimmer"
              >
                <span>DISCOVER NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-300">
              <span>FINEST FABRICS</span>
              <span className="text-white/20">|</span>
              <span>AUTHENTIC WEAVE</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline">PAN INDIA SHIPPING</span>
            </div>
          </motion.div>

          {/* Right Column: High-Fashion Model Drape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              <ProgressiveImage
                src={BRAND_ASSETS.heroBanner}
                alt="Imperial Indian Bridal Drape"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 filter brightness-95"
                aspectRatio="3/4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-semibold">
                Banarasi Katan
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans">
                    The Rajkumari Collection
                  </span>
                  <span className="text-xs font-editorial text-white">
                    Pure Gold Kadwa Saree
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-black text-[10px] uppercase tracking-wider font-sans font-bold hover:bg-[#C5A059] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE 5-COLUMN EXPANDING LOOKBOOK: sec_6.jpg from video */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] border-y border-[0.5px] border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center space-y-1">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold block">
            ⚜ Dynastic Lookbook ⚜
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-wide">
            The Five Shades
          </h2>

          {/* Indicator Dots & Mobile Nav */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={handleLookbookPrev}
              className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] text-stone-400 hover:text-black border border-white/10 transition-colors"
              aria-label="Previous Shade"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {masterSaree.colorways.map((cw, idx) => (
                <button
                  key={cw.id}
                  onClick={() => setExpandedLookbookIndex(idx)}
                  className={`transition-all rounded-full ${
                    expandedLookbookIndex === idx
                      ? 'w-6 h-1.5 bg-[#D4AF37]'
                      : 'w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500'
                  }`}
                  aria-label={`Go to ${cw.name}`}
                />
              ))}
            </div>

            <button
              onClick={handleLookbookNext}
              className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] text-stone-400 hover:text-black border border-white/10 transition-colors"
              aria-label="Next Shade"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Vertical Expanding Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row h-[560px] sm:h-[620px] w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-black shadow-2xl">
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

                  {/* Collapsed Spine */}
                  {!isExpanded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none">
                      <span className="text-[10px] font-sans font-bold text-[#D4AF37]">
                        0{idx + 1}
                      </span>
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
                        <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30">
                          {cw.zariTone}
                        </span>
                        <span
                          className="w-4 h-4 rounded-full border border-white/50 shadow-md ring-2 ring-[#D4AF37]"
                          style={{ backgroundColor: cw.hex }}
                        />
                      </div>

                      <div className="space-y-3 pointer-events-auto">
                        <h3 className="text-2xl sm:text-4xl font-editorial font-normal tracking-wide text-[#FBF9F5]">
                          {cw.name}
                        </h3>

                        <div>
                          <button
                            onClick={() => {
                              onSelectColorway(cw.id);
                              onNavigate('collection');
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.22em] font-sans font-bold transition-all shadow-xl flex items-center gap-1.5 btn-shimmer"
                          >
                            <span>Inspect Shade</span>
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
      {/* 3. ANCIENT CRAFT, MODERN SOUL: monitor_05s.jpg from video */}
      {/* Replaced wordy text boxes with 4 Visual Weave Gallery Cards */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] text-[#1C1917] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Stacked Title + Arched Graphic from video */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
                Heritage Lineage
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-[#1C1917] leading-[1.08] tracking-tight">
                ANCIENT
                <br />
                CRAFT,
                <br />
                MODERN
                <br />
                SOUL
              </h2>
            </div>

            {/* Arched Burgundy Medallion from monitor_05s.jpg */}
            <div className="relative w-44 h-52 rounded-t-full bg-[#6A1424] text-white p-5 flex flex-col justify-between overflow-hidden shadow-xl border border-[#D4AF37]/40">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,white_0%,transparent_80%)]" />
              <div className="text-center pt-1">
                <span className="text-xl text-[#D4AF37]">⚜</span>
              </div>
              <div className="text-center space-y-0.5">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block font-sans font-bold">
                  PIT LOOM ARCHIVE
                </span>
                <span className="text-xs font-editorial tracking-wider">
                  Shivala Ghat, Varanasi
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Visual Saree Swatch Cards matching monitor_05s.jpg */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {masterSaree.colorways.slice(0, 4).map((cw, idx) => (
              <div
                key={cw.id}
                onClick={() => {
                  onSelectColorway(cw.id);
                  onNavigate('collection');
                }}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={cw.image}
                    alt={cw.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full border border-white shadow"
                    style={{ backgroundColor: cw.hex }}
                  />
                </div>
                <div className="p-3 text-center space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#881326] font-bold block">
                    0{idx + 1} • {cw.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-editorial text-stone-700 block">
                    {cw.zariTone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. FRESH WEAVES: Minimalist Catalog Grid matching monitor_22s.jpg */}
      {/* ============================================================== */}
      <section
        id="fresh-weaves"
        className="py-20 md:py-28 bg-[#F7F4EB] text-[#1C1917] border-b border-stone-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
              Collection 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1C1917] tracking-tight">
              Fresh Weaves
            </h2>
          </div>

          {/* Faceted Controls: Category Pills + Color & Sort */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-sans font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#6A1424] text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:text-black border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200/80 max-w-5xl mx-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {COLOR_FILTERS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColorFilter(c.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider flex items-center gap-1.5 transition-all ${
                      selectedColorFilter === c.id
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    {c.hex && (
                      <span
                        className="w-2 h-2 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 ml-auto text-xs font-sans">
                <SlidersHorizontal className="w-3 h-3 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 font-sans focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Saree Catalog Grid: Clean, Minimal Micro-Copy */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <ProgressiveImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      aspectRatio="3/4"
                    />

                    <div
                      className="absolute top-3 left-3 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
                      style={{ backgroundColor: product.hex }}
                    />

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/85 hover:bg-white text-stone-700 hover:text-[#881326] backdrop-blur-sm transition-all shadow z-10"
                      aria-label="Wishlist Saree"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isWishlisted ? 'fill-[#881326] text-[#881326]' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => setInspectModalProduct(product)}
                      className="absolute inset-x-4 bottom-3 py-2 rounded-full bg-white/95 hover:bg-[#D4AF37] text-stone-900 text-[10px] uppercase tracking-widest font-sans font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 z-10"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-1">
                    <h3 className="text-sm sm:text-base font-editorial font-bold text-stone-900 leading-tight">
                      {product.name}
                    </h3>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-sm sm:text-base font-editorial font-bold text-stone-900">
                        {formatPrice(product.priceINR, currency)}
                      </span>
                      <button
                        onClick={() => setInspectModalProduct(product)}
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
      {/* 5. WE'D LOVE TO HEAR FROM YOU: monitor_09s.jpg from video */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] text-[#1C1917] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-10 space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#881326] font-sans font-bold block">
              Atelier Concierge
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1C1917] tracking-tight">
              We'd Love to Hear From You
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl max-w-xl mx-auto">
            {contactSent ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-editorial font-normal text-stone-900">
                  Inquiry Transmitted
                </h3>
                <p className="text-xs font-sans text-stone-500">
                  Opening WhatsApp to connect with our Senior Draper...
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#881326]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="flex gap-1.5">
                      <select
                        value={contactDialCode}
                        onChange={(e) => setContactDialCode(e.target.value)}
                        className="px-2 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#881326] shrink-0"
                      >
                        {COUNTRY_DIAL_CODES.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.flag} {d.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#881326]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                    Saree Inquiry (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Saree shade, weave, or bridal inquiry..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#881326]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3 rounded-full bg-[#6A1424] hover:bg-[#881326] text-white text-[11px] uppercase tracking-[0.2em] font-sans font-bold shadow-md transition-all flex items-center justify-center gap-2 btn-shimmer disabled:opacity-50"
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
      {/* RICH PRODUCT DETAIL MODAL */}
      {/* ============================================================== */}
      <ProductDetailModal
        product={inspectModalProduct}
        onClose={() => setInspectModalProduct(null)}
        onAddToCart={onAddToCart}
        currency={currency}
        onNavigate={onNavigate}
        onSelectColorway={onSelectColorway}
      />
    </div>
  );
}
