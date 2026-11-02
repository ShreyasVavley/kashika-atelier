import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Clock, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_ASSETS } from '../data/sarees';

export default function CraftPage({ onNavigate }) {
  const steps = [
    {
      num: '01',
      title: 'Mulberry Silk Reeling',
      region: 'Sidlaghatta, Karnataka',
      image: BRAND_ASSETS.templeHeritage,
      desc: 'Hand-reeled Grade-A Karnataka mulberry cocoons delivering unbroken tensile strength for an authentic royal drape.'
    },
    {
      num: '02',
      title: 'Sacred Vat Dyeing',
      region: 'Ghats of Varanasi',
      image: BRAND_ASSETS.varanasiSanctuary,
      desc: 'Steeped in pure kumkuma vermilion, indigo cakes, and sun-dried saffron turmeric boiled in hand-hammered copper cauldrons.'
    },
    {
      num: '03',
      title: 'The Naksha Mathematical Graph',
      region: 'Madanpura Guild',
      image: BRAND_ASSETS.jewelryGold,
      desc: 'Mathematical naksha graphs punched into thousands of individual cards to guide the jacquard harness thread-by-thread.'
    },
    {
      num: '04',
      title: '144 Hours on the Wooden Pit Loom',
      region: 'Atelier Shivala, Varanasi',
      image: BRAND_ASSETS.craftLoom,
      desc: 'Hand-manipulated Kadwa weft embroidery where every single peacock and lotus buti is individually locked with silver tilis.'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] py-32 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5]">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-20 space-y-3"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> The Karigar Provenance Ledger <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#FBF9F5] tracking-tight">
          The Sacred Art of Kadwa Handloom
        </h1>
        <p className="text-sm sm:text-base font-editorial italic text-stone-300 leading-relaxed">
          No computer powerlooms. No mass-produced cut-work. Just 144 hours of unbroken ancestral craftsmanship.
        </p>

        {/* Visual Metric Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-sans">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-stone-200 shadow-sm">
            <span>⏱</span> 144 Loom Hours
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-[#D4AF37] shadow-sm">
            <span>🪙</span> 98.2% Tested Silver Zari
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-stone-200 shadow-sm">
            <span>🧵</span> 2,400 Warp Threads / m
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-emerald-400 shadow-sm">
            <span>📜</span> Silk Mark India Certified
          </span>
        </div>
      </motion.div>

      {/* Hero Master Weaver Photo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85 }}
        className="relative rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-[#D4AF37]/30 mb-28 min-h-[460px] flex items-end group"
      >
        <img
          src={BRAND_ASSETS.craftLoom}
          alt="Master Handloom Weaver Varanasi"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.58] contrast-[1.1] group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="relative z-10 p-8 sm:p-14 text-white max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-bold">
            <span>⚜ Ustad Bashir Ahmed • 4th Generation Master Weaver</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-editorial font-normal leading-tight text-[#FBF9F5]">
            "A Banarasi Saree is Prayed Into Existence."
          </h2>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-300 leading-relaxed max-w-2xl">
            18 unbroken days at the wooden pit loom, threading 2,400 silk warp yarns with tested silver bullion wire. Every motif is hand-locked so no rough threads touch your skin.
          </p>
        </div>
      </motion.div>

      {/* 4-Step Photo Journal */}
      <div className="mb-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#FBF9F5]">
            The 4 Stages of an Heirloom
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans">
            From the sacred mulberry farms to the royal durbar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, idx) => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group bg-[#121212] rounded-lg overflow-hidden shadow-md border border-[0.5px] border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col"
            >
              <div className="relative h-52 overflow-hidden bg-stone-900">
                <img
                  src={st.image}
                  alt={st.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <span className="absolute top-3 left-3 text-2xl font-editorial font-bold text-[#D4AF37]">
                  {st.num}
                </span>
                <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-stone-300 font-sans">
                  {st.region}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-editorial font-normal text-[#FBF9F5] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs font-sans text-stone-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans text-emerald-400 font-medium">
                  <span>Guild Verified</span>
                  <span>✓ 100% Handloom</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Extreme Macro Zari Detail Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85 }}
        className="bg-[#121212] text-[#FAF8F5] rounded-lg border border-[#D4AF37]/30 shadow-2xl overflow-hidden mb-24 grid grid-cols-1 lg:grid-cols-12 items-center"
      >
        <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] overflow-hidden group">
          <img
            src={BRAND_ASSETS.zariDetail}
            alt="Extreme Macro Banarasi Kadwa Peacock Zari Weave"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
              Macro Hasselblad Medium Format Capture
            </span>
            <span className="text-sm font-editorial italic text-stone-300">
              Peacock Kadwa Weft with Tested 98.2% Silver Core
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 font-sans">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Bullion Metallurgy
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-white">
              The 98.2% Silver Core & 24K Liquid Gold
            </h3>
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
          </div>

          <p className="text-xs sm:text-sm font-editorial italic text-stone-300 leading-relaxed">
            Unlike commercial lurex foil (plastic polyester), authentic Varanasi zari begins with 98.2% pure silver bullion flattened into micro-ribbons, wound around fine mulberry silk cores, and dipped into 24K liquid gold.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3.5 bg-black/50 rounded border border-white/10">
              <span className="text-[#D4AF37] font-bold block text-sm mb-1">Zero Tarnishing</span>
              <span className="text-stone-400 text-[11px] leading-tight block">Preserves radiant golden luminescence for generations.</span>
            </div>
            <div className="p-3.5 bg-black/50 rounded border border-white/10">
              <span className="text-[#D4AF37] font-bold block text-sm mb-1">Heirloom Assay</span>
              <span className="text-stone-400 text-[11px] leading-tight block">Government certified laboratory bullion verification certificate.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visual Connoisseur Transparency Guide */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85 }}
        className="bg-[#121212] p-8 sm:p-14 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl mb-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
            ⚜ The Connoisseur's Eye
          </span>
          <h2 className="text-2xl sm:text-4xl font-editorial font-normal text-[#FBF9F5]">
            Pure Kadwa vs. Factory Powerloom
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authentic Kashika Card */}
          <div className="p-8 bg-[#0A0A0A] rounded-lg border-[0.5px] border-emerald-500/40 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-emerald-400 font-sans font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>House of Kashika (Pure Handloom Kadwa)</span>
            </div>
            <ul className="space-y-3 text-xs font-sans text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>No Loose Threads:</strong> Reverse side is as smooth as butter; zero floats cut by scissors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>98.2% Real Silver Zari:</strong> Never tarnishes black; preserves golden sheen for 100+ years.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>18 Days on Pit Loom:</strong> Handcrafted by master artisans with generational guild lineage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Ministry of Textiles:</strong> 100% certified Silk Mark India authentication.</span>
              </li>
            </ul>
          </div>

          {/* Machine Replica Card */}
          <div className="p-8 bg-[#0A0A0A] rounded-lg border-[0.5px] border-rose-500/30 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-rose-400 font-sans font-bold text-sm uppercase tracking-wider">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Commercial Machine Copy (Powerloom)</span>
            </div>
            <ul className="space-y-3 text-xs font-sans text-stone-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Rough Cut-Work:</strong> Mechanical scissors cut threads, leaving scratchy edges against skin.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Plastic Metallic Lurex:</strong> Synthetic polyester foil that turns dull black within 2 years.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>45-Minute Electric Loom:</strong> Mass produced without artisan touch or heirloom durability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Uncertified Blends:</strong> Often mixed with cheap viscose or nylon threads.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Call to action */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('collection')}
          className="px-10 py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl inline-flex items-center gap-2 btn-shimmer"
        >
          <span>Inspect The 5 Colorways in Person</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
