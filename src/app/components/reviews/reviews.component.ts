import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    {
      name: 'Sai Nandigam & Wife',
      trip: 'Maldives Overwater Vacation',
      duration: '4 Days & 3 Nights',
      stay: 'Holiday Inn Resort Kandooma, Maldives',
      rating: 5,
      comment: 'Booking through ZigoHolidays was the best decision! Speedboat transfers were seamlessly arranged on arrival at Male, villa view was breathtaking, and the team provided 24/7 WhatsApp guidance.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      name: 'Kaviraj Poojary',
      trip: 'Bali Private Pool Villa Tour',
      duration: '5 Days & 4 Nights',
      stay: 'The Kayon Jungle Resort, Ubud',
      rating: 5,
      comment: 'From floating breakfast in Ubud to fast boat ride to Nusa Penida T-Rex cliff, everything was perfectly paced. The driver in Bali was so courteous!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      name: 'Priya & Ankit Sharma',
      trip: 'Grand Europe Highlights',
      duration: '7 Days & 6 Nights',
      stay: 'Paris, Zurich & Venice 4-Star Hotels',
      rating: 5,
      comment: 'Schengen visa assistance was super fast. Eiffel tower tickets and Mt. Titlis cable car were pre-booked, saving us hours of waiting in line. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      verified: true
    }
  ];
}
