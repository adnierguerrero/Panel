import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() isSidebarOpen = true;
  @Input() isSidebarPinned = false;
  @Output() onToggleSidebar = new EventEmitter<void>();
  @Output() onSearch = new EventEmitter<string>();

  currentPageTitle = '';
  private routerSubscription?: Subscription;
  
  constructor(private router: Router) {
    // Extract page title from route
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }
  
  ngOnInit(): void {
    this.updatePageTitle();
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  
  /**
   * Toggle the sidebar
   */
  toggleSidebar(): void {
    this.onToggleSidebar.emit();
  }
  
  /**
   * Handle search
   */
  handleSearch(searchTerm: string): void {
    this.onSearch.emit(searchTerm);
  }
  
  /**
   * Update the page title based on the current route
   */
  private updatePageTitle(): void {
    const urlPath = this.router.url;
    
    // Simple mapping of routes to titles
    if (urlPath.includes('/dashboard')) {
      this.currentPageTitle = 'Dashboard';
    } else if (urlPath.includes('/properties/list')) {
      this.currentPageTitle = 'Property List';
    } else if (urlPath.includes('/properties/reports')) {
      this.currentPageTitle = 'Property Reports';
    } else if (urlPath.includes('/clients/list')) {
      this.currentPageTitle = 'Client List';
    } else if (urlPath.includes('/clients/reports')) {
      this.currentPageTitle = 'Client Reports';
    } else if (urlPath.includes('/schedule')) {
      this.currentPageTitle = 'Schedule';
    } else if (urlPath.includes('/reports')) {
      this.currentPageTitle = 'Reports';
    } else if (urlPath.includes('/settings')) {
      this.currentPageTitle = 'Settings';
    } else {
      this.currentPageTitle = 'Real Estate Dashboard';
    }
  }
}
