import { useState } from 'react';
import { Phone, Calendar, Bot, Calculator, X } from 'lucide-react';
import TripCostEstimator from './sections/TripCostEstimator';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';
import ChatBot from './ChatBot';

export default function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 lg:flex">
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-900 shadow-xl shadow-gold-500/30 transition-all duration-300 hover:scale-110 ${isEstimatorOpen ? 'scale-0 opacity-0 hidden' : 'scale-100 opacity-100'}`}
          aria-label="Trip Cost Estimator"
        >
          <Calculator className="relative h-6 w-6" strokeWidth={2.5} />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Cost Estimator
          </span>
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#111317] text-gold-400 ring-[4px] ring-gray-400/80 shadow-xl shadow-black/30 transition-all duration-300 hover:scale-110 ${isChatOpen ? 'scale-0 opacity-0 hidden' : 'scale-100 opacity-100'}`}
          aria-label="AI Assistant"
        >
          <Bot className="relative h-7 w-7" strokeWidth={2.5} />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            GARUDA AI
          </span>
        </button>
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
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-navy-100 bg-white shadow-2xl lg:hidden">
        <a
          href="tel:+918122552280"
          className="flex flex-col items-center gap-1 py-3 text-navy-700 transition-colors hover:bg-navy-50 border-r border-navy-100"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-semibold">CALL</span>
        </a>
        <a
          href="https://wa.me/918122552280?text=Hi%20BEST%20TRAVELS,%20I%20have%20an%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-green-600 transition-colors hover:bg-green-50 border-r border-navy-100"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-[10px] font-semibold">WHATSAPP</span>
        </a>
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="flex flex-col items-center gap-1 py-3 text-gold-600 transition-colors hover:bg-gold-50 border-r border-navy-100"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-[10px] font-semibold">ESTIMATE</span>
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex flex-col items-center gap-1 py-3 text-navy-900 transition-colors hover:bg-navy-50"
        >
          <Bot className="h-5 w-5" />
          <span className="text-[10px] font-semibold">GARUDA AI</span>
        </button>

        <Link
          to="/contact"
          className="flex flex-col items-center gap-1 bg-gradient-to-r from-gold-400 to-gold-500 py-3 text-navy-900"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-[10px] font-bold">BOOK NOW</span>
        </Link>
      </div>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Estimator Modal Overlay */}
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm transition-all duration-300 ${isEstimatorOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsEstimatorOpen(false)}
      >
        <div
          className={`relative w-full max-w-4xl transition-all duration-300 ${isEstimatorOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsEstimatorOpen(false)}
            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <TripCostEstimator />
        </div>
      </div>
    </>
  );
}
