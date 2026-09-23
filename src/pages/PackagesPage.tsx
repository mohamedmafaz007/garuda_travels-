import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import Packages from '@/components/sections/Packages';
import PackageModal from '@/components/modals/PackageModal';
import QuoteCTA from '@/components/sections/QuoteCTA';
import type { Package } from '@/types';

export default function PackagesPage() {
  useSEO({
    title: 'Madurai Tour Packages | South India Tours – Garuda Travels',
    description:
      'Explore affordable Madurai tour packages with Garuda Travels. South India tour packages from Madurai including Rameshwaram, Kodaikanal, Ooty, Munnar, Kerala & more.',
    canonical: '/packages',
    keywords:
      'Madurai tour packages, South India tour packages from Madurai, Madurai travel packages, Madurai sightseeing packages, Tamil Nadu tour packages, Rameshwaram tour from Madurai',
  });

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/13244568/pexels-photo-13244568.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Madurai tour packages – historic temple by the river"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Tour Packages</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Madurai Tour Packages
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Carefully curated South India travel experiences from Madurai
            </p>
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
