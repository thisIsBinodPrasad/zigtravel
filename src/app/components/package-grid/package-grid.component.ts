import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { InquiryService } from '../../services/inquiry.service';
import { TourPackage } from '../../models/package.model';

@Component({
  selector: 'app-package-grid',
  templateUrl: './package-grid.component.html',
  styleUrls: ['./package-grid.component.css']
})
export class PackageGridComponent implements OnInit, OnDestroy {
  packages: TourPackage[] = [];
  selectedPackageForModal: TourPackage | null = null;
  isDetailModalOpen = false;

  private sub!: Subscription;

  constructor(
    private destinationService: DestinationService,
    private inquiryService: InquiryService
  ) {}

  ngOnInit() {
    this.sub = combineLatest([
      this.destinationService.activeDestinationId$,
      this.destinationService.searchQuery$,
      this.destinationService.activeCategory$,
      this.destinationService.activeDepartureCity$,
      this.destinationService.activeDuration$,
      this.destinationService.sortBy$
    ]).subscribe(([destId, query, category, city, duration, sort]) => {
      this.packages = this.destinationService.getFilteredPackages(
        destId,
        query,
        category,
        city,
        duration,
        sort
      );
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  openPackageDetail(pkg: TourPackage) {
    this.selectedPackageForModal = pkg;
    this.isDetailModalOpen = true;
  }

  closePackageDetail() {
    this.isDetailModalOpen = false;
    this.selectedPackageForModal = null;
  }

  openInquiry(pkg: TourPackage) {
    this.inquiryService.openModal(pkg);
  }

  resetFilters() {
    this.destinationService.setActiveDestination('all');
    this.destinationService.setSearchQuery('');
    this.destinationService.setCategory('all');
    this.destinationService.setDepartureCity('all');
    this.destinationService.setDuration('all');
  }
}
