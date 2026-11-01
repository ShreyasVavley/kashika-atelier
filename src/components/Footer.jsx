import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] border-t-2 border-[#B8860B] pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
        {/* Brand Crest & Manifesto */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-[#B8860B]">
            <span className="text-xl">⚜</span>
            <span className="text-xs uppercase tracking-[0.3em] font-bold">House of Kashika</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-crest tracking-wider text-[#FAF8F5]">
            KASHIKA
          </h2>
          <p className="text-xs text-stone-400 font-editorial leading-relaxed max-w-sm">
            Woven in Varanasi since 1948. We preserve the sacred Kadwa handloom technique, weaving only one singular master naksha across five dynastic colorways with pure tested silver zari.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-[#B8860B]">
            <span>100% Silk Mark Certified</span>
            <span>•</span>
            <span>0% Machine Powerloom</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8860B] mb-4">
            The Atelier
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <button onClick={() => { onNavigate('atelier'); window.scrollTo(0,0); }} className="hover:text-[#FAF8F5] transition-colors">
                The Atelier Story
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('collection'); window.scrollTo(0,0); }} className="hover:text-[#FAF8F5] transition-colors">
                The Master Collection (5 Colors)
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('craft'); window.scrollTo(0,0); }} className="hover:text-[#FAF8F5] transition-colors">
                The Craft & Karigar Ledger
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('trousseau'); window.scrollTo(0,0); }} className="hover:text-[#FAF8F5] transition-colors">
                Bridal Trousseau Trunk
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('salon'); window.scrollTo(0,0); }} className="hover:text-[#FAF8F5] transition-colors">
                Private Salon Appointment
              </button>
            </li>
          </ul>
        </div>

        {/* Boutiques */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8860B] mb-4">
            Sanctuaries
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="font-semibold text-stone-300">Bengaluru Flagship:</li>
            <li className="text-[11px]">14 Lavelle Road, Shanthala Nagar</li>
            <li className="font-semibold text-stone-300 pt-2">Varanasi Loom Sanctuary:</li>
            <li className="text-[11px]">Shivala Ghat, Varanasi 221001</li>
            <li className="font-semibold text-stone-300 pt-2">London Suite:</li>
            <li className="text-[11px]">Mayfair, W1 (Private Viewing)</li>
          </ul>
        </div>

        {/* Gazette / Newsletter */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8860B] mb-4">
            The Imperial Gazette
          </h3>
          <p className="text-xs text-stone-400 mb-3">
            Receive private invitations to seasonal loom releases and private salon viewings.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Pranam. You are enrolled in the Imperial Gazette.'); }} className="space-y-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 text-xs text-stone-200 rounded focus:outline-none focus:border-[#B8860B]"
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#781224] text-white text-[11px] uppercase tracking-widest font-semibold rounded hover:bg-[#580B17] transition-all"
            >
              Request Gazette
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
        <p>© 1948–2026 House of Kashika Atelier Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="text-stone-400">Handcrafted in Bharat</span>
          <span>•</span>
          <span className="text-[#B8860B]">Pure Silver Zari Tested</span>
          <span>•</span>
          <span className="text-stone-400">Insured Global Courier</span>
        </div>
      </div>
    </footer>
  );
}
