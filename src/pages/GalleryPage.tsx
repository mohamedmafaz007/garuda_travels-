import { useSEO } from '@/hooks/useSEO';
import Gallery from '@/components/sections/Gallery';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function GalleryPage() {
  useSEO({
    title: 'Travel Gallery | Garuda Travels Madurai',
    description:
      'Browse photos from Garuda Travels Madurai trips – South India tour destinations, cabs, sightseeing and memorable journeys from Madurai across Tamil Nadu and beyond.',
    canonical: '/gallery',
    keywords: 'Garuda Travels Madurai gallery, South India travel photos, Madurai travel images',
  });

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/29988973/pexels-photo-29988973.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Kerala backwaters – Garuda Travels South India tour gallery"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Gallery</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Moments From Our Journeys
            </h1>
          </div>
        </div>
      </div>
      <Gallery />
      <QuoteCTA />
    </div>
  );
}
