import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Briefcase, Snowflake, Gauge, Shield, IndianRupee, MapPin } from 'lucide-react';
import { vehicles } from '@/data/mockData';
import CabBooking from '@/components/sections/CabBooking';
import { useToast } from '@/context/ToastContext';
import { useSEO } from '@/hooks/useSEO';

const BASE_URL = 'https://www.garudatravelsmadurai.com';

function VehicleSEO({ vehicle }: { vehicle: any }) {
  useSEO({
    title: `Book ${vehicle.name} (${vehicle.type}) in Madurai | Garuda Travels`,
    description: `Book ${vehicle.name} cab in Madurai for local sightseeing, outstation trips, and airport transfers. Seating: ${vehicle.capacity}. Starting from ₹${vehicle.tariffs.outstation.perKm}/km.`,
    canonical: `/vehicles/${vehicle.id}`,
    keywords: `${vehicle.name} cab Madurai, book ${vehicle.name.toLowerCase()} in Madurai, Madurai ${vehicle.type.toLowerCase()} cab, Madurai car rental ${vehicle.name}`,
    ogImage: `${BASE_URL}${vehicle.image}`,
  });
  return null;
}

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const vehicle = vehicles.find((v) => v.id === id);

  // Scroll management handled globally
  useEffect(() => {}, [vehicle]);

  if (!vehicle) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="font-display text-3xl font-bold text-navy-800">Vehicle Not Found</h1>
        <Link to="/vehicles" className="rounded-full bg-navy-800 px-6 py-3 text-sm font-bold text-white">
          Back to Fleet
        </Link>
      </div>
    );
  }

  const features = [
    { icon: Users, label: vehicle.capacity, desc: 'Seating Capacity' },
    { icon: Briefcase, label: vehicle.luggage, desc: 'Luggage Space' },
    { icon: Snowflake, label: 'AC', desc: 'Air Conditioned' },
    { icon: Shield, label: 'Safe', desc: 'GPS Monitored' },
  ];

  return (
    <div className="pt-16">
      <VehicleSEO vehicle={vehicle} />

      {/* Hero */}
      <div className="relative overflow-hidden bg-navy-950 py-12 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/vehicles" className="mb-6 sm:mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold tracking-wide text-navy-900 uppercase">
                  {vehicle.type}
                </span>
                <span className="text-sm font-medium text-white/70 flex items-center gap-1.5">
                  <Gauge className="h-4 w-4" />
                  Premium Condition
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
                {vehicle.name} <span className="block text-2xl sm:text-3xl mt-2 text-white/70">Cab in Madurai</span>
              </h1>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-navy-900/50 p-4 border border-white/5">
                      <Icon className="h-6 w-6 text-gold-400" />
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">{feature.label}</p>
                        <p className="text-[10px] text-white/60 uppercase tracking-wide">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-bold text-navy-900 transition-all hover:-translate-y-0.5 hover:bg-gold-300"
                >
                  Book Now
                </a>
                <a
                  href={`https://wa.me/916382863873?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to inquire about booking a ${vehicle.name} in Madurai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-3xl" />
              <img
                src={vehicle.image}
                alt={`${vehicle.name} cab service in Madurai`}
                className="relative z-10 w-full rounded-2xl object-cover shadow-2xl"
                width={800}
                height={500}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tariffs & Details */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Breadcrumb (visible) */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-navy-500">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/vehicles" className="hover:text-gold-600 transition-colors">Our Fleet</Link>
          <span>/</span>
          <span className="text-navy-800 font-medium">{vehicle.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Tariff Details</h2>
              
              <div className="space-y-8">
                {/* Outstation Tariff */}
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-gold-600" />
                    <h3 className="font-bold text-lg text-navy-800">Outstation Packages</h3>
                  </div>
                  
                  {vehicle.tariffs.outstation.hasTieredPricing ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {vehicle.tariffs.outstation.tiers?.map((tier, idx) => (
                        <div key={idx} className="rounded-xl bg-navy-50 p-4">
                          <p className="text-sm font-bold text-navy-800 mb-3">{tier.name}</p>
                          <div className="space-y-2">
                            {tier.dayRent > 0 && (
                              <div className="flex justify-between items-center text-sm border-b border-navy-100 pb-2">
                                <span className="text-navy-600">Day Rent</span>
                                <span className="font-bold text-navy-900">₹{tier.dayRent}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center text-sm border-b border-navy-100 pb-2">
                              <span className="text-navy-600">Per Km Charge</span>
                              <span className="font-bold text-navy-900">₹{tier.perKm}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-navy-600">Driver Bata</span>
                              <span className="font-bold text-navy-900">₹{vehicle.tariffs.outstation.driverBata}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="rounded-xl bg-navy-50 p-4 text-center">
                        <p className="text-xs font-semibold text-navy-500 uppercase mb-1">Per Km</p>
                        <p className="font-sans text-xl font-bold text-navy-900">₹{vehicle.tariffs.outstation.perKm}</p>
                      </div>
                      <div className="rounded-xl bg-navy-50 p-4 text-center">
                        <p className="text-xs font-semibold text-navy-500 uppercase mb-1">Min Km/Day</p>
                        <p className="font-sans text-xl font-bold text-navy-900">{vehicle.tariffs.outstation.minKmPerDay}</p>
                      </div>
                      <div className="rounded-xl bg-navy-50 p-4 text-center">
                        <p className="text-xs font-semibold text-navy-500 uppercase mb-1">Driver Bata</p>
                        <p className="font-sans text-xl font-bold text-navy-900">₹{vehicle.tariffs.outstation.driverBata}</p>
                      </div>
                      {vehicle.tariffs.outstation.fuelPerKm !== undefined && vehicle.tariffs.outstation.fuelPerKm > 0 && (
                        <div className="rounded-xl bg-navy-50 p-4 text-center">
                          <p className="text-xs font-semibold text-navy-500 uppercase mb-1">Fuel/Km</p>
                          <p className="font-sans text-xl font-bold text-navy-900">₹{vehicle.tariffs.outstation.fuelPerKm}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Local Packages */}
                {vehicle.tariffs.localPackages && (
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-gold-600" />
                      <h3 className="font-bold text-lg text-navy-800">Local Packages (Madurai City)</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {vehicle.tariffs.localPackages.map((pkg, idx) => (
                        <div key={idx} className="flex flex-col justify-between rounded-xl bg-navy-50 p-4">
                          <div>
                            <p className="text-sm font-bold text-navy-900 mb-1">{pkg.hours} Hrs / {pkg.kms} Kms</p>
                            <p className="text-xs text-navy-500">Local use only</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-navy-100 flex items-end justify-between">
                            <span className="text-xs text-navy-500">Package Price</span>
                            <span className="font-sans text-xl font-bold text-gold-600">₹{pkg.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-navy-500 text-center">
                      * Extra hours and kilometers will be charged separately.
                    </p>
                  </div>
                )}
              </div>
            </section>
            
            <section>
               <h2 className="font-display text-2xl font-bold text-navy-800 mb-4">Why Book {vehicle.name} in Madurai?</h2>
               <div className="prose prose-sm text-navy-600">
                 <p>
                   The {vehicle.name} is an excellent choice for travel in and around Madurai. Whether you are planning a local Madurai sightseeing tour, an airport transfer, or an outstation trip to destinations like Rameshwaram, Kodaikanal, or Kerala, this {vehicle.capacity}-seater {vehicle.type.toLowerCase()} offers superior comfort and reliability.
                 </p>
                 <p className="mt-2">
                   At Garuda Travels, our vehicles are meticulously maintained and driven by experienced, courteous professionals who know the South Indian routes perfectly. 
                 </p>
               </div>
            </section>

          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 rounded-2xl bg-navy-50 p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-4">Need Help Booking?</h3>
              <p className="text-sm text-navy-600 mb-6">
                Our team is available 24/7 to help you plan your journey and choose the right vehicle.
              </p>
              
              <div className="space-y-4">
                <a
                  href="tel:+919626138168"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-navy-800"
                >
                  Call +91 96261 38168
                </a>
                <a
                  href="tel:+919363456631"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-navy-800"
                >
                  Call +91 93634 56631
                </a>
                <a
                  href={`https://wa.me/916382863873?text=${encodeURIComponent(`Hi GARUDA TRAVELS, I want to book the ${vehicle.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#20bd5a]"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Booking Form Section */}
      <div id="book" className="scroll-mt-24">
        <CabBooking />
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
              { '@type': 'ListItem', position: 2, name: 'Our Fleet', item: 'https://www.garudatravelsmadurai.com/vehicles' },
              { '@type': 'ListItem', position: 3, name: vehicle.name, item: `https://www.garudatravelsmadurai.com/vehicles/${vehicle.id}` },
            ],
          }),
        }}
      />
      
      {/* Product / Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${vehicle.name} Cab Service in Madurai`,
            image: `${BASE_URL}${vehicle.image}`,
            description: `Book a ${vehicle.name} (${vehicle.type}) in Madurai. Seating capacity: ${vehicle.capacity}. Ideal for local sightseeing, outstation trips, and airport transfers.`,
            provider: {
              '@type': 'TravelAgency',
              name: 'Garuda Travels Madurai'
            },
            areaServed: {
              '@type': 'City',
              name: 'Madurai'
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: vehicle.tariffs.outstation.hasTieredPricing 
                ? (vehicle.tariffs.outstation.tiers?.[0]?.perKm.toString() || '0')
                : (vehicle.tariffs.outstation.perKm?.toString() || '0'),
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                priceType: 'https://schema.org/MinimumBasePrice',
                unitText: 'PER_KM'
              }
            }
          }),
        }}
      />
    </div>
  );
}
