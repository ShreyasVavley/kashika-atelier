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
      desc: 'Grade-A mulberry cocoons hand-reeled for unbroken tensile strength.'
    },
    {
      num: '02',
      title: 'Sacred Vat Dyeing',
      region: 'Ghats of Varanasi',
      image: BRAND_ASSETS.varanasiatelier,
      desc: 'Natural vat infusion with pure kumkuma, indigo, and saffron.'
    },
    {
      num: '03',
      title: 'The Naksha Graph',
      region: 'Madanpura Guild',
      image: BRAND_ASSETS.jewelryGold,
      desc: 'Thread-by-thread naksha graphs punched into master pattern cards.'
    },
    {
      num: '04',
      title: 'Pit Loom Weaving',
      region: 'Atelier Shivala, Varanasi',
      image: BRAND_ASSETS.craftLoom,
      desc: '144 hours of hand-manipulated Kadwa weft embroidery.'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5]">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> Karigar Lineage <span>⚜</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-tight">
          The Sacred Kadwa Weave
        </h1>
        <p className="text-xs sm:text-sm font-editorial italic text-stone-400">
          144 hours on traditional wooden pit looms. Zero cut-work floats.
        </p>

        {/* Visual Metric Chips */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs font-sans">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-stone-200">
            <span>⏱</span> 144 Loom Hours
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-[#D4AF37]">
            <span>🪙</span> 98.2% Silver Zari
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-stone-200">
            <span>🧵</span> 2,400 Warp Threads / m
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-emerald-400">
            <span>📜</span> Silk Mark Certified
          </span>
        </div>
      </motion.div>

      {/* Hero Master Weaver Photo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85 }}
        className="relative rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-[#D4AF37]/30 mb-24 min-h-[420px] flex items-end group"
      >
        <img
          src={BRAND_ASSETS.craftLoom}
          alt="Master Handloom Weaver Varanasi"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.58] contrast-[1.1] group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 text-white max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-bold">
            <span>⚜ Ustad Bashir Ahmed • Master Weaver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal leading-tight text-[#FBF9F5]">
            "A Banarasi Saree is Prayed Into Existence."
          </h2>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-300">
            18 days on the pit loom. Hand-locked Kadwa with zero rough threads on reverse.
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

        <div className="lg:col-span-6 p-8 sm:p-12 space-y-4 font-sans">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Bullion Metallurgy
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-white">
              98.2% Silver Core & 24K Liquid Gold
            </h3>
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
          </div>

          <p className="text-xs sm:text-sm font-editorial italic text-stone-300">
            98.2% pure silver micro-ribbons dipped in liquid 24K gold. Zero synthetic plastic lurex.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3 bg-black/50 rounded border border-white/10">
              <span className="text-[#D4AF37] font-bold block text-sm mb-0.5">Zero Tarnishing</span>
              <span className="text-stone-400 text-[11px] block">100+ year golden luminescence.</span>
            </div>
            <div className="p-3 bg-black/50 rounded border border-white/10">
              <span className="text-[#D4AF37] font-bold block text-sm mb-0.5">Laboratory Assay</span>
              <span className="text-stone-400 text-[11px] block">Certified bullion purity seal.</span>
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
        className="bg-[#121212] p-8 sm:p-12 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl mb-20"
      >
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
            ⚜ The Connoisseur's Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#FBF9F5]">
            Pure Kadwa vs. Factory Powerloom
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentic Kashika Card */}
          <div className="p-6 bg-[#0A0A0A] rounded-lg border-[0.5px] border-emerald-500/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-sans font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>House of Kashika (Pure Handloom Kadwa)</span>
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-stone-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>No Loose Threads:</strong> Smooth butter reverse; zero cut floats.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>98.2% Silver Zari:</strong> Never turns black; 100+ year sheen.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>18 Days on Loom:</strong> Hand-manipulated by master weavers.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Government Verified:</strong> Silk Mark India QR credential.</span>
              </li>
            </ul>
          </div>

          {/* Machine Replica Card */}
          <div className="p-6 bg-[#0A0A0A] rounded-lg border-[0.5px] border-rose-500/30 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-sans font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Commercial Powerloom Copy</span>
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-stone-400">
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Rough Cut-Work:</strong> Scratchy trimmed reverse threads.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Plastic Metallic Lurex:</strong> Synthetic foil turns dull black.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>45-Minute Electric Speed:</strong> Mass-produced commercial weave.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Synthetic Blends:</strong> Mixed with viscose and nylon yarns.</span>
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
