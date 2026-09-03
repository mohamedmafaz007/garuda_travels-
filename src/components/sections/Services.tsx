import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Map, Car, Plane, Church, Heart, Users, Building2, Briefcase } from 'lucide-react';
import { services } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, typeof Map> = {
  Map, Car, Plane, Church, Heart, Users, Building2, Briefcase,
};

export default function Services() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Our Services</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Everything You Need For Your Journey
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Map;
            return (
              <div
                key={service.id}
                className={`reveal ${revealed ? 'revealed' : ''} group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-lg shadow-navy-900/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 hover:border-gold-200`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <Link to="/packages" className="absolute inset-0 z-10" aria-label={`${service.title} - Learn more`} />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-300 transition-all group-hover:from-gold-400 group-hover:to-gold-500 group-hover:text-navy-900 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-800">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{service.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gold-600 opacity-0 transition-all group-hover:opacity-100">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
                {/* Decorative corner */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-50 transition-transform group-hover:scale-150" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
