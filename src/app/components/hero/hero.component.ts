import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { InquiryService } from '../../services/inquiry.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  activeDestination: Destination | null = null;
  activeDestId = 'all';
  private sub!: Subscription;

  // Search Bar Form Model
  searchDepartureCity = 'Delhi';
  searchTravelMonth = 'October 2026';
  searchGuests = 2;
  searchCategory = 'all';

  departureCities = ['Delhi', 'Mumbai', 'Bengaluru', 'Kochi', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad'];
  travelMonths = ['September 2026', 'October 2026', 'November 2026', 'December 2026', 'January 2027'];

  constructor(
    private destinationService: DestinationService,
    private inquiryService: InquiryService
  ) {}

  ngOnInit() {
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      this.activeDestId = id;
      if (id !== 'all') {
        this.activeDestination = this.destinationService.getDestinationById(id) || null;
      } else {
        this.activeDestination = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onSearchSubmit() {
    this.destinationService.setDepartureCity(this.searchDepartureCity);
    this.destinationService.setCategory(this.searchCategory);
    this.inquiryService.openModal(undefined, this.activeDestId === 'all' ? 'maldives' : this.activeDestId);
  }

  openInstantInquiry() {
    this.inquiryService.openModal(undefined, this.activeDestId === 'all' ? 'maldives' : this.activeDestId);
  }
}
