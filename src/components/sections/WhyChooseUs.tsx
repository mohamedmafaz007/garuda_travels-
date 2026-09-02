import { Shield, UserCheck, IndianRupee, Headphones, Route, Car } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const reasons = [
  { icon: Shield, title: 'Trusted Experience', desc: '15+ years of safe, reliable travel services across South India.' },
  { icon: UserCheck, title: 'Professional Drivers', desc: 'Experienced, licensed drivers who know every route and destination.' },
  { icon: IndianRupee, title: 'Transparent Pricing', desc: 'No hidden charges. What we quote is exactly what you pay.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock customer support before, during, and after your trip.' },
  { icon: Route, title: 'Customized Trips', desc: 'Every itinerary is tailored to your preferences, pace, and budget.' },
  { icon: Car, title: 'Comfortable Vehicles', desc: 'Well-maintained, sanitized fleet from sedans to tempo travellers.' },
];

export default function WhyChooseUs() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-20 lg:py-28">
      {/* Animated route background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0,200 Q300,50 600,200 T1200,200"
            fill="none"
            stroke="#e9ac1e"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="animate-[dash_3s_linear_infinite]"
          />
          <path
            d="M0,300 Q300,150 600,300 T1200,300"
            fill="none"
            stroke="#e9ac1e"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="animate-[dash_4s_linear_infinite]"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-400 uppercase">Why Choose Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Why Thousands of Travelers Choose GARUDA TRAVELS
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`reveal ${revealed ? 'revealed' : ''} group rounded-3xl glass p-7 transition-all hover:bg-white/15`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 transition-transform group-hover:scale-110">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
