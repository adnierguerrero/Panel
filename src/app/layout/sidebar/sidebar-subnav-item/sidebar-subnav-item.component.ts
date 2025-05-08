import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubItem } from '../../../core/models/feature.model';

@Component({
  selector: 'app-sidebar-subnav-item',
  templateUrl: './sidebar-subnav-item.component.html'
})
export class SidebarSubNavItemComponent {
  @Input() subItem!: SubItem;
  @Input() featureId!: string;
  @Input() currentPage = '';
  @Input() defaultHomePage = '';
  
  @Output() onNavigate = new EventEmitter<string>();
  @Output() onSetDefaultHomePage = new EventEmitter<string>();

  menuHovered = false;

  /**
   * Navigate to the subitem's path
   */
  navigate(event: Event): void {
    event.preventDefault();
    this.onNavigate.emit(this.subItem.path);
  }

  /**
   * Set the subitem's path as the default home page
   */
  setAsHomePage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.onSetDefaultHomePage.emit(this.subItem.path);
  }

  /**
   * Check if the subitem is active
   */
  isActive(): boolean {
    return this.currentPage === this.subItem.path;
  }

  /**
   * Check if the subitem's path is the default home page
   */
  isHomePage(): boolean {
    return this.defaultHomePage === this.subItem.path;
  }
}
