import { useState, useCallback, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Testimonials() {
  const { ref, revealed } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[600px] h-[600px] bg-gold-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-sky-50/50 rounded-full blur-[120px] pointer-events-none" />
      {/* Side vectors */}
      <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      </svg>
      <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      </svg>
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Stories From Our Travelers
          </h2>
        </div>

        <div className={`reveal ${revealed ? 'revealed' : ''} relative mt-14`}>
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl bg-ivory p-8 shadow-lg sm:p-12">
              <Quote className="absolute top-6 left-6 h-16 w-16 text-gold-100" />

              <div className="relative">
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                <p className="mt-6 font-display text-lg leading-relaxed text-navy-800 sm:text-xl">
                  "{testimonials[current].text}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-300"
                  />
                  <div>
                    <p className="font-bold text-navy-800">{testimonials[current].name}</p>
                    <p className="text-sm text-navy-500">{testimonials[current].location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-all hover:bg-navy-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all ${i === current ? 'w-8 bg-gold-500' : 'w-2.5 bg-navy-200'
                      }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-all hover:bg-navy-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

