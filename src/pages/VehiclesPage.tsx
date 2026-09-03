import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FleetSection from '@/components/sections/FleetSection';
import CabBooking from '@/components/sections/CabBooking';
import VehicleModal from '@/components/modals/VehicleModal';
import QuoteCTA from '@/components/sections/QuoteCTA';
import type { Vehicle } from '@/types';

export default function VehiclesPage() {
  const location = useLocation();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    document.title = 'Vehicle Fleet | GARUDA TRAVELS';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/33521845/pexels-photo-33521845.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="White luxury sedan"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Our Fleet</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Choose Your Perfect Ride
            </h1>
            <p className="mt-3 text-lg text-white/80">From sedans to tempo travellers, we have the right vehicle for you</p>
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
