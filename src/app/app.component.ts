import { Component, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ZigoHolidays | Global Tour Packages';

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'ZigoHolidays | Global Tour Packages & Luxury Holidays (Up to 40% OFF)',
      description: 'Book 500+ curated global tour packages for Maldives, Bali, Dubai, Thailand, Europe, Kashmir, Kerala & more. Best price guarantee, 24/7 support & free visa assistance.',
      keywords: 'Maldives tour packages, Bali honeymoon packages, Dubai deals, Europe tours, Kashmir houseboats, Kerala backwaters, travel booking'
    });
  }
}
