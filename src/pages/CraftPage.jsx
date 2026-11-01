import React from 'react';
import { Award, ShieldCheck, Clock, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function CraftPage({ onNavigate }) {
  const steps = [
    {
      num: '01',
      title: 'Mulberry Sericulture & Pure Silk Reeling',
      region: 'Sidlaghatta, Karnataka',
      desc: 'Only Grade-A mulberry cocoons are harvested. The filaments are hand-reeled to maintain unbroken tensile strength, producing the coveted, heavy-weight Katan silk warp that gives our sarees their legendary, graceful fall.'
    },
    {
      num: '02',
      title: 'Sacred Vat Dyeing in Pure Copper Cauldrons',
      region: 'Ghats of Varanasi',
      desc: 'Raw silk skeins are steeped in natural mineral and vegetable dyes — pure vermilion kumkuma, true fermented indigo cakes, and sun-dried saffron turmeric — locked in through slow boiling in hand-hammered copper vessels.'
    },
    {
      num: '03',
      title: 'The Naksha Mathematical Graph & Punching',
      region: 'Madanpura Guild, Varanasi',
      desc: 'Before a single thread is thrown, the master naqshaband drafts the Mayil Jangla motif onto graph paper with pinpoint mathematical precision. Thousands of individual punch cards are hand-cut to orchestrate the jacquard harness.'
    },
    {
      num: '04',
      title: '144 Hours on the Wooden Pit Loom',
      region: 'Atelier Shivala, Varanasi',
      desc: 'Using the ancient Kadwa technique, each floral buti and peacock plumage is individually hand-embroidered with separate silver spools (tilis) as the shuttle passes. No loose threads are left on the reverse side.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-3">
          <span>⚜</span> The Karigar Provenance Ledger <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight mb-4">
          The Lost Art of Kadwa Handloom
        </h1>
        <p className="text-base sm:text-lg font-editorial italic text-[#44403C]">
          In an era of disposable digital fast-fashion and high-speed synthetic powerlooms, we preserve the unhurried majesty of genuine Indian handloom weaving.
        </p>
      </div>

      {/* Master Weaver Profile Banner */}
      <div className="bg-white p-8 sm:p-12 rounded border border-[#B8860B]/30 shadow-sm mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 text-center lg:text-left">
          <div className="w-24 h-24 rounded-full bg-[#781224] text-[#FAF8F5] flex items-center justify-center mx-auto lg:mx-0 text-3xl font-crest mb-4 border-2 border-[#B8860B]">
            ⚜
          </div>
          <span className="text-xs uppercase tracking-widest text-[#8A661C] font-sans font-semibold block mb-1">
            Master Artisan & Loom Custodian
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-1">
            Ustad Bashir Ahmed
          </h2>
          <p className="text-xs font-sans text-[#78716C] uppercase tracking-wider">
            4th Generation Master Weaver • Varanasi Old Quarter
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4 text-sm sm:text-base font-editorial text-[#44403C] leading-relaxed border-t lg:border-t-0 lg:border-l border-[#B8860B]/20 pt-6 lg:pt-0 lg:pl-8">
          <p>
            "A true Banarasi saree is not merely woven; it is prayed into existence. When we throw the wooden shuttle across the 2,400 silk threads, our fingers remember the rhythms of our great-grandfathers who wove for the royal houses of Kashi and Awadh."
          </p>
          <p className="text-xs font-sans text-[#78716C] uppercase tracking-widest">
            Recipient of the National Handloom Heritage Guild Recognition • Over 42 Years at the Pit Loom
          </p>
        </div>
      </div>

      {/* 4-Stage Artisanal Timeline */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-editorial text-[#1C1917] mb-2">
            The Journey of 144 Loom Hours
          </h2>
          <p className="text-sm font-editorial italic text-[#78716C]">
            From mulberry farm to your family heirloom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="bg-white p-6 rounded border border-[#B8860B]/20 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-editorial font-bold text-[#781224] block mb-2">{st.num}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8A661C] font-sans block mb-1">{st.region}</span>
                <h3 className="text-lg font-editorial font-bold text-[#1C1917] mb-3">{st.title}</h3>
                <p className="text-xs font-sans text-[#44403C] leading-relaxed">{st.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#B8860B]/10 flex items-center justify-between text-[11px] font-sans text-[#78716C]">
                <span>Stage Verified</span>
                <span className="text-emerald-700">✓ Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Handloom vs Powerloom Comparison Table */}
      <div className="bg-white p-8 sm:p-12 rounded border border-[#B8860B]/30 shadow-sm mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-editorial text-[#1C1917] mb-2">
            The Connoisseur’s Guide to Authenticity
          </h2>
          <p className="text-sm font-editorial italic text-[#78716C]">
            How to distinguish a genuine Kashika Kadwa handloom from a machine-made copy.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
            <thead>
              <tr className="border-b-2 border-[#B8860B]/30 text-xs uppercase tracking-widest text-[#1C1917]">
                <th className="py-4 px-4 font-bold">Provenance Parameter</th>
                <th className="py-4 px-4 font-bold text-[#781224] bg-[#781224]/5">House of Kashika (Pure Kadwa)</th>
                <th className="py-4 px-4 font-bold text-stone-500">Commercial Powerloom Replica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8860B]/10">
              <tr>
                <td className="py-4 px-4 font-semibold text-[#1C1917]">Weaving Technique</td>
                <td className="py-4 px-4 text-[#781224] bg-[#781224]/5 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Hand-manipulated Kadwa with locked thread spools</span>
                </td>
                <td className="py-4 px-4 text-stone-500 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-700" />
                  <span>Mechanical cut-work leaving raw clipped threads</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#1C1917]">Zari Purity & Composition</td>
                <td className="py-4 px-4 text-[#781224] bg-[#781224]/5 font-medium">
                  98.2% Tested Silver Wire, electro-gilded in 24K Liquid Gold
                </td>
                <td className="py-4 px-4 text-stone-500">
                  Plastic metallic polyester yarn (Lurex / synthetic foil)
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#1C1917]">Heirloom Durability</td>
                <td className="py-4 px-4 text-[#781224] bg-[#781224]/5 font-medium">
                  Dynastic: 80–120+ years when preserved in muslin wrap
                </td>
                <td className="py-4 px-4 text-stone-500">
                  Fragile: Synthetic zari tarnishes black within 24 months
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#1C1917]">Artisan Loom Duration</td>
                <td className="py-4 px-4 text-[#781224] bg-[#781224]/5 font-medium">
                  144 Hours across 18 unbroken days
                </td>
                <td className="py-4 px-4 text-stone-500">
                  Mass produced in 45 minutes on high-speed electric loom
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#1C1917]">Certification</td>
                <td className="py-4 px-4 text-[#781224] bg-[#781224]/5 font-medium">
                  100% Ministry of Textiles Silk Mark India QR Certified
                </td>
                <td className="py-4 px-4 text-stone-500">
                  Uncertified synthetic or art-silk blend
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('collection')}
          className="px-8 py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Witness The Masterpiece in 5 Colorways</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
