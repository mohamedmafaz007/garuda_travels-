import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: 'K+', label: 'Happy Travelers' },
  { value: 50, suffix: '+', label: 'Destinations' },
  { value: 24, suffix: '/7', label: 'Travel Support' },
  { value: 100, suffix: '%', label: 'Customer Focused' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function TrustStats() {
  return (
    <section className="relative bg-white pt-16 pb-10 lg:pb-12 overflow-hidden">
      {/* Decorative Orbs & Vectors */}
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-200/20 blur-[100px] rounded-full point-events-none" />
      <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-navy-200/20 blur-[100px] rounded-full point-events-none" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center justify-center rounded-2xl border border-navy-100 bg-white p-6 shadow-lg shadow-navy-900/5 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
            >
              <div className="font-display text-4xl font-bold text-navy-800 transition-colors group-hover:text-gold-500 sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-xs font-bold tracking-wider text-navy-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
