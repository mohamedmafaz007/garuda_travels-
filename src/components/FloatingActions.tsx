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
      {/* Sticky Action Bar (Floats on Desktop, Bottom sticky on Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-navy-100 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
        <a
          href="tel:+918122552280"
          className="flex flex-col items-center justify-center gap-1 py-4 text-navy-700 transition-colors hover:bg-navy-50 border-r border-navy-100"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-semibold">CALL</span>
        </a>
        <a
          href="https://wa.me/918122552280?text=Hi%20BEST%20TRAVELS,%20I%20have%20an%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-4 text-green-600 transition-colors hover:bg-green-50 border-r border-navy-100"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-[10px] font-semibold">WHATSAPP</span>
        </a>
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-4 text-gold-600 transition-colors hover:bg-gold-50 border-r border-navy-100"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-[10px] font-semibold">ESTIMATE</span>
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-4 text-navy-900 transition-colors hover:bg-navy-50"
        >
          <Bot className="h-5 w-5" />
          <span className="text-[10px] font-semibold">GARUDA AI</span>
        </button>

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-gold-400 to-gold-500 py-4 text-navy-900 transition-colors hover:font-extrabold"
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

          <TripCostEstimator onClose={() => setIsEstimatorOpen(false)} />
        </div>
      </div>
    </>
  );
}
