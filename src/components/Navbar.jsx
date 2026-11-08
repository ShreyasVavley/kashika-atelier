import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Crown,
  ShoppingBag,
  Heart,
  Globe,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Navbar({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  searchQuery = '',
  onSearchChange,
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
    { id: 'collection', label: 'All Sarees', icon: Layers },
    { id: 'bridal', label: 'Bridal Katan', icon: Crown },
    { id: 'kadwa', label: 'Royal Kadwa', icon: Layers },
    { id: 'trust', label: 'Silk Mark Guarantee', icon: ShieldCheck },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
  };

  const handleSearchInput = (val) => {
    if (onSearchChange) {
      onSearchChange(val);
      if (currentPage !== 'atelier') {
        onNavigate('atelier');
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      {/* Floating Glassmorphic Pill Capsule */}
      <div
        className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 backdrop-blur-2xl border flex items-center justify-between gap-3 ${
          isScrolled
            ? 'py-2 px-4 sm:px-6 bg-[#26050D]/95 border-[#D4AF37]/55 shadow-[0_25px_60px_rgba(25,2,8,0.85)]'
            : 'py-2.5 sm:py-3 px-5 sm:px-7 bg-[#3A0713]/85 border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(40,4,10,0.65)]'
        }`}
      >
        {/* Left: Brand Medallion Crest */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('atelier')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#25050D] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
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

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/25 border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all flex items-center gap-1.5 select-none cursor-pointer ${
                  isActive
                    ? 'text-stone-950 font-bold'
                    : 'text-[#F5EDE1]/85 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3CD68] to-[#D4AF37] rounded-full -z-10 shadow-[0_2px_14px_rgba(212,175,55,0.45)]"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 28,
                    }}
                  />
                )}

                <Icon
                  size={13}
                  className={`transition-colors ${
                    isActive ? 'text-stone-950' : 'text-[#D4AF37]'
                  }`}
                />
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Direct Shopping Utility Suite (Search Bar, Currency, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Integrated Search Bar */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search Katan, Kadwa, Organza..."
              className="w-36 lg:w-48 xl:w-56 pl-8 pr-7 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/[0.14] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchInput('')}
                className="absolute right-2.5 p-0.5 rounded-full text-stone-400 hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest text-stone-200 hover:text-white bg-white/[0.06] border border-white/15 hover:border-[#D4AF37]/50 transition-all shadow-xs cursor-pointer"
              aria-label="Select Currency"
            >
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
            </button>

            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-36 bg-[#25050D]/95 backdrop-blur-xl border border-[#D4AF37]/45 rounded-xl py-1.5 z-50 shadow-2xl overflow-hidden"
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
                      className={`w-full text-left px-3.5 py-2 text-xs font-sans tracking-wider flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                        currency === c.code ? 'font-bold text-[#D4AF37] bg-white/[0.06]' : 'text-stone-300'
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

          {/* Wishlist Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full bg-white/[0.06] border border-white/15 hover:border-[#D4AF37]/60 text-stone-200 hover:text-white transition-all shadow-xs cursor-pointer"
            aria-label="View Wishlist"
            title="Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                wishlistCount > 0 ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-stone-300'
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-stone-950 text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-md">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Cart Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-white/[0.06] border border-white/15 hover:border-[#D4AF37]/60 text-stone-200 hover:text-white transition-all shadow-xs cursor-pointer"
            aria-label="View Silk Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-stone-950 text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-md">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/[0.06] border border-white/15 text-stone-200 hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto lg:hidden mt-3 max-w-7xl mx-auto bg-[#25050D]/95 backdrop-blur-2xl rounded-2xl p-5 overflow-hidden border border-[#D4AF37]/45 shadow-2xl space-y-4"
          >
            {/* Mobile Search */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search Katan, Kadwa, Organza..."
                className="w-full pl-8 pr-7 py-2 rounded-xl bg-white/[0.08] border border-white/20 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-xs font-sans font-medium text-stone-200 hover:text-white"
                  >
                    <Icon size={14} className="text-[#D4AF37]" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  onOpenWishlist();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-stone-300 hover:text-white"
              >
                <Heart size={14} className="text-[#D4AF37]" />
                <span>Wishlist ({wishlistCount})</span>
              </button>

              <button
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-stone-300 hover:text-white"
              >
                <ShoppingBag size={14} className="text-[#D4AF37]" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
