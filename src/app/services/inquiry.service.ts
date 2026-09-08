import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeadInquiry } from '../models/inquiry.model';
import { TourPackage } from '../models/package.model';

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

  submitInquiry(inquiry: LeadInquiry): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = this.submissionsSubject.value;
        this.submissionsSubject.next([...current, inquiry]);
        resolve(true);
      }, 600);
    });
  }
}
