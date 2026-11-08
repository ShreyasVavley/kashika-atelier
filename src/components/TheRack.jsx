import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { RACK_PRODUCTS, RACK_CATEGORIES } from '../data/showcaseData';
import { formatPrice } from '../utils/currency';

export default function TheRack({
  currency = 'INR',
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
  onNavigate,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All pieces');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [modalView, setModalView] = useState('front'); // 'front' or 'back'
  const [selectedSize, setSelectedSize] = useState('36');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Filter products based on selected tab
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All pieces') return RACK_PRODUCTS;
    return RACK_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All pieces': RACK_PRODUCTS.length };
    RACK_CATEGORIES.forEach((cat) => {
      if (cat !== 'All pieces') {
        counts[cat] = RACK_PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  const handleOpenModal = (product) => {
    setActiveModalProduct(product);
    setModalView('front');
    if (product.type === 'blouse') {
      setSelectedSize('36');
    } else {
      setSelectedSize(product.sizes[0]);
    }
  };

  const handleCloseModal = () => {
    setActiveModalProduct(null);
    setAddedSuccess(false);
  };

  const handleModalPrev = (e) => {
    e.stopPropagation();
    if (!activeModalProduct) return;
    const currentIndex = filteredProducts.findIndex((p) => p.id === activeModalProduct.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProducts.length - 1;
    setActiveModalProduct(filteredProducts[prevIndex]);
    setModalView('front');
    setAddedSuccess(false);
  };

  const handleModalNext = (e) => {
    e.stopPropagation();
    if (!activeModalProduct) return;
    const currentIndex = filteredProducts.findIndex((p) => p.id === activeModalProduct.id);
    const nextIndex = currentIndex < filteredProducts.length - 1 ? currentIndex + 1 : 0;
    setActiveModalProduct(filteredProducts[nextIndex]);
    setModalView('front');
    setAddedSuccess(false);
  };

  const handleAddToCart = () => {
    if (!activeModalProduct || !onAddToCart) return;
    onAddToCart({
      id: `${activeModalProduct.id}-${selectedSize}`,
      name: `${activeModalProduct.name} (${selectedSize})`,
      category: activeModalProduct.category,
      priceINR: activeModalProduct.priceINR,
      image: modalView === 'front' ? activeModalProduct.image : activeModalProduct.backImage,
      selectedColorway: activeModalProduct.tag || activeModalProduct.fabric,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const isModalWishlisted = activeModalProduct && wishlist.some((w) => w.id === activeModalProduct.id);

  return (
    <section id="the-rack" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#1C1917] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
            <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
            THE COLLECTION
            <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
            Every silk,{' '}
            <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
              on the rail.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-2">
            Folded and hung just as in our Varanasi sanctuary. Click any hanger to lift, inspect both sides, and choose your sizing.
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-none mb-12 px-2">
          {RACK_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 border select-none ${
                  isSelected
                    ? 'bg-[#7A1C28] text-white border-[#7A1C28] shadow-[0_4px_14px_rgba(122,28,40,0.3)]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Physical Chrome Clothes Rail Container */}
        <div className="relative w-full pt-12 pb-16 px-4">
          {/* Chrome Rail Rod spanning horizontally */}
          <div className="relative w-full h-3 rounded-full bg-gradient-to-b from-[#F1F5F9] via-[#94A3B8] to-[#475569] shadow-[0_4px_10px_rgba(0,0,0,0.25)] border-t border-white/60 mb-8 flex items-center justify-between">
            {/* Left Chrome Wall Finial Bracket */}
            <div className="w-5 h-7 rounded-sm bg-gradient-to-r from-stone-400 to-stone-600 -ml-2 shadow-md border-r border-stone-300" />
            {/* Right Chrome Wall Finial Bracket */}
            <div className="w-5 h-7 rounded-sm bg-gradient-to-l from-stone-400 to-stone-600 -mr-2 shadow-md border-l border-stone-300" />
          </div>

          {/* Hangers Row on the Rail */}
          <div className="flex items-end justify-start lg:justify-center gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 px-6 scrollbar-none min-h-[360px]">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isHovered = hoveredProduct?.id === product.id;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleOpenModal(product)}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    whileHover={{ y: -16, scale: 1.05 }}
                    className="relative shrink-0 flex flex-col items-center cursor-pointer select-none group"
                    style={{ width: product.type === 'blouse' ? '180px' : '190px' }}
                  >
                    {/* Hanger Hook that rests on the Chrome Rail */}
                    <div className="relative -mt-10 mb-[-2px] flex flex-col items-center">
                      {/* Chrome Metallic Hook loop */}
                      <svg width="24" height="34" viewBox="0 0 24 34" fill="none" className="drop-shadow-sm">
                        <path
                          d="M12 2C8 2 6 5 6 9C6 13 12 14 12 18V24"
                          stroke="#64748B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Wooden Hanger Shoulder Bar */}
                      <div className="w-40 sm:w-44 h-4 rounded-t-full bg-gradient-to-r from-[#8B5A2B] via-[#A0522D] to-[#6E3B1B] shadow-md border-t border-amber-300/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-200/50" />
                      </div>
                    </div>

                    {/* Draped Garment hanging from hanger */}
                    <div
                      className={`relative w-36 sm:w-40 overflow-hidden rounded-b-lg shadow-[0_15px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_45px_rgba(122,28,40,0.25)] transition-all duration-300 ${
                        product.type === 'blouse' ? 'h-36 sm:h-40' : 'h-64 sm:h-72'
                      }`}
                    >
                      <img
                        src={product.foldImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Natural Fabric Drape Fold Vignette & Highlights */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/35 pointer-events-none" />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_30%,transparent_60%)] pointer-events-none" />

                      {/* Micro Pill Badge */}
                      <div className="absolute bottom-2.5 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-medium tracking-wider text-white uppercase border border-white/15">
                        {product.tag || product.category}
                      </div>
                    </div>

                    {/* Subtle floor shadow below each hanging piece */}
                    <div className="w-28 h-2 rounded-full bg-black/10 blur-sm mt-3" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dynamic Hover Details strip below rail */}
          <div className="h-10 mt-6 text-center flex items-center justify-center">
            {hoveredProduct ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-stone-50 border border-stone-200 shadow-sm"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-stone-900">
                  {hoveredProduct.name}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs font-bold text-[#7A1C28]">
                  {formatPrice(hoveredProduct.priceINR, currency)}
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                  (Tap to lift & inspect)
                </span>
              </motion.div>
            ) : (
              <span className="text-xs text-stone-400 tracking-widest uppercase font-mono">
                Explore the collection · {filteredProducts.length} pieces on the rail
              </span>
            )}
          </div>
        </div>
      </div>

      {/* HANGER LIFT INSPECTION MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Blurry Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-stone-200 overflow-hidden z-10 p-6 sm:p-8 flex flex-col items-center"
            >
              {/* Top Controls: Nav Arrows & Close */}
              <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleModalPrev}
                    aria-label="Previous garment"
                    className="w-8 h-8 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleModalNext}
                    aria-label="Next garment"
                    className="w-8 h-8 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                  {activeModalProduct.category}
                </span>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lifted Wooden Hanger & Garment Centerpiece */}
              <div className="relative flex flex-col items-center my-2">
                {/* Wooden Hanger */}
                <div className="relative -mt-2 mb-[-1px] flex flex-col items-center z-10">
                  <svg width="26" height="36" viewBox="0 0 24 34" fill="none">
                    <path
                      d="M12 2C8 2 6 5 6 9C6 13 12 14 12 18V24"
                      stroke="#475569"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="w-52 h-4 rounded-t-full bg-gradient-to-r from-[#8B5A2B] via-[#A0522D] to-[#6E3B1B] shadow-md border-t border-amber-300/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-200/60" />
                  </div>
                </div>

                {/* Garment Image with Front / Back Animated Flip */}
                <div className="relative w-64 sm:w-72 h-72 sm:h-80 rounded-b-xl overflow-hidden shadow-2xl bg-stone-100 border border-stone-200">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalView}
                      src={modalView === 'front' ? activeModalProduct.image : activeModalProduct.backImage}
                      alt={activeModalProduct.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>

                  {/* Fabric Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Fabric Spec Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-mono border border-white/20">
                    {activeModalProduct.fabric}
                  </div>
                </div>
              </div>

              {/* Product Info & Front/Back Toggle */}
              <div className="w-full text-center mt-4">
                <h3 className="text-base sm:text-lg font-semibold tracking-wider uppercase text-stone-900 font-editorial">
                  {activeModalProduct.name}
                </h3>
                <div className="text-sm font-bold text-[#7A1C28] mt-1">
                  {formatPrice(activeModalProduct.priceINR, currency)}
                </div>

                {/* FRONT / BACK Toggle Pills */}
                <div className="inline-flex items-center p-1 rounded-full bg-stone-100 border border-stone-200 mt-4">
                  <button
                    onClick={() => setModalView('front')}
                    className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      modalView === 'front'
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    FRONT
                  </button>
                  <button
                    onClick={() => setModalView('back')}
                    className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      modalView === 'back'
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    BACK
                  </button>
                </div>

                {/* Sizing Chips */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-[11px] text-stone-400 font-mono uppercase mr-1">Size:</span>
                  {activeModalProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === sz
                          ? 'border-[#7A1C28] bg-[#7A1C28]/10 text-[#7A1C28] font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6 w-full max-w-sm mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 rounded-full bg-[#7A1C28] hover:bg-[#961F33] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag ({selectedSize})</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={() => onToggleWishlist && onToggleWishlist(activeModalProduct)}
                    aria-label="Wishlist"
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                      isModalWishlisted
                        ? 'border-red-400 bg-red-50 text-red-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isModalWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Salon / Concierge Availability Link */}
                <button
                  onClick={() => {
                    handleCloseModal();
                    if (onNavigate) onNavigate('salon');
                  }}
                  className="mt-3 text-[11px] text-stone-500 hover:text-[#7A1C28] underline underline-offset-4 tracking-wider uppercase font-mono block mx-auto transition-colors"
                >
                  See Salon Availability & In-Store Draping →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
