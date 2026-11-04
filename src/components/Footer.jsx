import React, { useState } from 'react';
import {
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function Footer({ onNavigate, onOpenVerifier }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#FBF9F5] border-t border-white/10 font-sans relative overflow-hidden">
      {/* 1. Minimal Newsletter */}
      <div className="border-b border-white/10 py-14 px-6 sm:px-8">
        <div className="max-w-xl mx-auto text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold">
            ⚜ The Atelier Ledger ⚜
          </span>
          <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#FBF9F5]">
            Private Loom Previews
          </h3>
          <p className="text-xs font-editorial italic text-stone-400">
            Invitations to limited handloom releases and bridal previews.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="pt-2 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-full text-xs text-[#FBF9F5] placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-all shadow-md shrink-0 btn-shimmer"
            >
              {subscribed ? 'Inscribed ✓' : 'Join'}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Proper 3-Column Luxury Directory */}
      <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5 text-[#D4AF37]">
            <span className="text-sm">⚜</span>
            <span className="text-xl font-editorial font-bold tracking-[0.2em] text-[#FBF9F5] uppercase">
              KASHIKA
            </span>
          </div>
          <p className="text-xs font-sans text-stone-400 max-w-sm">
            Handcrafted pure mulberry silk & tested silver zari since 1948. Shivala Ghat, Varanasi.
          </p>
          <div className="pt-1 flex items-center gap-2">
            <a
              href="https://wa.me/917676721111"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 text-stone-300 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp Concierge"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:concierge@kashika-atelier.com"
              className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-stone-300 hover:text-[#D4AF37] transition-colors"
              aria-label="Email Concierge"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:+917676721111"
              className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-stone-300 hover:text-[#D4AF37] transition-colors"
              aria-label="Telephone Desk"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Collections Column */}
        <div className="md:col-span-3 space-y-2.5">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] block">
            Collections
          </span>
          <ul className="space-y-1.5 text-xs font-sans text-stone-400">
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                The 5 Colorways
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                Banarasi Katan Silk
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('trousseau');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                Bridal Trousseau Trunk
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('atelier');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                Fresh Weaves
              </button>
            </li>
          </ul>
        </div>

        {/* Services & Assay Column */}
        <div className="md:col-span-4 space-y-2.5">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] block">
            Authenticity & Services
          </span>
          <ul className="space-y-1.5 text-xs font-sans text-stone-400">
            <li>
              <button
                onClick={() => {
                  if (onOpenVerifier) onOpenVerifier();
                }}
                className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 text-stone-300"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verify Loom Hallmark & Zari Assay</span>
              </button>
            </li>
            <li>
              <a
                href="https://wa.me/917676721111?text=Pranam%20Kashika%20Atelier.%20I%20wish%20to%20book%20an%20HD%20Video%20Draping%20Consultation."
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
              >
                <span>HD Video Drape Consultation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                Karigar Pit Loom Guild
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('salon');
                  scrollToTop();
                }}
                className="hover:text-white transition-colors"
              >
                Private Viewing Suites (Bengaluru & Varanasi)
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Minimal Copyright Bar */}
      <div className="max-w-7xl mx-auto py-6 px-6 sm:px-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
        <span>© 1948–2026 House of Kashika Atelier. Shivala Ghat, Varanasi.</span>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-stone-400">
          <span>Silk Mark Certified</span>
          <span>•</span>
          <span>98.2% Pure Silver Zari</span>
          <span>•</span>
          <span>Handloom Registry</span>
        </div>
      </div>
    </footer>
  );
}
