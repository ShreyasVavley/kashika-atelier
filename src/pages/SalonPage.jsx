import React, { useState } from 'react';
import { MapPin, Phone, Mail, Calendar, Video, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SalonPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Bengaluru Flagship (Lavelle Road)',
    date: '',
    timeSlot: 'Morning (11:00 AM - 1:00 PM)',
    beverage: 'Kashmiri Saffron Kahwa',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `Pranam Kashika Atelier.%0A%0A*Private Salon Appointment Request:*%0A- Name: ${encodeURIComponent(formData.name)}%0A- Phone: ${encodeURIComponent(formData.phone)}%0A- Location: ${encodeURIComponent(formData.city)}%0A- Date & Time: ${encodeURIComponent(formData.date)} (${encodeURIComponent(formData.timeSlot)})%0A- Hospitality: ${encodeURIComponent(formData.beverage)}%0A- Notes: ${encodeURIComponent(formData.notes)}`;

    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  const handleStartVirtualCall = () => {
    const msg = encodeURIComponent(
      'Pranam Kashika Concierge. I would like to schedule an immediate 1-on-1 High-Definition Virtual Video Draping Call to inspect the Rajkumari Mayil Jangla saree colorways.'
    );
    window.open(`https://wa.me/917676721111?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A661C] font-sans font-semibold flex items-center justify-center gap-2 mb-3">
          <span>⚜</span> Private Salon & Concierge <span>⚜</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-normal text-[#1C1917] tracking-tight mb-4">
          Experience Kashika in Person
        </h1>
        <p className="text-base sm:text-lg font-editorial italic text-[#44403C]">
          Step into our private draping salons for an intimate, unhurried consultation over artisanal tea, or connect via private high-definition video consultation from anywhere in the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Private Appointment Booking Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded border border-[#B8860B]/30 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-2">
            Reserve Your Private Viewing
          </h2>
          <p className="text-xs font-sans text-[#78716C] mb-8">
            Private salon viewings are strictly one guest party at a time to ensure total privacy and dedicated draper attention.
          </p>

          {submitted ? (
            <div className="p-8 bg-[#F4EFEA] rounded border border-[#B8860B]/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#781224] mx-auto" />
              <h3 className="text-xl font-editorial font-bold text-[#1C1917]">
                Appointment Request Transmitted
              </h3>
              <p className="text-xs font-sans text-[#44403C]">
                Our Senior Draper Concierge is reviewing your date and will confirm your salon suite reservation via WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
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
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
                    WhatsApp / Mobile *
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
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
                    Salon Location
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  >
                    <option value="Bengaluru Flagship (Lavelle Road)">Bengaluru Flagship (Lavelle Road)</option>
                    <option value="Varanasi Loom Sanctuary (Shivala Ghat)">Varanasi Loom Sanctuary (Shivala Ghat)</option>
                    <option value="London Mayfair Suite (By Invitation)">London Mayfair Suite (By Invitation)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
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
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
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
                  <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
                    Hospitality Courtesy
                  </label>
                  <select
                    value={formData.beverage}
                    onChange={(e) => setFormData({ ...formData, beverage: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B8860B]/30 rounded text-sm font-editorial text-[#1C1917] focus:outline-none focus:border-[#781224]"
                  >
                    <option value="Kashmiri Saffron Kahwa">Kashmiri Saffron Kahwa</option>
                    <option value="Darjeeling First Flush Tea">Darjeeling First Flush Tea</option>
                    <option value="Mysore Filter Coffee">Mysore Royal Filter Coffee</option>
                    <option value="Vintage Brut Champagne">Vintage Brut Champagne</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#78716C] font-semibold mb-2">
                  Special Notes / Wedding Timeline / Saree Colorways of Interest
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Seeking Sindoor Crimson for December wedding, interested in 3-piece trousseau box."
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

        {/* Right Column: Virtual Consultation & Atelier Locations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Virtual Video Draping Card */}
          <div className="bg-[#781224] text-[#FAF8F5] p-8 rounded shadow-lg border border-[#B8860B] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-[#B8860B] opacity-20 text-7xl font-crest pointer-events-none">
              ⚜
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#FBF4DE] font-sans font-bold block mb-1">
              Global Video Concierge
            </span>
            <h3 className="text-2xl font-editorial font-bold mb-3">
              Virtual HD Draping Session
            </h3>
            <p className="text-xs font-sans text-stone-200 leading-relaxed mb-6">
              Connect directly with our master drapers from New York, London, Dubai, or Singapore. We drape your chosen colorways under precision 5000K daylight lighting live on camera.
            </p>
            <button
              onClick={handleStartVirtualCall}
              className="w-full py-3.5 bg-[#FAF8F5] text-[#781224] text-xs uppercase tracking-widest font-sans font-bold rounded hover:bg-[#F4EFEA] transition-all shadow flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Request Instant Video Consultation</span>
            </button>
          </div>

          {/* Physical Boutiques List */}
          <div className="bg-white p-8 rounded border border-[#B8860B]/30 shadow-sm space-y-6">
            <h3 className="text-xl font-editorial font-bold text-[#1C1917] pb-3 border-b border-[#B8860B]/20">
              Atelier Sanctuaries
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">Bengaluru Flagship Atelier</span>
                  <p className="text-[#78716C]">14 Lavelle Road, Shanthala Nagar, Bengaluru 560001</p>
                  <p className="text-[#8A661C] mt-0.5">Hours: Tue – Sun, 11:00 AM – 7:30 PM (By Appointment)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">Varanasi Loom Sanctuary</span>
                  <p className="text-[#78716C]">D 28/42 Shivala Ghat, Varanasi, Uttar Pradesh 221001</p>
                  <p className="text-[#8A661C] mt-0.5">Hours: Mon – Sat, 10:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#781224] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1917] block">Direct Concierge WhatsApp</span>
                  <p className="text-[#78716C]">+91 76767 21111 (Senior Draper Hotline)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
