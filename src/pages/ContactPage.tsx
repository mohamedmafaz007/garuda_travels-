import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from '@/components/sections/ContactForm';
import MapSection from '@/components/sections/MapSection';
import FAQ from '@/components/sections/FAQ';

export default function ContactPage() {
  const location = useLocation();
  useEffect(() => {
    document.title = 'Contact GARUDA TRAVELS | Plan Your South India Trip';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-950 flex flex-col items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="Garuda Travels"
            className="h-28 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] mb-6"
          />
          <p className="mt-2 text-sm sm:text-lg md:text-xl font-bold tracking-[0.15em] text-gold-400 uppercase">
            Your Journey Our Responsibility
          </p>
        </div>
      </div>
      <ContactForm />
      <MapSection />
      <FAQ />
    </div>
  );
}
