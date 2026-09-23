import { useSEO } from '@/hooks/useSEO';
import AboutSection from '@/components/sections/AboutSection';
import TrustStats from '@/components/sections/TrustStats';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function AboutPage() {
  useSEO({
    title: 'About Garuda Travels Madurai | Trusted Travel Agency',
    description:
      'Learn about Garuda Travels Madurai – a trusted travel agency in Madurai, Tamil Nadu, with years of experience in cab service, tour packages, airport transfers, and South India travel.',
    canonical: '/about',
    keywords:
      'about Garuda Travels Madurai, Madurai travel agency, travel company in Madurai, Madurai tour operator, Madurai tours and travels',
  });

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/36982207/pexels-photo-36982207.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Scenic South India landscape – Garuda Travels Madurai"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">About Us</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              About Garuda Travels Madurai
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
