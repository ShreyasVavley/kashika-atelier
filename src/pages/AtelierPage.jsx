import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Eye,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  MessageCircle,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { CATALOG_PRODUCTS, BRAND_ASSETS } from '../data/sarees';
import { formatPrice } from '../utils/currency';
import ProductDetailModal from '../components/ProductDetailModal';

const COUNTRY_DIAL_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];

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
  currency,
  wishlist = [],
  onToggleWishlist,
}) {
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('All Weaves');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Inspection Modal State
  const [inspectModalProduct, setInspectModalProduct] = useState(null);

  // Appointment Form State
  const [clientName, setClientName] = useState('');
  const [dialCode, setDialCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consultationType, setConsultationType] = useState('In-Person Varanasi Atelier');
  const [weddingDate, setWeddingDate] = useState('');
  const [sareeInterest, setSareeInterest] = useState('Pure Katan Silk & Bridal Kadwa');
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);

  // Filtered & Sorted Saree Catalog
  const filteredProducts = useMemo(() => {
    let result = [...CATALOG_PRODUCTS];

    if (selectedCategory !== 'All Weaves') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedColor !== 'all') {
      const targetFilter = COLOR_FILTERS.find((c) => c.id === selectedColor);
      if (targetFilter && targetFilter.hex) {
        result = result.filter((p) => p.hex.toLowerCase() === targetFilter.hex.toLowerCase());
      }
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'weight-desc') {
      result.sort((a, b) => (b.weightGrams || 0) - (a.weightGrams || 0));
    }

    return result;
  }, [selectedCategory, selectedColor, sortBy]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 6) return;

    setAppointmentLoading(true);

    setTimeout(() => {
      setAppointmentLoading(false);
      setAppointmentSent(true);

      const msg = encodeURIComponent(
        `Hello Kashika Atelier:%0A- Name: ${clientName}%0A- Phone: ${dialCode} ${phoneNumber}%0A- Type: ${consultationType}%0A- Occasion Date: ${weddingDate || 'Upcoming'}%0A- Interest: ${sareeInterest}`
      );
      window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
    }, 600);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
                Woven on traditional wooden pit looms in Varanasi with 98.2% pure tested silver zari electro-gilded in 24K gold. Certified Silk Mark India with geographical indication authentication.
              </p>
            </div>

            {/* Technical Craft Standards Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-sans">
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Zari Purity</span>
                <span className="font-bold text-stone-900 mt-0.5 block">98.2% Pure Silver</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Silk Composition</span>
                <span className="font-bold text-stone-900 mt-0.5 block">100% Katan Silk</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Authenticity</span>
                <span className="font-bold text-stone-900 mt-0.5 block">Silk Mark Certified</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Logistics</span>
                <span className="font-bold text-stone-900 mt-0.5 block">Insured Global Courier</span>
              </div>
            </div>

            {/* Streamlined Direct CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('collection-grid')}
                className="px-8 py-3.5 rounded-full bg-[#7A1C28] hover:bg-[#8F1A2D] text-white font-sans text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => scrollToSection('concierge-form')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-sans text-xs uppercase tracking-[0.18em] font-bold shadow-xs hover:border-stone-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sharp High-Resolution Editorial Drape (True-to-life studio lighting) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-white p-2">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={BRAND_ASSETS.heroBanner}
                  alt="Authentic Banarasi Katan Silk Saree Drape"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01]"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-900 text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm">
                  Mulberry Katan • 840g
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-between shadow-md">
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
                    className="px-3 py-1.5 rounded-full bg-[#7A1C28] text-white text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-[#8F1A2D] transition-colors"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CATALOG SECTION: Clean 3- or 4-Column High-Res Product Grid */}
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

        {/* Product Grid: Clean 3-Column Layout with Product Essentials Front & Center */}
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

                  {/* Price & Standard Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-stone-500 block font-sans">Retail Price</span>
                      <span className="text-xl font-editorial font-bold text-stone-950">
                        {formatPrice(product.priceINR, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectModalProduct(product)}
                        className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-sans font-bold transition-colors cursor-pointer"
                        title="View Full Specifications"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onAddToCart && onAddToCart(product, { id: product.id, name: product.name, hex: product.hex })}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7A1C28] hover:bg-[#8F1A2D] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Add</span>
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
      {/* 3. TRUST BLOCK: Zari Test Report, Silk Mark & Store Locations */}
      {/* ============================================================== */}
      <section id="craft-trust" className="py-20 bg-white border-y border-stone-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#7A1C28] font-sans font-bold">
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
              AUTHENTICITY & STANDARDS
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-950 tracking-tight">
              Purity Certification & Physical Ateliers
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Every saree is accompanied by serialized laboratory hallmarking, government Silk Mark registry, and lifetime provenance guarantees.
            </p>
          </div>

          {/* 3 Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Silk Mark India */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-editorial font-bold text-stone-900">
                Silk Mark India Certified
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Issued by the Central Silk Board, Ministry of Textiles, Government of India. Guarantees 100% natural mulberry silk warp and weft with zero synthetic nylon or polyester blending.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Registry Code: SMI-VAR-1948-KL
              </div>
            </div>

            {/* Card 2: Zari Spectrometer Analysis */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-editorial font-bold text-stone-900">
                98.2% Tested Zari Report
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Real silver core wire electro-gilded with 24K fine gold (1.2 micron thickness). Zero copper, aluminum, or plastic lurex. Every piece includes an x-ray spectrometer purity certificate.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                Laboratory Purity: 98.24% Real Silver
              </div>
            </div>

            {/* Card 3: Geographical Indication (GI Tag) */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C28] text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-editorial font-bold text-stone-900">
                Geographical Indication (GI)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Registered under the Geographical Indications of Goods Act, certifying that your drape was authentically hand-loomed in Varanasi by generational master weavers on traditional pit looms.
              </p>
              <div className="text-[11px] font-semibold text-[#7A1C28]">
                GI Application: No. 69 (Banaras Brocades)
              </div>
            </div>
          </div>

          {/* Physical Flagship Showrooms */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="text-sm uppercase tracking-wider font-sans font-bold text-stone-900 mb-6 text-center">
              Physical Showrooms & Consultation Suites
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                  <MapPin className="w-4 h-4 text-[#7A1C28]" />
                  <span>Varanasi Flagship</span>
                </div>
                <p className="text-stone-600">
                  Assi Ghat Heritage Lane, Shivala, Varanasi, UP 221005
                </p>
                <span className="text-[11px] text-stone-500 block pt-1">
                  Open Daily: 10:00 - 20:00 IST
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                  <MapPin className="w-4 h-4 text-[#7A1C28]" />
                  <span>Hyderabad Salon</span>
                </div>
                <p className="text-stone-600">
                  Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                </p>
                <span className="text-[11px] text-stone-500 block pt-1">
                  Consultations: By Appointment
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                  <MapPin className="w-4 h-4 text-[#7A1C28]" />
                  <span>Mumbai Atelier</span>
                </div>
                <p className="text-stone-600">
                  Heritage Wing, Kala Ghoda, Fort, Mumbai, MH 400001
                </p>
                <span className="text-[11px] text-stone-500 block pt-1">
                  Consultations: By Appointment
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CONCIERGE: Clean Consultation & Appointment Booking Form */}
      {/* ============================================================== */}
      <section id="concierge-form" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
        <div className="bg-white rounded-3xl border border-stone-300 p-8 sm:p-12 shadow-lg space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#7A1C28] font-sans font-bold">
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
              ATELIER CONSULTATION
              <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-950 tracking-tight">
              Book an Appointment
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Schedule a personalized bridal saree styling consultation at our physical ateliers or via private high-definition video call worldwide.
            </p>
          </div>

          {appointmentSent ? (
            <div className="text-center py-8 space-y-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-editorial font-bold text-stone-900">
                Appointment Request Received
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto font-sans">
                Connecting you directly with our Senior Draper on WhatsApp to confirm your date and consultation slot...
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookAppointment} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Radhika Sen"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7A1C28] transition-colors"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                      className="px-2.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#7A1C28] text-xs shrink-0 cursor-pointer"
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
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7A1C28] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Consultation Type */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                    Consultation Type
                  </label>
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#7A1C28] cursor-pointer"
                  >
                    <option value="In-Person Varanasi Atelier">In-Person: Varanasi Atelier (Assi Ghat)</option>
                    <option value="In-Person Hyderabad Salon">In-Person: Hyderabad Salon (Jubilee Hills)</option>
                    <option value="In-Person Mumbai Atelier">In-Person: Mumbai Atelier (Kala Ghoda)</option>
                    <option value="Virtual HD Video Drape">Virtual 1-on-1 HD Video Drape (Zoom/WhatsApp)</option>
                  </select>
                </div>

                {/* Wedding / Occasion Date */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                    Wedding or Occasion Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#7A1C28] cursor-pointer"
                  />
                </div>
              </div>

              {/* Saree Interest */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                  Saree Interest or Notes
                </label>
                <input
                  type="text"
                  value={sareeInterest}
                  onChange={(e) => setSareeInterest(e.target.value)}
                  placeholder="e.g. Bridal Kadwa Katan in Sindoor Crimson with pure silver zari"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7A1C28] transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={appointmentLoading}
                className="w-full py-3.5 rounded-full bg-[#7A1C28] hover:bg-[#8F1A2D] text-white font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Book an Appointment</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PRODUCT DETAIL MODAL (HIGH-RES INSPECTION & SPECS) */}
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
