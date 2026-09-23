import { useEffect, useState } from 'react';
import { X, Star, Check, IndianRupee, MapPin, Car, Hotel, Info, Instagram, Phone, ChevronDown } from 'lucide-react';
import type { Package } from '@/types';
import { useToast } from '@/context/ToastContext';

export default function PackageModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  const { showToast } = useToast();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState(pkg.highlights[0] || '');
  const [tripMode, setTripMode] = useState<'One Way' | 'Round Trip'>('One Way');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="my-8 w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
        <div className="animate-scale-in overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Black Navbar with Logo + Slogan */}
          <div className="bg-navy-950 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Garuda Travels"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.3)]"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-base font-bold tracking-wider text-white">GARUDA TRAVELS</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-400 mt-0.5">Your Journey Our Responsibility</span>
                </div>
              </div>
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/garuda_travels_58?stkn=OWNnanM4bXNsOXE5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>@garuda_travels_58</span>
              </a>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Package header info */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 px-6 py-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase">
                {pkg.duration}
              </span>
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                <Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
                <span className="text-xs font-bold text-white">{pkg.rating}</span>
                <span className="text-xs text-white/70">({pkg.reviewCount} reviews)</span>
              </div>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{pkg.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-white/70">Starting from</span>
              <span className="font-sans text-2xl font-extrabold text-gold-300 tracking-tight">
                ₹{pkg.price.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Pickup / Destination / Trip Mode row */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy-300">Pickup Area</label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Madurai"
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white placeholder:text-white/40 outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy-300">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Rameshwaram"
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white placeholder:text-white/40 outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy-300">Trip Type</label>
                <div className="relative">
                  <select
                    value={tripMode}
                    onChange={(e) => setTripMode(e.target.value as 'One Way' | 'Round Trip')}
                    className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                  >
                    <option value="One Way">One Way</option>
                    <option value="Round Trip">Round Trip</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[50vh] overflow-y-auto p-6 sm:p-8 lg:max-h-[55vh]">
            {/* Overview */}
            <section>
              <h3 className="font-display text-lg font-bold text-navy-800">Overview</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{pkg.overview}</p>
            </section>

            {/* Highlights */}
            <section className="mt-6">
              <h3 className="font-display text-lg font-bold text-navy-800">Highlights</h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-navy-600">
                    <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                    {h}
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mt-6">
              <h3 className="font-display text-lg font-bold text-navy-800">Day-by-Day Itinerary</h3>
              <div className="mt-4 space-y-4">
                {pkg.itinerary.map((item) => (
                  <div key={item.day} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-white">
                        {item.day.replace('Day ', '')}
                      </span>
                      <h4 className="font-bold text-navy-800">{item.day}: {item.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-navy-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Included / Not Included */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <section>
                <h3 className="font-display text-lg font-bold text-navy-800">What's Included</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.included.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-navy-600">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="font-display text-lg font-bold text-navy-800">What's Not Included</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.notIncluded.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-navy-600">
                      <X className="h-4 w-4 shrink-0 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Vehicle options */}
            <section className="mt-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-800">
                <Car className="h-5 w-5 text-gold-600" />
                Vehicle Options
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {pkg.vehicleOptions.map((v) => (
                  <span key={v} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-700">
                    {v}
                  </span>
                ))}
              </div>
            </section>

            {/* Hotel info */}
            <section className="mt-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-800">
                <Hotel className="h-5 w-5 text-gold-600" />
                Hotel Information
              </h3>
              <p className="mt-2 text-sm text-navy-600">{pkg.hotelInfo}</p>
            </section>

            {/* Important info */}
            <section className="mt-6 rounded-2xl bg-gold-50 p-4">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-800">
                <Info className="h-5 w-5 text-gold-600" />
                Important Information
              </h3>
              <p className="mt-2 text-sm text-navy-600">{pkg.importantInfo}</p>
            </section>
          </div>

          {/* CTA */}
          <div className="border-t border-navy-100 p-6 space-y-3">
            {/* Two phone number quick-call buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+919626138168"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-50 py-3 text-sm font-bold text-navy-700 transition-all hover:bg-navy-100"
              >
                <Phone className="h-4 w-4 text-gold-600" />
                +91 96261 38168
              </a>
              <a
                href="tel:+919363456631"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-50 py-3 text-sm font-bold text-navy-700 transition-all hover:bg-navy-100"
              >
                <Phone className="h-4 w-4 text-gold-600" />
                +91 93634 56631
              </a>
            </div>
            <button
              onClick={() => {
                const msg = encodeURIComponent(
                  `Hi GARUDA TRAVELS, I want to book this tour package!\n\n` +
                  `📦 Package: ${pkg.title}\n` +
                  `⏳ Duration: ${pkg.duration}\n` +
                  `💰 Starting Price: ₹${pkg.price.toLocaleString('en-IN')}\n` +
                  (pickup ? `🚖 Pickup: ${pickup}\n` : '') +
                  (destination ? `📍 Destination: ${destination}\n` : '') +
                  `🔄 Trip Type: ${tripMode}\n` +
                  `✨ Highlights: ${pkg.highlights.join(', ')}\n\n` +
                  `Please confirm available departure dates and vehicle options.`
                );
                window.open(`https://wa.me/916382863873?text=${msg}`, '_blank');
                onClose();
                showToast(`Booking details for ${pkg.title} sent to WhatsApp (+91 63828 63873)!`);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-4 text-sm font-bold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <IndianRupee className="h-5 w-5" />
              Book This Package — ₹{pkg.price.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
