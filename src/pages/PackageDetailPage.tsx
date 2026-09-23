import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Check, X, IndianRupee, MapPin, Car, Hotel, Info } from 'lucide-react';
import { packages } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import QuoteCTA from '@/components/sections/QuoteCTA';
import { useSEO } from '@/hooks/useSEO';

const BASE_URL = 'https://www.garudatravelsmadurai.com';

function PackageSEO({ pkg }: { pkg: any }) {
  useSEO({
    title: `${pkg.title} | Madurai Tour Packages | Garuda Travels`,
    description: `Book the ${pkg.title} (${pkg.duration}) with Garuda Travels Madurai. Starting from ₹${pkg.price.toLocaleString('en-IN')}. Highlights: ${pkg.highlights.slice(0, 3).join(', ')}.`,
    canonical: `/packages/${pkg.id}`,
    keywords: `${pkg.title.toLowerCase()}, tour package from Madurai, ${pkg.duration} Madurai package, South India tour package, Madurai travel package`,
    ogImage: pkg.image,
  });
  return null;
}

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const pkg = packages.find((p) => p.id === id);

  // Scroll management handled globally
  useEffect(() => {}, [pkg]);

  if (!pkg) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="font-display text-3xl font-bold text-navy-800">Package Not Found</h1>
        <Link to="/packages" className="rounded-full bg-navy-800 px-6 py-3 text-sm font-bold text-white">
          Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PackageSEO pkg={pkg} />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={pkg.image} alt={`${pkg.title} - Garuda Travels Tour Package from Madurai`} className="h-full w-full object-cover" width={1920} height={900} loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <Link to="/packages" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase">
              {pkg.duration}
            </span>
            <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1">
              <Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
              <span className="text-xs font-bold text-white">{pkg.rating}</span>
              <span className="text-xs text-white/70">({pkg.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{pkg.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-white/70">Starting from</span>
            <span className="font-sans text-2xl sm:text-3xl font-extrabold text-gold-300 tracking-tight">
              ₹{pkg.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb (visible) */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-navy-500">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/packages" className="hover:text-gold-600 transition-colors">Tour Packages</Link>
          <span>/</span>
          <span className="text-navy-800 font-medium">{pkg.title}</span>
        </nav>

        <section>
          <h2 className="font-display text-xl font-bold text-navy-800">Overview</h2>
          <p className="mt-2 text-base leading-relaxed text-navy-600">{pkg.overview}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-navy-800">Highlights</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pkg.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm text-navy-600">
                <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                {h}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-navy-800">Day-by-Day Itinerary</h2>
          <div className="mt-4 space-y-4">
            {pkg.itinerary.map((item) => (
              <div key={item.day} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-bold text-white">
                    {item.day.replace('Day ', '')}
                  </span>
                  <h3 className="font-bold text-navy-800">{item.day}: {item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-navy-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-bold text-navy-800">What's Included</h2>
            <ul className="mt-3 space-y-2">
              {pkg.included.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-600">
                  <Check className="h-4 w-4 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-navy-800">What's Not Included</h2>
            <ul className="mt-3 space-y-2">
              {pkg.notIncluded.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-600">
                  <X className="h-4 w-4 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-800">
            <Car className="h-5 w-5 text-gold-600" />
            Vehicle Options from Madurai
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {pkg.vehicleOptions.map((v) => (
              <span key={v} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-700">{v}</span>
            ))}
          </div>
          <div className="mt-3">
             <Link to="/vehicles" className="text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors">
                View all our Madurai cabs &rarr;
             </Link>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-800">
            <Hotel className="h-5 w-5 text-gold-600" />
            Hotel Information
          </h2>
          <p className="mt-2 text-sm text-navy-600">{pkg.hotelInfo}</p>
        </section>

        <section className="mt-8 rounded-2xl bg-gold-50 p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-800">
            <Info className="h-5 w-5 text-gold-600" />
            Important Information
          </h2>
          <p className="mt-2 text-sm text-navy-600">{pkg.importantInfo}</p>
        </section>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-navy-800 to-navy-900 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white">Ready to book this package from Madurai?</h3>
          <p className="mt-2 text-sm text-navy-200">
            Starting from <span className="font-sans font-bold text-gold-300">₹{pkg.price.toLocaleString('en-IN')}</span> — {pkg.duration}
          </p>
          <a
            href={`https://wa.me/916382863873?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to book the "${pkg.title}" tour package!\n\nDuration: ${pkg.duration}\nStarting Price: ₹${pkg.price.toLocaleString('en-IN')}\nHighlights: ${pkg.highlights.join(', ')}\n\nPlease share available dates and pricing details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => showToast(`Opening WhatsApp to book  (+91 63828 63873)...`)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 text-sm font-bold text-navy-900 transition-all hover:-translate-y-0.5 shadow-lg"
          >
            <IndianRupee className="h-5 w-5" />
            Book This Package Now
          </a>
        </div>
      </div>
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garudatravelsmadurai.com/' },
              { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: 'https://www.garudatravelsmadurai.com/packages' },
              { '@type': 'ListItem', position: 3, name: pkg.title, item: `https://www.garudatravelsmadurai.com/packages/${pkg.id}` },
            ],
          }),
        }}
      />
      
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: pkg.title,
            image: pkg.image,
            description: pkg.overview,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: pkg.rating.toString(),
              reviewCount: pkg.reviewCount.toString()
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: pkg.price.toString(),
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Garuda Travels Madurai'
              }
            }
          }),
        }}
      />

      <QuoteCTA />
    </div>
  );
}
