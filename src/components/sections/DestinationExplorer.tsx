import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { destinations } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Destination } from '@/types';

const categories = ['ALL', 'TEMPLE', 'HILL STATION', 'BEACH', 'FAMILY', 'ADVENTURE'] as const;

export default function DestinationExplorer({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const { ref, revealed } = useScrollReveal();

  const filtered: Destination[] = (activeCategory === 'ALL'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory)
  ).slice(0, limit);

  return (
    <section ref={ref} className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Destinations</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Explore South India
          </h2>
          <p className="mt-4 text-lg text-navy-500 italic">Beautiful places. Unforgettable memories.</p>
        </div>

        {/* Filters */}
        <div className={`reveal ${revealed ? 'revealed' : ''} mt-10 flex flex-wrap justify-center gap-2`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-navy-800 text-white shadow-lg'
                  : 'bg-white text-navy-600 border border-navy-200 hover:border-gold-300 hover:text-navy-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest, i) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.id}`}
              className={`reveal ${revealed ? 'revealed' : ''} group relative overflow-hidden rounded-3xl shadow-lg transition-all hover:shadow-2xl`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <div className="absolute inset-0 bg-navy-950/0 transition-all group-hover:bg-navy-950/20" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 rounded-full bg-gold-400/90 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase backdrop-blur-sm">
                  {dest.category}
                </span>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-1.5 text-gold-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-wide uppercase">{dest.name}</span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{dest.name}</h3>
                  <p className="mt-1 text-sm text-white/70 line-clamp-1">{dest.shortDescription}</p>

                  {/* Hover details */}
                  <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="rounded-full glass px-2.5 py-1 text-[11px] text-white/90">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-300">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!limit && (
          <div className="mt-12 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-navy-900 hover:-translate-y-0.5"
            >
              View All Destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
