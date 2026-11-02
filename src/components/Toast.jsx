import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export default function Toast({ toast, onClose, onOpenCart }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4 sm:mx-0 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-2xl p-4 text-[#FBF9F5] flex items-center justify-between gap-3 font-sans"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : toast.type === 'wishlist' ? (
                <Heart className="w-4 h-4 fill-[#881326] text-[#881326]" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>

            <div className="overflow-hidden">
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                {toast.title || 'Privilege Confirmed'}
              </span>
              <p className="text-xs text-stone-200 truncate">
                {toast.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {toast.type === 'cart' && onOpenCart && (
              <button
                onClick={() => {
                  onOpenCart();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[9px] uppercase tracking-wider font-bold transition-all shadow"
              >
                View Bag
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
