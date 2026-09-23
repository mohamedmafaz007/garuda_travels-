import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import { destinations } from '@/data/mockData';
import QuoteCTA from '@/components/sections/QuoteCTA';
import { useToast } from '@/context/ToastContext';
import { useSEO } from '@/hooks/useSEO';

const BASE_URL = 'https://www.garudatravelsmadurai.com';

// Destination-specific SEO data
const destinationSEO: Record<string, { title: string; description: string; keywords: string }> = {
  madurai: {
    title: 'Madurai Sightseeing Tours | Garuda Travels Madurai',
    description:
      'Book Madurai sightseeing tours with Garuda Travels. Visit Meenakshi Amman Temple, Thirumalai Nayakkar Palace, Gandhi Museum & more on a comfortable local cab tour.',
    keywords: 'Madurai sightseeing, Madurai local tour, Madurai city tour, Madurai cab sightseeing, Meenakshi temple tour',
  },
  rameshwaram: {
    title: 'Madurai to Rameshwaram Cab | Garuda Travels',
    description:
      'Book a cab from Madurai to Rameshwaram with Garuda Travels. Comfortable AC vehicles, experienced drivers. Visit Ramanathaswamy Temple, Pamban Bridge & Dhanushkodi.',
    keywords: 'Madurai to Rameshwaram cab, Madurai Rameshwaram taxi, Rameshwaram trip from Madurai, Rameshwaram tour package from Madurai',
  },
  kodaikanal: {
    title: 'Madurai to Kodaikanal Cab | Garuda Travels',
    description:
      'Book Madurai to Kodaikanal cab with Garuda Travels. Comfortable AC vehicles for Kodaikanal hill station trip – Kodai Lake, Coaker\'s Walk, Pillar Rocks & more.',
    keywords: 'Madurai to Kodaikanal cab, Madurai Kodaikanal taxi, Kodaikanal trip from Madurai, Kodaikanal tour package from Madurai',
  },
  ooty: {
    title: 'Madurai to Ooty Cab | Garuda Travels',
    description:
      'Travel from Madurai to Ooty comfortably with Garuda Travels. AC cab hire for Ooty hill station – Botanical Gardens, Ooty Lake, Nilgiri Mountain Railway and more.',
    keywords: 'Madurai to Ooty cab, Madurai Ooty taxi, Ooty trip from Madurai, Ooty tour package from Madurai',
  },
  munnar: {
    title: 'Madurai to Munnar Cab | Garuda Travels',
    description:
      'Book a cab from Madurai to Munnar with Garuda Travels. Visit Kerala\'s stunning tea gardens, Mattupetty Dam, Echo Point, and Top Station with our professional drivers.',
    keywords: 'Madurai to Munnar cab, Madurai Munnar taxi, Munnar trip from Madurai, Kerala tour from Madurai',
  },
  kanyakumari: {
    title: 'Madurai to Kanyakumari Cab | Garuda Travels',
    description:
      'Cab from Madurai to Kanyakumari with Garuda Travels. One day or overnight trips to India\'s southern tip – Vivekananda Rock Memorial, Thiruvalluvar Statue & sunrise point.',
    keywords: 'Madurai to Kanyakumari cab, Madurai Kanyakumari taxi, Kanyakumari trip from Madurai, Kanyakumari tour from Madurai',
  },
  kerala: {
    title: 'Kerala Tour Packages from Madurai | Garuda Travels',
    description:
      'Book Kerala tour packages from Madurai with Garuda Travels. Explore Kerala backwaters, houseboat, Alleppey, Munnar & Thekkady with comfortable cabs from Madurai.',
    keywords: 'Kerala tour from Madurai, Kerala trip from Madurai, Madurai to Kerala cab, Kerala tour package Madurai',
  },
  coorg: {
    title: 'Madurai to Coorg Trip | Garuda Travels',
    description:
      'Travel from Madurai to Coorg with Garuda Travels. Explore coffee plantations, Abbey Falls, Dubare Elephant Camp and more in the Scotland of India.',
    keywords: 'Madurai to Coorg cab, Coorg trip from Madurai, Coorg tour package from Madurai',
  },
  mysore: {
    title: 'Madurai to Mysore Cab | Garuda Travels',
    description:
      'Book cab from Madurai to Mysore with Garuda Travels. Visit Mysore Palace, Chamundi Hill, Brindavan Gardens and more on a comfortable road trip.',
    keywords: 'Madurai to Mysore cab, Mysore trip from Madurai, Mysore tour from Madurai',
  },
  tirupati: {
    title: 'Madurai to Tirupati Cab | Garuda Travels',
    description:
      'Book a cab from Madurai to Tirupati with Garuda Travels. Comfortable AC vehicles for Tirupati pilgrimage – Sri Venkateswara Temple darshan trip.',
    keywords: 'Madurai to Tirupati cab, Tirupati trip from Madurai, Tirupati pilgrimage cab from Madurai',
  },
  chennai: {
    title: 'Madurai to Chennai Cab | Garuda Travels',
    description:
      'Book a cab from Madurai to Chennai with Garuda Travels. One way and round trip cab service for Madurai Chennai route with professional drivers.',
    keywords: 'Madurai to Chennai cab, Madurai Chennai taxi, one way cab Madurai Chennai',
  },
  bangalore: {
    title: 'Madurai to Bangalore Cab | Garuda Travels',
    description:
      'Book a cab from Madurai to Bangalore with Garuda Travels. Comfortable outstation cab service for Madurai to Bengaluru route.',
    keywords: 'Madurai to Bangalore cab, Madurai Bengaluru taxi, outstation cab Madurai to Bangalore',
  },
};

const fallbackSEO = {
  title: '',
  description: '',
  keywords: '',
};

function DestinationSEO({ id, name }: { id: string; name: string }) {
  const seo = destinationSEO[id] || fallbackSEO;
  useSEO({
    title: seo.title || `${name} | Garuda Travels Madurai`,
    description:
      seo.description ||
      `Explore ${name} with Garuda Travels Madurai. Book a comfortable cab from Madurai to ${name} with experienced drivers.`,
    canonical: `/destinations/${id}`,
    keywords: seo.keywords || `${name} trip from Madurai, Madurai to ${name} cab`,
    ogImage: `${BASE_URL}/images/logo.png`,
  });
  return null;
}

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const destination = destinations.find((d) => d.id === id);

  // Scroll management already handled by Layout.tsx
  useEffect(() => {}, [destination]);

  if (!destination) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="font-display text-3xl font-bold text-navy-800">Destination Not Found</h1>
        <Link to="/destinations" className="rounded-full bg-navy-800 px-6 py-3 text-sm font-bold text-white">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <DestinationSEO id={destination.id} name={destination.name} />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.name} – destination from Madurai with Garuda Travels`}
          width={1920}
          height={900}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <Link to="/destinations" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>
          <div className="mt-4 flex items-center gap-2 text-gold-300">
            <MapPin className="h-5 w-5" />
            <span className="text-xs font-semibold tracking-wide uppercase">{destination.category}</span>
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {destination.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb (visible) */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-navy-500">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-gold-600 transition-colors">Destinations</Link>
          <span>/</span>
          <span className="text-navy-800 font-medium">{destination.name}</span>
        </nav>

        <p className="text-lg leading-relaxed text-navy-600">{destination.description}</p>

        <h2 className="mt-10 font-display text-2xl font-bold text-navy-800">Top Highlights in {destination.name}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {destination.highlights.map((h) => (
            <div key={h} className="flex items-center gap-3 rounded-xl bg-navy-50 px-4 py-3">
              <Check className="h-5 w-5 shrink-0 text-gold-600" />
              <span className="text-sm font-medium text-navy-700">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-navy-800 to-navy-900 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white">Want to visit {destination.name}?</h3>
          <p className="mt-2 text-sm text-navy-200">
            Garuda Travels Madurai will plan the perfect trip for you with a comfortable cab and experienced driver.
          </p>
          <Link
            to="/contact"
            onClick={() => showToast(`Let's plan your trip to ${destination.name}!`)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-navy-900 transition-all hover:-translate-y-0.5"
          >
            Plan My Trip to {destination.name}
          </Link>
        </div>

        {/* Internal links to related services */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/vehicles"
            className="flex items-center justify-center rounded-xl bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
          >
            View Our Cab Fleet
          </Link>
          <Link
            to="/packages"
            className="flex items-center justify-center rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-700 hover:bg-gold-100 transition-colors"
          >
            Tour Packages
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
          >
            Get a Quote
          </Link>
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
              { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://www.garudatravelsmadurai.com/destinations' },
              { '@type': 'ListItem', position: 3, name: destination.name, item: `https://www.garudatravelsmadurai.com/destinations/${destination.id}` },
            ],
          }),
        }}
      />

      <QuoteCTA />
    </div>
  );
}
