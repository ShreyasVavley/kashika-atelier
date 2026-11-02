import React, { useState } from 'react';
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
    <div className="bg-[#FAF8F5] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#B8860B]/20 selection:text-[#781224]">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-2">
          <span>⚜</span> Private Draping Salons <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight mb-4">
          Experience Kashika in Person
        </h1>
        <p className="text-base font-editorial italic text-[#44403C]">
          Step into our private draping salons for an intimate, unhurried consultation over Kashmiri saffron kahwa, or connect with our master drapers via 1-on-1 virtual HD video worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Private Appointment Booking Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded border border-[#B8860B]/30 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-2">
            Reserve Your Private Suite
          </h2>
          <p className="text-xs font-sans text-[#78716C] mb-8">
            Private salon viewings host one guest party at a time to ensure total privacy and dedicated draper styling.
          </p>

          {submitted ? (
            <div className="p-8 bg-[#F4EFEA] rounded border border-[#B8860B]/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#781224] mx-auto" />
              <h3 className="text-xl font-editorial font-bold text-[#1C1917]">
                Appointment Transmitted to Concierge
              </h3>
              <p className="text-xs font-sans text-[#44403C]">
                Our Senior Draper is reviewing your appointment and will confirm your salon reservation via WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lady / Mr. Surname"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 / +1 / +44 ..."
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    Atelier Location
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  >
                    <option value="Bengaluru Flagship (Lavelle Road)">Bengaluru Flagship Atelier (Lavelle Road)</option>
                    <option value="Varanasi Loom Sanctuary (Shivala Ghat)">Varanasi Loom Sanctuary (Shivala Ghat)</option>
                    <option value="London Mayfair Suite (By Invitation)">London Mayfair Suite (By Invitation)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  >
                    <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:30 PM - 4:30 PM)">Afternoon (2:30 PM - 4:30 PM)</option>
                    <option value="Evening (5:30 PM - 7:30 PM)">Evening (5:30 PM - 7:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                    Hospitality Courtesy
                  </label>
                  <select
                    value={formData.beverage}
                    onChange={(e) => setFormData({ ...formData, beverage: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  >
                    <option value="Kashmiri Saffron Kahwa">Kashmiri Saffron Kahwa</option>
                    <option value="Darjeeling First Flush Tea">Darjeeling First Flush Tea</option>
                    <option value="Mysore Royal Filter Coffee">Mysore Royal Filter Coffee</option>
                    <option value="Vintage Brut Champagne">Vintage Brut Champagne</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#78716C] font-bold mb-2">
                  Special Notes / Wedding Timeline / Saree Colorways of Interest
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Seeking Sindoor Crimson for a December wedding, interested in 3-piece trousseau box."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#781224] text-white text-xs uppercase tracking-[0.25em] font-sans font-semibold rounded hover:bg-[#580B17] transition-all shadow-md"
              >
                Confirm Private Salon Reservation
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Virtual Consultation & Atelier Photos */}
        <div className="lg:col-span-5 space-y-6">
          {/* Virtual Video Draping Card */}
          <div className="relative rounded overflow-hidden shadow-xl border border-[#B8860B] min-h-[300px] flex items-end">
            <img
              src={BRAND_ASSETS.salonInterior}
              alt="Virtual Consultation Studio"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45]"
            />
            <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold block">
                Worldwide VIP Concierge
              </span>
              <h3 className="text-2xl font-editorial font-bold">
                Virtual HD Video Draping Call
              </h3>
              <p className="text-xs font-sans text-stone-200 leading-relaxed mb-4">
                Connect live with our senior master drapers from New York, London, Dubai, or Singapore. We drape your chosen colorways under calibrated daylight lighting live on camera.
              </p>
              <button
                onClick={handleStartVirtualCall}
                className="w-full py-3.5 bg-[#FAF8F5] text-[#781224] text-xs uppercase tracking-widest font-sans font-bold rounded hover:bg-white transition-all shadow flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Request Instant Video Consultation</span>
              </button>
            </div>
          </div>

          {/* Physical Sanctuaries Card */}
          <div className="bg-white p-6 sm:p-8 rounded border border-[#B8860B]/30 shadow-md space-y-5">
            <h3 className="text-lg font-editorial font-bold text-[#1C1917] pb-2 border-b border-[#B8860B]/20">
              Atelier Sanctuaries
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">Bengaluru Flagship Atelier</span>
                  <p className="text-[#78716C]">14 Lavelle Road, Shanthala Nagar, Bengaluru 560001</p>
                  <p className="text-[#8A661C] mt-0.5">Tue – Sun: 11:00 AM – 7:30 PM (Private Appointment)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">Varanasi Loom Sanctuary</span>
                  <p className="text-[#78716C]">D 28/42 Shivala Ghat, Varanasi, Uttar Pradesh 221001</p>
                  <p className="text-[#8A661C] mt-0.5">Mon – Sat: 10:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">VIP Concierge WhatsApp</span>
                  <p className="text-[#78716C]">+91 76767 21111 (Senior Draper Desk)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
