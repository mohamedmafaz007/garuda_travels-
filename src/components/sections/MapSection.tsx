import { useState } from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Clock, Copy, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useToast } from '@/context/ToastContext';

export default function MapSection() {
  const { ref, revealed } = useScrollReveal();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const fullAddress = '5/434-D, Thiruvalluvar Nagar, Thirunagar, Madurai - 625006, Tamil Nadu, India';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=5%2F434-D%2C+Thiruvalluvar+Nagar%2C+Thirunagar%2C+Madurai+-+625006';
  const embedMapUrl = 'https://maps.google.com/maps?q=5/434-D,+Thiruvalluvar+Nagar,+Thirunagar,+Madurai+-+625006&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    showToast('Office address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} id="location-map" className="bg-white py-16 lg:py-24 border-t border-navy-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Find Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl text-balance">
            Our Madurai Headquarters
          </h2>
          <p className="mt-3 text-base text-navy-600">
            Conveniently located in Thirunagar, Madurai. Drop by for custom itinerary planning or cab dispatch.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info Card */}
          <div
            className={`reveal ${revealed ? 'revealed' : ''} lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 p-6 sm:p-8 text-white shadow-xl shadow-navy-950/15`}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-gold-400 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5" />
                <span>Registered Office</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-white">GARUDA TRAVELS</h3>
              <p className="mt-1 text-sm text-gold-400 font-medium">Your Journey. Our Responsibility.</p>

              {/* Formatted Address Box */}
              <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="text-xs uppercase font-bold text-navy-300 tracking-wider">Office Address</p>
                <div className="mt-2 text-base font-medium leading-relaxed text-white">
                  5/434-D, Thiruvalluvar Nagar,<br />
                  Thirunagar,<br />
                  Madurai - 625006,<br />
                  Tamil Nadu, India
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold text-white transition-all"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                  </button>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 px-3.5 py-2 text-xs font-bold text-navy-950 transition-all shadow-md"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Hours & Contact */}
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3 text-sm text-navy-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gold-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">Working Hours</p>
                    <p className="font-semibold text-white">24/7 Operations &amp; Cab Dispatch</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-navy-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gold-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">Direct Helpline</p>
                    <a href="tel:+918122552280" className="font-semibold text-white hover:text-gold-400 transition-colors">
                      +91 81225 52280
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <a
                href="tel:+918122552280"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 py-3 text-xs font-bold text-white transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/918122552280?text=Hi%20GARUDA%20TRAVELS,%20I'd%20like%20to%20visit%20your%20office%20in%20Thirunagar,%20Madurai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 py-3 text-xs font-bold transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Interactive Google Map */}
          <div
            className={`reveal ${revealed ? 'revealed' : ''} lg:col-span-7 flex flex-col`}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className="flex-1 min-h-[440px] w-full overflow-hidden rounded-3xl border border-navy-200/80 bg-white shadow-xl flex flex-col">
              {/* Sleek Integrated Map Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 bg-white px-5 py-3.5 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-50 text-gold-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-navy-900 tracking-tight">
                      Thiruvalluvar Nagar, Thirunagar, Madurai
                    </span>
                    <span className="hidden sm:inline-block ml-2 rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-semibold text-navy-700">
                      Office Location
                    </span>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 hover:bg-gold-500 hover:text-navy-950 px-3.5 py-1.5 text-xs font-bold text-white transition-all shadow-sm"
                >
                  <Navigation className="h-3.5 w-3.5 text-gold-400" />
                  <span>Open in Maps</span>
                </a>
              </div>

              {/* Map View */}
              <div className="relative flex-1 w-full min-h-[380px]">
                <iframe
                  title="GARUDA TRAVELS Office Location - Thirunagar, Madurai"
                  src={embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
