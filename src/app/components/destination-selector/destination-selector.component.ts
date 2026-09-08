import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-destination-selector',
  templateUrl: './destination-selector.component.html',
  styleUrls: ['./destination-selector.component.css']
})
export class DestinationSelectorComponent implements OnInit, OnDestroy {
  destinations: Destination[] = [];
  activeDestId = 'all';
  private sub!: Subscription;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinations = this.destinationService.getDestinations();
    this.sub = this.destinationService.activeDestinationId$.subscribe(id => {
      this.activeDestId = id;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  selectDestination(id: string) {
    this.destinationService.setActiveDestination(id);
  }
}
