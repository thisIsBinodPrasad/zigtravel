import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { Destination, ResortTier } from '../../models/destination.model';

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.css']
})
export class CostCalculatorComponent implements OnInit, OnDestroy {
  destinations: Destination[] = [];
  selectedDestId = 'maldives';
  activeDestination: Destination | null = null;
  selectedTierIndex = 1; // 0: Budget, 1: Mid-Range, 2: Luxury

  // Dynamic Estimator Controls
  numDays = 4;
  numGuests = 2;

  private sub!: Subscription;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinations = this.destinationService.getDestinations();
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      if (id !== 'all') {
        this.selectedDestId = id;
      }
      this.updateActiveDestination();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onDestSelect(id: string) {
    this.selectedDestId = id;
    this.updateActiveDestination();
  }

  updateActiveDestination() {
    this.activeDestination = this.destinationService.getDestinationById(this.selectedDestId) || this.destinations[0];
  }

  calculateEstimatedCost(): number {
    let perPersonPerNight = 8000; // default base
    if (this.selectedTierIndex === 0) perPersonPerNight = 5500;
    if (this.selectedTierIndex === 1) perPersonPerNight = 13500;
    if (this.selectedTierIndex === 2) perPersonPerNight = 32000;

    return perPersonPerNight * this.numDays * this.numGuests;
  }
}
