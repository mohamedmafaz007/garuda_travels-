import { useState } from 'react';
import { Car, Clock, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { vehicles } from '@/data/mockData';

const tripTypes = ['One Way', 'Round Trip', 'Local', 'Airport Transfer', 'Outstation'];

export default function CabBooking() {
  const { showToast } = useToast();
  const { ref, revealed } = useScrollReveal();
  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    date: '',
    time: '',
    tripType: 'One Way',
    passengers: '1',
    vehicle: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pickup || !form.drop || !form.date) {
      showToast('Please fill in pickup, drop, and date', 'info');
      return;
    }

    const lines = [
      `Hi GARUDA TRAVELS, I want to book a cab!`,
      ``,
      `🚖 Pickup: ${form.pickup}`,
      `📍 Drop: ${form.drop}`,
      `📅 Date: ${form.date}`,
      `⏰ Time: ${form.time || 'Flexible'}`,
      `👥 Passengers: ${form.passengers}`,
      `🚗 Vehicle Preference: ${form.vehicle || 'Any Vehicle'}`,
    ];

    const waUrl = `https://wa.me/918122552280?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank');
    showToast(`Cab booking details sent to WhatsApp (+91 81225 52280)!`);
  };

  return (
    <section id="cab-booking" ref={ref} className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      {/* Decorative Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-gold-400 blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-blue-500 blur-[150px]" />
      </div>

      {/* Side vectors */}
      <svg className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="30" strokeDasharray="4 2" />
        <path d="M 0 50 L 100 50 M 50 0 L 50 100" />
      </svg>
      <svg className="absolute -right-40 top-20 w-96 h-96 opacity-10 pointer-events-none text-gold-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
        <rect x="30" y="30" width="40" height="40" transform="rotate(22.5 50 50)" strokeDasharray="2 2" />
      </svg>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 z-10">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-400 uppercase">Cab Booking</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Your Ride, Your Way
          </h2>
          <p className="mt-4 text-lg text-navy-200 italic">Comfortable vehicles. Professional drivers. Hassle-free journeys.</p>
        </div>

        <div className={`reveal ${revealed ? 'revealed' : ''} mt-14 rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10`} style={{ transitionDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Pickup Location</label>
              <input
                type="text"
                value={form.pickup}
                onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                placeholder="e.g. Madurai"
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Drop Location</label>
              <input
                type="text"
                value={form.drop}
                onChange={(e) => setForm({ ...form, drop: e.target.value })}
                placeholder="e.g. Rameshwaram"
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Travel Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Pickup Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Trip Type</label>
              <select
                value={form.tripType}
                onChange={(e) => setForm({ ...form, tripType: e.target.value })}
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              >
                {tripTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-700">Passengers</label>
              <select
                value={form.passengers}
                onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
                <option value="10+">10+ People</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold text-navy-700">Vehicle Preference</label>
              <select
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="rounded-xl border border-navy-200 bg-navy-50/50 px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              >
                <option value="">Any Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </form>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-10 py-4 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Car className="h-5 w-5" />
              Get Cab Quote
            </button>
          </div>

          {/* Quick info */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-navy-100 pt-6 sm:grid-cols-3">
            {[
              { icon: Clock, title: 'On-Time Pickup', desc: 'Always punctual, every trip' },
              { icon: Check, title: 'Transparent Pricing', desc: 'No hidden charges' },
              { icon: Car, title: 'Clean Vehicles', desc: 'Sanitized and well-maintained' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-800">{title}</p>
                  <p className="text-xs text-navy-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
