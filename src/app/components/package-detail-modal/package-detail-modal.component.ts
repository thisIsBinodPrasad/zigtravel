import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TourPackage } from '../../models/package.model';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-package-detail-modal',
  templateUrl: './package-detail-modal.component.html',
  styleUrls: ['./package-detail-modal.component.css']
})
export class PackageDetailModalComponent implements OnInit {
  @Input() pkg!: TourPackage;
  @Output() closeModal = new EventEmitter<void>();

  activeTab: 'itinerary' | 'inclusions' | 'calculator' = 'itinerary';
  expandedDay = 1;

  // Live Add-on Estimator state
  adultsCount = 2;
  childrenCount = 0;
  selectedDepartureCity = 'Delhi';

  addOnSeaplane = false;
  addOnDinner = true;
  addOnSpa = false;

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    if (this.pkg && this.pkg.departureCities.length > 0) {
      this.selectedDepartureCity = this.pkg.departureCities[0];
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  toggleDay(dayNumber: number) {
    this.expandedDay = this.expandedDay === dayNumber ? 0 : dayNumber;
  }

  calculateTotalPrice(): number {
    let basePerPerson = this.pkg.discountedPrice;
    let total = basePerPerson * this.adultsCount + (basePerPerson * 0.6) * this.childrenCount;

    if (this.addOnSeaplane) {
      total += 18500 * (this.adultsCount + this.childrenCount);
    }
    if (this.addOnDinner) {
      total += 4500;
    }
    if (this.addOnSpa) {
      total += 6000 * this.adultsCount;
    }

    return Math.round(total);
  }

  proceedToInquiry() {
    this.onClose();
    this.inquiryService.openModal(this.pkg);
  }
}
