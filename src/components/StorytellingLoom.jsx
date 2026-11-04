import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Flame,
  Layers,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { royalAudio } from '../utils/soundEngine';
import { BRAND_ASSETS } from '../data/sarees';

const CHAPTERS = [
  {
    id: 'warp',
    num: '01',
    tag: 'THE SACRED WARP',
    title: 'Grade-A Mulberry Silk',
    quote: '2,400 raw silk filaments drawn under sacred tension.',
    badge: '2,400 Silk Threads / m',
    image: BRAND_ASSETS.templeHeritage,
    accent: '#D4AF37',
  },
  {
    id: 'zari',
    num: '02',
    tag: 'THE BULLION CORE',
    title: '98.2% Silver & 24K Gold',
    quote: 'Sterling silver bullion dipped in molten 24K gold.',
    badge: '98.2% Pure Silver Bullion',
    image: BRAND_ASSETS.zariDetail,
    accent: '#E5C158',
  },
  {
    id: 'shuttle',
    num: '03',
    tag: 'THE PIT LOOM RHYTHM',
    title: '144 Hours of Kadwa Mastery',
    quote: 'Wooden shuttle glides. Zero loose threads on reverse.',
    badge: '18 Sun Cycles • 144 Hours',
    image: BRAND_ASSETS.craftLoom,
    accent: '#D4AF37',
  },
  {
    id: 'drape',
    num: '04',
    tag: 'THE LIVING HEIRLOOM',
    title: 'The Imperial Drape',
    quote: 'An unbroken masterpiece woven to outlive dynasties.',
    badge: 'Silk Mark India Verified',
    image: BRAND_ASSETS.heroBanner,
    accent: '#D4AF37',
  },
];

export default function StorytellingLoom({ onNavigate }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const activeChapter = CHAPTERS[activeChapterIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const duration = 6000; // 6 seconds per chapter
    const stepTime = 50;
    const increment = (stepTime / duration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((curr) => (curr + 1) % CHAPTERS.length);
          if (soundEnabled) {
            royalAudio.playSilkChord('gold');
          }
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [activeChapterIndex, isPlaying, soundEnabled]);

  const handleSelectChapter = (idx) => {
    setActiveChapterIndex(idx);
    setProgress(0);
    if (soundEnabled) {
      if (idx === 2) {
        royalAudio.playLoomShuttle();
      } else {
        royalAudio.playSilkChord(idx === 1 ? 'silver' : 'gold');
      }
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    royalAudio.toggle(nextState);
    if (nextState) {
      royalAudio.playZariShimmer();
    }
  };

  const handlePrev = () => {
    const nextIdx = activeChapterIndex === 0 ? CHAPTERS.length - 1 : activeChapterIndex - 1;
    handleSelectChapter(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeChapterIndex + 1) % CHAPTERS.length;
    handleSelectChapter(nextIdx);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#0A0A0A] via-[#160307] to-[#0A0A0A] text-[#FBF9F5] border-y border-white/10 overflow-hidden select-none">
      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* Section Header: Minimal & Poetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.38em] text-[#D4AF37] font-sans font-semibold flex items-center gap-2">
              <span>⚜</span> The Loom Chronicle <span>⚜</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#FBF9F5]">
              Birth of an Heirloom
            </h2>
          </div>

          {/* Controls: Audio Toggle + Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-sans font-semibold transition-all flex items-center gap-1.5 border ${
                soundEnabled
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
              }`}
              title="Toggle Royal Audio Soundscape"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Ambiance On' : 'Muted'}</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white transition-colors"
              aria-label={isPlaying ? 'Pause Story' : 'Play Story'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 4-Chapter Timeline Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className={`relative p-3.5 rounded-xl border text-left transition-all overflow-hidden ${
                  isActive
                    ? 'bg-black/80 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                    : 'bg-black/40 border-white/10 hover:border-white/25 text-stone-400 hover:text-stone-200'
                }`}
              >
                {/* Active Chapter Progress Bar Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                      className="h-full bg-[#D4AF37]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                    {ch.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-sans font-semibold text-stone-400">
                    {ch.tag}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-editorial font-bold text-white truncate">
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cinematic Animated Story Stage Canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-black min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Backdrop Image */}
              <img
                src={activeChapter.image}
                alt={activeChapter.title}
                className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* SPECIFIC CINEMATIC ANIMATIONS PER STAGE */}

              {/* STAGE 1 ANIMATION: 2,400 Silk Warp Threads in Tension */}
              {activeChapter.id === 'warp' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full max-w-2xl h-64 relative flex items-center justify-between px-8">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scaleY: [0.95, 1.05, 0.98],
                          opacity: [0.35, 0.9, 0.4],
                        }}
                        transition={{
                          duration: 1.8 + (i % 5) * 0.2,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                          delay: i * 0.04,
                        }}
                        className="w-[1.5px] h-full bg-gradient-to-b from-amber-200 via-[#D4AF37] to-amber-100 shadow-[0_0_8px_#D4AF37]"
                      />
                    ))}
                    {/* Golden Cross-Loom Tension Rod */}
                    <motion.div
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]"
                    />
                  </div>
                </div>
              )}

              {/* STAGE 2 ANIMATION: Molten Silver-Gold Bullion Wire Drawing */}
              {activeChapter.id === 'zari' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-72 h-72 flex items-center justify-center">
                    {/* Rotating Concentric Zari Rings */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/50"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-6 rounded-full border border-amber-300/40"
                    />
                    <motion.div
                      animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 via-[#D4AF37] to-amber-500 shadow-[0_0_40px_rgba(212,175,55,0.7)] flex items-center justify-center"
                    >
                      <span className="text-black font-serif text-2xl font-bold">⚜</span>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* STAGE 3 ANIMATION: Wooden Shuttle Sliding Back & Forth */}
              {activeChapter.id === 'shuttle' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full max-w-xl h-48 relative border-y border-[#D4AF37]/30 flex items-center">
                    {/* Warp Lines */}
                    <div className="absolute inset-0 flex justify-between px-6 opacity-30">
                      {[...Array(18)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-[#D4AF37]" />
                      ))}
                    </div>

                    {/* Sliding Wooden Shuttle */}
                    <motion.div
                      animate={{ x: ['-40%', '40%', '-40%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 w-28 h-7 rounded-full bg-gradient-to-r from-[#5a2e12] via-[#8B4513] to-[#5a2e12] border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-between px-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <div className="h-1 flex-1 mx-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    </motion.div>
                  </div>
                </div>
              )}

              {/* STAGE 4 ANIMATION: Specular Golden Light Sweep on Saree */}
              {activeChapter.id === 'drape' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.45)_0%,transparent_70%)] blur-2xl"
                  />
                </div>
              )}

              {/* Story Content Bottom Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-auto">
                <div className="space-y-2 max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-bold inline-block">
                    {activeChapter.badge}
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-editorial font-normal tracking-wide text-[#FBF9F5]">
                    {activeChapter.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-editorial italic text-stone-300">
                    {activeChapter.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] text-stone-300 hover:text-black border border-white/20 transition-colors"
                    aria-label="Previous Chapter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] text-stone-300 hover:text-black border border-white/20 transition-colors"
                    aria-label="Next Chapter"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('craft')}
                    className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-all shadow-xl btn-shimmer"
                  >
                    <span>Inspect Archive &rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
