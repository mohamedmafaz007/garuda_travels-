import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import { destinations } from '@/data/mockData';
import QuoteCTA from '@/components/sections/QuoteCTA';
import { useToast } from '@/context/ToastContext';

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { showToast } = useToast();
  const destination = destinations.find((d) => d.id === id);

  useEffect(() => {
    if (destination) {
      document.title = `${destination.name} | GARUDA TRAVELS Destinations`;
    }
  }, [destination, location]);

  if (!destination) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="font-display text-3xl font-bold text-navy-800">Destination Not Found</h1>
        <Link to="/destinations" className="rounded-full bg-navy-800 px-6 py-3 text-sm font-bold text-white">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <Link to="/destinations" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>
          <div className="mt-4 flex items-center gap-2 text-gold-300">
            <MapPin className="h-5 w-5" />
            <span className="text-xs font-semibold tracking-wide uppercase">{destination.category}</span>
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{destination.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-navy-600">{destination.description}</p>

        <h2 className="mt-10 font-display text-2xl font-bold text-navy-800">Top Highlights</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {destination.highlights.map((h) => (
            <div key={h} className="flex items-center gap-3 rounded-xl bg-navy-50 px-4 py-3">
              <Check className="h-5 w-5 shrink-0 text-gold-600" />
              <span className="text-sm font-medium text-navy-700">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-navy-800 to-navy-900 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white">Want to visit {destination.name}?</h3>
          <p className="mt-2 text-sm text-navy-200">Let us plan the perfect trip for you.</p>
          <Link
            to="/contact"
            onClick={() => showToast(`Let's plan your trip to ${destination.name}!`)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-navy-900 transition-all hover:-translate-y-0.5"
          >
            Plan My Trip to {destination.name}
          </Link>
        </div>
      </div>

      <QuoteCTA />
    </div>
  );
}
