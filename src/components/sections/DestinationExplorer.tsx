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
    <section ref={ref} className="relative bg-ivory py-20 lg:py-28 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200/40 blur-[100px] w-[500px] h-[500px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 rounded-full bg-navy-200/30 blur-[120px] w-[600px] h-[600px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1d222e 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      {/* Subtle South Indian Mandala Motif on sides */}
      <svg className="absolute -left-32 top-40 w-96 h-96 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L54 10 L64 6 L60 16 L70 18 L62 26 L74 34 L64 38 L72 48 L60 46 L62 58 L52 50 L48 60 L42 50 L38 58 L40 46 L28 48 L36 38 L26 34 L38 26 L30 18 L40 16 L36 6 L46 10 Z" />
      </svg>
      <svg className="absolute -right-32 bottom-20 w-96 h-96 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L54 10 L64 6 L60 16 L70 18 L62 26 L74 34 L64 38 L72 48 L60 46 L62 58 L52 50 L48 60 L42 50 L38 58 L40 46 L28 48 L36 38 L26 34 L38 26 L30 18 L40 16 L36 6 L46 10 Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
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
              className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${activeCategory === cat
                  ? 'bg-navy-800 text-white shadow-lg'
                  : 'bg-white text-navy-600 border border-navy-200 hover:border-gold-300 hover:text-navy-800'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Marquee */}
        <div className="mt-12 relative flex overflow-hidden">
          {/* We use double elements to create loop */}
          <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused] pb-8 pt-4 px-2">
            {[...filtered, ...filtered].map((dest, i) => (
              <Link
                key={`${dest.id}-${i}`}
                to={`/destinations/${dest.id}`}
                className="group relative w-[85vw] sm:w-[45vw] lg:w-[28vw] shrink-0 overflow-hidden rounded-3xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
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
