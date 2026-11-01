import React from 'react';
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
  if (!isOpen) return null;

  const totalINR = cart.reduce((acc, item) => acc + item.priceINR, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((it, idx) => `${idx + 1}. ${it.title} (${it.colorwayName}) - ${formatPrice(it.priceINR, currency)}`).join('%0A');
    const msg = `Pranam Kashika Atelier.%0A%0AI wish to finalize my order from the Silk Bag:%0A${itemsList}%0A%0ATotal Investment: ${formatPrice(totalINR, currency)}%0A%0APlease connect me with the Concierge Desk for private white-glove dispatch.`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#B8860B]/30 shadow-2xl flex flex-col text-[#1C1917] font-sans">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#B8860B]/20 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="text-lg text-[#781224]">⚜</span>
              <div>
                <h2 className="text-lg font-editorial font-bold text-[#1C1917]">
                  Your Silk Bag
                </h2>
                <span className="text-xs text-[#78716C]">
                  {cart.length} {cart.length === 1 ? 'Masterpiece' : 'Masterpieces'} Selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#B8860B]/40 stroke-1" />
                <h3 className="text-lg font-editorial font-bold text-[#1C1917]">
                  Your Silk Bag is Empty
                </h3>
                <p className="text-xs text-[#78716C] max-w-xs">
                  Each Kashika saree is limited to a small loom edition of 2 to 4 pieces per season.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('collection');
                  }}
                  className="px-6 py-2.5 bg-[#781224] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#580B17] transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded border border-[#B8860B]/20 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded border border-black/10 shrink-0 flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: item.colorHex || '#781224' }}
                    >
                      ⚜
                    </div>
                    <div>
                      <h4 className="text-sm font-editorial font-bold text-[#1C1917]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#781224] font-medium">
                        {item.colorwayName}
                      </p>
                      <span className="text-xs font-editorial font-bold text-[#1C1917] block mt-1">
                        {formatPrice(item.priceINR, currency)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-2 text-stone-400 hover:text-rose-700 transition-colors"
                    title="Remove Saree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#B8860B]/20 space-y-4">
              <div className="space-y-1.5 text-xs text-[#78716C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1917]">{formatPrice(totalINR, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Global Courier</span>
                  <span className="font-semibold text-emerald-800">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Preservation Muslin Wrap</span>
                  <span className="font-semibold text-[#781224]">Included</span>
                </div>
                <div className="pt-2 flex justify-between text-base font-editorial font-bold text-[#1C1917] border-t border-stone-200">
                  <span>Total Investment</span>
                  <span className="text-[#781224]">{formatPrice(totalINR, currency)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#781224] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Finalize via WhatsApp Concierge</span>
              </button>

              <div className="text-center text-[10px] text-[#78716C] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#781224]" />
                <span>100% Tested Silver Bullion Zari & SilkMark Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
