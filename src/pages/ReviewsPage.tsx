import { useSEO } from '@/hooks/useSEO';
import ReviewsListAndForm from '@/components/sections/ReviewsListAndForm';
import TrustStats from '@/components/sections/TrustStats';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function ReviewsPage() {
  useSEO({
    title: 'Customer Reviews | Garuda Travels Madurai',
    description:
      'Read genuine customer reviews for Garuda Travels Madurai. Hundreds of happy travellers share their experiences with our cab service, tour packages, and South India trips.',
    canonical: '/reviews',
    keywords: 'Garuda Travels Madurai reviews, Madurai travel agency reviews, Garuda Travels customer testimonials',
  });

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/11959990/pexels-photo-11959990.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Happy travellers at Kanyakumari sunset – Garuda Travels Madurai reviews"
          width={1920}
          height={800}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Reviews</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              What Our Travellers Say
            </h1>
          </div>
        </div>
      </div>
      <TrustStats />
      <ReviewsListAndForm />
      <QuoteCTA />
    </div>
  );
}
