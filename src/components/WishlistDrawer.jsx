import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  currency,
  onNavigate
}) {
  const handleWhatsAppInquiry = () => {
    if (wishlistProducts.length === 0) return;
    const itemsList = wishlistProducts
      .map((it, idx) => `${idx + 1}. ${it.name} (${it.category}) - ${formatPrice(it.priceINR, currency)}`)
      .join('%0A');
    const msg = `Pranam Kashika Atelier.%0A%0AI would like to inquire about my saved sarees from my Royal Wishlist:%0A${itemsList}%0A%0APlease connect me with a Senior Bridal Draper.`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-Over Drawer */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121212] border-l border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col text-[#FBF9F5] pointer-events-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-[#881326] fill-[#881326]" />
                  <div>
                    <h2 className="text-lg font-editorial font-normal text-[#FBF9F5]">
                      Saved Masterpieces
                    </h2>
                    <span className="text-xs text-stone-400">
                      {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Saree' : 'Sarees'} Saved
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Close Wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <Heart className="w-12 h-12 text-stone-600 stroke-1" />
                    <h3 className="text-lg font-editorial font-normal text-[#FBF9F5]">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xs">
                      Tap the heart icon on any saree to save it for your bridal consultation.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('atelier');
                      }}
                      className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold rounded transition-all btn-shimmer"
                    >
                      Discover New Arrivals
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {wishlistProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 bg-[#0A0A0A] rounded-lg border border-white/10 shadow-sm flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-16 rounded object-cover border border-white/15 shrink-0"
                          />
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#881326] font-bold block">
                              {product.category}
                            </span>
                            <h4 className="text-sm font-editorial font-bold text-[#FBF9F5] leading-tight">
                              {product.name}
                            </h4>
                            <span className="text-xs font-editorial font-bold text-[#D4AF37] block mt-1">
                              {formatPrice(product.priceINR, currency)}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveWishlist(product.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              onAddToCart(
                                { id: product.id, name: product.name, basePriceINR: product.priceINR },
                                { id: product.id, name: product.name, hex: product.hex }
                              );
                              onRemoveWishlist(product.id);
                            }}
                            className="px-3 py-1 rounded bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[9px] uppercase tracking-wider font-bold transition-all shadow"
                          >
                            Move to Bag
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer */}
              {wishlistProducts.length > 0 && (
                <div className="p-6 bg-[#0A0A0A] border-t border-white/10 space-y-3">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-3.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-emerald-300 text-xs uppercase tracking-wider font-bold rounded transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Inquire Wishlist via WhatsApp</span>
                  </button>

                  <p className="text-center text-[10px] text-stone-400">
                    Complimentary white-glove video consultation available.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
