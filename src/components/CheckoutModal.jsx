import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowRight,
  Download,
  MessageCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onClearCart,
  currency,
  discountINR = 0,
  promoCode = '',
}) {
  const [gateway, setGateway] = useState('razorpay'); // 'razorpay' | 'stripe'
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'confirmed'
  const [orderRef, setOrderRef] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const subtotalINR = cart.reduce((acc, item) => acc + item.priceINR, 0);
  const finalTotalINR = Math.max(0, subtotalINR - discountINR);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const generatedId = `KSH-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderRef(generatedId);
      setStep('confirmed');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#881326', '#F5E5B8', '#FAF7F2'],
        });
      } catch (err) {
        // ignore
      }

      onClearCart();
    }, 1800);
  };

  const handleWhatsAppReceipt = () => {
    const msg = encodeURIComponent(
      `Pranam Kashika Concierge. I have confirmed my luxury order #${orderRef} on the website. Guest: ${fullName}, Phone: ${phone}. Please send me the dispatch tracking details.`
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Main Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-[#140307] text-[#FBF9F5] rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col my-auto"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-3">
            <span className="text-xl text-[#D4AF37]">⚜</span>
            <div>
              <h2 className="text-xl font-editorial font-normal text-white">
                {step === 'confirmed' ? 'Imperial Acquisition Confirmed' : 'Haute Couture Checkout'}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-semibold">
                House of Kashika • Encrypted Dispatch
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: PROCESSING GATEWAY HANDSHAKE */}
          {step === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin flex items-center justify-center">
                <span className="text-xs text-[#D4AF37]">⚜</span>
              </div>
              <h3 className="text-2xl font-editorial font-normal text-white">
                Securing 256-Bit SSL Handshake
              </h3>
              <p className="text-xs text-stone-400 max-w-sm">
                Authorizing acquisition via {gateway === 'razorpay' ? 'Razorpay Secure Indian Banking Gateway' : 'Stripe Global Vault'}. Please do not refresh.
              </p>
            </div>
          )}

          {/* STEP 2: ORDER CONFIRMED RECEIPT */}
          {step === 'confirmed' && (
            <div className="py-8 space-y-6 max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block">
                  Imperial Acquisition No. {orderRef}
                </span>
                <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
                  Weaving Your Heirloom
                </h3>
                <p className="text-xs sm:text-sm font-editorial italic text-stone-300 max-w-md mx-auto">
                  Pranam, {fullName || 'Honored Patron'}. Your sarees have been reserved in the loom vault and assigned to our master drapers.
                </p>
              </div>

              {/* Order Dossier Summary Box */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-6 text-left space-y-3 text-xs font-sans">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-stone-400">Order Reference</span>
                  <span className="font-bold text-[#D4AF37]">{orderRef}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-stone-400">Recipient</span>
                  <span className="font-semibold text-white">{fullName} ({phone})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-stone-400">Destination</span>
                  <span className="text-stone-200">{address}, {city} - {pincode}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-stone-400">Total Investment Settled</span>
                  <span className="font-bold text-white text-sm">{formatPrice(finalTotalINR, currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>White-Glove Courier</span>
                  </span>
                  <span>Estimated Dispatch in 24 Hours</span>
                </div>
              </div>

              {/* Action Buttons on Confirmation */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleWhatsAppReceipt}
                  className="flex-1 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-emerald-300 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Receive Live Dispatch on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-xs uppercase tracking-wider font-bold transition-all shadow-xl"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MAIN CHECKOUT FORM & GATEWAYS */}
          {step === 'form' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sub-column: Shipping & Patron Details (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                      Step 1 of 2
                    </span>
                    <h3 className="text-xl font-editorial font-normal text-white">
                      Patron & Delivery Coordinates
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Lady / Mr. Name"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="patron@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 / +1 / +44 ..."
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Palace / Villa / Suite / Street Address"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Bengaluru / London / New York"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                          Postal / Pin Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="560001 / SW1A 1AA"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Gateway Toggle */}
                  <div className="pt-3 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                      Select Payment Gateway
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setGateway('razorpay')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          gateway === 'razorpay'
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-lg'
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">Razorpay</span>
                          {gateway === 'razorpay' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <span className="text-[10px] text-stone-400 mt-1">
                          UPI, RuPay, NetBanking & Cards (India)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGateway('stripe')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          gateway === 'stripe'
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-lg'
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">Stripe</span>
                          {gateway === 'stripe' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <span className="text-[10px] text-stone-400 mt-1">
                          International Cards & Apple Pay
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Gateway Specific Input Simulation */}
                  {gateway === 'razorpay' ? (
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                      <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                        UPI ID / VPA (Instant QR & App Request)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="patron@upi / phonepe / okicici"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-stone-500 block">
                        Credit/Debit cards and NetBanking options also supported on authorization.
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• 4242"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Sub-column: Order Summary & Review (5 cols) */}
                <div className="lg:col-span-5 bg-black/50 p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-lg font-editorial font-normal text-white pb-2 border-b border-white/10">
                    Order Ledger ({cart.length} Saree{cart.length > 1 ? 's' : ''})
                  </h3>

                  {/* Cart Items Preview */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <div className="truncate pr-2">
                          <span className="font-semibold text-white block truncate">{item.title}</span>
                          <span className="text-[10px] text-stone-400">{item.colorwayName}</span>
                        </div>
                        <span className="font-medium text-[#D4AF37] whitespace-nowrap">
                          {formatPrice(item.priceINR, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="space-y-2 pt-2 text-xs font-sans border-t border-white/10">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal</span>
                      <span className="text-white">{formatPrice(subtotalINR, currency)}</span>
                    </div>

                    {discountINR > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Privilege Discount ({promoCode || 'PROMO'})</span>
                        <span>- {formatPrice(discountINR, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-400">
                      <span>Insured Global Transit</span>
                      <span className="text-emerald-400 font-semibold">Complimentary</span>
                    </div>

                    <div className="flex justify-between text-stone-400">
                      <span>Preservation Muslin Box</span>
                      <span className="text-[#D4AF37]">Included</span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-white">
                      <span className="text-sm font-editorial font-bold">Total Investment</span>
                      <span className="text-2xl font-editorial font-bold text-[#D4AF37]">
                        {formatPrice(finalTotalINR, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.22em] font-sans font-bold shadow-xl transition-all flex items-center justify-center gap-2 btn-shimmer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Acquisition</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>256-Bit SSL Encrypted & PCI-DSS Compliant</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
