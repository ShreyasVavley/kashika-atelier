import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Heart,
  Plus,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURATED_LOOKS } from '../data/showcaseData';
import { formatPrice } from '../utils/currency';

export default function TryTheLook({
  currency = 'INR',
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [bundleAdded, setBundleAdded] = useState(false);

  const activeLook = CURATED_LOOKS[activeLookIndex];

  const handlePrev = () => {
    setActiveLookIndex((prev) => (prev > 0 ? prev - 1 : CURATED_LOOKS.length - 1));
    setBundleAdded(false);
  };

  const handleNext = () => {
    setActiveLookIndex((prev) => (prev < CURATED_LOOKS.length - 1 ? prev + 1 : 0));
    setBundleAdded(false);
  };

  // Calculate regular sum & 10% bundle price
  const regularTotalINR = activeLook.pieces.reduce((sum, item) => sum + item.priceINR, 0);
  const bundleDiscountINR = Math.round(regularTotalINR * 0.10);
  const bundleTotalINR = regularTotalINR - bundleDiscountINR;

  const handleAddSinglePiece = (piece, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: piece.id,
        name: piece.name,
        category: piece.category,
        priceINR: piece.priceINR,
        image: piece.image,
        selectedColorway: activeLook.title,
      });
    }
    setAddedItems((prev) => ({ ...prev, [piece.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [piece.id]: false }));
    }, 1800);
  };

  const handleAddFullLook = () => {
    if (onAddToCart) {
      // Add each piece to cart with pro-rated bundle discount
      activeLook.pieces.forEach((piece) => {
        const discountedPiecePrice = Math.round(piece.priceINR * 0.90);
        onAddToCart({
          id: `${piece.id}-bundle-${activeLook.id}`,
          name: `${piece.name} (Look Ensemble)`,
          category: piece.category,
          priceINR: discountedPiecePrice,
          image: piece.image,
          selectedColorway: activeLook.title,
        });
      });
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#7A1C28', '#C59B27', '#E5C07B', '#FFFFFF'],
      });
    } catch {
      // fallback
    }

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  const isPieceWishlisted = (pieceId) => {
    return wishlist.some((w) => w.id === pieceId);
  };

  return (
    <section id="try-the-look" className="py-20 sm:py-28 bg-[#FFFFFF] text-stone-900 relative border-b border-stone-200/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
            <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
            STYLED HEAD TO TOE
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
            Try the{' '}
            <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
              Look.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans mt-2">
            Eight royal looks, styled head to toe. Tap a look to explore and bundle the coordinated pieces.
          </p>
        </div>

        {/* Main 2-Column Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Depth-of-Field Stage Carousel (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Stage Backdrop with Center Focus & Side Blur */}
            <div className="relative w-full h-[460px] sm:h-[560px] rounded-3xl bg-gradient-to-b from-[#F5F5F7] via-[#FAFAFC] to-[#EDEDF2] border border-stone-200/80 shadow-sm overflow-hidden flex items-center justify-center p-4">
              {/* Radial glow spotlight behind active model */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

              {/* Models Carousel Stage */}
              <div className="relative w-full h-full flex items-center justify-center">
                {CURATED_LOOKS.map((look, idx) => {
                  const offset = idx - activeLookIndex;
                  const isCenter = offset === 0;
                  const isVisible = Math.abs(offset) <= 2;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={look.id}
                      onClick={() => setActiveLookIndex(idx)}
                      animate={{
                        x: offset * 180,
                        scale: isCenter ? 1 : 0.8,
                        opacity: isCenter ? 1 : 0.35,
                        zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className={`absolute cursor-pointer flex flex-col items-center select-none transition-all duration-300 ${
                        isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-60'
                      }`}
                      style={{ width: '280px' }}
                    >
                      <div className="relative w-full h-[380px] sm:h-[480px] flex items-center justify-center">
                        <img
                          src={look.modelImage}
                          alt={look.title}
                          className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arrow Controls on Stage */}
              <button
                onClick={handlePrev}
                aria-label="Previous look"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-stone-300 shadow-md hover:bg-stone-50 flex items-center justify-center text-stone-800 transition-all hover:scale-110 z-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next look"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-stone-300 shadow-md hover:bg-stone-50 flex items-center justify-center text-stone-800 transition-all hover:scale-110 z-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Carousel Pagination Indicator */}
            <div className="w-full flex items-center justify-between mt-4 px-2 text-xs font-sans text-stone-500">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-900 tracking-wider">
                  {activeLook.number}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-700 tracking-wide">{activeLook.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C28] animate-ping" />
                <span className="tracking-widest uppercase text-[10px]">Scroll or drag</span>
              </div>
            </div>
          </div>

          {/* Right Column: "In this look" Curated Ensemble Drawer (5 Cols) */}
          <div className="lg:col-span-5 bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/30 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              {/* Box Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
                <div>
                  <h3 className="text-lg font-serif tracking-wide text-stone-900 font-semibold">
                    In this look
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-sans">
                    {activeLook.mood} · 6 Handcrafted Pieces
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] text-[10px] font-semibold tracking-wider uppercase">
                  Curated Pair
                </span>
              </div>

              {/* 6 Individual Look Pieces */}
              <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                {activeLook.pieces.map((piece) => {
                  const isWish = isPieceWishlisted(piece.id);
                  const isAdded = !!addedItems[piece.id];

                  return (
                    <div
                      key={piece.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-[#D4AF37]/60 hover:shadow-sm transition-all"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                          <img
                            src={piece.image}
                            alt={piece.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-mono">
                            {piece.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                            {piece.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#7A1C28]">
                            {formatPrice(piece.priceINR, currency)}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onToggleWishlist && onToggleWishlist(piece)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            isWish
                              ? 'border-red-400 bg-red-50 text-red-600'
                              : 'border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50'
                          }`}
                          aria-label="Wishlist piece"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={(e) => handleAddSinglePiece(piece, e)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            isAdded
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-stone-300 bg-stone-900 text-white hover:bg-[#7A1C28]'
                          }`}
                          aria-label="Add piece to bag"
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Complete the Look Bundle Incentive Box */}
            <div className="mt-6 pt-5 border-t border-stone-200">
              <div className="flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block">Complete the look</span>
                  <span className="text-stone-500 text-[11px]">
                    Bundle all 6 pieces · <strong className="text-emerald-700">save 10%</strong>
                  </span>
                </div>
                <div className="text-right">
                  <span className="line-through text-stone-400 text-xs mr-2">
                    {formatPrice(regularTotalINR, currency)}
                  </span>
                  <span className="font-bold text-[#7A1C28] text-base">
                    {formatPrice(bundleTotalINR, currency)}
                  </span>
                </div>
              </div>

              {/* Master 1-Click Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddFullLook}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7A1C28] to-[#961F33] text-white font-medium text-sm flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(122,28,40,0.35)] hover:shadow-[0_15px_30px_rgba(122,28,40,0.5)] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{bundleAdded ? 'All 6 Pieces Added to Bag!' : 'Add Full Look to Bag'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
