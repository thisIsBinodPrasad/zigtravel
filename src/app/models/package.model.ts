export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  highlights: string[];
  mealsIncluded: string[]; // e.g. ['Breakfast', 'Dinner']
  stayName: string;
}

export interface TourPackage {
  id: string;
  title: string;
  destinationId: string; // 'maldives', 'bali', etc.
  destinationName: string;
  duration: string; // e.g. '4 Days & 3 Nights'
  nights: number;
  days: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  category: 'Honeymoon' | 'Luxury' | 'Family' | 'Budget' | 'All-Inclusive' | 'Watersports' | 'Adventure';
  resortName: string;
  resortCategory: 'Budget' | 'Mid-Range' | 'Luxury' | 'Ultra-Luxury';
  departureCities: string[];
  inclusions: string[];
  exclusions: string[];
  bestseller: boolean;
  honeymoonSpecial: boolean;
  itinerary: ItineraryDay[];
  cancellationPolicy: string;
}
