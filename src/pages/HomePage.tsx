import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import FleetSection from '@/components/sections/FleetSection';
import DestinationExplorer from '@/components/sections/DestinationExplorer';
import Packages from '@/components/sections/Packages';
import CabBooking from '@/components/sections/CabBooking';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import QuoteCTA from '@/components/sections/QuoteCTA';
import ContactForm from '@/components/sections/ContactForm';
import MapSection from '@/components/sections/MapSection';
import PackageModal from '@/components/modals/PackageModal';
import VehicleModal from '@/components/modals/VehicleModal';
import type { Package, Vehicle } from '@/types';

export default function HomePage() {
  useSEO({
    title: 'Garuda Travels Madurai | Tours, Travels & Cab Services',
    description:
      'Garuda Travels Madurai – trusted travel agency offering South India tour packages, Madurai cab service, airport transfers, outstation cabs & sightseeing. Call +91 96261 38168.',
    canonical: '/',
    keywords:
      'Garuda Travels Madurai, Madurai tours and travels, travel agency in Madurai, Madurai cab service, Madurai tour packages, Madurai cab booking, Madurai taxi service',
  });

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <>
      <Hero />
      <Gallery limit={6} />
      <FleetSection onBook={setSelectedVehicle} limit={4} />
      <DestinationExplorer limit={6} />
      <Packages onViewDetails={setSelectedPackage} limit={3} />
      <CabBooking />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <QuoteCTA />
      <ContactForm />
      <MapSection />

      {selectedPackage && (
        <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
      )}
      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </>
  );
}
