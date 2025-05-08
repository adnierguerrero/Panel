import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RealEstateService } from '../../core/services/real-estate.service';
import { LayoutService } from '../../core/services/layout.service';
import { AlertService } from '../../core/services/alert.service';
import { Feature, CollapsedPanel } from '../../core/models/feature.model';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html'
})
export class PanelLayoutComponent implements OnInit, OnDestroy {
  // Features and navigation state
  features: Feature[] = [];
  currentPage = '';
  defaultHomePage = '/panel/dashboard';
  openSubmenus: string[] = [];
  favoriteItems: Feature[] = [];
  
  // Sidebar state
  isSidebarOpen = true;
  isSidebarPinned = false;
  sidebarPinnedStateOpen = true;
  isFavoritesOpen = true;
  activeCollapsedPanel: CollapsedPanel | null = null;
  
  private subscriptions: Subscription[] = [];
  
  constructor(
    private realEstateService: RealEstateService,
    private layoutService: LayoutService,
    private alertService: AlertService,
    private router: Router,
    private elementRef: ElementRef
  ) {}
  
  ngOnInit(): void {
    // Get features
    this.features = this.realEstateService.getFeatures();
    
    // Subscribe to route changes
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.currentPage = this.router.url;
        this.updateOpenSubmenus();
      })
    );
    
    // Subscribe to layout service state
    this.subscriptions.push(
      this.layoutService.isSidebarOpen$.subscribe(isOpen => {
        this.isSidebarOpen = isOpen;
        if (isOpen && this.isSidebarPinned) {
          this.sidebarPinnedStateOpen = true;
        }
      })
    );
    
    this.subscriptions.push(
      this.layoutService.isSidebarPinned$.subscribe(isPinned => {
        this.isSidebarPinned = isPinned;
        if (isPinned) {
          this.isSidebarOpen = this.sidebarPinnedStateOpen;
        }
      })
    );
    
    this.subscriptions.push(
      this.layoutService.defaultHomePage$.subscribe(page => {
        this.defaultHomePage = page;
      })
    );
    
    this.subscriptions.push(
      this.layoutService.isFavoritesOpen$.subscribe(isOpen => {
        this.isFavoritesOpen = isOpen;
      })
    );
    
    this.subscriptions.push(
      this.layoutService.openSubmenus$.subscribe(menus => {
        this.openSubmenus = menus;
      })
    );
    
    this.subscriptions.push(
      this.layoutService.activeCollapsedPanel$.subscribe(panel => {
        this.activeCollapsedPanel = panel;
      })
    );
    
    // Initialize the current page
    this.currentPage = this.router.url;
    this.updateOpenSubmenus();
    this.updateFavorites();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /**
   * Click outside handler for collapsed panels
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.activeCollapsedPanel) {
      // Check if the click was outside of any panel
      const clickedElement = event.target as HTMLElement;
      const isOutside = !this.elementRef.nativeElement.contains(clickedElement) || 
                       (this.elementRef.nativeElement.contains(clickedElement) && 
                       !clickedElement.closest('.sidebar-panel, .sidebar-trigger'));

      if (isOutside) {
        this.toggleActiveCollapsedPanel(null);
      }
    }
  }
  
  /**
   * Navigate to a path
   */
  handleNavigate(path: string): void {
    this.router.navigateByUrl(path);
    
    // Auto-close sidebar on navigation for mobile views
    if (!this.isSidebarPinned && window.innerWidth < 1024) {
      this.toggleSidebar();
    }
  }
  
  /**
   * Handle search
   */
  handleSearch(searchTerm: string): void {
    console.log('Searching for:', searchTerm);
    this.alertService.info(`Searching for: ${searchTerm}`);
    // Implement search functionality
  }
  
  /**
   * Toggle a submenu open/closed
   */
  toggleSubmenu(featureId: string): void {
    this.layoutService.toggleSubmenu(featureId);
  }
  
  /**
   * Add a new item
   */
  handleAddItem(featureId: string): void {
    // This would be implemented based on specific feature requirements
    this.alertService.info(`Adding new item to ${featureId}`);
    
    // Navigate to appropriate "add" page based on feature
    switch (featureId) {
      case 'properties':
        this.router.navigateByUrl('/panel/properties/add');
        break;
      case 'clients':
        this.router.navigateByUrl('/panel/clients/add');
        break;
      case 'schedule':
        this.router.navigateByUrl('/panel/schedule/add');
        break;
      default:
        // Generic handling
        this.alertService.warning('Add functionality not implemented for this feature');
    }
  }
  
  /**
   * Toggle sidebar open/closed
   */
  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }
  
  /**
   * Toggle sidebar pinned state
   */
  toggleSidebarPin(): void {
    if (this.isSidebarPinned) {
      // Remember the open state when unpinning
      this.sidebarPinnedStateOpen = this.isSidebarOpen;
    }
    this.layoutService.toggleSidebarPin();
  }
  
  /**
   * Toggle favorite status for a feature or sub-item
   */
  handleToggleFavorite(data: {featureId: string, subItemId?: string}): void {
    this.realEstateService.toggleFavorite(data.featureId, data.subItemId);
    this.updateFavorites();
  }
  
  /**
   * Toggle favorites section collapsed state
   */
  toggleFavoritesCollapse(): void {
    this.layoutService.toggleFavoritesCollapse();
  }
  
  /**
   * Toggle the collapsed panel
   */
  toggleActiveCollapsedPanel(panel: CollapsedPanel | null): void {
    this.layoutService.toggleActiveCollapsedPanel(panel);
  }
  
  /**
   * Clear all favorites
   */
  handleUnfavoriteAll(): void {
    this.realEstateService.clearAllFavorites();
    this.updateFavorites();
    this.alertService.success('All favorites have been cleared');
  }
  
  /**
   * Set default home page
   */
  handleSetDefaultHomePage(path: string): void {
    this.layoutService.setDefaultHomePage(path);
    this.alertService.success('Default home page has been set');
  }
  
  /**
   * Update which submenus should be open based on current route
   */
  private updateOpenSubmenus(): void {
    // Auto-expand submenus when a child route is active
    this.features.forEach(feature => {
      if (feature.subItems && feature.subItems.length > 0) {
        const shouldBeOpen = feature.subItems.some(subItem => 
          this.currentPage.includes(subItem.path)
        );
        
        const isOpen = this.openSubmenus.includes(feature.id);
        
        if (shouldBeOpen && !isOpen) {
          this.toggleSubmenu(feature.id);
        }
      }
    });
  }
  
  /**
   * Update favorites list
   */
  private updateFavorites(): void {
    this.favoriteItems = this.features.filter(f => f.isFavorite);
  }
  
  /**
   * Check if there are any favorites to clear
   */
  get canClearFavorites(): boolean {
    return this.favoriteItems.length > 0;
  }
}
