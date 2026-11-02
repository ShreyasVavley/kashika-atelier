import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  Award,
  Clock,
  Compass,
} from 'lucide-react';

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
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#FBF9F5] border-t border-[0.5px] border-[#D4AF37]/25 font-sans relative overflow-hidden">
      {/* ============================================================== */}
      {/* 1. TOP NEWSLETTER / THE ROYAL LEDGER BANNER */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-b from-[#160307] to-[#0A0A0A] border-b border-white/10 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[#D4AF37]">
            <span className="text-lg">⚜</span>
            <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-bold">
              Private Salon Ledger
            </span>
            <span className="text-lg">⚜</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-editorial font-normal tracking-[0.1em] text-[#FBF9F5] uppercase">
            Join the Royal Ledger
          </h3>

          <p className="text-xs sm:text-sm font-editorial italic text-stone-300 max-w-xl mx-auto">
            Receive private invitations to confidential loom releases, rare colorway drops, and personal bridal trousseau appointments.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for private previews..."
                className="w-full px-5 py-3.5 bg-white/5 border border-white/15 rounded-full sm:rounded-l-full sm:rounded-r-none text-xs text-[#FBF9F5] placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full sm:rounded-r-full sm:rounded-l-none bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.25em] font-sans font-bold transition-all shadow-xl whitespace-nowrap btn-shimmer"
            >
              {subscribed ? 'INVITATION SENT' : 'REQUEST ACCESS'}
            </button>
          </form>

          {subscribed && (
            <span className="text-xs text-emerald-400 block pt-1 font-sans">
              ✓ Your address has been inscribed into the private salon ledger.
            </span>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN MULTI-COLUMN HAUTE COUTURE DIRECTORY */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Column 1: Brand & Atelier Lineage (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <span className="text-base">⚜</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">
                Maison de Haute Couture
              </span>
            </div>
            <h2 className="text-3xl font-crest tracking-[0.18em] text-white">
              KASHIKA
            </h2>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37] font-sans font-semibold">
              Varanasi • Est. 1948
            </p>
          </div>

          <p className="text-xs font-editorial italic text-stone-400 leading-relaxed max-w-sm">
            Purveyors of pure mulberry silk & tested silver bullion zari to royal trousseaus for over seven decades. Hand-woven on pit looms at Shivala Ghat.
          </p>

          {/* Social / Direct Channels */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://wa.me/917676721111"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366] text-stone-300 hover:text-[#25D366] transition-all"
              aria-label="WhatsApp Concierge"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C] text-stone-300 hover:text-[#E1306C] transition-all"
              aria-label="Instagram Lookbook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:concierge@kashika-atelier.com"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37] text-stone-300 hover:text-[#D4AF37] transition-all"
              aria-label="Email Concierge"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+917676721111"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37] text-stone-300 hover:text-[#D4AF37] transition-all"
              aria-label="Telephone Desk"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: The Collections (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37]">
            The Collections
          </h4>
          <ul className="space-y-2.5 text-xs font-sans text-stone-400">
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
              >
                <span>The 5 Colorways</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Rajkumari Katan Silk
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Royal Kadwa Jaal
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('trousseau');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
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
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Fresh Weaves & New Arrivals
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: The Craft Guild (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37]">
            Craft & Lineage
          </h4>
          <ul className="space-y-2.5 text-xs font-sans text-stone-400">
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Pit Loom Archive
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                98.2% Silver Zari Assay
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Karigar Guild Ledger
              </button>
            </li>
            <li>
              <span className="text-stone-500">Sidlaghatta Mulberry Warp</span>
            </li>
            <li>
              <span className="text-stone-500">Silk Mark India Registry</span>
            </li>
            <li>
              <span className="text-stone-500">Saree Preservation Care</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Client Concierge (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37]">
            Client Services
          </h4>
          <ul className="space-y-2.5 text-xs font-sans text-stone-400">
            <li>
              <a
                href="https://wa.me/917676721111"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#25D366] transition-colors inline-flex items-center gap-1 text-emerald-400 font-medium"
              >
                <span>HD Video Draping</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <span className="text-stone-400">Insured Global Courier</span>
            </li>
            <li>
              <span className="text-stone-400">Bespoke Monogramming</span>
            </li>
            <li>
              <span className="text-stone-400">Muslin Wrap Preservation</span>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('salon');
                  scrollToTop();
                }}
                className="hover:text-white hover:translate-x-1 transition-all text-left"
              >
                Private Viewing Suite
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Atelier Sanctuaries (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37]">
            Sanctuaries
          </h4>
          <div className="space-y-3 text-xs font-sans text-stone-400">
            <div>
              <strong className="block text-white font-medium">Varanasi Flagship</strong>
              <span className="text-stone-400 text-[11px]">K.64/52 Shivala Ghat, 221001</span>
            </div>
            <div>
              <strong className="block text-white font-medium">Bengaluru Suite</strong>
              <span className="text-stone-400 text-[11px]">24 Lavelle Road, 560001</span>
            </div>
            <div className="pt-1">
              <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                Direct Atelier Line
              </span>
              <a
                href="tel:+917676721111"
                className="text-[#D4AF37] font-semibold hover:underline block text-xs"
              >
                +91 76767 21111
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TRUST & AUTHENTICITY SEALS STRIP */}
      {/* ============================================================== */}
      <div className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[11px] font-sans font-bold text-white block uppercase tracking-wider">
                Silk Mark India
              </span>
              <span className="text-[10px] text-stone-400 font-sans">
                100% Pure Mulberry Silk
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[11px] font-sans font-bold text-white block uppercase tracking-wider">
                98.2% Tested Zari
              </span>
              <span className="text-[10px] text-stone-400 font-sans">
                Pure Silver Dipped in 24K Gold
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[11px] font-sans font-bold text-white block uppercase tracking-wider">
                Authentic Kadwa
              </span>
              <span className="text-[10px] text-stone-400 font-sans">
                Zero Loose Floats on Reverse
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Compass className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[11px] font-sans font-bold text-white block uppercase tracking-wider">
                Insured Worldwide
              </span>
              <span className="text-[10px] text-stone-400 font-sans">
                White-Glove Doorstep Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. LOWER FOOTER BAR (COPYRIGHT & LINEAGE) */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <p className="font-sans">
          © 1948–2026 House of Kashika Atelier Pvt. Ltd. All rights reserved.
        </p>

        <div className="flex items-center gap-2 text-stone-400 font-editorial italic text-xs">
          <span>Handcrafted with devotion at Shivala Ghat, Varanasi</span>
          <span className="text-[#D4AF37]">⚜</span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-wider text-stone-400">
          <span className="hover:text-stone-200 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-stone-200 cursor-pointer">Terms of Heritage</span>
          <span>•</span>
          <span className="hover:text-stone-200 cursor-pointer">Zari Assay</span>
        </div>
      </div>
    </footer>
  );
}
