import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/context/ToastContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { quoteCtaImage } from '@/data/mockData';

export default function QuoteCTA() {
  const { showToast } = useToast();
  const { ref, revealed } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src={quoteCtaImage}
          alt="Scenic mountain road in South India"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/50" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} max-w-2xl`}>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Have a Different Trip in Mind?
          </h2>
          <p className="mt-5 text-lg text-white/80">
            Tell us where you want to go, and we'll create a journey around you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={() => showToast('Tell us about your trip!')}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-xl shadow-gold-500/30 transition-all hover:-translate-y-0.5"
            >
              Get Custom Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/918122552280?text=Hi%20BEST%20TRAVELS,%20I'm%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

