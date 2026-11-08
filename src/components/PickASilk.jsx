import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Plus, Check } from 'lucide-react';
import { PICK_A_SILK_CARDS } from '../data/showcaseData';
import { formatPrice } from '../utils/currency';

function TiltCard({ card, index, total, currency, onAddToCart, wishlist, onToggleWishlist }) {
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);

  // Mouse tilt physics using Framer Motion springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: card.id,
        name: card.name,
        category: 'Silk Saree',
        priceINR: card.priceINR,
        image: card.image,
        selectedColorway: card.boldTitle,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isWish = wishlist && wishlist.some((w) => w.id === card.id);

  // Arc curve calculation: center is highest, edges dip and rotate slightly
  const mid = (total - 1) / 2;
  const distFromCenter = index - mid;
  const baseRotate = distFromCenter * 3.5;
  const baseY = Math.abs(distFromCenter) * 12;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: baseY - 16, scale: 1.03, zIndex: 30 }}
      style={{
        rotate: `${baseRotate}deg`,
        translateY: `${baseY}px`,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative shrink-0 w-[240px] sm:w-[270px] h-[400px] sm:h-[450px] rounded-3xl p-4 cursor-pointer select-none shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
    >
      {/* Background card with rich vibrant jewel tone */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${card.cardTone} overflow-hidden`}
        style={{ transform: 'translateZ(0px)' }}
      >
        {/* Subtle silk weave diagonal grid texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* GIANT Condensed Bold Background Typography BEHIND model */}
        <div
          className="absolute inset-x-2 top-8 text-center uppercase font-black text-white/20 leading-[0.88] tracking-tighter break-words pointer-events-none select-none overflow-hidden"
          style={{ fontSize: '3rem', transform: 'translateZ(10px)' }}
        >
          {card.boldTitle}
        </div>

        {/* Top Badges: Category & Wishlist */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20" style={{ transform: 'translateZ(30px)' }}>
          <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white/90">
            {card.badge}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(card);
            }}
            aria-label="Wishlist silk"
            className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
              isWish
                ? 'bg-white border-white text-red-600'
                : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-red-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Cutout Model in Foreground overlapping the Giant Typography */}
        <div
          className="absolute inset-x-4 top-14 bottom-16 flex items-center justify-center z-10 pointer-events-none"
          style={{ transform: 'translateZ(25px)' }}
        >
          <img
            src={card.modelCutout}
            alt={card.name}
            className="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Bottom Bar: Price & Circular Drop-to-Cart Plus Button */}
        <div
          className="absolute bottom-4 inset-x-4 flex items-end justify-between z-20"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
            <span className="text-[10px] uppercase tracking-wider text-white/70 block font-mono">
              {card.sanskrit}
            </span>
            <span className="text-sm font-bold text-[#E5C07B] tracking-wide">
              {formatPrice(card.priceINR, currency)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleAdd}
            aria-label="Drop saree into bag"
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
              added
                ? 'bg-emerald-500 text-white scale-110'
                : 'bg-stone-900 text-white hover:bg-white hover:text-stone-900 border border-white/20'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PickASilk({
  currency = 'INR',
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  return (
    <section id="pick-a-silk" className="py-20 sm:py-28 bg-[#FAFAFC] text-stone-900 relative overflow-hidden border-b border-stone-200/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
              <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
              THE COLORWAY ARC
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
              Pick a{' '}
              <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
                Silk
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-sans leading-relaxed md:text-right">
            Tilt a card, press it, poke the silk. Hit <strong className="text-stone-900">＋</strong> to drop a saree directly into your bag.
          </p>
        </div>

        {/* Fanned Arc Carousel Track */}
        <div className="w-full overflow-x-auto pb-12 pt-6 scrollbar-none flex justify-start lg:justify-center items-center gap-4 sm:gap-6 px-4">
          {PICK_A_SILK_CARDS.map((card, idx) => (
            <TiltCard
              key={card.id}
              card={card}
              index={idx}
              total={PICK_A_SILK_CARDS.length}
              currency={currency}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
