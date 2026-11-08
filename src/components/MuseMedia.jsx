import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  MUSE_REELS,
  MUSE_STREAM_LEFT,
  MUSE_STREAM_RIGHT,
} from '../data/showcaseData';

export default function MuseMedia({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(2); // Center reel

  const handleReelPrev = () => {
    setActiveReelIndex((prev) => (prev > 0 ? prev - 1 : MUSE_REELS.length - 1));
  };

  const handleReelNext = () => {
    setActiveReelIndex((prev) => (prev < MUSE_REELS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div id="muse-film" className="bg-[#FFFFFF] text-[#1C1917] relative border-b border-stone-200 overflow-hidden">
      {/* =========================================================================
          PART 1: THE MUSE FILM (Dual-Stream Opposing Parallax)
      ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
              <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
              THE MUSE FILM
              <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
              Feel the{' '}
              <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
                drape
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-2">
              The living pulse of Varanasi pit looms and the fluid poetry of pure mulberry silk.
            </p>
          </div>

          {/* Central Film with Dual Streaming Columns */}
          <div className="relative flex items-center justify-center gap-4 sm:gap-8 min-h-[460px] sm:min-h-[540px]">
            {/* Left Streamer Column (scrolls downwards) */}
            <div className="hidden lg:flex flex-col gap-4 w-44 h-[500px] overflow-hidden relative select-none">
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              <motion.div
                className="flex flex-col gap-4 shrink-0"
                animate={{ y: ['-50%', '0%'] }}
                transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              >
                {[...MUSE_STREAM_LEFT, ...MUSE_STREAM_LEFT].map((img, i) => (
                  <div key={i} className="w-44 h-48 rounded-2xl overflow-hidden shadow-md shrink-0 bg-stone-100 border border-stone-200">
                    <img src={img} alt="Streamer Left" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Central 16:9 Brand Film Player */}
            <div className="relative w-full max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#C59B27]/40 p-1 bg-gradient-to-br from-[#D4AF37]/30 via-transparent to-[#D4AF37]/20 flex items-center justify-center">
              {/* Gold Corner Architectural Brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#C59B27] z-20" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#C59B27] z-20" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#C59B27] z-20" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#C59B27] z-20" />

              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-stone-900 group">
                {/* Fallback Editorial Video Poster / Backdrop */}
                <img
                  src="/images/hero_bridal_drape.jpg"
                  alt="Muse Film Drape"
                  className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-700"
                />

                {/* Ambient Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Central Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>

                {/* Sound Toggle Pill */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="absolute bottom-5 left-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider flex items-center gap-2 hover:bg-black/80 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
                  <span>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
                </button>

                {/* Location Pill */}
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] tracking-widest uppercase">
                  Varanasi • Ganges Sanctuary
                </div>
              </div>
            </div>

            {/* Right Streamer Column (scrolls upwards) */}
            <div className="hidden lg:flex flex-col gap-4 w-44 h-[500px] overflow-hidden relative select-none">
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              <motion.div
                className="flex flex-col gap-4 shrink-0"
                animate={{ y: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              >
                {[...MUSE_STREAM_RIGHT, ...MUSE_STREAM_RIGHT].map((img, i) => (
                  <div key={i} className="w-44 h-48 rounded-2xl overflow-hidden shadow-md shrink-0 bg-stone-100 border border-stone-200">
                    <img src={img} alt="Streamer Right" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* CTA Below Film */}
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate && onNavigate('collection')}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#7A1C28] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_10px_25px_rgba(122,28,40,0.3)] hover:shadow-[0_15px_35px_rgba(122,28,40,0.45)] transition-all"
            >
              <span>Purchase the Collection</span>
              <div className="w-6 h-6 rounded-full bg-white text-[#7A1C28] flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 2: THE MUSE REELS (3D Arc Video Stream)
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
                <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
                THE MUSE REELS
              </div>
              <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
                Silk,{' '}
                <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
                  in motion.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs text-stone-500 font-sans max-w-xs hidden sm:block">
                Five drapes filmed the way they are lived in — lamp rooms, temple lanes, a morning by the sea.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReelPrev}
                  aria-label="Previous reel"
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-800 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label="Toggle playback"
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-800 transition-colors shadow-sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={handleReelNext}
                  aria-label="Next reel"
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-800 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3D Arc Reel Cards Viewport */}
          <div className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center overflow-hidden">
            {MUSE_REELS.map((reel, idx) => {
              const offset = idx - activeReelIndex;
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Arc math
              const rotateY = offset * 18;
              const translateX = offset * 210;
              const scale = isCenter ? 1.05 : 0.85 - Math.abs(offset) * 0.05;
              const zIndex = isCenter ? 30 : 20 - Math.abs(offset);
              const opacity = isCenter ? 1 : 0.65;

              return (
                <motion.div
                  key={reel.id}
                  onClick={() => setActiveReelIndex(idx)}
                  animate={{
                    x: translateX,
                    scale,
                    rotateY: `${rotateY}deg`,
                    opacity,
                    zIndex,
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                  className="absolute w-[220px] sm:w-[260px] h-[380px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer select-none shadow-[0_20px_45px_rgba(0,0,0,0.2)] bg-black border border-white/20"
                  style={{ transformPerspective: 1200 }}
                >
                  <img
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                  {/* Top Bar: Number & Duration */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {reel.number}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Center Play Button for Active Reel */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-900 shadow-xl hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-stone-900 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Metadata Card */}
                  <div className="absolute bottom-4 inset-x-4">
                    <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold block font-mono">
                      {reel.fabric}
                    </span>
                    <h3 className="text-sm font-semibold text-white tracking-wide mt-0.5">
                      {reel.title}
                    </h3>
                    <p className="text-[11px] text-white/70 font-sans mt-0.5 line-clamp-1">
                      {reel.location}
                    </p>

                    {/* Gold Progress Bar on Active Reel */}
                    {isCenter && (
                      <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C07B]"
                          animate={{ width: isPlaying ? ['0%', '100%'] : '50%' }}
                          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
