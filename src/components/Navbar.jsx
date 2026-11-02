import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Calendar, Globe, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
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

  const navLinks = [
    { id: 'atelier', label: 'The Atelier' },
    { id: 'collection', label: 'The Collection', badge: '5 Shades' },
    { id: 'craft', label: 'The Craft' },
    { id: 'trousseau', label: 'Bridal Trousseau' },
    { id: 'salon', label: 'Private Salon' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#D4AF37]/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Left Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-9">
          <button
            onClick={() => handleNavClick('atelier')}
            className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all py-1 relative ${
              currentPage === 'atelier'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>The Atelier</span>
            {currentPage === 'atelier' && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('collection')}
            className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all py-1 flex items-center gap-2 relative ${
              currentPage === 'collection'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>The Collection</span>
            <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-1.5 py-0.5 rounded-full font-sans tracking-normal border border-[#D4AF37]/30">
              5 Shades
            </span>
            {currentPage === 'collection' && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('craft')}
            className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all py-1 relative ${
              currentPage === 'craft'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>The Craft</span>
            {currentPage === 'craft' && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            )}
          </button>
        </nav>

        {/* Center Brand Identity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center cursor-pointer select-none group"
          onClick={() => handleNavClick('atelier')}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]/80 font-sans block mb-0.5">
            Varanasi • Est. 1948
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial tracking-[0.2em] text-[#FBF9F5] group-hover:text-[#D4AF37] transition-colors leading-none font-normal">
            KASHIKA
          </h1>
        </motion.div>

        {/* Right Desktop Nav Links & Icon-Only Triggers */}
        <div className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick('trousseau')}
            className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all py-1 relative ${
              currentPage === 'trousseau'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Trousseau Trunk</span>
            {currentPage === 'trousseau' && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('salon')}
            className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all py-1 relative ${
              currentPage === 'salon'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Private Salon</span>
            {currentPage === 'salon' && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            )}
          </button>

          {/* Icon-Only Luxury Triggers Divider */}
          <div className="h-4 w-px bg-white/15" />

          {/* Currency Pill */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans uppercase tracking-wider text-stone-300 hover:text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 bg-white/[0.04] transition-all"
              aria-label="Select Currency"
            >
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span>{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
            </button>

            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-32 bg-[#121212] text-[#FBF9F5] rounded border border-[#D4AF37]/30 shadow-2xl py-1 z-50 backdrop-blur-xl"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-sans tracking-wider flex items-center justify-between hover:bg-white/10 transition-colors ${
                        currency === c.code ? 'font-bold text-[#D4AF37]' : 'text-stone-300'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-stone-500 font-serif">{c.symbol}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Icon-Only Appointment Trigger */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('salon')}
            className="p-2.5 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-white/[0.06] text-stone-300 hover:text-[#D4AF37] transition-all"
            title="Book Private Draping Appointment"
            aria-label="Book Private Appointment"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
          </motion.button>

          {/* Icon-Only Luxury Silk Bag Trigger */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-stone-200 hover:text-white"
            aria-label="View Silk Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full border border-[#D4AF37]/30 text-stone-200"
            aria-label="View Silk Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-200 hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0A0A]/95 border-b border-[#D4AF37]/20 backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-xs uppercase tracking-[0.25em] py-2.5 border-b border-white/10 flex items-center justify-between ${
                    currentPage === link.id
                      ? 'text-[#D4AF37] font-semibold pl-2'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded-full font-sans tracking-normal border border-[#D4AF37]/30">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-4 flex items-center justify-between text-xs text-stone-400 font-sans">
                <span>Boutique Viewing</span>
                <button
                  onClick={() => handleNavClick('salon')}
                  className="text-[#D4AF37] font-semibold underline tracking-wider"
                >
                  Book Appointment &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
