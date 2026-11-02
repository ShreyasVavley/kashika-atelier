import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  currency,
  onNavigate
}) {
  const totalINR = cart.reduce((acc, item) => acc + item.priceINR, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((it, idx) => `${idx + 1}. ${it.title} (${it.colorwayName}) - ${formatPrice(it.priceINR, currency)}`).join('%0A');
    const msg = `Pranam Kashika Atelier.%0A%0AI wish to finalize my order from the Silk Bag:%0A${itemsList}%0A%0ATotal Investment: ${formatPrice(totalINR, currency)}%0A%0APlease connect me with the Concierge Desk for private white-glove dispatch.`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-Over Drawer with Spring / Smooth Ease */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121212] border-l border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col text-[#FBF9F5] font-sans pointer-events-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                <div className="flex items-center gap-2.5">
                  <span className="text-base text-[#D4AF37]">⚜</span>
                  <div>
                    <h2 className="text-lg font-editorial font-normal text-[#FBF9F5]">
                      Your Silk Bag
                    </h2>
                    <span className="text-xs text-stone-400 font-sans">
                      {cart.length} {cart.length === 1 ? 'Masterpiece' : 'Masterpieces'} Selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Close Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-[#D4AF37]/40 stroke-1" />
                    <h3 className="text-lg font-editorial font-normal text-[#FBF9F5]">
                      Your Silk Bag is Empty
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                      Each Kashika saree is limited to a small loom edition of 2 to 4 pieces per season.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('collection');
                      }}
                      className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold rounded transition-all btn-shimmer"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item, idx) => (
                      <motion.div
                        key={item.id || idx}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-[#0A0A0A] rounded-lg border border-[0.5px] border-white/10 shadow-sm flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded border border-white/15 shrink-0 flex items-center justify-center text-white text-xs shadow-inner"
                            style={{ backgroundColor: item.colorHex || '#121212' }}
                          >
                            ⚜
                          </div>
                          <div>
                            <h4 className="text-sm font-editorial font-bold text-[#FBF9F5]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#D4AF37] font-medium">
                              {item.colorwayName}
                            </p>
                            <span className="text-xs font-editorial font-bold text-stone-200 block mt-1">
                              {formatPrice(item.priceINR, currency)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-2 text-stone-400 hover:text-rose-400 transition-colors"
                          title="Remove Saree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#0A0A0A] border-t border-white/10 space-y-4">
                  <div className="space-y-1.5 text-xs text-stone-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-200">{formatPrice(totalINR, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insured Global Courier</span>
                      <span className="font-semibold text-emerald-400">Complimentary</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preservation Muslin Wrap</span>
                      <span className="font-semibold text-[#D4AF37]">Included</span>
                    </div>
                    <div className="pt-2 flex justify-between text-base font-editorial font-bold text-[#FBF9F5] border-t border-white/10">
                      <span>Total Investment</span>
                      <span className="text-[#D4AF37]">{formatPrice(totalINR, currency)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.2em] font-sans font-bold rounded transition-all shadow-xl flex items-center justify-center gap-2 btn-shimmer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Finalize via WhatsApp Concierge</span>
                  </button>

                  <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>100% Tested Silver Bullion Zari & SilkMark Verified</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
