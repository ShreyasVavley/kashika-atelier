import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Eye,
  ShieldCheck,
  Award,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  SlidersHorizontal,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { CATALOG_PRODUCTS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';
import ProductDetailModal from '../components/ProductDetailModal';

const FABRIC_CATEGORIES = [
  'All Weaves',
  'Katan Silk',
  'Royal Kadwa',
  'Organza Silk',
  'Bridal Trousseau',
];

const COLOR_FILTERS = [
  { id: 'all', name: 'All Colors', hex: null },
  { id: 'crimson', name: 'Crimson', hex: '#881326' },
  { id: 'indigo', name: 'Indigo Blue', hex: '#0D1D36' },
  { id: 'emerald', name: 'Forest Emerald', hex: '#082D20' },
  { id: 'saffron', name: 'Surya Saffron', hex: '#A86A08' },
  { id: 'gulabi', name: 'Rani Pink', hex: '#8F144E' },
  { id: 'black', name: 'Midnight Black', hex: '#141414' },
];

export default function AtelierPage({
  onNavigate,
  onAddToCart,
  onBuyNow,
  currency,
  wishlist = [],
  onToggleWishlist,
  searchQuery = '',
  onSearchChange,
}) {
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('All Weaves');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Inspection Modal State
  const [inspectModalProduct, setInspectModalProduct] = useState(null);

  // Filtered & Sorted Saree Catalog
  const filteredProducts = useMemo(() => {
    let result = [...CATALOG_PRODUCTS];

    // Search query filter
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          (p.occasion && p.occasion.toLowerCase().includes(q)) ||
          (p.zari && p.zari.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Weaves') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Color filter
    if (selectedColor !== 'all') {
      const targetFilter = COLOR_FILTERS.find((c) => c.id === selectedColor);
      if (targetFilter && targetFilter.hex) {
        result = result.filter((p) => p.hex.toLowerCase() === targetFilter.hex.toLowerCase());
      }
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'weight-desc') {
      result.sort((a, b) => (b.weightGrams || 0) - (a.weightGrams || 0));
    }

    return result;
  }, [selectedCategory, selectedColor, sortBy, searchQuery]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopBridal = () => {
    setSelectedCategory('Katan Silk');
    scrollToSection('collection-grid');
  };

  const handleOpenWhatsAppConcierge = (sareeName) => {
    const text = sareeName
      ? `Hello Kashika Concierge. I am interested in the ${sareeName}. Could you share a live video preview and custom blouse options?`
      : 'Hello Kashika Concierge. I am looking for an authentic Banarasi bridal saree and would like a live video preview and styling guidance.';
    window.open(`https://wa.me/917676721111?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] selection:bg-[#7A1C28]/20 selection:text-[#7A1C28] font-sans min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: Clean, True-to-Life Natural Lighting */}
      {/* ============================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Direct Value Proposition & Standard CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#7A1C28] font-sans font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7A1C28]" />
              <span>HAND-LOOMED IN VARANASI • EST. 1948</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal text-stone-950 leading-[1.08] tracking-tight">
                Authentic Hand-loomed <br />
                <span className="text-[#7A1C28] italic font-normal">Banarasi Silks</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-xl">
                Crafted on traditional wooden pit looms with 98.2% pure tested silver zari electro-gilded in 24K gold. Certified Silk Mark India with geographical indication authentication.
              </p>
            </div>

            {/* Clear E-Commerce Trust Badges Front & Center */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans">
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#7A1C28] shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-semibold text-[11px]">Free Insured Worldwide Shipping</strong>
                  <span className="text-stone-500 text-[10px]">Tracked white-glove express courier</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#7A1C28] shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-semibold text-[11px]">Certified Silk Mark India</strong>
                  <span className="text-stone-500 text-[10px]">Physical authenticity card in every box</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#7A1C28] shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-semibold text-[11px]">7-Day Easy Returns</strong>
                  <span className="text-stone-500 text-[10px]">100% money-back guarantee</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#7A1C28] shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-semibold text-[11px]">Fall & Pico Included</strong>
                  <span className="text-stone-500 text-[10px]">Ready-to-wear pre-attached</span>
                </div>
              </div>
            </div>

            {/* Streamlined Direct E-Commerce CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopBridal}
                className="px-8 py-3.5 rounded-full bg-[#7A1C28] hover:bg-[#8F1A2D] text-white font-sans text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Bridal Katan</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => scrollToSection('trust-guarantee')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-sans text-xs uppercase tracking-[0.18em] font-bold shadow-xs hover:border-stone-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Silk Mark Guarantee</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sharp High-Resolution Editorial Drape */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-white p-2">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={BRAND_ASSETS.heroBanner}
                  alt="Authentic Banarasi Katan Silk Saree Drape"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01]"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm">
                  Mulberry Katan • 840g
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A1C28] font-bold block">
                      Authentic Kadwa Weave
                    </span>
                    <span className="text-xs font-editorial font-bold text-stone-900">
                      Rajkumari Sindoor Katan Saree
                    </span>
                  </div>
                  <button
                    onClick={() => scrollToSection('collection-grid')}
                    className="px-4 py-2 rounded-lg bg-[#7A1C28] text-white text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-[#8F1A2D] transition-colors cursor-pointer"
                  >
                    Shop Drape
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CATALOG SECTION: Clean 3-Column High-Res Product Grid */}
      {/* ============================================================== */}
      <section id="collection-grid" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#7A1C28] font-sans font-bold">
            <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
            AUTHENTIC PIT-LOOM CATALOG
            <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-stone-950 tracking-tight">
            The Banarasi Collection
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
            Hand-loomed Mulberry Katan, Kadwa, and Organza silks with certified pure silver zari and transparent technical specifications.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="space-y-4 mb-10 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FABRIC_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7A1C28] text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Color & Sort Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100">
            {/* Color Swatch Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-sans text-stone-500 uppercase tracking-wider font-semibold mr-1">
                Color:
              </span>
              {COLOR_FILTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedColor === c.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {c.hex && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto text-xs font-sans">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-stone-500 font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-[#7A1C28] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight-desc">Weight: Heaviest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: Clean 3-Column Layout with Product Essentials & Direct Checkout Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Stage with Hover Zoom Preview */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Occasion & Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-stone-900 text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm border border-stone-200">
                      {product.occasion}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#7A1C28] text-white text-[9px] font-sans font-semibold uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#7A1C28] transition-all shadow-md z-10 cursor-pointer"
                    aria-label="Wishlist Saree"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-[#7A1C28] text-[#7A1C28]' : ''
                      }`}
                    />
                  </button>

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={() => setInspectModalProduct(product)}
                    className="absolute inset-x-4 bottom-3 py-2.5 rounded-xl bg-white/95 hover:bg-[#7A1C28] text-stone-900 hover:text-white text-xs font-sans font-bold uppercase tracking-wider shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 z-10 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Saree Information & Product Essentials */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A1C28] font-bold block">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-editorial font-bold text-stone-900 leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Product Essentials Specification Grid */}
                  <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-stone-100 text-[11px] font-sans">
                    <div>
                      <span className="text-stone-500 block">Weight:</span>
                      <span className="font-semibold text-stone-900">{product.weightGrams}g pure silk</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Dimensions:</span>
                      <span className="font-semibold text-stone-900">5.5m + 0.8m blouse</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-stone-50">
                      <span className="text-stone-500 block">Zari Certificate:</span>
                      <span className="font-semibold text-[#8B6B1B]">{product.zari}</span>
                    </div>
                  </div>

                  {/* Price & Direct Checkout Buttons ("Add to Cart" and "Buy Now") */}
                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-500 block font-sans">Price</span>
                        <span className="text-xl font-editorial font-bold text-stone-950">
                          {formatPrice(product.priceINR, currency)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenWhatsAppConcierge(product.name)}
                        className="text-[11px] font-sans font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </button>
                    </div>

                    {/* Action Row: Add to Cart & Buy Now */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToCart && onAddToCart(product, { id: product.id, name: product.name, hex: product.hex })}
                        className="w-full py-2.5 rounded-xl border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/05 text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => onBuyNow && onBuyNow(product, { id: product.id, name: product.name, hex: product.hex })}
                        className="w-full py-2.5 rounded-xl bg-[#7A1C28] hover:bg-[#8F1A2D] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SELF-SERVE HIGH-TICKET TRUST ELEMENTS (Instead of Appointments) */}
      {/* ============================================================== */}
      <section id="trust-guarantee" className="py-20 bg-white border-y border-stone-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#7A1C28] font-sans font-bold">
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
              PURITY STANDARDS & BUYER PROTECTION
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-950 tracking-tight">
              Silk Mark India & 98.2% Tested Zari Guarantee
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Every saree is dispatched directly from our Varanasi pit looms with physical accreditation cards, tested bullion reports, and full insurance.
            </p>
          </div>

          {/* 4 Clear E-Commerce Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Silk Mark India */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-base font-editorial font-bold text-stone-900">
                Silk Mark India Certified
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Issued by the Central Silk Board, Ministry of Textiles, Govt. of India. 100% natural mulberry silk with official holographic authenticity card and QR code in every parcel.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Registry Code: SMI-VAR-1948-KL
              </div>
            </div>

            {/* Card 2: 98.2% Tested Zari Report */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-base font-editorial font-bold text-stone-900">
                98.2% Real Silver Zari
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Real silver core wire electro-gilded with 24K fine gold (1.2 micron thickness). 0% synthetic lurex or copper. Every saree includes a laboratory spectrometer purity certificate.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Tested Silver Bullion: 98.24% Pure
              </div>
            </div>

            {/* Card 3: Free Insured Shipping Worldwide */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-base font-editorial font-bold text-stone-900">
                Free Insured Delivery
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Insured express courier across India and worldwide (USA, UK, UAE, Singapore, Australia). Dispatched in an airtight protective keepsake box with tamper-evident seal.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Dispatches within 24-48 Hours
              </div>
            </div>

            {/* Card 4: 7-Day Easy Returns / Fall & Pico */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-base font-editorial font-bold text-stone-900">
                7-Day Returns & Fall Included
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                100% money-back guarantee if the color or luster does not meet your expectations. Arrives ready-to-wear with complimentary hand-stitched cotton fall and rolled pico.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Complimentary Tailoring Included
              </div>
            </div>
          </div>

          {/* Self-Serve Direct WhatsApp Concierge Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1C040A] via-[#2A0610] to-[#1C040A] text-white p-6 sm:p-10 border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-bold">
                <span className="w-4 h-[1.5px] bg-[#D4AF37]" />
                INSTANT BRIDAL CONCIERGE
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-white">
                Need a live video preview or custom blouse stitching?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-xl">
                Chat directly with our master drapers in Varanasi. We will hold the saree up to natural daylight on camera, check border draping, and confirm your custom measurements instantly.
              </p>
            </div>

            <button
              onClick={() => handleOpenWhatsAppConcierge()}
              className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-stone-950 text-xs font-sans font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-stone-950 fill-stone-950" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PRODUCT DETAIL MODAL (HIGH-RES INSPECTION & SPECS) */}
      {/* ============================================================== */}
      <ProductDetailModal
        product={inspectModalProduct}
        onClose={() => setInspectModalProduct(null)}
        onAddToCart={onAddToCart}
        currency={currency}
        onNavigate={onNavigate}
      />
    </div>
  );
}
