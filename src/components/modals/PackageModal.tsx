import { useEffect } from 'react';
import { X, Star, Check, IndianRupee, MapPin, Car, Hotel, Info } from 'lucide-react';
import type { Package } from '@/types';
import { useToast } from '@/context/ToastContext';

export default function PackageModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  const { showToast } = useToast();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="my-8 w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
        <div className="animate-scale-in overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Hero image */}
          <div className="relative h-64 sm:h-80">
            <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-all hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase">
                  {pkg.duration}
                </span>
                <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1">
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
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[50vh] overflow-y-auto p-6 sm:p-8 lg:max-h-[60vh]">
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
          <div className="border-t border-navy-100 p-6">
            <button
              onClick={() => {
                const msg = encodeURIComponent(
                  `Hi GARUDA TRAVELS, I want to book this tour package!\n\n` +
                  `📦 Package: ${pkg.title}\n` +
                  `⏳ Duration: ${pkg.duration}\n` +
                  `💰 Starting Price: ₹${pkg.price.toLocaleString('en-IN')}\n` +
                  `✨ Highlights: ${pkg.highlights.join(', ')}\n\n` +
                  `Please confirm available departure dates and vehicle options.`
                );
                window.open(`https://wa.me/918122552280?text=${msg}`, '_blank');
                onClose();
                showToast(`Booking details for ${pkg.title} sent to WhatsApp (+91 81225 52280)!`);
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
