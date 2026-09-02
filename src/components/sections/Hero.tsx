import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Compass, ArrowRight, ChevronDown, Phone, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { destinations, heroImage } from '@/data/mockData';

export default function Hero() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    destination: '',
    date: '',
    travelers: '2',
    tripType: 'Tour Package',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.destination || !booking.date) {
      showToast('Please select a destination and date', 'info');
      return;
    }

    const whatsappText = encodeURIComponent(
      `Hi GARUDA TRAVELS, I want to plan my journey!\n\n` +
      `📍 Destination: ${booking.destination}\n` +
      `📅 Travel Date: ${booking.date}\n` +
      `👥 Travelers: ${booking.travelers} ${booking.travelers === '1' ? 'Person' : 'People'}\n` +
      `🚗 Trip Type: ${booking.tripType}`
    );

    window.open(`https://wa.me/918122552280?text=${whatsappText}`, '_blank');
    showToast(`Opening WhatsApp with your trip details to +91 81225 52280!`);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Scenic winding road through South Indian tea plantations"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-navy-950/30 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-6 lg:gap-8">
          
          {/* Left Text */}
          <div className="md:col-span-7 xl:col-span-7">
            <h1
              className="animate-fade-in-up mt-4 md:mt-0 font-display text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ animationDelay: '0.1s' }}
            >
              Discover South India
              <br />
              <span className="text-gold-300">Like Never Before</span>
            </h1>

            <p
              className="animate-fade-in-up mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              From ancient temples and peaceful hill stations to breathtaking beaches and unforgettable road trips, GARUDA TRAVELS creates journeys designed around you.
            </p>

            <div
              className="animate-fade-in-up mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                to="/packages"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-xl shadow-gold-500/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Explore Tours
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('cab-booking');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/vehicles');
                  }
                }}
                className="group flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-xl shadow-gold-500/30 transition-all hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-2xl"
              >
                <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
                Book a Cab
              </button>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="flex w-full justify-center md:col-span-5 md:justify-end xl:col-span-5 mt-4 md:mt-0">
            <form
              onSubmit={handleSubmit}
              className="glass-light w-full max-w-md rounded-3xl p-5 shadow-2xl shadow-navy-950/40 sm:p-6 lg:p-7 border border-white/50 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between border-b border-navy-100/60 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">Fast &amp; Easy Booking</span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-900">Plan Your Journey</h3>
                </div>
                <span className="rounded-full bg-gold-100/80 px-2.5 py-1 text-[10px] font-bold text-gold-800">
                  Instant Quote
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Destination - Full Width */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
                    <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                    Where do you want to go?
                  </label>
                  <div className="relative">
                    <select
                      value={booking.destination}
                      onChange={(e) => setBooking({ ...booking, destination: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    >
                      <option value="">Select Destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                </div>

                {/* Date & Travelers - 2 Balanced Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
                      <Calendar className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={booking.date}
                      onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      className="w-full rounded-xl border border-navy-200 bg-white px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
                      <Users className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                      Travelers
                    </label>
                    <div className="relative">
                      <select
                        value={booking.travelers}
                        onChange={(e) => setBooking({ ...booking, travelers: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-navy-200 bg-white px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        {[1,2,3,4,5,6,7,8,9].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                        <option value="10+">10+ People</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy-400" />
                    </div>
                  </div>
                </div>

                {/* Trip type - Full Width */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
                    <Compass className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                    Trip Type
                  </label>
                  <div className="relative">
                    <select
                      value={booking.tripType}
                      onChange={(e) => setBooking({ ...booking, tripType: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    >
                      <option>Tour Package</option>
                      <option>Cab Service</option>
                      <option>Temple Tour</option>
                      <option>Honeymoon Trip</option>
                      <option>Family Holiday</option>
                      <option>Airport Transfer</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                </div>

                {/* Submit Button - Full Width */}
                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 py-3 sm:py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4 text-gold-400" />
                  <span>Plan My Journey</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
