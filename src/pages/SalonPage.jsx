import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Video, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_ASSETS } from '../data/sarees';

export default function SalonPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Bengaluru Flagship Atelier (Lavelle Road)',
    date: '',
    timeSlot: 'Morning (11:00 AM - 1:00 PM)',
    beverage: 'Kashmiri Saffron Kahwa',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `Pranam Kashika Atelier.%0A%0A*Private Salon Appointment Request:*%0A- Guest: ${encodeURIComponent(formData.name)}%0A- Phone: ${encodeURIComponent(formData.phone)}%0A- Sanctuary: ${encodeURIComponent(formData.city)}%0A- Date & Time: ${encodeURIComponent(formData.date)} (${encodeURIComponent(formData.timeSlot)})%0A- Hospitality: ${encodeURIComponent(formData.beverage)}%0A- Notes: ${encodeURIComponent(formData.notes)}`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  const handleStartVirtualCall = () => {
    const msg = encodeURIComponent(
      'Pranam Kashika Concierge. I would like to schedule an immediate 1-on-1 High-Definition Virtual Video Draping Call to inspect the Rajkumari Mayil Jangla saree colorways live on camera.'
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FBF9F5] py-32 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#D4AF37]/30 selection:text-[#FBF9F5]">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-20 space-y-3"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold flex items-center justify-center gap-2">
          <span>⚜</span> Private Draping Salons <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#FBF9F5] tracking-tight">
          Experience Kashika in Person
        </h1>
        <p className="text-sm sm:text-base font-editorial italic text-stone-300 leading-relaxed">
          Step into our private draping salons for an intimate, unhurried consultation over artisanal tea, or connect via private high-definition video consultation from anywhere in the world.
        </p>

        {/* Visual Metric Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs font-sans">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-stone-300 shadow-sm">
            <span>☕</span> Kashmiri Saffron Hospitality
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-[#D4AF37] shadow-sm">
            <span>⚜</span> One Guest Party at a Time
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[0.5px] border-[#D4AF37]/30 text-emerald-400 shadow-sm">
            <span>📹</span> Worldwide HD Video Consults
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: Private Appointment Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 bg-[#121212] p-8 sm:p-12 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#FBF9F5] mb-2 tracking-wide">
            Request VIP Bridal Consultation
          </h2>
          <p className="text-xs font-sans text-stone-400 mb-8">
            Connect with our senior bridal stylists for a private one-on-one trousseau consultation and tailored video draping.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-[#0A0A0A] rounded-lg border border-[0.5px] border-[#D4AF37]/40 text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
              <h3 className="text-xl font-editorial font-normal text-[#FBF9F5]">
                Appointment Transmitted to Concierge
              </h3>
              <p className="text-xs font-sans text-stone-300">
                Our Senior Draper is reviewing your appointment and will confirm your salon reservation via WhatsApp.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lady / Mr. Surname"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 / +1 / +44 ..."
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Atelier Location
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Bengaluru Flagship (Lavelle Road)">Bengaluru Flagship Atelier (Lavelle Road)</option>
                    <option value="Varanasi Loom Sanctuary (Shivala Ghat)">Varanasi Loom Sanctuary (Shivala Ghat)</option>
                    <option value="London Mayfair Suite (By Invitation)">London Mayfair Suite (By Invitation)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:30 PM - 4:30 PM)">Afternoon (2:30 PM - 4:30 PM)</option>
                    <option value="Evening (5:30 PM - 7:30 PM)">Evening (5:30 PM - 7:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Hospitality Courtesy
                  </label>
                  <select
                    value={formData.beverage}
                    onChange={(e) => setFormData({ ...formData, beverage: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Kashmiri Saffron Kahwa">Kashmiri Saffron Kahwa</option>
                    <option value="Darjeeling First Flush Tea">Darjeeling First Flush Tea</option>
                    <option value="Mysore Royal Filter Coffee">Mysore Royal Filter Coffee</option>
                    <option value="Vintage Brut Champagne">Vintage Brut Champagne</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-stone-400 font-bold mb-2">
                  Special Notes / Wedding Timeline / Saree Colorways of Interest
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Seeking Sindoor Crimson for a December wedding, interested in 3-piece trousseau box."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[0.5px] border-white/20 rounded text-sm font-editorial text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.25em] font-sans font-bold rounded transition-all shadow-xl btn-shimmer"
              >
                Request Bridal Consultation &rarr;
              </button>
            </form>
          )}
        </motion.div>

        {/* Right Column: Virtual Consultation & Atelier Photos */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Virtual Video Draping Card */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[0.5px] border-[#D4AF37]/30 min-h-[300px] flex items-end">
            <img
              src={BRAND_ASSETS.salonInterior}
              alt="Virtual Consultation Studio"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45]"
            />
            <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
                Worldwide VIP Concierge
              </span>
              <h3 className="text-2xl font-editorial font-normal">
                Virtual HD Video Draping Call
              </h3>
              <p className="text-xs font-sans text-stone-300 leading-relaxed mb-4">
                Connect live with our senior master drapers from New York, London, Dubai, or Singapore. We drape your chosen colorways under calibrated daylight lighting live on camera.
              </p>
              <button
                onClick={handleStartVirtualCall}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-black text-[11px] uppercase tracking-widest font-sans font-bold rounded transition-all shadow-xl flex items-center justify-center gap-2 btn-shimmer"
              >
                <Video className="w-4 h-4 text-black" />
                <span>Request Instant Video Consultation</span>
              </button>
            </div>
          </div>

          {/* Physical Sanctuaries Card */}
          <div className="bg-[#121212] p-6 sm:p-8 rounded-lg border border-[0.5px] border-[#D4AF37]/30 shadow-2xl space-y-5">
            <h3 className="text-lg font-editorial font-normal text-[#FBF9F5] pb-2 border-b border-white/10 tracking-wide">
              Atelier Sanctuaries
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block">Bengaluru Flagship Atelier</span>
                  <p className="text-stone-400">14 Lavelle Road, Shanthala Nagar, Bengaluru 560001</p>
                  <p className="text-[#D4AF37] mt-0.5">Tue – Sun: 11:00 AM – 7:30 PM (Private Appointment)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block">Varanasi Loom Sanctuary</span>
                  <p className="text-stone-400">D 28/42 Shivala Ghat, Varanasi, Uttar Pradesh 221001</p>
                  <p className="text-[#D4AF37] mt-0.5">Mon – Sat: 10:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block">VIP Concierge WhatsApp</span>
                  <p className="text-stone-400">+91 76767 21111 (Senior Draper Desk)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
