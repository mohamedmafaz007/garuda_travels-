import { useSEO } from '@/hooks/useSEO';
import ContactForm from '@/components/sections/ContactForm';
import MapSection from '@/components/sections/MapSection';
import FAQ from '@/components/sections/FAQ';

export default function ContactPage() {
  useSEO({
    title: 'Contact Garuda Travels Madurai | Book Your Trip',
    description:
      'Contact Garuda Travels Madurai to book cab service, tour packages, airport transfers, or outstation trips. Call +91 96261 38168 or WhatsApp us today.',
    canonical: '/contact',
    keywords:
      'contact Garuda Travels Madurai, book cab Madurai, Madurai travel booking, Garuda Travels phone number',
  });

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-950 flex flex-col items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="Garuda Travels Madurai logo"
            width={160}
            height={160}
            className="h-28 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] mb-6"
            loading="eager"
          />
          <h1 className="mt-2 text-sm sm:text-lg md:text-xl font-bold tracking-[0.15em] text-gold-400 uppercase">
            Your Journey Our Responsibility
          </h1>
        </div>
      </div>
      <ContactForm />
      <MapSection />
      <FAQ />
    </div>
  );
}
