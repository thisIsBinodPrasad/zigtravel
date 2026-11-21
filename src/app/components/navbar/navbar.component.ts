import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService, Region } from '../../services/destination.service';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  activeRegion: Region = 'all';
  private activeDestinationId = 'all';
  private subs = new Subscription();

  tabs: { id: Region; label: string; icon: string }[] = [
    { id: 'all', label: 'All Trips', icon: 'ri-compass-3-line' },
    { id: 'International', label: 'International', icon: 'ri-earth-line' },
    { id: 'Domestic', label: 'Domestic', icon: 'ri-map-pin-2-line' }
  ];

  constructor(
    private destinationService: DestinationService,
    private inquiryService: InquiryService
  ) {}

  ngOnInit() {
    this.subs.add(this.destinationService.activeRegion$.subscribe(r => (this.activeRegion = r)));
    this.subs.add(this.destinationService.activeDestinationId$.subscribe(id => (this.activeDestinationId = id)));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  selectRegion(region: Region) {
    this.destinationService.setRegion(region);
    this.isMobileMenuOpen = false;
    document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openGeneralInquiry() {
    this.inquiryService.openModal(undefined, this.activeDestinationId);
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
