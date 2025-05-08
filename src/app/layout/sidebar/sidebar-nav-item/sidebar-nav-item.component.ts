import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Feature, CollapsedPanel } from '../../../core/models/feature.model';

@Component({
  selector: 'app-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html'
})
export class SidebarNavItemComponent {
  @Input() feature!: Feature;
  @Input() currentPage = '';
  @Input() defaultHomePage = '';
  @Input() isSidebarOpen = true;
  @Input() isSubmenuOpen = false;
  @Input() activeCollapsedPanel: CollapsedPanel | null = null;
  
  @Output() onNavigate = new EventEmitter<string>();
  @Output() toggleSubmenu = new EventEmitter<string>();
  @Output() onAddItem = new EventEmitter<string>();
  @Output() onToggleFavorite = new EventEmitter<{featureId: string}>();
  @Output() onSetDefaultHomePage = new EventEmitter<string>();
  @Output() onToggleActiveCollapsedPanel = new EventEmitter<CollapsedPanel | null>();

  menuHovered = false;

  /**
   * Navigate to the feature's path
   */
  navigate(event: Event): void {
    event.preventDefault();
    this.onNavigate.emit(this.feature.path);
  }

  /**
   * Toggle submenu open/closed
   */
  toggleSubmenuState(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.toggleSubmenu.emit(this.feature.id);
  }

  /**
   * Toggle the feature's favorite status
   */
  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.onToggleFavorite.emit({ featureId: this.feature.id });
  }

  /**
   * Set the feature's path as the default home page
   */
  setAsHomePage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.onSetDefaultHomePage.emit(this.feature.path);
  }

  /**
   * Handle the "Add" button click
   */
  addItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.onAddItem.emit(this.feature.id);
  }

  /**
   * Toggle the collapsed panel for submenus
   */
  togglePanel(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isSidebarOpen && this.hasSubItems()) {
      const panel: CollapsedPanel = { 
        id: this.feature.id, 
        type: 'feature' 
      };
      this.onToggleActiveCollapsedPanel.emit(panel);
    }
  }

  /**
   * Check if the current feature has any sub-items
   */
  hasSubItems(): boolean {
    return !!this.feature.subItems && this.feature.subItems.length > 0;
  }

  /**
   * Check if the feature is active (either the feature path or one of its subitems)
   */
  isActive(): boolean {
    if (this.currentPage === this.feature.path) {
      return true;
    }
    
    if (this.feature.subItems) {
      return this.feature.subItems.some(item => this.currentPage === item.path);
    }
    
    return false;
  }

  /**
   * Check if the feature path is the default home page
   */
  isHomePage(): boolean {
    return this.defaultHomePage === this.feature.path;
  }

  /**
   * Check if the feature's panel is active
   */
  isPanelActive(): boolean {
    return (
      this.activeCollapsedPanel?.id === this.feature.id && 
      this.activeCollapsedPanel?.type === 'feature'
    );
  }
}
