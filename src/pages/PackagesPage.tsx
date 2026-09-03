import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Packages from '@/components/sections/Packages';
import PackageModal from '@/components/modals/PackageModal';
import QuoteCTA from '@/components/sections/QuoteCTA';
import type { Package } from '@/types';

export default function PackagesPage() {
  const location = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    document.title = 'South India Tour Packages | GARUDA TRAVELS';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/13244568/pexels-photo-13244568.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Historic Indian temple by the river"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Tour Packages</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Handpicked Journeys
            </h1>
            <p className="mt-3 text-lg text-white/80">Carefully curated travel experiences across South India</p>
          </div>
        </div>
      </div>
      <Packages onViewDetails={setSelectedPackage} />
      <QuoteCTA />
      {selectedPackage && (
        <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
      )}
    </div>
  );
}
