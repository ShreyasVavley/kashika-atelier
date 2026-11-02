import React from 'react';
import { Award, ShieldCheck, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
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
    <div className="bg-[#FAF8F5] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-2">
          <span>⚜</span> The Karigar Provenance Ledger <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight mb-4">
          The Sacred Art of Kadwa Handloom
        </h1>
        <p className="text-base font-editorial italic text-[#44403C]">
          No computer powerlooms. No mass-produced cut-work. Just 144 hours of unbroken ancestral craftsmanship.
        </p>
      </div>

      {/* Hero Master Weaver Photo Banner */}
      <div className="relative rounded overflow-hidden shadow-2xl border border-[#B8860B]/30 mb-20 min-h-[420px] flex items-end">
        <img
          src={BRAND_ASSETS.craftLoom}
          alt="Master Handloom Weaver Varanasi"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 text-white max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B8860B]/30 border border-[#B8860B] text-[#FBF4DE] text-[10px] uppercase tracking-widest font-sans font-bold mb-3">
            <span>⚜ Ustad Bashir Ahmed • 4th Generation Master Weaver</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-editorial font-bold mb-3">
            "A Banarasi Saree is Prayed Into Existence."
          </h2>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-200 leading-relaxed max-w-2xl">
            Our master weavers in Varanasi spend 18 unbroken days at the wooden pit loom, threading 2,400 silk warp yarns with tested silver bullion wire. Every motif is locked by hand so no rough threads touch your skin.
          </p>
        </div>
      </div>

      {/* 4-Step Photo Journal */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#1C1917] mb-2">
            The 4 Stages of an Heirloom
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#78716C] font-sans">
            From the sacred mulberry farms to the royal durbar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="group bg-white rounded overflow-hidden shadow-md border border-[#B8860B]/20 hover:border-[#781224] transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={st.image}
                  alt={st.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <span className="absolute top-3 left-3 text-2xl font-editorial font-bold text-[#D4AF37]">
                  {st.num}
                </span>
                <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-[#FBF4DE] font-sans">
                  {st.region}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-editorial font-bold text-[#1C1917] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs font-sans text-[#78716C] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-sans text-emerald-800 font-semibold">
                  <span>Guild Verified</span>
                  <span>✓ 100% Handloom</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Connoisseur Transparency Guide */}
      <div className="bg-white p-8 sm:p-12 rounded border border-[#B8860B]/30 shadow-md mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-bold block mb-1">
            ⚜ The Connoisseur’s Eye
          </span>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#1C1917] mb-2">
            Pure Kadwa vs. Factory Powerloom
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authentic Kashika Card */}
          <div className="p-6 bg-[#FAF8F5] rounded border-2 border-emerald-800/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-sans font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>House of Kashika (Pure Handloom Kadwa)</span>
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-[#44403C]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>No Loose Threads:</strong> Reverse side is as smooth as butter; zero floats cut by scissors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>98.2% Real Silver Zari:</strong> Never tarnishes black; preserves golden sheen for 100+ years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>18 Days on Pit Loom:</strong> Handcrafted by master artisans with generational guild lineage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>Ministry of Textiles:</strong> 100% certified Silk Mark India authentication.</span>
              </li>
            </ul>
          </div>

          {/* Machine Replica Card */}
          <div className="p-6 bg-stone-50 rounded border border-rose-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-sans font-bold text-sm uppercase tracking-wider">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Commercial Machine Copy (Powerloom)</span>
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-stone-500">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Rough Cut-Work:</strong> Mechanical scissors cut threads, leaving scratchy edges against skin.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Plastic Metallic Lurex:</strong> Synthetic polyester foil that turns dull black within 2 years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>45-Minute Electric Loom:</strong> Mass produced without artisan touch or heirloom durability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Uncertified Blends:</strong> Often mixed with cheap viscose or nylon threads.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('collection')}
          className="px-9 py-4 bg-[#781224] text-white text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Inspect The 5 Colorways in Person</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
