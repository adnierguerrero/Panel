import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html'
})
export class SearchHeaderComponent {
  @Output() onSearch = new EventEmitter<string>();
  
  searchTerm = '';

  /**
   * Submit search query
   */
  submitSearch(): void {
    this.onSearch.emit(this.searchTerm);
  }

  /**
   * Handle search input changes
   */
  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  /**
   * Clear search input
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch.emit('');
  }
}
