import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Toast from './components/Toast';
import CheckoutModal from './components/CheckoutModal';
import VerifierModal from './components/VerifierModal';
import AtelierPage from './pages/AtelierPage';
import CollectionPage from './pages/CollectionPage';
import CraftPage from './pages/CraftPage';
import TrousseauPage from './pages/TrousseauPage';
import SalonPage from './pages/SalonPage';
import { CATALOG_PRODUCTS } from './data/sarees';

export default function App() {
  // Hash-based Page Routing Helper
  const getPageFromHash = () => {
    const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
    if (hash === 'collection') return 'collection';
    if (hash === 'craft') return 'craft';
    if (hash === 'trousseau') return 'trousseau';
    if (hash === 'salon') return 'salon';
    if (['collection', 'catalog', 'sarees', 'bridal', 'kadwa', 'craft', 'trust', 'guarantee'].includes(hash)) return 'atelier';
    return 'atelier';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [selectedColorwayId, setSelectedColorwayId] = useState('sindoor-crimson');
  const [currency, setCurrency] = useState(() => localStorage.getItem('kashika_currency') || 'INR');
  
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kashika_cart')) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kashika_wishlist')) || [];
    } catch {
      return [];
    }
  });

  const [trousseauSlots, setTrousseauSlots] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kashika_trousseau')) || [null, null, null];
    } catch {
      return [null, null, null];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutDiscountINR, setCheckoutDiscountINR] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
  const [verifierModalOpen, setVerifierModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBuyNow = (saree, colorway) => {
    handleAddToCart(saree, colorway);
    setCheckoutModalOpen(true);
  };

  // Sync Hash changes with Browser Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
      const targetPage = getPageFromHash();
      setCurrentPage(targetPage);
      if (['collection', 'catalog', 'sarees', 'bridal', 'kadwa', 'craft', 'trust', 'guarantee'].includes(rawHash)) {
        setTimeout(() => {
          const targetId = {
            collection: 'collection-grid',
            catalog: 'collection-grid',
            sarees: 'collection-grid',
            bridal: 'collection-grid',
            kadwa: 'collection-grid',
            craft: 'trust-guarantee',
            trust: 'trust-guarantee',
            guarantee: 'trust-guarantee',
          }[rawHash];
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Back to Top button scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist State
  useEffect(() => {
    localStorage.setItem('kashika_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('kashika_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kashika_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('kashika_trousseau', JSON.stringify(trousseauSlots));
  }, [trousseauSlots]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, title = 'Privilege Confirmed', type = 'info') => {
    setToast({ message, title, type });
  };

  const handleNavigate = (pageId) => {
    if (['rack', 'looks', 'picks', 'muse', 'moods'].includes(pageId)) {
      window.location.hash = `#/${pageId}`;
      setCurrentPage('atelier');
      setTimeout(() => {
        const targetId = {
          rack: 'the-rack',
          looks: 'try-the-look',
          picks: 'pick-a-silk',
          muse: 'muse-film',
          moods: 'six-moods',
        }[pageId];
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    setCurrentPage(pageId);
    window.location.hash = pageId === 'atelier' ? '#/' : `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (saree, colorway) => {
    if (!saree) return;
    const cw = colorway || { id: saree.id, name: saree.name, hex: saree.hex || '#881326' };
    const price = saree.priceINR || saree.basePriceINR || 42000;
    const newItem = {
      id: `${saree.id}-${cw.id || 'std'}-${Date.now()}`,
      title: saree.name,
      colorwayName: cw.name || saree.name,
      colorwayId: cw.id || saree.id,
      colorHex: cw.hex || saree.hex || '#881326',
      priceINR: price,
      image: saree.image,
      fabric: saree.fabric,
    };
    setCart((prev) => [...prev, newItem]);
    showToast(`${saree.name} added to your Silk Bag`, 'Bag Updated', 'cart');
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from your Saved Masterpieces', 'Wishlist Updated', 'wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your Royal Wishlist', 'Wishlist Updated', 'wishlist');
        return [...prev, id];
      }
    });
  };

  const handleRemoveWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const handleUpdateTrousseauSlot = (index, colorway) => {
    setTrousseauSlots((prev) => {
      const next = [...prev];
      next[index] = colorway;
      return next;
    });
    showToast(`${colorway.name} assigned to Slot ${index + 1}`, 'Trunk Updated', 'info');
  };

  const handleClearTrousseauSlot = (index) => {
    setTrousseauSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleAddToTrousseauFromCollection = (colorway) => {
    const emptyIndex = trousseauSlots.findIndex((s) => s === null);
    const targetIndex = emptyIndex !== -1 ? emptyIndex : 0;
    handleUpdateTrousseauSlot(targetIndex, colorway);
    handleNavigate('trousseau');
  };

  // Resolve wishlist products from catalog
  const wishlistProducts = CATALOG_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-[#7A1C28]/25 selection:text-[#7A1C28] relative">
      {/* Global 21st.dev Tubelight Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenVerifier={() => setVerifierModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Multipage Content with Silky Haute Couture Route Transitions */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {currentPage === 'atelier' && (
              <AtelierPage
                onNavigate={handleNavigate}
                onSelectColorway={(id) => {
                  setSelectedColorwayId(id);
                  handleNavigate('collection');
                }}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                currency={currency}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {currentPage === 'collection' && (
              <CollectionPage
                selectedColorwayId={selectedColorwayId}
                onSelectColorway={setSelectedColorwayId}
                onAddToCart={handleAddToCart}
                onAddToTrousseau={handleAddToTrousseauFromCollection}
                currency={currency}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'craft' && (
              <CraftPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'trousseau' && (
              <TrousseauPage
                trousseauSlots={trousseauSlots}
                onUpdateSlot={handleUpdateTrousseauSlot}
                onClearSlot={handleClearTrousseauSlot}
                onAddToCart={handleAddToCart}
                currency={currency}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'salon' && (
              <SalonPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Silk Bag Slide-over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        onNavigate={handleNavigate}
        onOpenCheckout={(disc, promo) => {
          setCheckoutDiscountINR(disc);
          setCheckoutPromoCode(promo);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Royal Wishlist Slide-over Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        currency={currency}
        onNavigate={handleNavigate}
      />

      {/* Luxury Checkout Modal (Razorpay / Stripe Simulation) */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
        currency={currency}
        discountINR={checkoutDiscountINR}
        promoCode={checkoutPromoCode}
      />

      {/* Royal Weaver Registry & Zari Spectrometry Verifier Modal */}
      <VerifierModal
        isOpen={verifierModalOpen}
        onClose={() => setVerifierModalOpen(false)}
      />

      {/* Haute Couture Floating Action Toast */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-black/80 hover:bg-[#D4AF37] text-stone-300 hover:text-black border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md transition-all duration-300 group"
            aria-label="Scroll to Top"
            title="Return to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

            {/* Floating Self-Serve WhatsApp Concierge */}
      <a
        href="https://wa.me/917676721111?text=Hello%20Kashika%20Atelier.%20I%20am%20interested%20in%20an%20authentic%20Banarasi%20saree%20and%20would%20like%20a%20live%20video%20preview%20or%20custom%20blouse%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-stone-950 font-sans font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transition-all hover:scale-105 border border-emerald-400"
        title="Need a live video preview or custom blouse? Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-stone-950 text-stone-950" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
        <span className="sm:hidden">Chat</span>
      </a>

      {/* Global Heritage 5-Column Haute Couture Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenVerifier={() => setVerifierModalOpen(true)}
      />
    </div>
  );
}
