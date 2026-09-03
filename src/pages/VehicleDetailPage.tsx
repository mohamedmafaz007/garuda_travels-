import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Users,
  Luggage,
  Snowflake,
  Fuel,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Calculator,
  Info,
  Car,
  ChevronRight,
  Send,
  Award,
  ArrowRight
} from 'lucide-react';
import { vehicles } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import QuoteCTA from '@/components/sections/QuoteCTA';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { showToast } = useToast();

  const vehicle = vehicles.find((v) => v.id === id);

  // Estimator state
  const [estimatedKm, setEstimatedKm] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [preferredPlan, setPreferredPlan] = useState<'DAY_RENT' | 'PER_KM'>('DAY_RENT');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    travelDate: '',
    travelTime: '08:00',
    durationDays: '1',
    planType: 'DAY_RENT',
    specialNotes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (vehicle) {
      document.title = `Book ${vehicle.name} (${vehicle.type}) | GARUDA TRAVELS Madurai`;
      setBookingForm((prev) => ({
        ...prev,
        planType: preferredPlan,
      }));
    }
  }, [vehicle, location]);

  if (!vehicle) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-24 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-100 text-navy-600">
          <Car className="h-10 w-10" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy-900">Vehicle Not Found</h1>
        <p className="text-navy-600 max-w-md">The vehicle you are looking for is not available or has moved.</p>
        <Link
          to="/vehicles"
          className="mt-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-navy-800"
        >
          View All Vehicles
        </Link>
      </div>
    );
  }

  // Tariff calculation calculations
  const dayRentCost = (vehicle.tariff.dayRent * days) + (estimatedKm * vehicle.tariff.fuelPerKm);
  const billedKm = Math.max(estimatedKm, vehicle.tariff.minKm * days);
  const perKmCost = (billedKm * vehicle.tariff.perKmRate) + (vehicle.tariff.driverBeta * days);

  const selectPlanAndRedirect = (plan: 'DAY_RENT' | 'PER_KM') => {
    setPreferredPlan(plan);
    setBookingForm((prev) => ({ ...prev, planType: plan }));
    const el = document.getElementById('quick-reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('ring-4', 'ring-gold-400/40');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-gold-400/40');
      }, 1500);
    }
    showToast(`Selected ${plan === 'DAY_RENT' ? 'Day Rent Plan' : 'Per KM Plan'}! Redirecting to Quick Reservation.`);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.pickupLocation || !bookingForm.travelDate) {
      showToast('Please fill in required fields: Name, Phone, Pickup Location, and Date', 'info');
      return;
    }

    window.open(`https://wa.me/918122552280?text=${whatsappMessage}`, '_blank');
    setIsSubmitted(true);
    showToast(`Booking details for ${vehicle.name} sent to WhatsApp (+91 81225 52280)!`);
  };

  const selectedPlanText = bookingForm.planType === 'DAY_RENT'
    ? `Day Rent Plan (₹${vehicle.tariff.dayRent}/day + ₹${vehicle.tariff.fuelPerKm}/km fuel)`
    : `Per KM Plan (₹${vehicle.tariff.perKmRate}/km + ₹${vehicle.tariff.driverBeta} Driver beta)`;

  const whatsappMessage = encodeURIComponent(
    `Hi GARUDA TRAVELS, I want to book ${vehicle.name}!\n\n` +
    `Name: ${bookingForm.name || 'Guest'}\n` +
    `Phone: ${bookingForm.phone || 'Not provided'}\n` +
    `Plan: ${selectedPlanText}\n` +
    `Pickup: ${bookingForm.pickupLocation || 'Madurai'}\n` +
    `Destination: ${bookingForm.dropLocation || 'Local/Outstation'}\n` +
    `Date: ${bookingForm.travelDate || 'As soon as possible'}\n` +
    `Days: ${bookingForm.durationDays} day(s)\n` +
    `Notes: ${bookingForm.specialNotes || 'None'}`
  );

  const otherVehicles = vehicles.filter((v) => v.id !== vehicle.id);

  return (
    <div className="pt-16 bg-slate-50/50 min-h-screen">
      {/* Top Breadcrumb Header */}
      <div className="bg-navy-900 text-white py-8 lg:py-12 border-b border-navy-800">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-navy-300">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/vehicles" className="hover:text-gold-400 transition-colors">Fleet</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400 font-bold">{vehicle.name}</span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold-400 px-3 py-0.5 text-[11px] font-bold text-navy-950 uppercase tracking-wider">
                  {vehicle.type}
                </span>
                {vehicle.badge && (
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-gold-300 border border-gold-400/30">
                    {vehicle.badge}
                  </span>
                )}
              </div>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {vehicle.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-navy-200">
                Premium cab rental in Madurai with transparent Day Rent &amp; Outstation Per-KM pricing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-2xl bg-white/10 backdrop-blur-md px-4 py-2 border border-white/15">
                <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
                <span className="text-base font-bold text-white">{vehicle.rating}</span>
                <span className="text-xs text-navy-300">/ 5 Rating</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl bg-white/10 backdrop-blur-md px-4 py-2 border border-white/15">
                <Users className="h-5 w-5 text-gold-400" />
                <span className="text-base font-bold text-white">{vehicle.capacity}</span>
                <span className="text-xs text-navy-300">Seater</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vehicle Visuals, Tariffs, Specs & Calculator */}
          <div className="lg:col-span-7 space-y-8">
            {/* Vehicle Card Hero */}
            <div className="overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="relative h-64 sm:h-80 w-full flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 rounded-2xl p-4">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>

              {/* Quick Spec Pills */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60 text-center">
                  <Users className="h-5 w-5 text-navy-700" />
                  <span className="mt-1 text-xs font-semibold text-slate-500">Seating</span>
                  <span className="text-sm font-bold text-navy-900">{vehicle.capacity} Passengers</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60 text-center">
                  <Snowflake className="h-5 w-5 text-sky-600" />
                  <span className="mt-1 text-xs font-semibold text-slate-500">Climate</span>
                  <span className="text-sm font-bold text-navy-900">AC Cabin</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60 text-center">
                  <Luggage className="h-5 w-5 text-gold-600" />
                  <span className="mt-1 text-xs font-semibold text-slate-500">Luggage</span>
                  <span className="text-sm font-bold text-navy-900">
                    {vehicle.capacity <= 5 ? '3 Large Bags' : vehicle.capacity <= 7 ? '5 Large Bags' : '8+ Bags'}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60 text-center">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span className="mt-1 text-xs font-semibold text-slate-500">Chauffeur</span>
                  <span className="text-sm font-bold text-navy-900">Verified Driver</span>
                </div>
              </div>
            </div>

            {/* Official Tariff Rates Section */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Official Pricing</span>
                  <h2 className="text-2xl font-bold text-navy-900">Vehicle Tariff Plans</h2>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-200">
                  Fixed &amp; Transparent
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plan 1: Day Rent Plan */}
                <div
                  onClick={() => selectPlanAndRedirect('DAY_RENT')}
                  className={`rounded-2xl p-5 border-2 transition-all cursor-pointer hover:shadow-md ${preferredPlan === 'DAY_RENT'
                    ? 'border-gold-400 bg-gold-50/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50/40 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-gold-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-navy-950">
                      Day Rent Plan
                    </span>
                    <input
                      type="radio"
                      name="plan_selection"
                      checked={preferredPlan === 'DAY_RENT'}
                      onChange={() => selectPlanAndRedirect('DAY_RENT')}
                      className="h-4 w-4 accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="mt-3">
                    <div className="font-sans text-3xl font-extrabold text-navy-900 tracking-tight">
                      ₹{vehicle.tariff.dayRent.toLocaleString('en-IN')}
                      <span className="text-sm font-medium text-slate-500"> / day</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-navy-700 flex items-center gap-1.5">
                      <Fuel className="h-4 w-4 text-gold-600 shrink-0" />
                      <span>+ ₹{vehicle.tariff.fuelPerKm}/km fuel charges</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200/80 pt-3 text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Best for Local Madurai sightseeing &amp; temple visits</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Convenient for weddings, shopping &amp; airport drops</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Pay fuel strictly according to actual km run</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPlanAndRedirect('DAY_RENT');
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 py-2.5 text-xs font-bold text-navy-950 transition-all shadow-sm group"
                  >
                    <span>Choose Day Rent &amp; Quick Reserve</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Plan 2: Per KM Outstation Plan */}
                <div
                  onClick={() => selectPlanAndRedirect('PER_KM')}
                  className={`rounded-2xl p-5 border-2 transition-all cursor-pointer hover:shadow-md ${preferredPlan === 'PER_KM'
                    ? 'border-navy-800 bg-navy-50/30 shadow-sm'
                    : 'border-slate-200 bg-slate-50/40 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-navy-800 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                      Per KM Plan
                    </span>
                    <input
                      type="radio"
                      name="plan_selection"
                      checked={preferredPlan === 'PER_KM'}
                      onChange={() => selectPlanAndRedirect('PER_KM')}
                      className="h-4 w-4 accent-navy-800 cursor-pointer"
                    />
                  </div>

                  <div className="mt-3">
                    <div className="font-sans text-3xl font-extrabold text-navy-900 tracking-tight">
                      ₹{vehicle.tariff.perKmRate}
                      <span className="text-sm font-medium text-slate-500"> / km</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-navy-700 flex items-center justify-between">
                      <span>+ ₹{vehicle.tariff.driverBeta} Driver beta</span>
                      <span className="rounded bg-navy-100 px-2 py-0.5 text-[11px] font-bold text-navy-800">
                        Min {vehicle.tariff.minKm} km/day
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200/80 pt-3 text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Best for outstation tours: Rameshwaram, Kodaikanal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Includes vehicle fuel in the per-km rate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Driver beta covered per calendar day</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPlanAndRedirect('PER_KM');
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 hover:bg-navy-800 py-2.5 text-xs font-bold text-white transition-all shadow-sm group"
                  >
                    <span>Choose Per KM &amp; Quick Reserve</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Billing Note */}
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-amber-50/70 p-3.5 text-xs text-amber-900 border border-amber-200/70">
                <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Important Billing Note:</strong> Toll charges, parking fees, and interstate permit charges (if crossing into Kerala or Karnataka) are extra as per actual government toll receipts.
                </span>
              </div>
            </div>

            {/* Live Trip Cost Estimator */}
            <div className="rounded-3xl bg-navy-900 p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gold-400 font-bold text-base">
                  <Calculator className="h-5 w-5" />
                  <span>Trip Cost Estimator</span>
                </div>
                <span className="text-xs text-navy-300">Simulate your trip</span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-navy-200 mb-2">
                    <span>Estimated Distance</span>
                    <span className="font-bold text-gold-400 font-sans text-sm">{estimatedKm} KM</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1200}
                    step={25}
                    value={estimatedKm}
                    onChange={(e) => setEstimatedKm(Number(e.target.value))}
                    className="w-full accent-gold-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
                  />

                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-navy-200 mb-2">
                    <span>Trip Duration</span>
                    <span className="font-bold text-gold-400 font-sans text-sm">{days} Day{days > 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`rounded-xl py-2 text-xs font-bold transition-all ${days === d
                          ? 'bg-gold-400 text-navy-950 shadow-md font-sans'
                          : 'bg-navy-800 text-navy-300 hover:text-white hover:bg-navy-750 font-sans'
                          }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comparison Output */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-navy-800 pt-5">
                <div className={`rounded-2xl p-4 border transition-all ${preferredPlan === 'DAY_RENT'
                  ? 'bg-navy-800 border-gold-400/80 shadow-md'
                  : 'bg-navy-850/60 border-navy-750'
                  }`}>
                  <div className="flex items-center justify-between text-xs text-navy-300 font-semibold">
                    <span>Day Rent Plan Estimate</span>
                    {dayRentCost <= perKmCost && (
                      <span className="rounded bg-gold-400/20 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                        Cheaper for this trip
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-sans text-2xl font-extrabold text-gold-400 tracking-tight">
                    ₹{dayRentCost.toLocaleString('en-IN')}
                  </div>
                  <p className="mt-1 text-[11px] text-navy-400">
                    Rent (₹{vehicle.tariff.dayRent * days}) + Fuel ({estimatedKm}km @ ₹{vehicle.tariff.fuelPerKm})
                  </p>
                </div>

                <div className={`rounded-2xl p-4 border transition-all ${preferredPlan === 'PER_KM'
                  ? 'bg-navy-800 border-gold-400/80 shadow-md'
                  : 'bg-navy-850/60 border-navy-750'
                  }`}>
                  <div className="flex items-center justify-between font-semibold mb-4">
                    <span className="inline-flex rounded-lg bg-[#1a1d24] px-3 py-1.5 text-xs font-bold tracking-widest text-white border border-gray-800">
                      PER KM PLAN
                    </span>
                    {perKmCost < dayRentCost && (
                      <span className="rounded bg-gold-400/20 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                        Cheaper for this trip
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-sans text-4xl font-extrabold text-white tracking-tight flex items-baseline">
                    ₹{vehicle.tariff.perKmRate}<span className="text-xl font-medium text-navy-400 ml-1">/km</span>
                  </div>
                  <p className="mt-2 text-sm text-white">
                    + ₹{vehicle.tariff.driverBeta} Driver beta
                  </p>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Features &amp; Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60">
                    <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0" />
                    <span className="text-sm font-semibold text-navy-800">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60">
                  <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0" />
                  <span className="text-sm font-semibold text-navy-800">Sanitized before every pickup</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/60">
                  <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0" />
                  <span className="text-sm font-semibold text-navy-800">Phone charging ports &amp; music system</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Form & Direct Contacts */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div id="quick-reservation" className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-navy-900/5 border border-slate-200/90 transition-all duration-300">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Quick Reservation</span>
                <h3 className="text-2xl font-bold text-navy-900">Book {vehicle.name}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Instant confirmation • No upfront credit card required
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="text-xl font-bold text-navy-900">Booking Request Sent!</h4>
                  <p className="text-sm text-slate-600">
                    Thank you {bookingForm.name}. Our dispatch team has received your request for <strong>{vehicle.name}</strong> and will call you within 15 minutes to confirm timings.
                  </p>

                  <a
                    href={`https://wa.me/918122552280?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 hover:bg-green-700 px-6 py-3.5 text-sm font-bold text-white transition-all w-full shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-navy-700 hover:text-navy-900 underline mt-2 block mx-auto"
                  >
                    Submit another booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="e.g. +91 81225 52280"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>

                  {/* Plan Preference Selection */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Tariff Plan Preference</label>
                    <select
                      value={bookingForm.planType}
                      onChange={(e) => {
                        const val = e.target.value as 'DAY_RENT' | 'PER_KM';
                        setBookingForm({ ...bookingForm, planType: val });
                        setPreferredPlan(val);
                      }}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                    >
                      <option value="DAY_RENT">
                        Day Rent: ₹{vehicle.tariff.dayRent}/day (+ ₹{vehicle.tariff.fuelPerKm}/km fuel)
                      </option>
                      <option value="PER_KM">
                        Per KM: ₹{vehicle.tariff.perKmRate}/km (+ ₹{vehicle.tariff.driverBeta} Driver beta)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Pickup Location *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.pickupLocation}
                        onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                        placeholder="e.g. Madurai Airport"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">Drop / Route</label>
                      <input
                        type="text"
                        value={bookingForm.dropLocation}
                        onChange={(e) => setBookingForm({ ...bookingForm, dropLocation: e.target.value })}
                        placeholder="e.g. Rameshwaram / Local"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.travelDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, travelDate: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">Days Needed</label>
                      <select
                        value={bookingForm.durationDays}
                        onChange={(e) => {
                          setBookingForm({ ...bookingForm, durationDays: e.target.value });
                          setDays(Number(e.target.value));
                        }}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="4">4 Days</option>
                        <option value="5">5+ Days</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">Notes / Pickup Address</label>
                    <textarea
                      rows={2}
                      value={bookingForm.specialNotes}
                      onChange={(e) => setBookingForm({ ...bookingForm, specialNotes: e.target.value })}
                      placeholder="e.g. Flight timing, train arrival or hotel name"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm font-medium text-navy-900 outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-gold-500/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    <span>Request Vehicle Booking</span>
                  </button>
                </form>
              )}

              {/* Direct Help shortcuts */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                <a
                  href="tel:+918122552280"
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 py-3 text-xs font-bold text-navy-800 transition-all"
                >
                  <Phone className="h-4 w-4 text-navy-700" />
                  <span>Call Dispatch</span>
                </a>
                <a
                  href={`https://wa.me/918122552280?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 py-3 text-xs font-bold transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Why Book With Us Guarantee Card */}
            <div className="rounded-3xl bg-slate-100/80 p-6 border border-slate-200/60 text-xs text-slate-600 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <Award className="h-4 w-4 text-gold-600" />
                <span>GARUDA TRAVELS Guarantee</span>
              </div>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>Guaranteed clean, well-serviced and AC vehicles</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>Punctual doorstep pickup across Madurai</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>Experienced, polite, route-expert drivers</span>
              </p>
            </div>
          </div>
        </div>

        {/* Other Vehicles in Fleet */}
        <div className="mt-16 sm:mt-24 border-t border-slate-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Explore Fleet</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-900">Other Available Vehicles</h3>
            </div>
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 hover:text-gold-700 transition-colors"
            >
              <span>View all vehicles</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherVehicles.map((v) => (
              <Link
                key={v.id}
                to={`/vehicles/${v.id}`}
                className="group rounded-3xl bg-white p-5 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-gold-300 transition-all hover:-translate-y-1"
              >
                <div className="h-40 w-full flex items-center justify-center bg-slate-50 rounded-2xl p-2">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">{v.type}</span>
                  <h4 className="text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                    {v.name}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{v.capacity} Seater</span>
                    <span className="font-sans font-bold text-navy-900 text-sm">
                      ₹{v.tariff.dayRent.toLocaleString('en-IN')}/day
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <QuoteCTA />
    </div>
  );
}
