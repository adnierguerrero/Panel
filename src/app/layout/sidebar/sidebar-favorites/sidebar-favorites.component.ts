import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Feature, SubItem, CollapsedPanel } from '../../../core/models/feature.model';

@Component({
  selector: 'app-sidebar-favorites',
  templateUrl: './sidebar-favorites.component.html'
})
export class SidebarFavoritesComponent {
  @Input() isSidebarOpen = true;
  @Input() favoriteItems: Feature[] = [];
  @Input() isFavoritesOpen = true;
  @Input() canClearFavorites = false;
  @Input() defaultHomePage = '/panel/dashboard';
  @Input() currentPage = '';
  @Input() activeCollapsedPanel: CollapsedPanel | null = null;
  
  @Output() toggleFavoritesCollapse = new EventEmitter<void>();
  @Output() onUnfavoriteAll = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<string>();
  @Output() onToggleFavorite = new EventEmitter<{featureId: string, subItemId?: string}>();
  @Output() onToggleActiveCollapsedPanel = new EventEmitter<CollapsedPanel | null>();

  /**
   * Toggle the favorites section collapse state
   */
  toggleCollapse(): void {
    this.toggleFavoritesCollapse.emit();
  }

  /**
   * Clear all favorites
   */
  unfavoriteAll(): void {
    this.onUnfavoriteAll.emit();
  }

  /**
   * Navigate to a feature or sub-item
   */
  navigate(path: string): void {
    this.onNavigate.emit(path);
  }

  /**
   * Toggle favorite status for a feature or sub-item
   */
  toggleFavorite(featureId: string, subItemId?: string): void {
    this.onToggleFavorite.emit({ featureId, subItemId });
  }

  /**
   * Toggle the collapsed panel for favorites
   */
  toggleFavoritesPanel(): void {
    if (!this.isSidebarOpen) {
      const panel: CollapsedPanel = { 
        id: 'favorites', 
        type: 'favorites' 
      };
      this.onToggleActiveCollapsedPanel.emit(panel);
    }
  }

  /**
   * Check if a page is active
   */
  isActive(path: string): boolean {
    return this.currentPage === path;
  }

  /**
   * Check if the favorites panel is active
   */
  isFavoritesPanelActive(): boolean {
    return this.activeCollapsedPanel?.id === 'favorites' && this.activeCollapsedPanel?.type === 'favorites';
  }
}
