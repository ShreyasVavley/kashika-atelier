import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#FBF9F5] border-t border-[0.5px] border-[#D4AF37]/20 pt-20 pb-12 px-6 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <span className="text-base">⚜</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">House of Kashika</span>
          </div>
          <h2 className="text-2xl font-crest tracking-[0.15em] text-white">
            KASHIKA
          </h2>
          <p className="text-xs text-stone-400 font-editorial italic leading-relaxed max-w-sm">
            Varanasi • Since 1948. Handcrafted pure mulberry silk & tested silver bullion.
          </p>
        </div>

        {/* Column 1: Curations */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
            The Atelier
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button onClick={() => { onNavigate('collection'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                The 5 Colorways
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('trousseau'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Bridal Trousseau Trunk
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('craft'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Karigar Ledger
              </button>
            </li>
            <li>
              <button onClick={() => { onNavigate('salon'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Private Viewing Suite
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Boutiques */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
            Sanctuaries
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>Bengaluru (Lavelle Rd)</li>
            <li>Varanasi (Shivala Ghat)</li>
            <li>London (Mayfair Suite)</li>
            <li className="pt-1 text-[#D4AF37] font-semibold">+91 76767 21111</li>
          </ul>
        </div>

        {/* Column 3: Compact Newsletter Input Line */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
            The Imperial Gazette
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Private invitations to seasonal loom releases.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center pt-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] pr-10"
            />
            <button
              type="submit"
              className="absolute right-2 p-1.5 text-stone-400 hover:text-[#D4AF37] transition-colors"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
          {subscribed && (
            <span className="text-[11px] text-emerald-400 block">✓ Subscribed to the Gazette.</span>
          )}
        </div>
      </div>

      {/* Bottom Minimal Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <p>© 1948–2026 House of Kashika Atelier. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Handcrafted in Bharat</span>
          <span>•</span>
          <span className="text-[#D4AF37]">Silk Mark India</span>
          <span>•</span>
          <span>Insured Global Courier</span>
        </div>
      </div>
    </footer>
  );
}
