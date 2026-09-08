import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'all';
  selectedCity = 'all';
  selectedDuration = 'all';
  selectedSort = 'popular';

  categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'Honeymoon', label: '💖 Honeymoon' },
    { id: 'Luxury', label: '💎 Luxury Villa' },
    { id: 'Family', label: '👨‍👩‍👧‍👦 Family Special' },
    { id: 'Budget', label: '🏷️ Budget Stays' }
  ];

  cities = ['all', 'Delhi', 'Mumbai', 'Bengaluru', 'Kochi', 'Chennai', 'Kolkata', 'Hyderabad'];

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {}

  onSearchChange() {
    this.destinationService.setSearchQuery(this.searchQuery);
  }

  onCategorySelect(catId: string) {
    this.selectedCategory = catId;
    this.destinationService.setCategory(catId);
  }

  onCitySelect() {
    this.destinationService.setDepartureCity(this.selectedCity);
  }

  onDurationSelect(dur: string) {
    this.selectedDuration = dur;
    this.destinationService.setDuration(dur);
  }

  onSortSelect() {
    this.destinationService.setSortBy(this.selectedSort);
  }
}
