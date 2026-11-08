import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_ASSETS } from '../data/sarees';
import ProgressiveImage from '../components/ProgressiveImage';
import ProductDetailModal from '../components/ProductDetailModal';
import BridalCollection from '../components/BridalCollection';
import TickerTape from '../components/TickerTape';
import SixMoodsArchive from '../components/SixMoodsArchive';
import TheRack from '../components/TheRack';
import TryTheLook from '../components/TryTheLook';
import PickASilk from '../components/PickASilk';
import MuseMedia from '../components/MuseMedia';

const COUNTRY_DIAL_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];

export default function AtelierPage({
  onNavigate,
  onSelectColorway,
  onAddToCart,
  currency,
  wishlist = [],
  onToggleWishlist,
}) {
  // Detail Modal State
  const [inspectModalProduct, setInspectModalProduct] = useState(null);

  // Concierge Form State
  const [contactName, setContactName] = useState('');
  const [contactDialCode, setContactDialCode] = useState('+91');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSent, setContactSent] = useState(false);



  const toggleWishlist = (id) => {
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };



  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone || contactPhone.trim().length < 6) return;

    setContactLoading(true);

    setTimeout(() => {
      setContactLoading(false);
      setContactSent(true);

      const msg = encodeURIComponent(
        `Pranam Kashika Concierge:%0A- Name: ${contactName}%0A- Phone: ${contactDialCode} ${contactPhone}%0A- Inquiry: ${contactMessage || 'Bridal Saree Consultation'}`
      );
      window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
    }, 800);
  };

  return (
    <div className="bg-[#FFFFFF] text-stone-900 selection:bg-[#7A1C28]/25 selection:text-[#7A1C28] font-sans min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: monitor_hero.jpg & sec_3.jpg from video */}
      {/* ============================================================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#180308] pt-24 pb-16">
        {/* Full-Bleed Warm Luxury Showroom Atmosphere Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/salon_bengaluru_suite.jpg"
            alt="Kashika Heritage Silk Sanctuary"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.12] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180308]/90 via-[#260710]/80 to-[#120206] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_75%)]" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-72 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Ambient Floating Zari Gold Embers & Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/65 shadow-[0_0_8px_#D4AF37]"
              style={{
                left: `${(i * 7.1 + 3)}%`,
                top: `${(i * 6.8 + 8)}%`,
              }}
              animate={{
                y: [0, -45, 0],
                opacity: [0.15, 0.85, 0.15],
                scale: [0.8, 1.35, 0.8],
              }}
              transition={{
                duration: 4.5 + (i % 4) * 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Left-Aligned Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-7 text-left pt-6 sm:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-[#D4AF37]/40 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>KASHIKA · VARANASI PIT LOOMS</span>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-normal text-[#FBF9F5] leading-[1.04] tracking-tight">
                Woven for the{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3CD68] to-[#D4AF37] bg-clip-text text-transparent italic font-normal">
                  Divine.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-editorial italic text-stone-300 max-w-lg leading-relaxed">
              Sacred temple silks handwoven in Varanasi. Consecrated with 98.2% pure tested silver zari and blessed by timeless Indian tradition.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('looks')}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#7A1C28] hover:bg-[#961F33] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:scale-105 border border-[#D4AF37]/40 cursor-pointer"
              >
                <span>Try the Look</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => onNavigate('rack')}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#1A0308] font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
              >
                <span>Browse the Rack</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7A1C28]" />
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-300">
              <span>FINEST FABRICS</span>
              <span className="text-white/20">|</span>
              <span>AUTHENTIC WEAVE</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline">PAN INDIA SHIPPING</span>
            </div>
          </motion.div>

          {/* Right Column: High-Fashion Model Drape with Ambient Silk Floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <ProgressiveImage
                  src={BRAND_ASSETS.heroBanner}
                  alt="Imperial Indian Bridal Drape"
                  className="w-full h-full object-cover object-top filter brightness-95"
                  aspectRatio="3/4"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans font-semibold">
                Banarasi Katan
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-sans">
                    The Rajkumari Collection
                  </span>
                  <span className="text-xs font-editorial text-white">
                    Pure Gold Kadwa Saree
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-black text-[10px] uppercase tracking-wider font-sans font-bold hover:bg-[#C5A059] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* NOOLAM SHOWCASE SUITE: MARQUEE TICKER & INTERACTIVE MODULES */}
      {/* ============================================================== */}
      <TickerTape onNavigate={onNavigate} />

      {/* 1. Six Moods Archive (Gopuram Temple Arches with Kalasam Finials) */}
      <SixMoodsArchive onNavigate={onNavigate} onSelectColorway={onSelectColorway} />

      {/* 2. The Rack: Physical Clothes Rail on Chrome Rod with Wooden Hangers */}
      <TheRack
        currency={currency}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onNavigate={onNavigate}
      />

      {/* 3. Try the Look: 8 Head-to-Toe Looks & 6-Piece Ensemble Panel */}
      <TryTheLook
        currency={currency}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 4. Pick a Silk: 3D Fanned Card Arc with Condensed Background Typography */}
      <PickASilk
        currency={currency}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 5. The Muse Film (Dual-Stream Parallax) & The Muse Reels (3D Arc Video) */}
      <MuseMedia onNavigate={onNavigate} />

      {/* 6. The Bridal Collection (3D Curved Arch Carousel matching NOOLAM Prompt 9) */}
      <BridalCollection
        currency={currency}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />

      {/* 7. Private Atelier Concierge & Bridal Consultation (Modern Haute Couture Suite) */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] text-stone-900 border-b border-stone-200/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-br from-[#1C040A] via-[#2A0610] to-[#120206] text-white p-8 sm:p-12 lg:p-16 border border-[#D4AF37]/45 shadow-[0_25px_60px_rgba(28,4,10,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Editorial Invitation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-bold">
                <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
                PRIVATE ATELIER APPOINTMENTS
              </div>
              <h3 className="text-3xl sm:text-5xl font-editorial font-normal text-[#FBF9F5] tracking-tight leading-tight">
                Curate Your Muhurtham Drape
              </h3>
              <p className="text-xs sm:text-sm font-editorial italic text-stone-300 max-w-md leading-relaxed">
                Connect directly with our master drapers in Varanasi for personalized bridal consultations, custom zari weaving, and private trousseau appointments worldwide.
              </p>
              <div className="pt-2 flex items-center gap-6 text-[10px] uppercase tracking-widest text-[#D4AF37]">
                <span>✓ ONE-ON-ONE ZOOM</span>
                <span>✓ VARANASI GHAT SUITE</span>
                <span>✓ WHITE-GLOVE COURIER</span>
              </div>
            </div>

            {/* Right Column: Direct WhatsApp Connection Card */}
            <div className="lg:col-span-5 bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl">
              {contactSent ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-xl font-bold border border-emerald-500/40">
                    ✓
                  </div>
                  <h4 className="text-lg font-editorial text-white">Inquiry Forwarded</h4>
                  <p className="text-xs text-stone-300">Connecting you with our Senior Draper on WhatsApp...</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs font-sans">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={contactDialCode}
                        onChange={(e) => setContactDialCode(e.target.value)}
                        className="px-2.5 py-2.5 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] text-xs shrink-0"
                      >
                        {COUNTRY_DIAL_CODES.map((d) => (
                          <option key={d.code} value={d.code} className="bg-stone-900 text-white">
                            {d.flag} {d.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1">
                      Saree or Muhurtham Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Bridal date, preferred colorway, or custom zari requirement..."
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CD68] to-[#D4AF37] text-stone-950 text-xs uppercase tracking-[0.2em] font-sans font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4 text-stone-950" />
                    <span>Connect on WhatsApp ➔</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* RICH PRODUCT DETAIL MODAL */}
      {/* ============================================================== */}
      <ProductDetailModal
        product={inspectModalProduct}
        onClose={() => setInspectModalProduct(null)}
        onAddToCart={onAddToCart}
        currency={currency}
        onNavigate={onNavigate}
        onSelectColorway={onSelectColorway}
      />
    </div>
  );
}
