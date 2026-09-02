import { Star, Clock, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packages } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Package } from '@/types';

export function PackageCard({ pkg, onViewDetails }: { pkg: Package; onViewDetails: (pkg: Package) => void }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy-900/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10">
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
          <Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
          <span className="text-xs font-bold text-white">{pkg.rating}</span>
          <span className="text-xs text-white/70">({pkg.reviewCount})</span>
        </div>
        <div className="absolute top-4 right-4 rounded-full bg-gold-400 px-3 py-1.5 text-[10px] font-bold tracking-wide text-navy-900 uppercase">
          Featured
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-500">
          <Clock className="h-4 w-4 text-gold-600" />
          {pkg.duration}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-navy-800">{pkg.title}</h3>

        <ul className="mt-4 space-y-2">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-navy-600">
              <Check className="h-4 w-4 shrink-0 text-gold-600" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-navy-100 pt-5">
          <div>
            <span className="text-xs text-navy-500 font-medium">Starting from</span>
            <div className="font-sans text-2xl font-extrabold text-navy-900 tracking-tight">
              ₹{pkg.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/packages/${pkg.id}`}
            className="flex flex-1 items-center justify-center rounded-xl bg-navy-50 px-4 py-3 text-sm font-bold text-navy-700 transition-all hover:bg-navy-100"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/918122552280?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to book the "${pkg.title}" tour package!\n\nDuration: ${pkg.duration}\nStarting Price: ₹${pkg.price.toLocaleString('en-IN')}\nHighlights: ${pkg.highlights.join(', ')}\n\nPlease share availability and confirm timings.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => showToast(`Opening WhatsApp to book ${pkg.title} (+91 81225 52280)...`)}
            className="flex-1 flex items-center justify-center rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-4 py-3 text-sm font-bold text-navy-900 transition-all hover:shadow-lg hover:shadow-gold-500/30 text-center"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Packages({ onViewDetails, limit }: { onViewDetails: (pkg: Package) => void; limit?: number }) {
  const { ref, revealed } = useScrollReveal();
  const displayPackages = limit ? packages.slice(0, limit) : packages;

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Tour Packages</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Handpicked Journeys
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPackages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`reveal ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <PackageCard pkg={pkg} onViewDetails={onViewDetails} />
            </div>
          ))}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-navy-900 hover:-translate-y-0.5"
            >
              View All Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
