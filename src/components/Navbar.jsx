import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Globe, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Navbar({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection to adapt glass opacity & elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'atelier', label: 'The Atelier' },
    { id: 'collection', label: 'The Collection', badge: '5 Shades' },
    { id: 'craft', label: 'The Craft' },
    { id: 'trousseau', label: 'Bridal Trousseau' },
    { id: 'salon', label: 'VIP Concierge' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-500">
      {/* Floating Glassmorphic Capsule */}
      <div
        className={`max-w-7xl mx-auto rounded-2xl lg:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'glass-navbar-scrolled' : 'glass-navbar'
        }`}
      >
        {/* Left: Brand Identity with Royal Monogram Emblem */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('atelier')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Circular Gold Crest Emblem */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-black/80 to-[#181818]/90 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.22)] group-hover:border-[#D4AF37] transition-all">
            <span className="text-xs sm:text-sm font-serif">⚜</span>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-editorial tracking-[0.22em] text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors leading-none font-normal uppercase">
              KASHIKA
            </h1>
            <span className="text-[8px] uppercase tracking-[0.32em] text-[#D4AF37]/80 font-sans block mt-0.5">
              Varanasi • 1948
            </span>
          </div>
        </motion.div>

        {/* Center: Unified Glass Pill Navigation Island (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full glass-pill-nav">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.22em] font-sans transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-[#FBF9F5] font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="glassNavActivePill"
                    className="absolute inset-0 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  />
                )}
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
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Currency Switcher Glass Pill */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest text-stone-300 hover:text-white glass-pill-nav hover:border-[#D4AF37]/50 transition-all"
              aria-label="Select Currency"
            >
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
            </button>

            {/* Currency Glass Dropdown */}
            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-36 glass-dropdown rounded-xl py-1.5 z-50 overflow-hidden"
                >
                  <div className="px-3 py-1 border-b border-white/10 text-[9px] uppercase tracking-wider text-[#D4AF37] font-sans font-bold">
                    Select Currency
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

          {/* Luxury Silk Bag Trigger Pill */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full glass-pill-nav hover:border-[#D4AF37]/60 text-stone-200 hover:text-white transition-all shadow-sm"
            aria-label="View Silk Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-md">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-pill-nav text-stone-200 hover:text-[#D4AF37] transition-colors"
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
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-3 max-w-7xl mx-auto glass-dropdown rounded-2xl p-6 overflow-hidden border border-[#D4AF37]/35 shadow-2xl"
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

              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm font-editorial tracking-[0.15em] uppercase py-2.5 px-3 rounded-lg flex items-center justify-between transition-all ${
                    currentPage === link.id
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-bold border border-[#D4AF37]/30'
                      : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-sans">0{idx + 1}.</span>
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-sans tracking-normal border border-[#D4AF37]/30">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://wa.me/917676721111?text=Pranam%20Kashika%20Atelier.%20I%20wish%20to%20connect%20with%20the%20Bridal%20Concierge."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-emerald-300 text-xs uppercase tracking-[0.2em] font-sans font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
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
