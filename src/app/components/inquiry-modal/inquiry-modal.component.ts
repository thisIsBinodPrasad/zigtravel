import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InquiryService } from '../../services/inquiry.service';
import { TourPackage } from '../../models/package.model';
import { LeadInquiry } from '../../models/inquiry.model';

@Component({
  selector: 'app-inquiry-modal',
  templateUrl: './inquiry-modal.component.html',
  styleUrls: ['./inquiry-modal.component.css']
})
export class InquiryModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  selectedPackage: TourPackage | null = null;
  selectedDestinationId = 'maldives';
  isSubmitting = false;
  isSubmitted = false;

  formData: LeadInquiry = {
    fullName: '',
    email: '',
    phone: '',
    destinationId: 'maldives',
    departureCity: 'Delhi',
    travelMonth: 'October 2026',
    adultsCount: 2,
    childrenCount: 0,
    budgetRange: '₹30,000 - ₹60,000 / person',
    customRequests: ''
  };

  departureCities = ['Delhi', 'Mumbai', 'Bengaluru', 'Kochi', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad'];

  private sub1!: Subscription;
  private sub2!: Subscription;

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    this.sub1 = this.inquiryService.isModalOpen$.subscribe(open => {
      this.isOpen = open;
      if (!open) {
        this.isSubmitted = false;
      }
    });

    this.sub2 = this.inquiryService.selectedPackage$.subscribe(pkg => {
      this.selectedPackage = pkg;
      if (pkg) {
        this.formData.packageId = pkg.id;
        this.formData.packageTitle = pkg.title;
        this.formData.destinationId = pkg.destinationId;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

  close() {
    this.inquiryService.closeModal();
  }

  onSubmit() {
    if (!this.formData.fullName || !this.formData.phone) {
      alert('Please provide your name and phone number so our travel specialist can call you.');
      return;
    }

    this.isSubmitting = true;
    this.inquiryService.submitInquiry(this.formData).then(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
    });
  }
}
