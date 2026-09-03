import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReviewsListAndForm from '@/components/sections/ReviewsListAndForm';
import TrustStats from '@/components/sections/TrustStats';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function ReviewsPage() {
  const location = useLocation();
  useEffect(() => {
    document.title = 'Traveler Reviews | GARUDA TRAVELS';
  }, [location]);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-navy-900">
        <img
          src="https://images.pexels.com/photos/11959990/pexels-photo-11959990.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Family at Kanyakumari sunset"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Reviews</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Stories From Our Travelers
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
