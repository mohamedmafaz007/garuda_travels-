import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  { num: '01', title: 'Choose Your Destination', desc: 'Browse our curated destinations or tell us where you want to go.' },
  { num: '02', title: 'Customize Your Trip', desc: 'Select your package, vehicle, and travel dates. We tailor everything to you.' },
  { num: '03', title: 'Confirm Your Booking', desc: 'Get a transparent quote and confirm your trip with a simple booking process.' },
  { num: '04', title: 'Enjoy Your Journey', desc: 'Sit back and relax. Our professional team takes care of every detail.' },
];

export default function HowItWorks() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">How It Works</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Your Journey in Four Simple Steps
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-gold-300 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal ${revealed ? 'revealed' : ''} relative text-center`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gold-100" />
                  <div className="absolute inset-2 rounded-full bg-white shadow-lg" />
                  <span className="relative font-display text-3xl font-bold text-navy-800">{step.num}</span>
                  {/* Connecting dot */}
                  {i < steps.length - 1 && (
                    <div className="absolute -right-5 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-gold-400 lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
