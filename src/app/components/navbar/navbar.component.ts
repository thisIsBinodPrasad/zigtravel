import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  selectedDestination = 'all';
  destinations = [
    { id: 'all', name: '🌍 All Destinations' },
    { id: 'maldives', name: '🏝️ Maldives' },
    { id: 'bali', name: '🌴 Bali' },
    { id: 'dubai', name: '🏙️ Dubai' },
    { id: 'thailand', name: '⛩️ Thailand' },
    { id: 'europe', name: '🏰 Europe' },
    { id: 'kashmir', name: '🏔️ Kashmir' },
    { id: 'kerala', name: '🛶 Kerala' }
  ];

  constructor(
    private destinationService: DestinationService,
    private inquiryService: InquiryService
  ) {}

  onDestinationChange(destId: string) {
    this.selectedDestination = destId;
    this.destinationService.setActiveDestination(destId);
    this.isMobileMenuOpen = false;
  }

  openGeneralInquiry() {
    this.inquiryService.openModal(undefined, this.selectedDestination);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
