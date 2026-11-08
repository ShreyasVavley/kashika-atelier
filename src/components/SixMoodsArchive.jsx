import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SIX_MOODS } from '../data/showcaseData';

export default function SixMoodsArchive({ onNavigate, onSelectColorway }) {
  const handleMoodClick = (mood) => {
    if (onSelectColorway && mood.colorwayId) {
      onSelectColorway(mood.colorwayId);
    }
    if (onNavigate) {
      onNavigate('collection');
    }
  };

  return (
    <section id="six-moods" className="py-20 sm:py-28 bg-[#FFFFFF] text-stone-900 relative overflow-hidden border-b border-stone-200/80">
      {/* Subtle modern gallery ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#7A1C28] mb-3">
              <span className="w-6 h-[1.5px] bg-[#7A1C28]" />
              THE KASHIKA ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-[#1A1A1A]">
              Six Moods.{' '}
              <span className="bg-gradient-to-r from-[#7A1C28] via-[#B83244] to-[#C59B27] bg-clip-text text-transparent font-medium">
                Timeless Drapes
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-stone-600 max-w-md font-sans leading-relaxed md:text-right">
            Woven by hand, worn for a lifetime. Six silk stories, from sacred morning rituals to imperial banquet galas.
          </p>
        </div>

        {/* 6 Gopuram Temple-Arch Window Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {SIX_MOODS.map((mood, idx) => (
            <motion.div
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer flex flex-col items-center select-none"
            >
              {/* Arch Silhouette Container */}
              <div className="relative w-full aspect-[9/16] rounded-t-[70px] sm:rounded-t-[90px] rounded-b-lg p-[2px] transition-all duration-500 shadow-md group-hover:shadow-[0_20px_40px_rgba(122,28,40,0.18)]">
                {/* Kalasam Finial Icon at Top Apex */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 text-[#C59B27] drop-shadow-sm transition-transform duration-300 group-hover:scale-125">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8H9L12 2ZM12 8C14.5 8 16 10 16 13C16 16.5 13.5 19 12 21C10.5 19 8 16.5 8 13C8 10 9.5 8 12 8Z" />
                  </svg>
                </div>

                {/* Golden Gopuram Frame Border */}
                <div className="absolute inset-0 rounded-t-[70px] sm:rounded-t-[90px] rounded-b-lg border-2 border-[#C59B27]/40 group-hover:border-[#C59B27] transition-colors duration-500" />
                <div className="absolute inset-[3px] rounded-t-[67px] sm:rounded-t-[87px] rounded-b-md border border-[#C59B27]/20 group-hover:border-[#C59B27]/60 transition-colors duration-500" />

                {/* Inner Image Canvas */}
                <div className="w-full h-full rounded-t-[66px] sm:rounded-t-[86px] rounded-b-md overflow-hidden bg-stone-100 relative">
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Micro Count Pill */}
                  <div className="absolute top-6 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C59B27]/40 text-[9px] uppercase tracking-wider text-[#FBF9F5]">
                    {mood.count}
                  </div>

                  {/* Hover Explore Pill */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A1C28] text-white text-[10px] font-medium tracking-wider shadow-lg whitespace-nowrap">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>

              {/* Mood Caption */}
              <div className="mt-4 text-center">
                <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:text-[#7A1C28] transition-colors">
                  {mood.title}
                </h3>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5 line-clamp-1">
                  {mood.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
