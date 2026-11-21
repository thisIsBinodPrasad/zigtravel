import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeadInquiry } from '../models/inquiry.model';
import { TourPackage } from '../models/package.model';
import { GOOGLE_FORM } from '../config/contact.config';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpenSubject.asObservable();

  private selectedPackageSubject = new BehaviorSubject<TourPackage | null>(null);
  selectedPackage$ = this.selectedPackageSubject.asObservable();

  private selectedDestinationIdSubject = new BehaviorSubject<string>('maldives');
  selectedDestinationId$ = this.selectedDestinationIdSubject.asObservable();

  private submissionsSubject = new BehaviorSubject<LeadInquiry[]>([]);
  submissions$ = this.submissionsSubject.asObservable();

  openModal(pkg?: TourPackage, destinationId?: string) {
    if (pkg) {
      this.selectedPackageSubject.next(pkg);
      this.selectedDestinationIdSubject.next(pkg.destinationId);
    } else if (destinationId) {
      this.selectedDestinationIdSubject.next(destinationId);
      this.selectedPackageSubject.next(null);
    }
    this.isModalOpenSubject.next(true);
  }

  closeModal() {
    this.isModalOpenSubject.next(false);
  }

  /**
   * Sends the lead to the Google Form (which notifies Sales@ and info@ via the
   * Apps Script in docs/google-form-setup.md). Google Forms does not return CORS
   * headers, so the request is fire-and-forget (no-cors) and resolves once sent.
   */
  async submitInquiry(inquiry: LeadInquiry): Promise<boolean> {
    this.submissionsSubject.next([...this.submissionsSubject.value, inquiry]);

    const { actionUrl, entries: e } = GOOGLE_FORM;
    if (!actionUrl || !e.fullName) {
      console.warn('Google Form is not configured (src/app/config/contact.config.ts); lead was not stored.');
      return true;
    }

    const body = new URLSearchParams();
    body.set(e.fullName, inquiry.fullName);
    body.set(e.phone, inquiry.phone);
    body.set(e.email, inquiry.email || '');
    body.set(e.trip, inquiry.packageTitle || inquiry.destinationId);
    body.set(e.departureCity, inquiry.departureCity);
    body.set(e.travelMonth, inquiry.travelMonth);
    body.set(e.guests, `${inquiry.adultsCount} Adult(s), ${inquiry.childrenCount} Child(ren)`);
    body.set(e.requirements, inquiry.customRequests || '');

    try {
      await fetch(actionUrl, { method: 'POST', mode: 'no-cors', body });
      return true;
    } catch (err) {
      console.error('Google Form submission failed', err);
      return false;
    }
  }
}
