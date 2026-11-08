import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BottomStatusTicker({ onNavigate, onOpenVerifier }) {
  const tickerItems = [
    { label: 'TRY THE LOOK', sub: 'Interactive 3D Ensemble Builder', target: 'looks' },
    { label: '100% PURE SILVER ZARI', sub: '98.2% Certified Electro-Gilded in 24K Gold', target: 'craft' },
    { label: 'THE RACK', sub: '14+ Master Silks & Pure Brocade Blouses', target: 'rack' },
    { label: 'THE BRIDAL COLLECTION', sub: '3D Curved Arch Carousel for the Muhurtham', target: 'bridal' },
    { label: 'SIX TEMPLE MOODS', sub: 'South Indian Gopuram Architectural Archive', target: 'moods' },
    { label: 'PICK A SILK', sub: '3D Fanned Arc of Sacred Heritage Colorways', target: 'picks' },
    { label: 'BRIDAL TRUNK', sub: 'Heirloom Muhurtham Velvet Trunk (15% Off)', target: 'trousseau' },
    { label: 'COMPLIMENTARY SHIPPING', sub: 'Insured White-Glove Worldwide Delivery', target: null },
  ];

  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <aside
      aria-label="Atelier Status and Live Highlights"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#160207]/95 backdrop-blur-xl border-t border-[#D4AF37]/45 text-[#F5EDE1] shadow-[0_-10px_35px_rgba(20,2,8,0.7)] select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-10 sm:h-11 flex items-center justify-between gap-3 overflow-hidden">
        {/* Left: Brand Medallion & Title (As seen in Instagram Reel) */}
        <div
          onClick={() => onNavigate && onNavigate('atelier')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          title="Return to Kashika Atelier"
        >
          {/* Circular Logo Initial Monogram */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#800020] via-[#5C0A19] to-[#25050D] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-xs shadow-[0_0_10px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
            <span>K</span>
          </div>

          <div className="hidden xs:flex flex-col">
            <span className="text-[11px] font-editorial tracking-[0.2em] uppercase text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors leading-none">
              KASHIKA
            </span>
            <span className="text-[7px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-sans mt-0.5">
              Atelier Varanasi
            </span>
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-[#D4AF37]/35 mx-1 hidden sm:block" />
        </div>

        {/* Center: Infinite Live Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative mx-2 h-full flex items-center">
          {/* Soft Edge Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#160207] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#160207] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-8 whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => item.target && onNavigate && onNavigate(item.target)}
                className={`inline-flex items-center gap-2 group ${
                  item.target ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span className="text-[#D4AF37] text-[10px]">◆</span>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] font-editorial italic text-stone-300 hidden md:inline">
                  — {item.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Atelier Status & Direct Salon Action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live Open Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[9px] uppercase tracking-wider text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37] font-semibold">Live</span>
            <span>Varanasi 10:00 - 20:00 IST</span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => onNavigate && onNavigate('salon')}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CD68] to-[#D4AF37] text-stone-950 text-[10px] sm:text-[11px] font-sans font-bold tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_2px_10px_rgba(212,175,55,0.35)] cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-stone-950" />
            <span className="hidden sm:inline">Book Salon</span>
            <span className="sm:hidden">Salon</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
