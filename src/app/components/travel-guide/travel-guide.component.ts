import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { InquiryService } from '../../services/inquiry.service';
import { Destination } from '../../models/destination.model';

export interface SeasonalPlace {
  id: string;
  name: string;
  location: string;
  type: 'Domestic' | 'International';
  image: string;
  months: string;
  temperature: string;
  weatherHighlights: string;
  whyVisit: string;
  badge: string;
  recommendedDuration: string;
}

@Component({
  selector: 'app-travel-guide',
  templateUrl: './travel-guide.component.html',
  styleUrls: ['./travel-guide.component.css']
})
export class TravelGuideComponent implements OnInit, OnDestroy {
  destinations: Destination[] = [];
  selectedDestId = 'maldives';
  activeDestination: Destination | null = null;
  
  // Seasonal Tab Selection
  activeSeason: 'peak' | 'shoulder' | 'monsoon' = 'peak';
  activeCategoryFilter: 'all' | 'domestic' | 'international' = 'all';

  seasonalData: Record<'peak' | 'shoulder' | 'monsoon', { title: string; subtitle: string; places: SeasonalPlace[] }> = {
    peak: {
      title: 'Peak Dry Season (Optimal Weather)',
      subtitle: 'Clear blue skies, sunny beaches, calm seas & prime outdoor sightseeing weather.',
      places: [
        // Domestic
        {
          id: 'kashmir',
          name: 'Kashmir (Gulmarg & Dal Lake)',
          location: 'Jammu & Kashmir, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
          months: 'Dec - Mar',
          temperature: '-5°C to 10°C',
          weatherHighlights: 'Crisp winter snow, clear mountain air & frozen lake landscapes',
          whyVisit: 'White snow slopes for skiing in Gulmarg, Shikara rides on Dal Lake & cozy houseboats.',
          badge: 'Winter Snow Wonderland',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'goa',
          name: 'Goa Beaches & Nightlife',
          location: 'Goa, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          months: 'Nov - Feb',
          temperature: '22°C to 31°C',
          weatherHighlights: 'Sun-kissed beaches, low humidity & ideal sea swimming weather',
          whyVisit: 'Water sports at Calangute, beach shacks, Dudhsagar falls & heritage Latin quarter tours.',
          badge: 'Sun & Beach Paradise',
          recommendedDuration: '4 Days & 3 Nights'
        },
        {
          id: 'andaman',
          name: 'Andaman & Nicobar Islands',
          location: 'Andaman, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
          months: 'Oct - May',
          temperature: '24°C to 30°C',
          weatherHighlights: 'Turquoise transparent waters, calm ocean & excellent underwater visibility',
          whyVisit: 'Scuba diving & snorkeling in Havelock, Radhanagar sunset & Cellular Jail light show.',
          badge: 'Coral Reef Snorkeling',
          recommendedDuration: '6 Days & 5 Nights'
        },
        {
          id: 'rajasthan',
          name: 'Udaipur & Jaipur Palaces',
          location: 'Rajasthan, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          months: 'Nov - Mar',
          temperature: '14°C to 26°C',
          weatherHighlights: 'Pleasant daytime sunshine & cool desert evening breeze',
          whyVisit: 'Lake Pichola sunset boat ride, Amber Fort elephant safari & desert cultural nights.',
          badge: 'Royal Palace Heritage',
          recommendedDuration: '5 Days & 4 Nights'
        },
        // International
        {
          id: 'nz',
          name: 'New Zealand (Queenstown & Fjords)',
          location: 'New Zealand',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
          months: 'Dec - Feb',
          temperature: '18°C to 25°C',
          weatherHighlights: 'Southern hemisphere summer, long daylight hours & clear alpine skies',
          whyVisit: 'Milford Sound fjord cruise, Queenstown skyline gondola, Lake Tekapo star gazing.',
          badge: 'Bespoke Adventure',
          recommendedDuration: '8 Days & 7 Nights'
        },
        {
          id: 'maldives',
          name: 'Maldives Private Islands',
          location: 'Maldives',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
          months: 'Nov - Apr',
          temperature: '25°C to 31°C',
          weatherHighlights: 'Zero monsoon rain, crystal lagoons & high coral visibility',
          whyVisit: 'Stay in private overwater pool villas, sandbank picnics & sunset dolphin cruises.',
          badge: 'Overwater Luxury',
          recommendedDuration: '4 Days & 3 Nights'
        },
        {
          id: 'dubai',
          name: 'Dubai & Abu Dhabi',
          location: 'UAE',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
          months: 'Nov - Mar',
          temperature: '20°C to 28°C',
          weatherHighlights: 'Cool winter desert breeze, comfortable outdoor walking weather',
          whyVisit: 'Burj Khalifa 124th floor views, 4x4 dune bashing, Global Village & shopping festival.',
          badge: 'Futuristic Luxury',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'thailand',
          name: 'Phuket & Phi Phi Islands',
          location: 'Thailand',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
          months: 'Nov - Mar',
          temperature: '24°C to 32°C',
          weatherHighlights: 'Calm emerald Andaman sea & sunny island hopping conditions',
          whyVisit: 'Speedboat cruise to Maya Bay, Patong beach nightlife & ethical elephant sanctuaries.',
          badge: 'Tropical Island Hopping',
          recommendedDuration: '5 Days & 4 Nights'
        }
      ]
    },
    shoulder: {
      title: 'Shoulder Season (Best Value & Pleasant Weather)',
      subtitle: 'Enjoy mild pleasant weather, fewer tourist crowds & maximum resort upgrade value.',
      places: [
        // Domestic
        {
          id: 'ladakh',
          name: 'Ladakh High Passes',
          location: 'Ladakh, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
          months: 'May - Jun & Sep - Oct',
          temperature: '10°C to 20°C',
          weatherHighlights: 'Open mountain passes, clear blue skies & comfortable road trips',
          whyVisit: 'Pangong Lake color reflections, Nubra valley double-hump camel safari & Khardung La.',
          badge: 'High Altitude Pass',
          recommendedDuration: '6 Days & 5 Nights'
        },
        {
          id: 'shimla',
          name: 'Shimla & Manali Valleys',
          location: 'Himachal Pradesh, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
          months: 'Apr - Jun & Sep - Nov',
          temperature: '12°C to 24°C',
          weatherHighlights: 'Mild mountain air, apple blossom season & pleasant valley walks',
          whyVisit: 'Solang valley paragliding, Atal Tunnel drive to Lahaul & Mall road strolls.',
          badge: 'Mountain Valley Retreat',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'coorg',
          name: 'Coorg & Ooty Tea Hills',
          location: 'Karnataka / Tamil Nadu, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
          months: 'Sep - Nov & Mar - May',
          temperature: '15°C to 22°C',
          weatherHighlights: 'Misty coffee plantation air & crisp cool mountain breezes',
          whyVisit: 'Abbey Falls, coffee plantation estate stay, Pykara lake boating & Nilgiri toy train.',
          badge: 'Misty Coffee Hills',
          recommendedDuration: '4 Days & 3 Nights'
        },
        {
          id: 'sikkim',
          name: 'Sikkim & Gangtok',
          location: 'Sikkim, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
          months: 'Mar - May & Oct - Nov',
          temperature: '10°C to 18°C',
          weatherHighlights: 'Clear views of Kanchenjunga & blooming rhododendron flowers',
          whyVisit: 'Tsomgo Lake, Nathula Pass border visit & Pelling skywalk.',
          badge: 'Himalayan Panorama',
          recommendedDuration: '5 Days & 4 Nights'
        },
        // International
        {
          id: 'bali',
          name: 'Bali (Ubud & Seminyak)',
          location: 'Indonesia',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
          months: 'Apr - May & Sep - Oct',
          temperature: '26°C to 30°C',
          weatherHighlights: 'Low humidity, pleasant sea breeze & low resort rates',
          whyVisit: 'Floating villa breakfast in Ubud, Nusa Penida T-Rex cliff tour & Uluwatu fire dance.',
          badge: 'Jungle Villa Luxury',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'japan',
          name: 'Japan (Kyoto & Tokyo)',
          location: 'Japan',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
          months: 'Mar - May & Sep - Nov',
          temperature: '14°C to 22°C',
          weatherHighlights: 'Spring cherry blossoms (Sakura) & vibrant red autumn maple leaves',
          whyVisit: 'Bullet train experience, Mt. Fuji panoramas, historic Kyoto shrines & Tokyo bullet towers.',
          badge: 'Cherry Blossom & Autumn',
          recommendedDuration: '7 Days & 6 Nights'
        },
        {
          id: 'europe',
          name: 'Europe (Paris, Swiss Alps & Italy)',
          location: 'France, Switzerland, Italy',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
          months: 'Apr - May & Sep - Oct',
          temperature: '16°C to 24°C',
          weatherHighlights: 'Mild sunny Mediterranean climate & shorter queue lines at historic sights',
          whyVisit: 'Eiffel Tower 2nd floor, Mt. Titlis cable car, Venetian gondola ride & Colosseum in Rome.',
          badge: 'Euro Classic Tour',
          recommendedDuration: '10 Days & 9 Nights'
        },
        {
          id: 'vietnam',
          name: 'Vietnam (Halong Bay & Hoi An)',
          location: 'Vietnam',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
          months: 'Mar - Apr & Sep - Nov',
          temperature: '20°C to 28°C',
          weatherHighlights: 'Calm waters in Halong Bay & pleasant walking temperatures',
          whyVisit: 'Overnight luxury cruise in Halong Bay, lantern night market in Hoi An & Ba Na Hills Golden Bridge.',
          badge: 'Heritage Cruise',
          recommendedDuration: '6 Days & 5 Nights'
        }
      ]
    },
    monsoon: {
      title: 'Monsoon Low Season (Lush Greenery & Huge Savings)',
      subtitle: 'Experience cascading waterfalls, emerald green hills, romantic rains & up to 50% OFF resort rates.',
      places: [
        // Domestic
        {
          id: 'kerala',
          name: 'Kerala Backwaters & Munnar Hills',
          location: 'Kerala, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
          months: 'Jun - Sep',
          temperature: '22°C to 28°C',
          weatherHighlights: 'Lush green tea estates, full backwater rivers & fresh rain air',
          whyVisit: 'Alleppey private houseboat dining in rain, Athirappilly waterfall & traditional Ayurveda spa.',
          badge: 'Ayurveda & Rain Retreat',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'meghalaya',
          name: 'Meghalaya (Cherrapunji & Shillong)',
          location: 'Meghalaya, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
          months: 'Jun - Sep',
          temperature: '18°C to 24°C',
          weatherHighlights: 'Spectacular thunderous waterfalls & mist-covered living root bridges',
          whyVisit: 'Nohkalikai waterfalls, double-decker root bridge trek & crystal clear Dawki river.',
          badge: 'Abode of Clouds',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'flower-valley',
          name: 'Valley of Flowers & Rishikesh',
          location: 'Uttarakhand, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
          months: 'Jul - Sep',
          temperature: '15°C to 22°C',
          weatherHighlights: 'Peak floral bloom season with 500+ species of rare alpine flowers',
          whyVisit: 'Trek through UNESCO World Heritage Valley of Flowers & Ganga Aarti in Rishikesh.',
          badge: 'Alpine Flower Trek',
          recommendedDuration: '6 Days & 5 Nights'
        },
        {
          id: 'udaipur-monsoon',
          name: 'Monsoon Palace Udaipur',
          location: 'Rajasthan, India',
          type: 'Domestic',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          months: 'Jul - Sep',
          temperature: '24°C to 30°C',
          weatherHighlights: 'Cool romantic rains filling Lake Pichola & green Aravalli hills',
          whyVisit: 'Sajjangarh Monsoon Palace hilltop views, Taj Lake Palace photo ops & heritage stays.',
          badge: 'Romantic Monsoon Palace',
          recommendedDuration: '4 Days & 3 Nights'
        },
        // International
        {
          id: 'srilanka',
          name: 'Sri Lanka (Bentota & Hill Country)',
          location: 'Sri Lanka',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
          months: 'May - Sep',
          temperature: '24°C to 29°C',
          weatherHighlights: 'Lush tea country fog, quiet beaches & 45% lower hotel prices',
          whyVisit: 'Ella scenic train ride, Nine Arch Bridge, Kandy Temple of Tooth & Madu river safari.',
          badge: 'Lush Emerald Island',
          recommendedDuration: '6 Days & 5 Nights'
        },
        {
          id: 'phuket-low',
          name: 'Phuket & Krabi 5-Star Spa Deals',
          location: 'Thailand',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
          months: 'Jun - Oct',
          temperature: '25°C to 31°C',
          weatherHighlights: 'Passing tropical rain showers, lush green island forests & mega resort sales',
          whyVisit: 'Luxury 5-star beachfront resorts under ₹4,500/night & rejuvenating Thai massages.',
          badge: '5-Star Resort Savings',
          recommendedDuration: '5 Days & 4 Nights'
        },
        {
          id: 'maldives-low',
          name: 'Maldives Manta Ray Season',
          location: 'Maldives',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
          months: 'May - Oct',
          temperature: '26°C to 30°C',
          weatherHighlights: 'Hanifaru Bay plankton bloom attracting gentle Manta Rays & Whale Sharks',
          whyVisit: 'Snorkeling with Manta Rays, water villa stays with free meal upgrades up to 50% OFF.',
          badge: 'Manta Ray & Whale Shark',
          recommendedDuration: '4 Days & 3 Nights'
        },
        {
          id: 'seychelles',
          name: 'Seychelles (Mahe & Praslin)',
          location: 'Seychelles',
          type: 'International',
          image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
          months: 'May - Sep',
          temperature: '24°C to 28°C',
          weatherHighlights: 'Cooling trade winds, quiet secluded beaches & lush granite island trails',
          whyVisit: 'Anse Source d\'Argent beach boulders, giant tortoises in Curieuse Island & luxury privacy.',
          badge: 'Private Island Sanctuary',
          recommendedDuration: '6 Days & 5 Nights'
        }
      ]
    }
  };

  private sub!: Subscription;

  constructor(
    private destinationService: DestinationService,
    private inquiryService: InquiryService
  ) {}

  ngOnInit() {
    this.destinations = this.destinationService.getDestinations();
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      if (id !== 'all') {
        this.selectedDestId = id;
      }
      this.updateDestination();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  updateDestination() {
    this.activeDestination = this.destinationService.getDestinationById(this.selectedDestId) || this.destinations[0];
  }

  getFilteredPlaces(): SeasonalPlace[] {
    const places = this.seasonalData[this.activeSeason].places;
    if (this.activeCategoryFilter === 'domestic') {
      return places.filter(p => p.type === 'Domestic');
    }
    if (this.activeCategoryFilter === 'international') {
      return places.filter(p => p.type === 'International');
    }
    return places;
  }

  openSeasonalInquiry(place: SeasonalPlace) {
    this.inquiryService.openModal(undefined, place.id);
  }
}
