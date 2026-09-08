export interface ResortTier {
  category: string; // e.g. 'Budget', 'Mid-Range', 'Luxury', 'Ultra-Luxury'
  priceRange: string;
  popularOptions: string[];
  inclusions: string[];
  exclusions: string[];
  bestFor: string;
}

export interface FlightInfo {
  directAirlines: string[];
  directDuration: string;
  directPriceRange: string;
  connectingAirlines: string[];
  connectingDuration: string;
  bestBookingMonths: string;
  insights: string[];
}

export interface VisaInfo {
  type: string; // e.g. 'Free Visa on Arrival', 'E-Visa Required', 'Schengen Visa'
  validity: string;
  fee: string;
  imugaRequired?: boolean;
  processSteps: string[];
  requiredDocs: string[];
  proTip: string;
}

export interface SeasonGuide {
  name: string;
  months: string;
  temperature: string;
  weatherDescription: string;
  bestFor: string[];
  avoidIf: string[];
}

export interface Destination {
  id: string; // e.g. 'maldives', 'bali', 'dubai', 'thailand', 'europe', 'vietnam', 'kashmir', 'kerala', 'ladakh'
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  startingPrice: number;
  rating: number;
  totalReviews: number;
  badge?: string;
  category: 'International' | 'Domestic';
  overview: string;
  resortTiers: ResortTier[];
  seasons: SeasonGuide[];
  flightInfo: FlightInfo;
  visaInfo: VisaInfo;
  faqs: { question: string; answer: string }[];
}
