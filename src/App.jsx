import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AtelierPage from './pages/AtelierPage';
import CollectionPage from './pages/CollectionPage';
import CraftPage from './pages/CraftPage';
import TrousseauPage from './pages/TrousseauPage';
import SalonPage from './pages/SalonPage';
import { MASTER_DESIGNS } from './data/sarees';

export default function App() {
  // Hash-based Page Routing Helper
  const getPageFromHash = () => {
    const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
    if (hash === 'collection') return 'collection';
    if (hash === 'craft') return 'craft';
    if (hash === 'trousseau') return 'trousseau';
    if (hash === 'salon') return 'salon';
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
  const [trousseauSlots, setTrousseauSlots] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kashika_trousseau')) || [null, null, null];
    } catch {
      return [null, null, null];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Sync Hash changes with Browser Navigation (Back / Forward Buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist State
  useEffect(() => {
    localStorage.setItem('kashika_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('kashika_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kashika_trousseau', JSON.stringify(trousseauSlots));
  }, [trousseauSlots]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId === 'atelier' ? '#/' : `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (saree, colorway) => {
    const newItem = {
      id: `${saree.id}-${colorway.id}-${Date.now()}`,
      title: saree.name,
      colorwayName: colorway.name,
      colorwayId: colorway.id,
      colorHex: colorway.hex,
      priceINR: saree.basePriceINR
    };
    setCart((prev) => [...prev, newItem]);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateTrousseauSlot = (index, colorway) => {
    setTrousseauSlots((prev) => {
      const next = [...prev];
      next[index] = colorway;
      return next;
    });
  };

  const handleClearTrousseauSlot = (index) => {
    setTrousseauSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleAddToTrousseauFromCollection = (colorway) => {
    // Find first empty slot, or replace slot 0
    const emptyIndex = trousseauSlots.findIndex((s) => s === null);
    const targetIndex = emptyIndex !== -1 ? emptyIndex : 0;
    handleUpdateTrousseauSlot(targetIndex, colorway);
    handleNavigate('trousseau');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FBF9F5] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5]">
      {/* Global Royal Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Multipage Content with Silky Haute Couture Route Transitions */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {currentPage === 'atelier' && (
              <AtelierPage
                onNavigate={handleNavigate}
                onSelectColorway={(id) => {
                  setSelectedColorwayId(id);
                  handleNavigate('collection');
                }}
                currency={currency}
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

      {/* Silk Bag Slide-over Drawer with AnimatePresence */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        onNavigate={handleNavigate}
      />

      {/* Global Heritage Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
