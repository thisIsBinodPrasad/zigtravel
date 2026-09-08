import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { TourPackage } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private activeDestinationIdSubject = new BehaviorSubject<string>('all');
  activeDestinationId$ = this.activeDestinationIdSubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private activeCategorySubject = new BehaviorSubject<string>('all');
  activeCategory$ = this.activeCategorySubject.asObservable();

  private activeDepartureCitySubject = new BehaviorSubject<string>('all');
  activeDepartureCity$ = this.activeDepartureCitySubject.asObservable();

  private activeDurationSubject = new BehaviorSubject<string>('all');
  activeDuration$ = this.activeDurationSubject.asObservable();

  private sortBySubject = new BehaviorSubject<string>('popular');
  sortBy$ = this.sortBySubject.asObservable();

  private destinations: Destination[] = [
    {
      id: 'maldives',
      name: 'Maldives',
      country: 'Maldives',
      tagline: 'Tropical Paradise of Turquoise Lagoons & Overwater Luxury',
      heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 22700,
      rating: 4.8,
      totalReviews: 12450,
      badge: 'Popular for Honeymoons',
      category: 'International',
      overview: 'The Maldives is world-renowned for its private island resorts, overwater villas with glass floor panels, underwater dining experiences, and rich coral reefs teeming with manta rays and reef sharks. Free 30-day visa on arrival makes it seamless for Indian travelers.',
      resortTiers: [
        {
          category: 'Budget-Friendly Resorts',
          priceRange: '₹8,000 - ₹15,000 / night',
          popularOptions: ['Adaaran Club Rannalhi', 'Medhufushi Island Resort', 'Embudu Village'],
          inclusions: ['Beach Villa Stay', 'Speedboat Transfer', 'Buffet Breakfast & Dinner', 'Free Kayaking'],
          exclusions: ['Seaplane Transfer', 'Private Butler', 'Fine Dining Alcohol'],
          bestFor: 'Budget travelers, first-time couples, short beach getaways'
        },
        {
          category: 'Mid-Range Resorts',
          priceRange: '₹15,000 - ₹35,000 / night',
          popularOptions: ['Sun Siyam Olhuveli', 'Centara Mirage Lagoon', 'Reethi Faru Resort'],
          inclusions: ['Overwater Villa Stay', 'All-Inclusive Meals', 'Speedboat Transfer', 'Sunset Cruise'],
          exclusions: ['Private Pool Villa', 'Helicopter Transfer'],
          bestFor: 'Couples wanting overwater villa experience at great value'
        },
        {
          category: 'Luxury & Ultra-Luxury',
          priceRange: '₹40,000 - ₹150,000+ / night',
          popularOptions: ['Taj Exotica Resort & Spa', 'Soneva Jani', 'Villa Nautica Paradise Island'],
          inclusions: ['Private Infinity Pool Overwater Suite', 'Seaplane Transfer', 'Personalized Butler', 'Floating Breakfast', 'Spa Voucher'],
          exclusions: ['International Flights (Optional add-on)'],
          bestFor: 'Honeymooners, luxury seekers, ultra-private vacations'
        }
      ],
      seasons: [
        {
          name: 'Peak Dry Season',
          months: 'December - March',
          temperature: '25°C - 31°C',
          weatherDescription: 'Clear blue skies, calm seas, perfect underwater visibility.',
          bestFor: ['Scuba diving', 'Sandbank picnics', 'Honeymoon trips'],
          avoidIf: ['Looking for extreme budget deals']
        },
        {
          name: 'Shoulder Season',
          months: 'April - May & Oct - Nov',
          temperature: '26°C - 32°C',
          weatherDescription: 'Warm weather with occasional short tropical showers.',
          bestFor: ['Great resort discounts', 'Manta ray sightings', 'Flexible plans'],
          avoidIf: ['100% dry day guarantee needed']
        },
        {
          name: 'Monsoon Low Season',
          months: 'June - September',
          temperature: '26°C - 30°C',
          weatherDescription: 'Frequent rain and high waves, lowest resort prices.',
          bestFor: ['Maximum savings up to 50% OFF', 'Indoor luxury stays'],
          avoidIf: ['Outdoor watersports heavy itinerary']
        }
      ],
      flightInfo: {
        directAirlines: ['IndiGo', 'Air India', 'Maldivian Air'],
        directDuration: '2 to 4 Hours',
        directPriceRange: '₹8,500 - ₹22,000 one-way',
        connectingAirlines: ['SriLankan Airlines', 'Emirates', 'FlyDubai'],
        connectingDuration: '5 to 9 Hours',
        bestBookingMonths: 'Book 8-12 weeks in advance for Peak season',
        insights: [
          'Direct non-stop flights operate daily from Delhi, Mumbai, Bengaluru, Kochi, and Chennai.',
          'Kochi and Thiruvananthapuram usually offer the lowest flight fares to Male (MLE).'
        ]
      },
      visaInfo: {
        type: 'Free Visa on Arrival (30 Days)',
        validity: '30 Days (Extendable up to 90 days)',
        fee: 'FREE',
        imugaRequired: true,
        processSteps: [
          'Submit IMUGA health declaration online 96 hours before departure.',
          'Show confirmed resort booking voucher & return flight ticket at Male Airport counter.',
          'Get instant 30-day visa stamp on passport.'
        ],
        requiredDocs: ['Passport (valid 1+ month)', 'Confirmed Resort Voucher', 'Return Air Ticket', 'IMUGA QR Code'],
        proTip: 'Fill the IMUGA digital form online within 96h prior to departure to avoid long queue delays.'
      },
      faqs: [
        {
          question: 'Is Visa free for Indians traveling to Maldives?',
          answer: 'Yes! Indian passport holders receive a FREE 30-day Visa on Arrival at Velana International Airport in Male.'
        },
        {
          question: 'What is the average cost of a Maldives Honeymoon package?',
          answer: 'A standard 4D/3N Maldives package starts from ₹22,700 per person for budget island hotels, and ₹54,500 to ₹1,25,000+ for private overwater villa resorts.'
        }
      ]
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      tagline: 'Island of the Gods: Volcanic Peaks, Jungle Villas & Beach Clubs',
      heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 19800,
      rating: 4.7,
      totalReviews: 9820,
      badge: 'Bestseller 2026',
      category: 'International',
      overview: 'Bali captivates visitors with terraced rice fields in Ubud, clifftop temples in Uluwatu, vibrant sunset beach clubs in Seminyak, and crystal waters in Nusa Penida.',
      resortTiers: [
        {
          category: 'Standard Jungle & Beach Hotels',
          priceRange: '₹3,500 - ₹8,000 / night',
          popularOptions: ['Kuta Beach Resort', 'Ubud Tropical Haven'],
          inclusions: ['Breakfast Included', 'Airport Pickup', 'Day Tour to Ubud Rice Terraces'],
          exclusions: ['Private Pool', 'Helicopter Tour'],
          bestFor: 'Backpackers, budget couples, group trips'
        },
        {
          category: 'Luxury Private Pool Villas',
          priceRange: '₹12,000 - ₹35,000 / night',
          popularOptions: ['The Kayon Jungle Resort', 'Viceroy Bali', 'Alila Seminyak'],
          inclusions: ['Private Infinity Pool Villa', 'Floating Breakfast', 'Full Day Nusa Penida Island Cruise', 'Balinese Massage'],
          exclusions: ['Visa fee'],
          bestFor: 'Honeymooners and luxury seekers'
        }
      ],
      seasons: [
        {
          name: 'Dry Sunny Season',
          months: 'April - October',
          temperature: '27°C - 31°C',
          weatherDescription: 'Sunny, low humidity, ideal for beach clubs, temple tours and surfing.',
          bestFor: ['Nusa Penida trips', 'Outdoor adventures', 'Beach activities'],
          avoidIf: ['Seeking off-peak flight discounts']
        }
      ],
      flightInfo: {
        directAirlines: ['Vistara', 'IndiGo', 'Batik Air'],
        directDuration: '6 Hours',
        directPriceRange: '₹12,000 - ₹26,000',
        connectingAirlines: ['Malaysia Airlines', 'Singapore Airlines', 'AirAsia'],
        connectingDuration: '7 to 10 Hours',
        bestBookingMonths: 'Book 6-10 weeks prior to departure',
        insights: ['Direct non-stop flights from Delhi and Bengaluru to Denpasar (DPS) save 4+ hours of layover.']
      },
      visaInfo: {
        type: 'Visa on Arrival / E-VOA',
        validity: '30 Days',
        fee: 'IDR 500,000 (~₹2,700)',
        processSteps: ['Apply online via official e-VOA portal or buy at DPS airport arrival desk.'],
        requiredDocs: ['Passport with 6+ months validity', 'Return Ticket', 'Hotel Booking Confirmation'],
        proTip: 'Apply for E-VOA online before flying to breeze through the e-gates at Bali Airport.'
      },
      faqs: [
        {
          question: 'Can we visit Ubud and Seminyak in a 5-day Bali itinerary?',
          answer: 'Yes! Our popular 5D/4N Bali split itinerary includes 2 nights in a lush Ubud jungle villa and 2 nights in a Seminyak beach resort.'
        }
      ]
    },
    {
      id: 'dubai',
      name: 'Dubai',
      country: 'UAE',
      tagline: 'Futuristic Skyscrapers, Desert Safaris & World-Class Shopping',
      heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 34500,
      rating: 4.8,
      totalReviews: 14100,
      badge: 'Family Favorite',
      category: 'International',
      overview: 'Experience the height of modern luxury in Dubai: Burj Khalifa, Museum of the Future, thrilling desert dunes, Atlantis Aquaventure, and mega shopping malls.',
      resortTiers: [
        {
          category: 'City & Downtown Hotels',
          priceRange: '₹6,000 - ₹14,000 / night',
          popularOptions: ['Rove Downtown', 'Novotel Bur Dubai'],
          inclusions: ['4-Star Stay', 'Daily Breakfast', 'Burj Khalifa 124th Floor Entry', 'Desert Safari with BBQ'],
          exclusions: ['Tourism Dirham Tax'],
          bestFor: 'Sightseeing & shopping trips'
        },
        {
          category: '5-Star Luxury Resorts',
          priceRange: '₹22,000 - ₹75,000 / night',
          popularOptions: ['Atlantis The Palm', 'Jumeirah Beach Hotel', 'Armani Hotel Dubai'],
          inclusions: ['Palace Suite', 'Unlimited Aquaventure Waterpark Access', 'Private Yacht Cruise', 'Fine Dining Pass'],
          exclusions: ['Personal Expenses'],
          bestFor: 'Luxury family vacations & premium honeymoons'
        }
      ],
      seasons: [
        {
          name: 'Pleasant Winter Season',
          months: 'November - March',
          temperature: '20°C - 28°C',
          weatherDescription: 'Perfect outdoor weather, blue skies, Global Village open.',
          bestFor: ['Outdoor sightseeing', 'Desert camping', 'Shopping festival'],
          avoidIf: ['Looking for cheap hotel rates']
        }
      ],
      flightInfo: {
        directAirlines: ['Emirates', 'FlyDubai', 'IndiGo', 'Air India Express', 'SpiceJet'],
        directDuration: '3.5 Hours',
        directPriceRange: '₹9,000 - ₹25,000',
        connectingAirlines: ['Gulf Air', 'Oman Air'],
        connectingDuration: '5 to 7 Hours',
        bestBookingMonths: 'Book 6 weeks in advance',
        insights: ['Flights operate from almost all major Indian international airports directly to DXB.']
      },
      visaInfo: {
        type: 'Pre-arranged UAE E-Visa',
        validity: '30 Days tourist visa',
        fee: '₹6,800 - ₹7,500',
        processSteps: ['Submit passport copy & photo to ZigoHolidays visa team for fast 48h approval.'],
        requiredDocs: ['Passport copy (6+ months valid)', 'Passport photo', 'Return air ticket'],
        proTip: 'Indian passport holders with valid US/UK/Schengen visa get instant Visa on Arrival at Dubai Airport.'
      },
      faqs: [
        {
          question: 'Is Dubai suitable for a family vacation with kids?',
          answer: 'Absolutely! Dubai offers world-class theme parks, Atlantis Aquaventure waterpark, IMG Worlds, Dubai Aquarium, and safe family amenities.'
        }
      ]
    },
    {
      id: 'thailand',
      name: 'Thailand',
      country: 'Thailand',
      tagline: 'Vibrant Nightlife, Golden Temples & Pristine Emerald Islands',
      heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 18500,
      rating: 4.6,
      totalReviews: 11200,
      badge: 'Best Value Deal',
      category: 'International',
      overview: 'Thailand offers unbeatable value: Bangkok city culture, Phuket beach resorts, Phi Phi island hopping speedboats, Pattaya nightlife, and authentic Thai cuisine.',
      resortTiers: [
        {
          category: 'Standard 3 & 4 Star Hotels',
          priceRange: '₹3,000 - ₹7,000 / night',
          popularOptions: ['Ibis Phuket Patong', 'Centara Watergate Bangkok'],
          inclusions: ['Hotel Stay', 'Breakfast', '4 Island Speedboat Tour', 'Airport Transfers'],
          exclusions: ['National Park Entry Fees (~400 THB)'],
          bestFor: 'Budget travelers, friends trips, couples'
        }
      ],
      seasons: [
        {
          name: 'Cool & Dry Season',
          months: 'November - April',
          temperature: '24°C - 32°C',
          weatherDescription: 'Sunny beach weather, clear blue ocean, island hopping ready.',
          bestFor: ['Phuket & Krabi islands', 'Full moon party', 'Scuba diving'],
          avoidIf: ['Budget constraint']
        }
      ],
      flightInfo: {
        directAirlines: ['Thai Airways', 'IndiGo', 'AirAsia', 'SpiceJet'],
        directDuration: '3.5 to 4.5 Hours',
        directPriceRange: '₹8,000 - ₹18,000',
        connectingAirlines: ['Malaysia Airlines'],
        connectingDuration: '6 Hours',
        bestBookingMonths: 'Book 4-6 weeks early',
        insights: ['Direct flights land in Bangkok (BKK/DMK) and Phuket (HKT).']
      },
      visaInfo: {
        type: 'Free Visa Exemption / Visa on Arrival',
        validity: '30 Days',
        fee: 'FREE under current fee waiver scheme',
        processSteps: ['Fill arrival card on arrival or apply for E-VOA before travel.'],
        requiredDocs: ['Passport (6+ months valid)', 'Hotel Booking Voucher', 'Return Air Ticket'],
        proTip: 'Carry proof of 10,000 THB per person in cash as mandatory entry requirement inspection.'
      },
      faqs: [
        {
          question: 'Do Indian citizens get free visa for Thailand?',
          answer: 'Yes! Thailand offers visa-free entry for Indian passport holders for up to 30 days.'
        }
      ]
    },
    {
      id: 'europe',
      name: 'Europe',
      country: 'France, Switzerland, Italy',
      tagline: 'Romantic Paris, Swiss Alps & Historic Roman Treasures',
      heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 135200,
      rating: 4.9,
      totalReviews: 8750,
      badge: 'Ultimate Dream Tour',
      category: 'International',
      overview: 'Explore iconic European highlights: Eiffel Tower in Paris, Mt. Titlis & Jungfraujoch snow peaks in Switzerland, Venetian gondolas, and Colosseum in Rome with expert guides.',
      resortTiers: [
        {
          category: 'Premium Grand Europe Package',
          priceRange: '₹1,35,200 - ₹2,80,000 / person',
          popularOptions: ['Central City 4-Star Hotels across Paris, Zurich, Venice, Rome'],
          inclusions: ['4-Star Hotels', 'Swiss Travel Rail Pass', 'Eiffel Tower 2nd Floor', 'Mt. Titlis Cable Car', 'Gondola Ride', 'Daily Indian Dinners'],
          exclusions: ['Schengen Visa Fee (~₹7,200)'],
          bestFor: 'Families, honeymooners, milestone luxury vacations'
        }
      ],
      seasons: [
        {
          name: 'Spring & Summer Peak',
          months: 'May - September',
          temperature: '18°C - 28°C',
          weatherDescription: 'Long daylight hours, vibrant alpine green, clear mountain views.',
          bestFor: ['Sightseeing', 'Mountain excursions', 'Outdoor dining'],
          avoidIf: ['Wanting heavy discounts']
        }
      ],
      flightInfo: {
        directAirlines: ['Air France', 'SWISS', 'Air India', 'Lufthansa'],
        directDuration: '8.5 to 9.5 Hours',
        directPriceRange: '₹38,000 - ₹75,000 return',
        connectingAirlines: ['Emirates', 'Qatar Airways', 'Etihad'],
        connectingDuration: '11 to 14 Hours',
        bestBookingMonths: 'Book 3-5 months in advance due to Schengen appointment slots',
        insights: ['Multi-city flight tickets (e.g. In Paris, Out Rome) save time and domestic transit costs.']
      },
      visaInfo: {
        type: 'Schengen Visa Required',
        validity: 'As per itinerary (Up to 90 days)',
        fee: '€90 (~₹8,200)',
        processSteps: ['ZigoHolidays visa team prepares application file, travel itinerary, insurance & books VFS appointment.'],
        requiredDocs: ['Passport', '6-Month Bank Statements', 'ITR returns (2 years)', 'Employment Proof', 'Travel Insurance'],
        proTip: 'Apply at least 60-90 days prior to travel date to secure VFS appointment slots.'
      },
      faqs: [
        {
          question: 'Does ZigoHolidays assist with Schengen Visa processing for Europe?',
          answer: 'Yes! We provide complete end-to-end Schengen visa assistance including documentation check, flight itineraries, insurance, and VFS appointment booking.'
        }
      ]
    },
    {
      id: 'kashmir',
      name: 'Kashmir',
      country: 'India',
      tagline: 'Paradise on Earth: Houseboats, Shikaras & Snow Capped Gulmarg',
      heroImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 16800,
      rating: 4.8,
      totalReviews: 13400,
      badge: 'Top Domestic Tour',
      category: 'Domestic',
      overview: 'Experience Kashmir: luxury wooden houseboat stay on Dal Lake in Srinagar, Gondola cable car ride over Gulmarg snow slopes, Pahalgam valley pine forests, and Sonamarg glaciers.',
      resortTiers: [
        {
          category: 'Deluxe Kashmir Package',
          priceRange: '₹16,800 - ₹35,000 / person',
          popularOptions: ['Luxury Houseboat Dal Lake', 'Khyber Resort Gulmarg'],
          inclusions: ['Luxury Houseboat 1N + Hotel 4N', 'Daily Breakfast & Dinner', 'Shikara Ride', 'Gulmarg Cable Car Ticket', 'Private Cab for Sightseeing'],
          exclusions: ['Pony rides', 'Personal shopping'],
          bestFor: 'Couples, family vacations, winter snow lovers'
        }
      ],
      seasons: [
        {
          name: 'Spring Tulip & Summer Season',
          months: 'April - October',
          temperature: '15°C - 28°C',
          weatherDescription: 'Pleasant weather, blooming tulip garden, lush green valleys.',
          bestFor: ['Shikara ride', 'Pahalgam rafting', 'Family vacations'],
          avoidIf: ['Seeking heavy snow skiing']
        },
        {
          name: 'Winter Snow Season',
          months: 'December - March',
          temperature: '-5°C - 10°C',
          weatherDescription: 'Heavy snowfall in Gulmarg, white winter wonderland.',
          bestFor: ['Skiing in Gulmarg', 'Snowman building', 'Winter honeymoon'],
          avoidIf: ['Cold-sensitive travelers']
        }
      ],
      flightInfo: {
        directAirlines: ['IndiGo', 'Air India', 'Vistara', 'SpiceJet'],
        directDuration: '1.5 to 2.5 Hours',
        directPriceRange: '₹4,500 - ₹12,000 return',
        connectingAirlines: ['Connecting via Delhi / Chandigarh'],
        connectingDuration: '4 Hours',
        bestBookingMonths: 'Book 4-6 weeks early',
        insights: ['Direct flights land directly at Srinagar Airport (SXR).']
      },
      visaInfo: {
        type: 'No Visa Required (Domestic India)',
        validity: 'N/A',
        fee: 'FREE',
        processSteps: ['Carry government ID proof (Aadhaar / Passport / Driving License).'],
        requiredDocs: ['Govt Photo ID'],
        proTip: 'Postpaid mobile connections (Airtel/Jio/BSNL) are required in Jammu & Kashmir.'
      },
      faqs: [
        {
          question: 'Is Gulmarg Gondola ticket included in the Kashmir tour package?',
          answer: 'Yes! We pre-book Phase-1 Gulmarg Gondola tickets so you avoid long ticket counter queues on arrival.'
        }
      ]
    },
    {
      id: 'kerala',
      name: 'Kerala',
      country: 'India',
      tagline: 'God\'s Own Country: Backwater Houseboats & Tea Gardens',
      heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
      startingPrice: 14200,
      rating: 4.7,
      totalReviews: 10900,
      badge: 'Nature & Wellness',
      category: 'Domestic',
      overview: 'Discover Kerala: Munnar rolling tea gardens, Alleppey backwater luxury houseboat cruises, Thekkady wildlife safari, and Kovalam sun-drenched beaches.',
      resortTiers: [
        {
          category: 'Standard & Luxury Kerala Package',
          priceRange: '₹14,200 - ₹38,000 / person',
          popularOptions: ['Munnar Tea Valley Resort', 'Alleppey Deluxe AC Houseboat', 'Kovalam Beach Resort'],
          inclusions: ['Deluxe AC Houseboat Cruise & Overnight Stay', 'Resort Stays in Munnar & Thekkady', 'Daily Breakfast & Dinner', 'Private AC Vehicle'],
          exclusions: ['Kathakali Show Ticket Add-ons'],
          bestFor: 'Honeymooners, nature lovers, family holidays'
        }
      ],
      seasons: [
        {
          name: 'Peak Winter & Season',
          months: 'October - March',
          temperature: '20°C - 30°C',
          weatherDescription: 'Pleasant breeze, calm backwaters, ideal tea garden walks.',
          bestFor: ['Alleppey houseboat', 'Munnar mist', 'Ayurvedic spas'],
          avoidIf: ['Looking for monsoon discounts']
        }
      ],
      flightInfo: {
        directAirlines: ['IndiGo', 'Air India', 'Vistara', 'Akasa Air'],
        directDuration: '2 to 3 Hours',
        directPriceRange: '₹3,500 - ₹9,500 return',
        connectingAirlines: ['Multiple domestic options'],
        connectingDuration: '4 Hours',
        bestBookingMonths: 'Book 3-5 weeks early',
        insights: ['Major airport gateways are Kochi (COK) and Trivandrum (TRV).']
      },
      visaInfo: {
        type: 'No Visa Required (Domestic India)',
        validity: 'N/A',
        fee: 'FREE',
        processSteps: ['Carry Govt ID.'],
        requiredDocs: ['Govt Photo ID'],
        proTip: 'Stay overnight on a private Alleppey houseboat to experience sunset dining on backwaters.'
      },
      faqs: [
        {
          question: 'Are meals included on the Alleppey Houseboat stay?',
          answer: 'Yes! All traditional Kerala meals (Lunch, Evening Tea/Snacks, Dinner, Breakfast) are freshly prepared by an onboard private chef.'
        }
      ]
    }
  ];

  private packages: TourPackage[] = [
    // Maldives Packages
    {
      id: 'mld-01',
      title: 'Medhufushi Island Resort, Maldives | Speedboat Transfer Included',
      destinationId: 'maldives',
      destinationName: 'Maldives',
      duration: '4 Days & 3 Nights',
      nights: 3,
      days: 4,
      originalPrice: 42000,
      discountedPrice: 22700,
      discountPercent: 46,
      rating: 4.8,
      reviewCount: 142,
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Budget',
      resortName: 'Medhufushi Island Resort',
      resortCategory: 'Budget',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Kochi', 'Chennai'],
      inclusions: ['3 Nights Beach Villa Accommodation', 'Round-trip Speedboat Airport Transfers', 'Buffet Breakfast & Dinner', 'Free Snorkeling Equipment', 'Visa Guidance'],
      exclusions: ['International Airfare', 'Personal Water Sports', 'Travel Insurance'],
      bestseller: true,
      honeymoonSpecial: false,
      cancellationPolicy: 'Free cancellation up to 14 days before departure.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Male & Speedboat Transfer to Island Resort',
          description: 'Arrive at Velana International Airport (Male). Our resort representative will welcome you and guide you to your speedboat transfer across turquoise waters to Medhufushi Island. Check into your tropical villa and enjoy evening sunset beach views.',
          highlights: ['Speedboat ocean ride', 'Welcome drink', 'Beachwalk at sunset'],
          mealsIncluded: ['Dinner'],
          stayName: 'Medhufushi Beach Villa'
        },
        {
          dayNumber: 2,
          title: 'Island Exploration & Complimentary Snorkeling',
          description: 'Wake up to fresh ocean air and enjoy a lavish breakfast. Spend your day snorkeling in the house reef, lounging on powder-white sand beaches, or taking a dip in the infinity pool.',
          highlights: ['Coral reef snorkeling', 'Infinity pool relaxation'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Medhufushi Beach Villa'
        },
        {
          dayNumber: 3,
          title: 'Leisure Day & Sunset Dolphin Cruise (Optional)',
          description: 'Relax at your own pace. Opt for a soothing spa treatment or join an exciting sunset dolphin cruise into deep waters to spot wild spinner dolphins.',
          highlights: ['Spa pampering', 'Dolphin watching'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Medhufushi Beach Villa'
        },
        {
          dayNumber: 4,
          title: 'Check-out & Farewell Maldives',
          description: 'Savor your final breakfast overlooking the lagoon. Board the speedboat back to Male Airport for your return flight with unforgettable memories.',
          highlights: ['Final beach photo-op', 'Speedboat airport transfer'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },
    {
      id: 'mld-02',
      title: 'Centara Ras Fushi Resort | Romantic Honeymoon Water Villa Special',
      destinationId: 'maldives',
      destinationName: 'Maldives',
      duration: '4 Days & 3 Nights',
      nights: 3,
      days: 4,
      originalPrice: 88000,
      discountedPrice: 54500,
      discountPercent: 38,
      rating: 4.9,
      reviewCount: 98,
      imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Honeymoon',
      resortName: 'Centara Ras Fushi Resort & Spa',
      resortCategory: 'Mid-Range',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Kochi', 'Hyderabad', 'Kolkata'],
      inclusions: ['Overwater Villa Stay', 'All-Inclusive Meal Plan (Breakfast, Lunch, Dinner & Beverages)', 'Complimentary Candlelight Beach Dinner', 'Honeymoon Cake & Bed Decoration', 'Speedboat Transfer'],
      exclusions: ['Airfare', 'Scuba Diving Certification'],
      bestseller: true,
      honeymoonSpecial: true,
      cancellationPolicy: 'Free cancellation up to 21 days before arrival.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Male Arrival & Overwater Villa Check-in',
          description: 'Arrive at Male Airport and transfer via speedboat to adult-only Centara Ras Fushi. Step directly into your luxurious Overwater Villa with direct lagoon access.',
          highlights: ['Overwater villa check-in', 'Honeymoon welcome hamper'],
          mealsIncluded: ['Dinner'],
          stayName: 'Deluxe Water Villa'
        },
        {
          dayNumber: 2,
          title: 'Water Sports & Lagoon Floating Breakfast',
          description: 'Indulge in a romantic floating breakfast in your ocean hammock pool. Spend afternoon kayaking or paddleboarding in crystal calm waters.',
          highlights: ['Floating breakfast', 'Lagoon paddleboarding'],
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          stayName: 'Deluxe Water Villa'
        },
        {
          dayNumber: 3,
          title: 'Couples Spa & Candlelight Beach Dinner',
          description: 'Enjoy a 60-minute couples Balinese massage at SPA Cenvaree. In the evening, walk down a candlelit pathway on the private beach for a romantic 4-course dinner under the stars.',
          highlights: ['Couples spa massage', 'Private beach candlelight dinner'],
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          stayName: 'Deluxe Water Villa'
        },
        {
          dayNumber: 4,
          title: 'Speedboat Departure to Male',
          description: 'Enjoy breakfast over the ocean before taking your speedboat transfer back to Male Airport for departure.',
          highlights: ['Lagoon breakfast', 'Airport transfer'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },
    {
      id: 'mld-03',
      title: 'Taj Exotica Resort & Spa | Ultra-Luxury Private Island Escape',
      destinationId: 'maldives',
      destinationName: 'Maldives',
      duration: '5 Days & 4 Nights',
      nights: 4,
      days: 5,
      originalPrice: 165000,
      discountedPrice: 107000,
      discountPercent: 35,
      rating: 5.0,
      reviewCount: 64,
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Luxury',
      resortName: 'Taj Exotica Resort & Spa',
      resortCategory: 'Ultra-Luxury',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai'],
      inclusions: ['Premium Ocean Villa with Private Pool', '24/7 Dedicated Butler Service', 'All-Inclusive Gourmet Dining & Fine Wines', 'Luxury Speedboat Transfer', 'Sunset Yacht Cruise'],
      exclusions: ['Flights (Can be added on request)'],
      bestseller: false,
      honeymoonSpecial: true,
      cancellationPolicy: '100% Refundable up to 30 days prior.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Royal VIP Welcome at Taj Exotica',
          description: 'Private luxury speedboat transfer from Male Airport to Emboodhu Finolhu lagoon. Check into your Ocean Suite with private infinity plunge pool.',
          highlights: ['VIP butler greeting', 'Private pool suite'],
          mealsIncluded: ['Dinner'],
          stayName: 'Ocean Suite with Pool'
        },
        {
          dayNumber: 2,
          title: 'Private Lagoon Snorkeling & Jiva Grande Spa',
          description: 'Snorkel alongside giant sea turtles and rays. Rejuvenate at the award-winning Jiva Spa floating over the lagoon.',
          highlights: ['Sea turtle snorkeling', 'Jiva Spa massage'],
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          stayName: 'Ocean Suite with Pool'
        },
        {
          dayNumber: 3,
          title: 'Private Sunset Yacht Cruise & Champagne',
          description: 'Board a luxury yacht for a private sunset cruise across the Indian Ocean with champagne and canopy snacks.',
          highlights: ['Private yacht sunset cruise', 'Champagne toast'],
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          stayName: 'Ocean Suite with Pool'
        },
        {
          dayNumber: 4,
          title: 'Sandbank Picnic Experience',
          description: 'Taken by speedboat to a deserted sandbank in the middle of the ocean for an exclusive gourmet picnic.',
          highlights: ['Sandbank island picnic', 'Underwater camera session'],
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          stayName: 'Ocean Suite with Pool'
        },
        {
          dayNumber: 5,
          title: 'Departure Transfer',
          description: 'Farewell breakfast and luxury transfer to Male Airport for flight home.',
          highlights: ['Luxury speedboat transfer'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },

    // Bali Packages
    {
      id: 'bli-01',
      title: 'Romantic Bali: Ubud Jungle Private Pool Villa & Seminyak Beach Stay',
      destinationId: 'bali',
      destinationName: 'Bali',
      duration: '5 Days & 4 Nights',
      nights: 4,
      days: 5,
      originalPrice: 32000,
      discountedPrice: 19800,
      discountPercent: 38,
      rating: 4.8,
      reviewCount: 210,
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'],
      category: 'Honeymoon',
      resortName: 'Ubud Tropical Resort & Seminyak Beach Hotel',
      resortCategory: 'Mid-Range',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'],
      inclusions: ['2N Ubud Jungle Villa with Private Pool', '2N Seminyak Beachfront Resort', 'Floating Breakfast in Ubud', 'Nusa Penida West Island Speedboat Tour', 'Kintamani Volcano & Coffee Plantation Tour', 'Private AC Car for Transfers'],
      exclusions: ['Bali Visa Fee (~IDR 500,000)', 'Flight Tickets'],
      bestseller: true,
      honeymoonSpecial: true,
      cancellationPolicy: 'Free cancellation up to 10 days before trip.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Bali & Transfer to Ubud Jungle Villa',
          description: 'Arrive at Denpasar Airport (DPS). Private driver transfers you through lush countryside to your Ubud Jungle Villa. Enjoy evening candlelit garden dinner.',
          highlights: ['Private driver pickup', 'Jungle villa pool'],
          mealsIncluded: ['Dinner'],
          stayName: 'Ubud Private Pool Villa'
        },
        {
          dayNumber: 2,
          title: 'Floating Breakfast, Bali Swing & Tegallalang Rice Terraces',
          description: 'Enjoy iconic Balinese floating breakfast in your villa pool. Visit Tegallalang Rice Terraces, take breathtaking Bali Swing photos, and taste Luwak Coffee.',
          highlights: ['Floating breakfast', 'Bali swing experience', 'Rice terrace photoshoot'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Ubud Private Pool Villa'
        },
        {
          dayNumber: 3,
          title: 'Nusa Penida Island Tour (Kelingking Beach & Broken Beach)',
          description: 'Fast boat ride to Nusa Penida Island. Visit famous T-Rex shaped Kelingking Cliff, Broken Beach, and Angel’s Billabong with crystal swimming.',
          highlights: ['Kelingking T-Rex cliff', 'Angels Billabong swim', 'Fastboat cruise'],
          mealsIncluded: ['Breakfast', 'Lunch'],
          stayName: 'Seminyak Beach Resort'
        },
        {
          dayNumber: 4,
          title: 'Uluwatu Sunset Temple & Kecak Fire Dance',
          description: 'Relax at Seminyak Beach Club in the morning. Visit clifftop Uluwatu Temple in the evening to witness traditional Kecak Fire Dance at sunset.',
          highlights: ['Seminyak beach club', 'Uluwatu cliff temple', 'Kecak fire dance'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Seminyak Beach Resort'
        },
        {
          dayNumber: 5,
          title: 'Souvenir Shopping & Airport Departure',
          description: 'Visit Ubud souvenir market for wooden crafts and coffee beans. Transfer to DPS Airport for flight home.',
          highlights: ['Balinese market shopping', 'Airport drop'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },

    // Dubai Packages
    {
      id: 'dxb-01',
      title: 'Dubai Extravaganza: Burj Khalifa 124th Floor, Desert Safari & Marina Cruise',
      destinationId: 'dubai',
      destinationName: 'Dubai',
      duration: '5 Days & 4 Nights',
      nights: 4,
      days: 5,
      originalPrice: 52000,
      discountedPrice: 34500,
      discountPercent: 33,
      rating: 4.8,
      reviewCount: 340,
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'],
      category: 'Family',
      resortName: 'Rove Downtown / Novotel Hotel',
      resortCategory: 'Mid-Range',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Ahmedabad', 'Kochi', 'Hyderabad'],
      inclusions: ['4 Nights 4-Star Hotel Stay', 'Daily Buffet Breakfast', 'Burj Khalifa At the Top 124th Floor Entry', 'Premium Desert Safari with 4x4 Dune Bashing & BBQ', 'Dubai Marina Dhow Cruise Dinner', 'Miracle Garden & Global Village Tickets', 'UAE Tourist Visa'],
      exclusions: ['Tourism Dirham Tax (~15 AED/night)', 'Personal Shopping'],
      bestseller: true,
      honeymoonSpecial: false,
      cancellationPolicy: 'Free cancellation up to 14 days prior.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Dubai & Marina Dhow Cruise Dinner',
          description: 'Land at Dubai Airport (DXB). Private hotel transfer. In the evening, board a traditional wooden Dhow Cruise along glowing Dubai Marina with buffet dinner.',
          highlights: ['Dubai Marina skyline', 'Dhow cruise dinner & Tanoura dance'],
          mealsIncluded: ['Dinner'],
          stayName: '4-Star Downtown Hotel'
        },
        {
          dayNumber: 2,
          title: 'Dubai City Tour & Burj Khalifa 124th Floor Observation Deck',
          description: 'Guided tour covering Dubai Frame, Atlantis Palm photo stop, Dubai Mall, and rise to the 124th floor of Burj Khalifa for panoramic city views.',
          highlights: ['Burj Khalifa 124th floor view', 'Dubai Fountain light show'],
          mealsIncluded: ['Breakfast'],
          stayName: '4-Star Downtown Hotel'
        },
        {
          dayNumber: 3,
          title: 'Desert Safari with 4x4 Dune Bashing & Bedouin BBQ',
          description: 'Afternoon pickup in 4x4 Land Cruiser. Thrilling desert dune bashing, sandboarding, camel ride, belly dance performance, and BBQ buffet dinner under desert stars.',
          highlights: ['4x4 Dune bashing', 'Camel ride', 'Desert BBQ dinner'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: '4-Star Downtown Hotel'
        },
        {
          dayNumber: 4,
          title: 'Museum of the Future & Global Village / Miracle Garden',
          description: 'Visit the futuristic Museum of the Future. Explore Miracle Garden flower sculptures and multi-country culture pavilions at Global Village.',
          highlights: ['Museum of Future photo', 'Global Village shopping & dining'],
          mealsIncluded: ['Breakfast'],
          stayName: '4-Star Downtown Hotel'
        },
        {
          dayNumber: 5,
          title: 'Gold Souk Shopping & Airport Drop',
          description: 'Morning visit to Gold & Spice Souk in Deira. Transfer to DXB Airport for departure flight.',
          highlights: ['Gold Souk browsing', 'Airport transfer'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },

    // Europe Package
    {
      id: 'eur-01',
      title: 'Grand Europe Highlights: Paris Eiffel Tower, Swiss Alps Mt. Titlis & Venice',
      destinationId: 'europe',
      destinationName: 'Europe',
      duration: '7 Days & 6 Nights',
      nights: 6,
      days: 7,
      originalPrice: 185000,
      discountedPrice: 135200,
      discountPercent: 27,
      rating: 4.9,
      reviewCount: 185,
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'],
      category: 'Luxury',
      resortName: '4-Star Central Hotels (Paris, Zurich, Lucerne, Venice)',
      resortCategory: 'Luxury',
      departureCities: ['Delhi', 'Mumbai', 'Bengaluru'],
      inclusions: ['6 Nights 4-Star Hotel Accommodation', 'Daily Continental Breakfast & 5 Indian Dinners', 'Eiffel Tower 2nd Floor Ticket', 'Seine River Cruise in Paris', 'Mt. Titlis Revolving Cable Car & Ice Flyer Ticket in Switzerland', 'Swiss Pass First Class Rail Travel', 'Venice Gondola Ride', 'Schengen Visa Documentation Assistance'],
      exclusions: ['Schengen Visa VFS Fee', 'City Tourist Tax'],
      bestseller: true,
      honeymoonSpecial: true,
      cancellationPolicy: 'Free cancellation up to 30 days before travel.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Paris - The City of Lights',
          description: 'Arrive at Paris CDG Airport. Transfer to hotel. Evening romantic Seine River Cruise passing Illuminated Notre Dame & Eiffel Tower.',
          highlights: ['Seine river illumination cruise', 'Paris welcome dinner'],
          mealsIncluded: ['Dinner'],
          stayName: 'Novotel Paris Centre'
        },
        {
          dayNumber: 2,
          title: 'Paris City Tour & Eiffel Tower 2nd Floor Access',
          description: 'Guided city tour: Arc de Triomphe, Champs Élysées, Louvre Pyramid, and ascend Eiffel Tower for panoramic view of Paris.',
          highlights: ['Eiffel tower ascent', 'Louvre photoshoot'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Novotel Paris Centre'
        },
        {
          dayNumber: 3,
          title: 'High-Speed TGV Train to Scenic Switzerland (Zurich)',
          description: 'Board high-speed TGV train across French countryside into Switzerland. Check into Zurich hotel near Lake Zurich.',
          highlights: ['TGV bullet train ride', 'Lake Zurich evening stroll'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Mövenpick Zurich'
        },
        {
          dayNumber: 4,
          title: 'Mt. Titlis Snow Glacier Excursion & Lucerne Tour',
          description: 'Ascend Mt. Titlis on Rotair world’s first revolving cable car to 3,020 meters. Walk Cliff Walk suspension bridge. Visit Chapel Bridge in Lucerne.',
          highlights: ['Mt Titlis snow peak', 'Rotair cable car', 'Lucerne chapel bridge'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Mövenpick Zurich'
        },
        {
          dayNumber: 5,
          title: 'Scenic Train to Venice, Italy & Gondola Ride',
          description: 'Travel through Swiss Alps into Italy. Arrive in Venice water city. Private romantic gondola ride through historic canals.',
          highlights: ['Alps scenic train', 'Venetian gondola ride'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Crowne Plaza Venice'
        },
        {
          dayNumber: 6,
          title: 'St. Mark Square & Venice Glassblowing Demonstration',
          description: 'Visit St. Mark Basilica, Doge Palace, Rialto Bridge, and watch live Murano glassblowing art demonstration.',
          highlights: ['St Marks Square', 'Glassblowing workshop'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Crowne Plaza Venice'
        },
        {
          dayNumber: 7,
          title: 'Farewell Europe & Flight Return',
          description: 'Breakfast and airport transfer for return flight back home.',
          highlights: ['Airport transfer'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    },

    // Kashmir Package
    {
      id: 'ksh-01',
      title: 'Magical Kashmir: Houseboat Stay, Gulmarg Gondola & Pahalgam Valley',
      destinationId: 'kashmir',
      destinationName: 'Kashmir',
      duration: '5 Days & 4 Nights',
      nights: 4,
      days: 5,
      originalPrice: 28000,
      discountedPrice: 16800,
      discountPercent: 40,
      rating: 4.8,
      reviewCount: 310,
      imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80'],
      category: 'Budget',
      resortName: 'Dal Lake Luxury Houseboat & Grand Mumtaz Hotel Gulmarg',
      resortCategory: 'Budget',
      departureCities: ['Delhi', 'Mumbai', 'Chandigarh', 'Amritsar', 'Bengaluru', 'Kolkata'],
      inclusions: ['1 Night Luxury Wooden Houseboat Stay on Dal Lake', '3 Nights 4-Star Hotel Stay in Gulmarg & Pahalgam', 'Daily Breakfast & Dinner', 'Shikara Ride on Dal Lake', 'Gulmarg Gondola Phase-1 Cable Car Ticket', 'Private AC Sedan / SUV for Sightseeing'],
      exclusions: ['Pony rides in Pahalgam', 'Union Taxi at Sonamarg'],
      bestseller: true,
      honeymoonSpecial: true,
      cancellationPolicy: 'Free cancellation up to 7 days before travel.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Srinagar Arrival & Dal Lake Houseboat Check-in',
          description: 'Arrive at Srinagar Airport (SXR). Transfer to Dal Lake. Board traditional wooden houseboat. Enjoy 1-hour sunset Shikara ride around floating gardens and lotus lakes.',
          highlights: ['Dal Lake houseboat stay', 'Sunset Shikara ride'],
          mealsIncluded: ['Dinner'],
          stayName: 'Deluxe Heritage Houseboat'
        },
        {
          dayNumber: 2,
          title: 'Srinagar to Gulmarg Snow Meadows & Gondola Ride',
          description: 'Drive to Gulmarg meadow of flowers. Take world second-highest Gulmarg Gondola cable car up to Phase-1 (Kungdoor) for snow activities.',
          highlights: ['Gulmarg Gondola ride', 'Snow sledding'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Hotel Grand Mumtaz Gulmarg'
        },
        {
          dayNumber: 3,
          title: 'Gulmarg to Pahalgam Valley of Shepherds',
          description: 'Drive to Pahalgam via saffron fields of Pampore and Awantipora ruins. Visit Betaab Valley, Aru Valley and Chandanwari.',
          highlights: ['Betaab valley photoshoot', 'Saffron field visit'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Hotel Mount View Pahalgam'
        },
        {
          dayNumber: 4,
          title: 'Mughal Gardens of Srinagar (Shalimar & Nishat Bagh)',
          description: 'Return to Srinagar. Visit famous Mughal Terraced Gardens: Shalimar Bagh, Nishat Bagh, and Chashme Shahi with royal fountains.',
          highlights: ['Mughal gardens tour', 'Kashmiri handicraft shopping'],
          mealsIncluded: ['Breakfast', 'Dinner'],
          stayName: 'Hotel Pine Spring Srinagar'
        },
        {
          dayNumber: 5,
          title: 'Dry Fruits Shopping & Srinagar Airport Drop',
          description: 'Buy fresh Kashmiri almonds, walnuts & saffron. Driver drops you at SXR Airport for departure.',
          highlights: ['Kashmiri saffron shopping', 'Airport drop'],
          mealsIncluded: ['Breakfast'],
          stayName: 'Check-out'
        }
      ]
    }
  ];

  constructor() {}

  getDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationById(id: string): Destination | undefined {
    return this.destinations.find(d => d.id === id);
  }

  getPackages(): TourPackage[] {
    return this.packages;
  }

  getPackageById(id: string): TourPackage | undefined {
    return this.packages.find(p => p.id === id);
  }

  setActiveDestination(destinationId: string) {
    this.activeDestinationIdSubject.next(destinationId);
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setCategory(category: string) {
    this.activeCategorySubject.next(category);
  }

  setDepartureCity(city: string) {
    this.activeDepartureCitySubject.next(city);
  }

  setDuration(duration: string) {
    this.activeDurationSubject.next(duration);
  }

  setSortBy(sort: string) {
    this.sortBySubject.next(sort);
  }

  getFilteredPackages(
    destId: string,
    query: string,
    category: string,
    city: string,
    duration: string,
    sort: string
  ): TourPackage[] {
    let result = [...this.packages];

    if (destId && destId !== 'all') {
      result = result.filter(p => p.destinationId === destId);
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.destinationName.toLowerCase().includes(q) ||
        p.resortName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (city && city !== 'all') {
      result = result.filter(p => p.departureCities.includes(city));
    }

    if (duration && duration !== 'all') {
      if (duration === '3-4') {
        result = result.filter(p => p.days <= 4);
      } else if (duration === '5-7') {
        result = result.filter(p => p.days >= 5 && p.days <= 7);
      } else if (duration === '8+') {
        result = result.filter(p => p.days >= 8);
      }
    }

    if (sort === 'price-low') {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }
}
