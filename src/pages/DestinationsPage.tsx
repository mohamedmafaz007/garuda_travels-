import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DestinationExplorer from '@/components/sections/DestinationExplorer';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function DestinationsPage() {
  const location = useLocation();
  useEffect(() => {
    document.title = 'South India Destinations | GARUDA TRAVELS';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/16443099/pexels-photo-16443099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
          alt="Winding road through South Indian tea plantations"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Destinations</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Explore South India
            </h1>
            <p className="mt-3 text-lg text-white/80 italic">Beautiful places. Unforgettable memories.</p>
          </div>
        </div>
      </div>
      <DestinationExplorer />
      <QuoteCTA />
    </div>
  );
}
