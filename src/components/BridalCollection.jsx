import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import { BRIDAL_CAROUSEL_DATA } from '../data/showcaseData';
import { formatPrice } from '../utils/currency';

export default function BridalCollection({
  currency,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = BRIDAL_CAROUSEL_DATA.length;
  const activeSaree = BRIDAL_CAROUSEL_DATA[activeIndex];
  const isWishlisted = wishlist.includes(activeSaree.id);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: activeSaree.id,
        name: activeSaree.name,
        priceINR: activeSaree.priceINR,
        image: activeSaree.image,
        category: 'Bridal Saree',
        fabric: activeSaree.fabric,
      });
    }
  };

  return (
    <section
      id="bridal-collection"
      className="py-24 sm:py-32 bg-[#FFFFFF] text-stone-900 border-b border-stone-200/80 relative overflow-hidden select-none"
    >
      {/* Subtle modern architectural ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#7A1C28] font-sans font-bold">
            <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
            MUHURTHAM ARCHIVE
            <span className="w-5 h-[1.5px] bg-[#7A1C28]" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-editorial font-normal text-stone-950 tracking-tight">
            The Bridal Collection
          </h2>

          <p className="text-sm sm:text-base font-editorial italic text-stone-600 max-w-md mx-auto">
            "For the muhurtham and every vow after."
          </p>
        </div>

        {/* 3D Curved Arch Carousel Stage */}
        <div className="relative max-w-5xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1200px]">
          <div className="relative w-full h-full flex items-center justify-center">
            {BRIDAL_CAROUSEL_DATA.map((saree, idx) => {
              // Calculate offset from activeIndex
              let offset = idx - activeIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isFar = Math.abs(offset) >= 2;

              if (isFar) return null; // Only render center and adjacent cards for sleek performance

              // 3D curved transformation calculation
              const xPos = offset * 260; // Spread horizontally
              const rotateY = offset * -22; // Tilt inward toward center
              const scale = isCenter ? 1.05 : 0.88;
              const zIndex = isCenter ? 30 : 20 - Math.abs(offset);
              const opacity = isCenter ? 1 : 0.45;

              return (
                <motion.div
                  key={saree.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute top-0 bottom-0 my-auto w-64 sm:w-72 h-[420px] sm:h-[480px] rounded-t-full rounded-b-2xl overflow-hidden cursor-pointer transition-shadow duration-500 ${
                    isCenter
                      ? 'border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(212,175,55,0.28)] ring-4 ring-[#D4AF37]/20'
                      : 'border border-stone-300 shadow-md hover:opacity-75'
                  }`}
                  animate={{
                    x: xPos,
                    rotateY,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 26,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={saree.image}
                    alt={saree.name}
                    className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.05]"
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Tag on Card */}
                  {saree.tag && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-sans font-bold bg-[#7A1C28] text-white border border-[#D4AF37]/50 shadow-md">
                        {saree.tag}
                      </span>
                    </div>
                  )}

                  {/* Quick Card Details (when not center) */}
                  {!isCenter && (
                    <div className="absolute bottom-6 inset-x-4 text-center">
                      <h4 className="text-sm font-editorial text-white line-clamp-1">
                        {saree.name}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-sans font-bold mt-0.5">
                        {formatPrice(saree.priceINR, currency)}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-40 p-3 rounded-full bg-white/90 hover:bg-[#7A1C28] text-stone-900 hover:text-white border border-stone-200 hover:border-[#7A1C28] shadow-xl backdrop-blur-md transition-all cursor-pointer group"
            aria-label="Previous Bridal Saree"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-40 p-3 rounded-full bg-white/90 hover:bg-[#7A1C28] text-stone-900 hover:text-white border border-stone-200 hover:border-[#7A1C28] shadow-xl backdrop-blur-md transition-all cursor-pointer group"
            aria-label="Next Bridal Saree"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Details Below the Centre Card (Matching NOOLAM Spec) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSaree.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto text-center mt-6 space-y-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1C28] font-sans font-bold">
                {activeSaree.sanskrit} • {activeSaree.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-950">
                {activeSaree.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-stone-600 max-w-md mx-auto">
                <span className="font-semibold text-stone-800">{activeSaree.fabric}</span>
                <br />
                <span className="font-editorial italic text-stone-500">{activeSaree.palluNote}</span>
              </p>
            </div>

            {/* Price in Regal Gold */}
            <div className="text-2xl sm:text-3xl font-editorial font-bold text-[#9E781B] tracking-tight">
              {formatPrice(activeSaree.priceINR, currency)}
            </div>

            {/* Action Buttons: Add to Bag + Wishlist Heart */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onToggleWishlist && onToggleWishlist(activeSaree.id)}
                className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#7A1C28] border-[#7A1C28] text-white shadow-lg'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-[#7A1C28] hover:text-[#7A1C28] shadow-sm'
                }`}
                aria-label="Wishlist Saree"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : ''}`} />
              </button>

              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1C28] via-[#8B1E2D] to-[#7A1C28] text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(122,28,40,0.35)] border border-[#D4AF37]/50 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Cart</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
