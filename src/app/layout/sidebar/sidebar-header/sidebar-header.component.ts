import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {
  @Input() isSidebarOpen = true;
  @Input() isSidebarPinned = false;
  @Input() defaultHomePage = '/panel/dashboard';
  
  @Output() onNavigate = new EventEmitter<string>();
  @Output() onToggleSidebarPin = new EventEmitter<void>();
  @Output() onToggleSidebar = new EventEmitter<void>();

  /**
   * Navigate to the default home page
   */
  navigateToHome(): void {
    this.onNavigate.emit(this.defaultHomePage);
  }

  /**
   * Toggle the sidebar pin state
   */
  toggleSidebarPin(event: Event): void {
    event.stopPropagation();
    this.onToggleSidebarPin.emit();
  }

  /**
   * Toggle the sidebar open/closed state
   */
  toggleSidebar(event: Event): void {
    event.stopPropagation();
    this.onToggleSidebar.emit();
  }
}
