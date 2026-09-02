import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FAQ() {
  const { ref, revealed } = useScrollReveal();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" ref={ref} className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <div className={`reveal ${revealed ? 'revealed' : ''} mt-12 space-y-3`}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen ? 'border-gold-300 bg-white shadow-lg' : 'border-navy-100 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-navy-800 sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-navy-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
