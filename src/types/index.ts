export interface Destination {
  id: string;
  name: string;
  category: 'TEMPLE' | 'HILL STATION' | 'BEACH' | 'FAMILY' | 'ADVENTURE';
  image: string;
  shortDescription: string;
  description: string;
  highlights: string[];
}

export interface Package {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  overview: string;
  itinerary: { day: string; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
  vehicleOptions: string[];
  hotelInfo: string;
  importantInfo: string;
}

export interface VehicleTariff {
  dayRent: number;
  fuelPerKm: number;
  perKmRate: number;
  driverBeta: number;
  minKm: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'SEDAN' | 'SUV' | 'PREMIUM' | 'TEMPO TRAVELLER';
  categoryTags?: ('SEDAN' | 'SUV' | 'PREMIUM' | 'TEMPO TRAVELLER')[];
  image: string;
  capacity: number;
  features: string[];
  rating: number;
  price: number;
  badge?: string;
  tariff: VehicleTariff;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}
