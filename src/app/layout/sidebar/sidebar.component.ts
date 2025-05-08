import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Feature, CollapsedPanel } from '../../core/models/feature.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() features: Feature[] = [];
  @Input() defaultHomePage = '/panel/dashboard';
  @Input() currentPage = '';
  @Input() openSubmenus: string[] = [];
  @Input() isSidebarOpen = true;
  @Input() isFavoritesOpen = true;
  @Input() activeCollapsedPanel: CollapsedPanel | null = null;
  @Input() isSidebarPinned = false;
  @Input() favoriteItems: Feature[] = [];
  @Input() canClearFavorites = false;

  @Output() onNavigate = new EventEmitter<string>();
  @Output() toggleSubmenu = new EventEmitter<string>();
  @Output() onAddItem = new EventEmitter<string>();
  @Output() onToggleFavorite = new EventEmitter<{featureId: string, subItemId?: string}>();
  @Output() toggleFavoritesCollapse = new EventEmitter<void>();
  @Output() onToggleSidebar = new EventEmitter<void>();
  @Output() onSetDefaultHomePage = new EventEmitter<string>();
  @Output() onToggleActiveCollapsedPanel = new EventEmitter<CollapsedPanel | null>();
  @Output() onToggleSidebarPin = new EventEmitter<void>();
  @Output() onUnfavoriteAll = new EventEmitter<void>();

  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;

  /**
   * Check if a submenu is open
   */
  isSubmenuOpen(featureId: string): boolean {
    return this.openSubmenus.includes(featureId);
  }

  /**
   * Handle navigation event
   */
  handleNavigate(path: string): void {
    this.onNavigate.emit(path);
  }

  /**
   * Handle submenu toggle event
   */
  handleToggleSubmenu(featureId: string): void {
    this.toggleSubmenu.emit(featureId);
  }

  /**
   * Handle add item event
   */
  handleAddItem(featureId: string): void {
    this.onAddItem.emit(featureId);
  }

  /**
   * Handle toggle favorite event
   */
  handleToggleFavorite(data: {featureId: string, subItemId?: string}): void {
    this.onToggleFavorite.emit(data);
  }

  /**
   * Handle set default home page event
   */
  handleSetDefaultHomePage(path: string): void {
    this.onSetDefaultHomePage.emit(path);
  }

  /**
   * Handle toggle active collapsed panel event
   */
  handleToggleActiveCollapsedPanel(panel: CollapsedPanel | null): void {
    this.onToggleActiveCollapsedPanel.emit(panel);
  }
}
