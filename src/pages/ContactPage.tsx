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
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/38115532/pexels-photo-38115532.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
          alt="Mountain road in South India"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Contact</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Get In Touch
            </h1>
            <p className="mt-3 text-lg text-white/80">Your Journey. Our Responsibility.</p>
          </div>
        </div>
      </div>
      <ContactForm />
      <MapSection />
      <FAQ />
    </div>
  );
}
