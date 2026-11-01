import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
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
    { id: 'atelier', label: 'The Atelier', href: '#/' },
    { id: 'collection', label: 'The Collection', href: '#/collection', badge: '1 Design • 5 Colors' },
    { id: 'craft', label: 'The Craft & Karigar', href: '#/craft' },
    { id: 'trousseau', label: 'Bridal Trousseau', href: '#/trousseau', badge: '3-Piece Trunk' },
    { id: 'salon', label: 'Private Salon', href: '#/salon' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#B8860B]/20 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#781224] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#B8860B]/30 tracking-widest uppercase font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#FAF8F5]/90">
            <span>⚜</span>
            <span>House of Kashika • Woven in Varanasi Since 1948</span>
          </div>

          <div className="flex-1 md:flex-initial text-center text-[11px] font-medium tracking-wider">
            <span>Complimentary Insured Courier to 45+ Countries</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#FBF4DE]">100% Certified Silk Mark India</span>
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-[11px] tracking-wider font-semibold hover:text-[#FBF4DE] transition-colors py-0.5 px-2 rounded border border-[#FAF8F5]/20"
              aria-label="Select Currency"
            >
              <span>{CURRENCIES[currency]?.label || currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#FAF8F5] text-[#1C1917] rounded border border-[#B8860B]/30 shadow-xl py-1 z-50">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs tracking-wider flex items-center justify-between hover:bg-[#F4EFEA] transition-colors ${
                      currency === c.code ? 'font-bold text-[#781224]' : 'text-[#44403C]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-stone-400 font-serif">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Brand Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('atelier')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 ${
                currentPage === 'atelier'
                  ? 'text-[#781224] font-semibold border-b-2 border-[#781224]'
                  : 'text-[#44403C] hover:text-[#781224]'
              }`}
            >
              The Atelier
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 flex items-center gap-1.5 ${
                currentPage === 'collection'
                  ? 'text-[#781224] font-semibold border-b-2 border-[#781224]'
                  : 'text-[#44403C] hover:text-[#781224]'
              }`}
            >
              <span>The Collection</span>
              <span className="text-[9px] bg-[#B8860B]/15 text-[#8A661C] px-1.5 py-0.5 rounded-full font-sans tracking-normal border border-[#B8860B]/30">
                5 Colors
              </span>
            </button>

            <button
              onClick={() => handleNavClick('craft')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 ${
                currentPage === 'craft'
                  ? 'text-[#781224] font-semibold border-b-2 border-[#781224]'
                  : 'text-[#44403C] hover:text-[#781224]'
              }`}
            >
              The Craft & Karigar
            </button>
          </nav>

          {/* Center Brand Crest */}
          <div className="text-center cursor-pointer select-none" onClick={() => handleNavClick('atelier')}>
            <div className="flex items-center justify-center gap-1.5 text-[#B8860B] mb-0.5">
              <span className="text-base">⚜</span>
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#8A661C]">House of</span>
              <span className="text-base">⚜</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-crest tracking-[0.18em] text-[#1C1917] hover:text-[#781224] transition-colors leading-none">
              KASHIKA
            </h1>
            <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-[#78716C] mt-1">
              Haute Silk Atelier • Varanasi
            </p>
          </div>

          {/* Right Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('trousseau')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 flex items-center gap-1.5 ${
                currentPage === 'trousseau'
                  ? 'text-[#781224] font-semibold border-b-2 border-[#781224]'
                  : 'text-[#44403C] hover:text-[#781224]'
              }`}
            >
              <span>Bridal Trousseau</span>
              <span className="text-[9px] bg-[#781224]/10 text-[#781224] px-1.5 py-0.5 rounded-full font-sans tracking-normal border border-[#781224]/20">
                Trunk
              </span>
            </button>

            <button
              onClick={() => handleNavClick('salon')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 ${
                currentPage === 'salon'
                  ? 'text-[#781224] font-semibold border-b-2 border-[#781224]'
                  : 'text-[#44403C] hover:text-[#781224]'
              }`}
            >
              Private Salon
            </button>

            {/* Silk Shopping Bag Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-[#B8860B]/30 hover:border-[#781224] hover:bg-[#F4EFEA] transition-all text-[#1C1917]"
              aria-label="View Silk Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#781224]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#781224] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FAF8F5] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#B8860B]/30 text-[#1C1917]"
              aria-label="View Silk Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#781224]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#781224] text-[#FAF8F5] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#781224] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#B8860B]/30 shadow-2xl px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-sm uppercase tracking-[0.2em] py-2.5 border-b border-stone-200 flex items-center justify-between ${
                  currentPage === link.id
                    ? 'text-[#781224] font-bold pl-2'
                    : 'text-[#44403C] hover:text-[#781224]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-[#B8860B]/15 text-[#8A661C] px-2 py-0.5 rounded-full font-sans tracking-normal">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-4 flex items-center justify-between text-xs text-[#78716C] font-sans">
              <span>Boutique Viewing</span>
              <button
                onClick={() => handleNavClick('salon')}
                className="text-[#781224] font-semibold underline"
              >
                Book Appointment &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
