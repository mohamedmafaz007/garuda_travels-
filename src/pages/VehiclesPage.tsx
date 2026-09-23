import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import FleetSection from '@/components/sections/FleetSection';
import CabBooking from '@/components/sections/CabBooking';
import VehicleModal from '@/components/modals/VehicleModal';
import QuoteCTA from '@/components/sections/QuoteCTA';
import type { Vehicle } from '@/types';

export default function VehiclesPage() {
  useSEO({
    title: 'Madurai Cab Service & Car Rental | Garuda Travels',
    description:
      'Book a cab in Madurai with Garuda Travels. Madurai cab service, car rental with driver, outstation cabs, airport taxi – sedans, SUVs, Innova, Tempo Traveller available.',
    canonical: '/vehicles',
    keywords:
      'Madurai cab service, Madurai car rental, cab service in Madurai, Madurai taxi service, Madurai outstation cab, Madurai airport taxi, car rental in Madurai',
  });

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/33521845/pexels-photo-33521845.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Garuda Travels Madurai cab and car rental fleet"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Our Fleet</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Madurai Cab & Car Rental
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Sedans, SUVs, and Tempo Travellers for every trip in and around Madurai
            </p>
          </div>
        </div>
      </div>
      <FleetSection onBook={setSelectedVehicle} />
      <CabBooking />
      <QuoteCTA />
      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </div>
  );
}
