import { useSEO } from '@/hooks/useSEO';
import DestinationExplorer from '@/components/sections/DestinationExplorer';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function DestinationsPage() {
  useSEO({
    title: 'South India Destinations from Madurai | Garuda Travels',
    description:
      'Explore top South India destinations from Madurai with Garuda Travels – Rameshwaram, Kodaikanal, Ooty, Munnar, Kanyakumari, Kerala, Mysore & more. Book your trip today.',
    canonical: '/destinations',
    keywords:
      'South India destinations from Madurai, Madurai sightseeing, Rameshwaram trip from Madurai, Kodaikanal from Madurai, Ooty from Madurai, Kanyakumari from Madurai',
  });

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/16443099/pexels-photo-16443099.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Winding road through South Indian tea plantations – destinations from Madurai"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Destinations</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              South India Destinations
            </h1>
            <p className="mt-3 text-lg text-white/80 italic">
              Explore beautiful places across Tamil Nadu, Kerala & Karnataka from Madurai
            </p>
          </div>
        </div>
      </div>
      <DestinationExplorer />
      <QuoteCTA />
    </div>
  );
}
