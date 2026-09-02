import { useEffect, useState } from 'react';
import { X, Star, Users, Phone, MessageCircle, Check, Fuel, Calculator, Info, ShieldCheck } from 'lucide-react';
import type { Vehicle } from '@/types';
import { useToast } from '@/context/ToastContext';

export default function VehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const { showToast } = useToast();
  const [estimatedKm, setEstimatedKm] = useState<number>(300);
  const [days, setDays] = useState<number>(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Estimations
  const dayRentFuelTotal = (vehicle.tariff.dayRent * days) + (estimatedKm * vehicle.tariff.fuelPerKm);
  const billedKm = Math.max(estimatedKm, vehicle.tariff.minKm * days);
  const perKmTotal = (billedKm * vehicle.tariff.perKmRate) + (vehicle.tariff.driverBeta * days);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy-950/80 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="my-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="animate-scale-in overflow-hidden rounded-3xl bg-white shadow-2xl border border-navy-100">
          {/* Hero image with studio presentation */}
          <div className="relative h-60 bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-full w-full object-contain"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/70 text-white transition-all hover:bg-navy-900 shadow-md"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {vehicle.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-gold-400 px-3.5 py-1 text-[11px] font-bold tracking-wide text-navy-900 uppercase shadow-sm">
                {vehicle.badge}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Quick Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-navy-100 pb-5">
              <div>
                <span className="text-xs font-bold tracking-wide text-gold-600 uppercase">{vehicle.type}</span>
                <h2 className="mt-0.5 font-display text-2xl sm:text-3xl font-bold text-navy-900">{vehicle.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 border border-gold-200">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span className="text-sm font-bold text-navy-800">{vehicle.rating} / 5</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-sm font-bold text-navy-800">
                  <Users className="h-4 w-4 text-gold-600" />
                  <span>{vehicle.capacity} Seater</span>
                </div>
              </div>
            </div>

            {/* Tariff Breakdown Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-bold text-navy-900">Tariff Packages</h3>
                <span className="text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                  Transparent Billing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Plan 1: Day Rent */}
                <div className="rounded-2xl border-2 border-gold-400/50 bg-gradient-to-br from-gold-50/40 via-white to-amber-50/30 p-4 shadow-sm relative">
                  <span className="inline-block rounded-md bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-900 mb-2">
                    Option 1 • Day Rent Plan
                  </span>
                  <div className="font-sans text-2xl font-extrabold text-navy-900 tracking-tight">
                    ₹{vehicle.tariff.dayRent.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-navy-500"> / day</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-navy-700 flex items-center gap-1.5">
                    <Fuel className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                    <span>Fuel: ₹{vehicle.tariff.fuelPerKm} / km extra</span>
                  </div>
                  <p className="mt-2 text-[11px] text-navy-500 leading-relaxed border-t border-gold-200/50 pt-2">
                    Ideal for city travel, local Madurai sightseeing, weddings, and short day trips.
                  </p>
                </div>

                {/* Plan 2: Per KM */}
                <div className="rounded-2xl border-2 border-navy-200 bg-gradient-to-br from-navy-50/50 via-white to-slate-50 p-4 shadow-sm relative">
                  <span className="inline-block rounded-md bg-navy-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
                    Option 2 • Per KM Plan
                  </span>
                  <div className="font-sans text-2xl font-extrabold text-navy-900 tracking-tight">
                    ₹{vehicle.tariff.perKmRate}
                    <span className="text-xs font-normal text-navy-500"> / km</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-navy-700 flex items-center justify-between">
                    <span>Driver beta: ₹{vehicle.tariff.driverBeta} / day</span>
                    <span className="rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-bold text-navy-700">
                      Min {vehicle.tariff.minKm} km/day
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-navy-500 leading-relaxed border-t border-navy-100 pt-2">
                    Best for outstation tours like Rameshwaram, Kodaikanal, Munnar, Kanyakumari.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Quick Fare Estimator */}
            <div className="rounded-2xl bg-navy-900 p-4 sm:p-5 text-white">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
                <Calculator className="h-4 w-4" />
                <span>Instant Fare Estimator</span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-navy-300 uppercase tracking-wide">Estimated Distance (km)</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="range"
                      min={100}
                      max={1200}
                      step={50}
                      value={estimatedKm}
                      onChange={(e) => setEstimatedKm(Number(e.target.value))}
                      className="w-full accent-gold-400 cursor-pointer"
                    />
                    <span className="font-bold text-gold-400 text-sm shrink-0 w-16 text-right">{estimatedKm} km</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-navy-300 uppercase tracking-wide">Number of Days</label>
                  <div className="mt-1 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`flex-1 rounded-lg py-1 text-xs font-bold transition-all ${
                          days === d ? 'bg-gold-400 text-navy-950 shadow' : 'bg-navy-800 text-navy-300 hover:text-white'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-800 pt-3">
                <div className="rounded-xl bg-navy-800/80 p-2.5">
                  <span className="text-[10px] text-navy-300 uppercase font-semibold">Est. Day Rent Plan</span>
                  <div className="font-sans text-lg font-extrabold text-gold-400 tracking-tight">₹{dayRentFuelTotal.toLocaleString('en-IN')}</div>
                  <span className="text-[10px] text-navy-400">Rent + {estimatedKm}km Fuel</span>
                </div>
                <div className="rounded-xl bg-navy-800/80 p-2.5">
                  <span className="text-[10px] text-navy-300 uppercase font-semibold">Est. Per KM Plan</span>
                  <div className="font-sans text-lg font-extrabold text-white tracking-tight">₹{perKmTotal.toLocaleString('en-IN')}</div>
                  <span className="text-[10px] text-navy-400">{billedKm}km + Driver Beta</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-navy-400">
                <Info className="h-3 w-3 shrink-0" />
                <span>Toll gates, parking charges, and interstate permits are extra as per actual receipts.</span>
              </div>
            </div>

            {/* Features list */}
            <div>
              <h3 className="font-display text-sm font-bold text-navy-900 mb-2.5">Vehicle Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl bg-navy-50/80 px-3 py-2 text-xs font-medium text-navy-700">
                    <Check className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking CTA buttons */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href="tel:+918122552280"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-50 py-3.5 text-sm font-bold text-navy-700 transition-all hover:bg-navy-100"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/918122552280?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to book ${vehicle.name}. Estimated trip: ${estimatedKm} km, ${days} day(s).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3.5 text-sm font-bold text-green-600 transition-all hover:bg-green-100"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  showToast(`Booking initiated for ${vehicle.name}! Our team will contact you shortly to confirm.`);
                }}
                className="rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 py-3.5 text-sm font-bold text-navy-900 transition-all hover:shadow-lg hover:from-gold-300 hover:to-gold-400"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
