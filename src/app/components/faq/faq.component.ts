import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  openIndex = 0;

  faqs = [
    {
      q: 'How does booking with ZigoHolidays work?',
      a: 'Simply choose your destination package, customize your dates and travelers, and click "Get Quote" or "Request Callback". Our travel specialist will connect with you via WhatsApp/Call within 15 minutes to share tailored PDF itineraries, price options, and secure booking links.'
    },
    {
      q: 'Are international flight tickets included in the packages?',
      a: 'Packages can be booked either as Land-Only (resorts + transfers + meals) or With-Flights. We partner directly with IndiGo, Air India, Emirates, Singapore Airlines, and Batik Air to offer discounted airfares from your departure city.'
    },
    {
      q: 'Do you provide Visa guidance for Maldives, Bali, Dubai & Europe?',
      a: 'Yes! We provide 100% end-to-end visa assistance. For Maldives and Thailand (Free Visa on Arrival / IMUGA assistance), Bali (E-VOA portal guide), Dubai (48h UAE E-Visa), and Europe (Complete Schengen VFS appointment & documentation check).'
    },
    {
      q: 'Can itineraries be customized according to budget or preferences?',
      a: 'Absolutely! Every itinerary is 100% customizable. You can extend stay duration, switch from Beach Villa to Overwater Villa, add candlelit beach dinners, or include water sports like parasailing, scuba diving, and helicopter tours.'
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'We offer flexible cancellation policies on all packages. Most resort bookings allow 100% free cancellation up to 14 to 30 days prior to departure.'
    }
  ];

  toggleFaq(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index;
  }
}
