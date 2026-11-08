import React from 'react';
import { motion } from 'framer-motion';

export default function TickerTape({ onNavigate }) {
  const items = [
    { label: 'TRY THE LOOK', desc: 'Eight Royal looks, styled head to toe', target: 'looks' },
    { label: 'PURE ZARI', desc: '98.2% Tested Silver Zari electro-gilded in 24K gold', target: 'craft' },
    { label: 'THE RACK', desc: 'Browse the full rail of silks and brocade blouses', target: 'rack' },
    { label: 'BRIDAL TRUNK', desc: 'Heirloom 3-piece velvet trunk for the Muhurtham', target: 'trousseau' },
    { label: 'PICK A SILK', desc: '3D fanned arc of five sacred heritage colorways', target: 'picks' },
    { label: 'THE LOOMS', desc: 'Handwoven in Varanasi, one master weave at a time', target: 'craft' },
  ];

  // Duplicate for seamless looping
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#4A0A16] via-[#6B0F20] to-[#4A0A16] border-y border-[#D4AF37]/50 py-2.5 sm:py-3.5 select-none z-20 shadow-[0_4px_25px_rgba(107,15,32,0.3)]">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#4A0A16] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#4A0A16] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 32 }}
      >
        {tickerItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate && onNavigate(item.target)}
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <span className="text-[#D4AF37] text-xs sm:text-sm animate-pulse">◆</span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm font-light tracking-wide text-[#E8DCC4]/80 hidden md:inline">
              {item.desc}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
