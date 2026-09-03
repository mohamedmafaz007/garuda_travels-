import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import Services from '@/components/sections/Services';
import DestinationExplorer from '@/components/sections/DestinationExplorer';
import Packages from '@/components/sections/Packages';
import CabBooking from '@/components/sections/CabBooking';
import FleetSection from '@/components/sections/FleetSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import QuoteCTA from '@/components/sections/QuoteCTA';
import ContactForm from '@/components/sections/ContactForm';
import MapSection from '@/components/sections/MapSection';
import PackageModal from '@/components/modals/PackageModal';
import VehicleModal from '@/components/modals/VehicleModal';
import type { Package, Vehicle } from '@/types';

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <>
      <Hero />
      <AboutSection />
      <FleetSection onBook={setSelectedVehicle} limit={4} />
      <DestinationExplorer limit={6} />
      <Packages onViewDetails={setSelectedPackage} limit={3} />
      <CabBooking />
      <WhyChooseUs />
      <HowItWorks />
      <Gallery limit={6} />
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
