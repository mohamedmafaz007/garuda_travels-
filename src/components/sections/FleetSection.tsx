import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Phone, MessageCircle, Fuel, Snowflake } from 'lucide-react';
import { vehicles } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Vehicle } from '@/types';

export function VehicleCard({ vehicle, onBook }: { vehicle: Vehicle; onBook?: (v: Vehicle) => void }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy-900/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 border border-navy-100/60">
      <Link to={`/vehicles/${vehicle.id}`} className="relative h-48 overflow-hidden bg-white block">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-full w-full object-contain object-center p-3 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {vehicle.badge && (
          <span className="absolute top-4 right-4 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase shadow-sm">
            {vehicle.badge}
          </span>
        )}
        <span className="absolute top-4 left-4 rounded-full bg-navy-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
          {vehicle.type}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/vehicles/${vehicle.id}`}>
            <h3 className="font-display text-lg font-bold text-navy-900 hover:text-gold-600 transition-colors">
              {vehicle.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0 rounded-full bg-gold-50 px-2.5 py-0.5 border border-gold-200">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            <span className="text-xs font-bold text-navy-800">{vehicle.rating}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-navy-600">
          <Users className="h-4 w-4 text-gold-600 shrink-0" />
          <span>{vehicle.capacity} Seater Capacity</span>
        </div>

        {/* Features badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {vehicle.features.slice(0, 3).map((f) => (
            <span key={f} className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-0.5 text-[11px] font-medium text-navy-600">
              {f.includes('AC') && <Snowflake className="h-3 w-3 text-sky-500" />}
              {f.includes('Fuel') && <Fuel className="h-3 w-3 text-gold-600" />}
              {f}
            </span>
          ))}
        </div>

        {/* Tariff Breakdown: Clean Stacked Layout with Modern Sans Font */}
        <div className="mt-4 rounded-2xl bg-slate-50/80 p-3 border border-slate-200/80 space-y-2.5">
          {/* Day Rent Plan */}
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 border border-slate-200/70 shadow-xs">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2 py-0.5 rounded-md border border-gold-200/60 w-fit">
                Day Rent Plan
              </span>
              <span className="text-[11px] font-semibold text-slate-600 mt-1 truncate">
                + ₹{vehicle.tariff.fuelPerKm}/km fuel
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="font-sans text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                ₹{vehicle.tariff.dayRent.toLocaleString('en-IN')}
                <span className="text-[11px] font-normal text-slate-500"> /day</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Local &amp; City</span>
            </div>
          </div>

          {/* Per KM Plan */}
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 border border-slate-200/70 shadow-xs">
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-800 bg-navy-50 px-2 py-0.5 rounded-md border border-navy-200/60 w-fit">
                  Per KM Plan
                </span>
                <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Min {vehicle.tariff.minKm} km
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-600 mt-1 truncate">
                + ₹{vehicle.tariff.driverBeta} Driver beta
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="font-sans text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                ₹{vehicle.tariff.perKmRate}
                <span className="text-[11px] font-normal text-slate-500"> /km</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Outstation</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <a
            href="tel:+918122552280"
            className="flex items-center justify-center rounded-xl bg-navy-50 py-3 text-navy-700 transition-all hover:bg-navy-100"
            aria-label={`Call to book ${vehicle.name}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/918122552280?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to enquire about booking ${vehicle.name} (Day rent: ₹${vehicle.tariff.dayRent}/day or ₹${vehicle.tariff.perKmRate}/km).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl bg-green-50 py-3 text-green-600 transition-all hover:bg-green-100"
            aria-label={`WhatsApp to book ${vehicle.name}`}
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Link
            to={`/vehicles/${vehicle.id}`}
            onClick={() => onBook?.(vehicle)}
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 py-3 text-xs font-bold text-navy-900 transition-all hover:shadow-lg hover:from-gold-300 hover:to-gold-400 text-center"
          >
            Book Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FleetSection({ onBook, limit }: { onBook: (v: Vehicle) => void; limit?: number }) {
  const [activeType, setActiveType] = useState<string>('ALL');
  const { ref, revealed } = useScrollReveal();

  const types = ['ALL', 'SEDAN', 'SUV', 'PREMIUM', 'TEMPO TRAVELLER'] as const;
  const filtered = (
    activeType === 'ALL'
      ? vehicles
      : vehicles.filter((v) => v.type === activeType || v.categoryTags?.includes(activeType as any))
  ).slice(0, limit);

  return (
    <section ref={ref} id="fleet" className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Our Fleet</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Choose Your Perfect Ride
          </h2>
          <p className="mt-3 text-sm text-navy-500 sm:text-base">
            Transparent pricing with Day Rent and Outstation Per-KM plans. Well-maintained, sanitized vehicles with experienced drivers.
          </p>
        </div>

        <div className={`reveal ${revealed ? 'revealed' : ''} mt-10 flex flex-wrap justify-center gap-2`}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${
                activeType === t
                  ? 'bg-navy-800 text-white shadow-lg'
                  : 'bg-white text-navy-600 border border-navy-200 hover:border-gold-300 hover:text-navy-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((v, i) => (
            <div
              key={v.id}
              className={`reveal ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <VehicleCard vehicle={v} onBook={onBook} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
