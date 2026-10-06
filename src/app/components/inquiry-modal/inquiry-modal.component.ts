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

  whatsappUrl = '';
  mailtoUrl = '';

  onSubmit() {
    if (!this.formData.fullName || !this.formData.phone) {
      alert('Please provide your full name and contact number.');
      return;
    }

    this.isSubmitting = true;

    // Generate formatted inquiry text for WhatsApp & Mail
    const pkgText = this.selectedPackage ? `Package: ${this.selectedPackage.title}` : `Destination: ${this.formData.destinationId.toUpperCase()}`;
    const message = `*NEW TRIP CUSTOMIZATION REQUEST*\n\n` +
      `👤 *Customer Name:* ${this.formData.fullName}\n` +
      `📞 *Contact Number:* ${this.formData.phone}\n` +
      `✉️ *Mail ID:* ${this.formData.email || 'Not Provided'}\n\n` +
      `📍 *Trip Info:* ${pkgText}\n` +
      `✈️ *Departure City:* ${this.formData.departureCity}\n` +
      `📅 *Travel Month:* ${this.formData.travelMonth}\n` +
      `👥 *Guests:* ${this.formData.adultsCount} Adult(s), ${this.formData.childrenCount} Child(ren)\n\n` +
      `📝 *Requirement Details:* ${this.formData.customRequests || 'Standard Customization'}`;

    const encodedMsg = encodeURIComponent(message);
    this.whatsappUrl = `https://wa.me/918970034810?text=${encodedMsg}`;
    this.mailtoUrl = `mailto:info@zigoholidays.com?subject=Trip Customization Request from ${encodeURIComponent(this.formData.fullName)}&body=${encodedMsg}`;

    this.inquiryService.submitInquiry(this.formData).then(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;

      // Automatically open WhatsApp in new tab for immediate delivery
      try {
        window.open(this.whatsappUrl, '_blank');
      } catch (e) {
        console.log('Window popup blocked', e);
      }
    });
  }

  openWhatsAppDirect() {
    if (this.whatsappUrl) {
      window.open(this.whatsappUrl, '_blank');
    } else {
      window.open('https://wa.me/918970034810?text=Hi%20ZigoHolidays,%20I%20want%20to%20get%20my%20trip%20customized', '_blank');
    }
  }

  openMailDirect() {
    if (this.mailtoUrl) {
      window.location.href = this.mailtoUrl;
    } else {
      window.location.href = 'mailto:info@zigoholidays.com?subject=Trip%20Customization%20Request';
    }
  }
}
