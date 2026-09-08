import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-travel-guide',
  templateUrl: './travel-guide.component.html',
  styleUrls: ['./travel-guide.component.css']
})
export class TravelGuideComponent implements OnInit, OnDestroy {
  destinations: Destination[] = [];
  selectedDestId = 'maldives';
  activeDestination: Destination | null = null;
  activeTab: 'seasons' | 'flights' | 'visa' = 'seasons';

  private sub!: Subscription;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinations = this.destinationService.getDestinations();
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      if (id !== 'all') {
        this.selectedDestId = id;
      }
      this.updateDestination();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onDestSelect(id: string) {
    this.selectedDestId = id;
    this.updateDestination();
  }

  updateDestination() {
    this.activeDestination = this.destinationService.getDestinationById(this.selectedDestId) || this.destinations[0];
  }
}
