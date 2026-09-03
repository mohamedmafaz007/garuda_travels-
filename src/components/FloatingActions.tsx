import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function FloatingActions() {
  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 lg:flex">
        <a
          href="https://wa.me/918122552280?text=Hi%20BEST%20TRAVELS,%20I%20have%20an%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-all hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full bg-green-500 animate-[pulse-ring_2s_ease-out_infinite]" />
          <WhatsAppIcon className="relative h-7 w-7" />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </a>
        <a
          href="tel:+918122552280"
          aria-label="Call us"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-white shadow-xl shadow-navy-700/30 transition-all hover:scale-110"
        >
          <Phone className="h-6 w-6" />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Call Now
          </span>
        </a>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-navy-100 bg-white shadow-2xl lg:hidden">
        <a
          href="tel:+918122552280"
          className="flex flex-col items-center gap-1 py-3 text-navy-700 transition-colors hover:bg-navy-50"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-semibold">CALL</span>
        </a>
        <a
          href="https://wa.me/918122552280?text=Hi%20BEST%20TRAVELS,%20I%20have%20an%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-navy-100 py-3 text-green-600 transition-colors hover:bg-green-50"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-xs font-semibold">WHATSAPP</span>
        </a>
        <Link
          to="/contact"
          className="flex flex-col items-center gap-1 bg-gradient-to-r from-gold-400 to-gold-500 py-3 text-navy-900"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-bold">BOOK NOW</span>
        </Link>
      </div>
    </>
  );
}
