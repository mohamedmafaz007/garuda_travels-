import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutSection from '@/components/sections/AboutSection';
import TrustStats from '@/components/sections/TrustStats';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function AboutPage() {
  const location = useLocation();
  useEffect(() => {
    document.title = 'About GARUDA TRAVELS | Your Trusted South India Travel Partner';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/36982207/pexels-photo-36982207.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Scenic South India landscape"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">About Us</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              About GARUDA TRAVELS
            </h1>
          </div>
        </div>
      </div>
      <AboutSection />
      <TrustStats />
      <WhyChooseUs />
      <HowItWorks />
      <QuoteCTA />
    </div>
  );
}
