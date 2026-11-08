import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  Crown,
  Award,
  Sparkles,
  ChevronUp,
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
    <footer className="bg-gradient-to-b from-[#25050D] via-[#1A0309] to-[#0E0105] text-[#FBF9F5] border-t-2 border-[#D4AF37]/40 font-sans relative overflow-hidden pb-8 sm:pb-12 select-none">
      {/* Subtle Ambient Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* 1. Newsletter: Private Loom Previews */}
      <div className="border-b border-[#D4AF37]/20 py-16 px-6 sm:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-bold">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            THE ATELIER LEDGER
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[#FBF9F5] tracking-tight">
            Private Loom Previews & Releases
          </h3>
          <p className="text-xs sm:text-sm font-editorial italic text-stone-300 max-w-lg mx-auto leading-relaxed">
            Direct invitations to limited seasonal Kadwa loom unveilings, private trousseau consultations, and Varanasi weaver archives.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="pt-4 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your private email..."
              className="w-full px-5 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/35 rounded-full text-xs text-[#FBF9F5] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#D4AF37] text-stone-950 text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:brightness-110 shrink-0 cursor-pointer"
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Haute Couture Directory (4 Columns) */}
      <div className="max-w-7xl mx-auto py-14 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Col 1: Brand Lineage (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#3B0712] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-md">
              <span className="text-sm font-serif">⚜</span>
            </div>
            <div>
              <span className="text-xl font-editorial font-bold tracking-[0.22em] text-[#FBF9F5] uppercase block leading-none">
                KASHIKA
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/80 font-sans block mt-1">
                Varanasi • Est. 1948
              </span>
            </div>
          </div>

          <p className="text-xs font-sans text-stone-300 leading-relaxed max-w-sm">
            House of Kashika is an ultra-luxury digital handloom atelier dedicated to royal Banarasi Kadwa and Kanjivaram silk connoisseurs. Woven with tested silver-core zari dipped in 24K gold bullion.
          </p>

          <div className="pt-2 flex items-center gap-2.5">
            <a
              href="https://wa.me/917676721111?text=Pranam%20Kashika%20Atelier.%20I%20wish%20to%20connect%20with%20the%20Bridal%20Concierge."
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 text-stone-300 hover:text-[#25D366] transition-all shadow-sm"
              aria-label="WhatsApp Concierge"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="mailto:concierge@kashika-atelier.com"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-stone-300 hover:text-[#D4AF37] transition-all shadow-sm"
              aria-label="Email Concierge"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+917676721111"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-stone-300 hover:text-[#D4AF37] transition-all shadow-sm"
              aria-label="Telephone Desk"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Showcase Modules & Drapes (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] block">
            Showcase Suites
          </span>
          <ul className="space-y-2 text-xs font-sans text-stone-300">
            <li>
              <button
                onClick={() => {
                  onNavigate('looks');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>Try the Look (8 Ensembles)</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#7A1C28] text-white">NEW</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('rack');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>The Rack (Clothes Rail View)</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-[#D4AF37]">HOT</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('picks');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Pick a Silk (3D Fanned Arc)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('muse');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                The Muse Film & 3D Reels
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('moods');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Six Moods Archive (Gopuram)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('collection');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                The 5 Master Colorways
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('trousseau');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Bridal Trousseau Trunk Builder
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Craft & Guild (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] block">
            Craft Lineage
          </span>
          <ul className="space-y-2 text-xs font-sans text-stone-300">
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Varanasi Pit Loom Journal
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (onOpenVerifier) onOpenVerifier();
                }}
                className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 text-[#D4AF37] cursor-pointer text-left"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verify Loom Hallmark</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Tested 24K Gold Zari
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('craft');
                  scrollToTop();
                }}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Kadwa vs Powerloom Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Private Viewing Suites (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4AF37] block">
            Showroom Locations
          </span>
          <ul className="space-y-2.5 text-xs font-sans text-stone-300">
            <li>
              <strong className="text-white block font-medium">Bengaluru Flagship Suite:</strong>
              <span className="text-stone-400 text-[11px] block">
                14 Lavelle Road, Shanthala Nagar, Ashok Nagar
              </span>
            </li>
            <li>
              <strong className="text-white block font-medium">Varanasi Atelier:</strong>
              <span className="text-stone-400 text-[11px] block">
                Shivala Ghat, Ganga Banks, Varanasi
              </span>
            </li>
            <li className="pt-1">
              <button
                onClick={() => {
                  onNavigate('appointment');
                  scrollToTop();
                }}
                className="px-4 py-2 rounded-full bg-[#7A1C28] hover:bg-[#961F33] text-white text-[10px] uppercase tracking-wider font-semibold shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal & Certifications Bar */}
      <div className="max-w-7xl mx-auto py-6 px-6 sm:px-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-400 gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <span>© 1948–2026 House of Kashika Atelier Pvt. Ltd. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-wider text-stone-300">
          <span className="flex items-center gap-1 text-[#D4AF37]">
            <span>⚜</span>
            <span>Silk Mark India Certified</span>
          </span>
          <span className="text-white/20">•</span>
          <span>98.2% Tested Silver Zari</span>
          <span className="text-white/20">•</span>
          <span>Handloom Registry Guild</span>
          <span className="text-white/20">•</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#D4AF37] hover:underline cursor-pointer ml-2"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
