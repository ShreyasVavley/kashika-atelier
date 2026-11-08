import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Feather,
  Gift,
  Crown,
  ShoppingBag,
  Heart,
  Globe,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

/**
 * 21st.dev Tubelight & Elevate Glassmorphic Navigation Component
 * Features:
 * - Signature 21st.dev spring-animated Tubelight Lamp indicator on active route
 * - Ultra-clear frosted glassmorphic pill capsule with champagne gold hairline
 * - Responsive icon + label layout with smooth hover physics
 * - Integrated currency switcher & silk bag cart drawer trigger
 * - Mobile animated drawer with direct WhatsApp concierge desk
 */
export default function Navbar({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  onOpenVerifier,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'atelier', label: 'The Atelier', icon: Sparkles },
    { id: 'looks', label: 'Try the Look', icon: Sparkles, badge: 'Looks' },
    { id: 'rack', label: 'The Rack', icon: Layers, badge: 'Rail' },
    { id: 'picks', label: 'Pick a Silk', icon: Feather },
    { id: 'collection', label: '5 Master Shades', icon: Layers },
    { id: 'trousseau', label: 'Bridal Trunk', icon: Gift, badge: '15% Off' },
    { id: 'salon', label: 'VIP Concierge', icon: Crown },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      {/* 21st.dev Floating Glassmorphism Pill Capsule */}
      <div
        className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 backdrop-blur-2xl bg-black/75 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between ${
          isScrolled
            ? 'py-2 px-4 sm:px-6 bg-black/85 border-[#D4AF37]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
            : 'py-2.5 sm:py-3 px-5 sm:px-7'
        }`}
      >
        {/* Left: Brand Medallion Crest */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('atelier')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          {/* Royal Crest Monogram Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#1c080d] to-black border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
            <span className="text-xs sm:text-sm font-serif">⚜</span>
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-editorial tracking-[0.2em] text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors leading-none uppercase">
              KASHIKA
            </h1>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]/80 font-sans block mt-0.5">
              Varanasi • 1948
            </span>
          </div>
        </motion.div>

        {/* Center: 21st.dev Tubelight Navbar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-2 select-none ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {/* 21st.dev Signature Tubelight Lamp Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="tubelightLamp"
                    className="absolute inset-0 w-full bg-[#D4AF37]/15 rounded-full -z-10 border border-[#D4AF37]/45"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 28,
                    }}
                  >
                    {/* Glowing golden lamp bar at the top with ambient downward glow */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_12px_#D4AF37]">
                      <div className="absolute w-12 h-6 bg-[#D4AF37]/35 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-[#D4AF37]/35 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-[#D4AF37]/40 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}

                <Icon
                  size={14}
                  className={`transition-colors ${
                    isActive ? 'text-[#D4AF37]' : 'text-stone-400 group-hover:text-stone-200'
                  }`}
                />
                <span className="relative z-10">{link.label}</span>

                {link.badge && (
                  <span
                    className={`relative z-10 text-[9px] px-1.5 py-0.2 rounded-full font-sans tracking-normal border ${
                      isActive
                        ? 'bg-[#D4AF37] text-black font-bold border-transparent'
                        : 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Luxury Utility Suite */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher Glass Capsule */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest text-stone-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-[#D4AF37]/50 transition-all shadow-sm"
              aria-label="Select Currency"
            >
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
            </button>

            {/* Currency Dropdown Panel */}
            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-36 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/35 rounded-xl py-1.5 z-50 shadow-2xl overflow-hidden"
                >
                  <div className="px-3 py-1 border-b border-white/10 text-[9px] uppercase tracking-wider text-[#D4AF37] font-sans font-bold">
                    Currency
                  </div>
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-sans tracking-wider flex items-center justify-between hover:bg-white/10 transition-colors ${
                        currency === c.code ? 'font-bold text-[#D4AF37] bg-white/[0.04]' : 'text-stone-300'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-stone-400 font-serif">{c.symbol}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Royal Wishlist Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#881326]/60 text-stone-200 hover:text-white transition-all shadow-sm"
            aria-label="View Saved Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlistCount > 0 ? 'text-[#881326] fill-[#881326]' : 'text-stone-300'
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#881326] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-md">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Luxury Silk Bag Cart Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#D4AF37]/60 text-stone-200 hover:text-white transition-all shadow-sm"
            aria-label="View Silk Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-md">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Verify Loom Seal Trigger (Desktop) */}
          <button
            onClick={onOpenVerifier}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] uppercase tracking-wider font-sans font-bold hover:bg-[#D4AF37]/20 transition-all shadow-sm"
            title="Inspect Loom Hallmark & Zari Assay"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden lg:inline">Verify Loom</span>
          </button>

          {/* Visit Salon Primary Pill CTA (NOOLAM Style) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('salon')}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7A1C28] to-[#961F33] text-white text-[10px] uppercase tracking-wider font-sans font-bold hover:brightness-110 transition-all shadow-md border border-[#D4AF37]/40"
          >
            <span>Visit Salon</span>
            <span className="text-[#D4AF37]">→</span>
          </motion.button>

          {/* WhatsApp Concierge Quick Trigger (Desktop only) */}
          <a
            href="https://wa.me/917676721111?text=Pranam%20Kashika%20Atelier.%20I%20wish%20to%20connect%20with%20the%20Bridal%20Concierge."
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-emerald-300 text-[10px] uppercase tracking-wider font-sans font-bold hover:bg-[#25D366]/20 transition-all shadow-sm"
            title="Direct WhatsApp Concierge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>Concierge</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/[0.04] border border-white/10 text-stone-200 hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto lg:hidden mt-3 max-w-7xl mx-auto bg-black/90 backdrop-blur-2xl rounded-2xl p-6 overflow-hidden border border-[#D4AF37]/35 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                  ⚜ Navigation Index
                </span>
                <span className="text-xs text-stone-400 font-sans">
                  Varanasi • Est. 1948
                </span>
              </div>

              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = currentPage === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left text-sm font-editorial tracking-[0.15em] uppercase py-3 px-3.5 rounded-xl flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                        : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-[#D4AF37]' : 'text-stone-400'} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-sans tracking-normal border border-[#D4AF37]/30">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Mobile Quick Action Buttons for Wishlist & Silk Bag */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenWishlist) onOpenWishlist();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-sans text-stone-200 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-[#881326] fill-[#881326]" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenCart) onOpenCart();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-sans text-stone-200 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Silk Bag ({cartCount})</span>
                </button>
              </div>

              {/* Mobile Verify Loom Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenVerifier) onOpenVerifier();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-sans font-bold flex items-center justify-center gap-2 hover:bg-[#D4AF37]/20 transition-colors uppercase tracking-wider"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Verify Loom Seal & Zari Assay</span>
              </button>

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://wa.me/917676721111?text=Pranam%20Kashika%20Atelier.%20I%20wish%20to%20connect%20with%20the%20Bridal%20Concierge."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-emerald-300 text-xs uppercase tracking-[0.2em] font-sans font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Bridal Concierge</span>
                </a>

                <div className="flex items-center justify-between text-xs text-stone-400 font-sans px-1">
                  <span>Direct Concierge Desk:</span>
                  <span className="text-[#D4AF37] font-medium">+91 76767 21111</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
