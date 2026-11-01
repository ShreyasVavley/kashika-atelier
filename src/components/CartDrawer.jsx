import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Video, ShieldCheck, MessageSquare } from "lucide-react";
import { royalAudio } from "../utils/soundEngine";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  currency,
  setCurrency
}) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.masterDesign.basePriceINR, 0);

  const formatPrice = (priceINR) => {
    if (currency === "USD") return `$${Math.round(priceINR / 83)}`;
    if (currency === "GBP") return `£${Math.round(priceINR / 105)}`;
    if (currency === "AED") return `AED ${Math.round(priceINR / 22.6)}`;
    return `₹${priceINR.toLocaleString("en-IN")}`;
  };

  const handleWhatsAppCheckout = () => {
    let msg = `*Namaste Kashika Atelier!* 🥻✨\n\nI would like to reserve the following heirloom handloom saree(s) from your online atelier:\n\n`;

    cartItems.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.masterDesign.name}*\n`;
      msg += `• Colorway: ${item.colorway.name} (${item.colorway.sanskrit})\n`;
      msg += `• Zari: ${item.colorway.zariName}\n`;
      msg += `• Price: ${formatPrice(item.masterDesign.basePriceINR)}\n\n`;
    });

    msg += `*Total Order Value:* ${formatPrice(totalPrice)}\n`;
    msg += `\nPlease confirm if this piece is in stock, and let me know if a 1-on-1 video call can be arranged to inspect the drape fall.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919886620362?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0f] border-l border-[var(--border-gold)] z-50 flex flex-col justify-between shadow-[ -20px_0_60px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-royal font-bold text-lg text-white">Your Reserved Silk Bag</h3>
                  <span className="text-xs text-white/50">{cartItems.length} Handloom Piece(s)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="my-auto text-center py-12">
                  <div className="w-16 h-16 rounded-full border border-white/10 mx-auto mb-4 flex items-center justify-center text-white/20">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-royal font-bold text-white text-base">Your Silk Bag is Empty</h4>
                  <p className="text-xs text-white/50 font-editorial italic mt-1 max-w-xs mx-auto">
                    Select a heritage colorway from our Master Design collection to reserve an heirloom weave.
                  </p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.colorway.id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 flex gap-4 items-center justify-between"
                  >
                    {/* Color Swatch Circle */}
                    <div
                      className="w-14 h-14 rounded-full border-2 border-white/20 shadow-md shrink-0 relative overflow-hidden flex items-center justify-center"
                      style={{ background: item.colorway.hex }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
                    </div>

                    {/* Saree Info */}
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-royal font-bold text-white truncate">
                        {item.masterDesign.name}
                      </h4>
                      <p className="text-[11px] text-amber-300 font-editorial italic truncate">
                        Color: {item.colorway.name}
                      </p>
                      <p className="text-[10px] text-white/50 truncate">
                        Zari: {item.colorway.zariName}
                      </p>
                      <div className="text-xs font-mono font-bold text-white mt-1">
                        {formatPrice(item.masterDesign.basePriceINR)}
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="text-white/40 hover:text-red-400 p-2 transition-colors"
                      title="Remove Piece"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-royal uppercase tracking-wider text-white/60">
                    Total Atelier Value:
                  </span>
                  <span className="text-2xl font-royal font-bold text-gold-gradient">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Complimentary Insured Air Express & Fall Finishing</span>
                </div>

                {/* Primary Action: WhatsApp Concierge */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="btn-royal-gold w-full py-3.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm Reservation on WhatsApp</span>
                </button>

                <p className="text-[10px] text-white/40 text-center font-editorial italic">
                  Direct connection with Master Weaver concierge in Bangalore / Varanasi.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
