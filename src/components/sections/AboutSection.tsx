import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { aboutImage1, aboutImage2 } from '@/data/mockData';

const features = [
  '15+ Years Experience',
  '24/7 Customer Support',
  'Professional Drivers',
  'Customized Itineraries',
];

export default function AboutSection() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section ref={ref} className="relative bg-ivory py-20 lg:py-28 overflow-hidden">
      {/* Decorative Gradients & Grid */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gold-300/30 blur-[130px] w-[500px] h-[500px] pointer-events-none" />
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 rounded-[100%] bg-navy-200/40 blur-[150px] w-[600px] h-[600px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d2d7e0 2px, transparent 2px)', backgroundSize: '48px 48px' }} />

      {/* Wave vector on the right */}
      <svg className="absolute -right-40 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] opacity-5 pointer-events-none text-navy-900" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M 0 100 Q 50 20 100 100 T 200 100 M 0 120 Q 50 40 100 120 T 200 120 M 0 140 Q 50 60 100 140 T 200 140 M 0 160 Q 50 80 100 160 T 200 160" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image collage */}
          <div className={`reveal ${revealed ? 'revealed' : ''} relative`}>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={aboutImage1}
                  alt="Winding road through Munnar tea gardens"
                  className="w-full rounded-3xl object-cover shadow-xl aspect-[4/5]"
                  loading="lazy"
                />
                <img
                  src={aboutImage2}
                  alt="Bus traveling through misty tea plantations"
                  className="w-full rounded-3xl object-cover shadow-xl aspect-[4/3]"
                  loading="lazy"
                />
              </div>
              <div className="pt-4 sm:pt-8">
                <img
                  src="https://images.pexels.com/photos/36623506/pexels-photo-36623506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Panoramic view of Sirumalai hills"
                  className="w-full rounded-3xl object-cover shadow-xl aspect-[3/5]"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="mt-6 flex justify-center lg:absolute lg:-bottom-6 lg:right-8 lg:mt-0">
              <div className="rounded-2xl bg-white px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100">
                    <span className="font-display text-2xl font-bold text-gold-600">15+</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-800">Years of</p>
                    <p className="text-sm text-navy-500">Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`reveal ${revealed ? 'revealed' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">About Garuda Travels</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
              Your Trusted Travel Partner Across South India
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy-600">
              GARUDA TRAVELS is a professional travel and transportation company dedicated to making every journey comfortable, safe and memorable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              We specialize in customized tour packages, pilgrimage journeys, honeymoon vacations, family holidays, airport transfers, outstation cab services, hotel assistance and complete South India travel experiences.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              Our experienced drivers and travel team help travelers explore destinations with comfort, flexibility and confidence.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-gold-600" />
                  <span className="text-sm font-medium text-navy-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-navy-900 hover:-translate-y-0.5"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
