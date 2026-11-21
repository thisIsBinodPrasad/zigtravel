import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService, Region } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-destination-selector',
  templateUrl: './destination-selector.component.html',
  styleUrls: ['./destination-selector.component.css']
})
export class DestinationSelectorComponent implements OnInit, OnDestroy {
  allDestinations: Destination[] = [];
  destinations: Destination[] = [];
  region: Region = 'all';
  activeDestId = 'all';
  private sub!: Subscription;
  private regionSub!: Subscription;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.allDestinations = this.destinationService.getDestinations();
    this.destinations = this.allDestinations;
    this.regionSub = this.destinationService.activeRegion$.subscribe(r => {
      this.region = r;
      this.destinations = r === 'all' ? this.allDestinations : this.allDestinations.filter(d => d.category === r);
    });
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      this.activeDestId = id;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.regionSub) this.regionSub.unsubscribe();
  }

  selectDestination(id: string) {
    this.destinationService.setActiveDestination(id);
  }
}
