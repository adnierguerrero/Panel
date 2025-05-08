import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CollapsedPanel } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Storage keys
  private readonly SIDEBAR_PINNED_KEY = 'sidebar-pinned';
  private readonly SIDEBAR_OPEN_KEY = 'sidebar-open';
  private readonly DEFAULT_HOME_PAGE_KEY = 'default-home-page';

  // State subjects
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(
    this.localStorageService.get<boolean>(this.SIDEBAR_OPEN_KEY, true)
  );
  
  private isSidebarPinnedSubject = new BehaviorSubject<boolean>(
    this.localStorageService.get<boolean>(this.SIDEBAR_PINNED_KEY, false)
  );
  
  private defaultHomePageSubject = new BehaviorSubject<string>(
    this.localStorageService.get<string>(this.DEFAULT_HOME_PAGE_KEY, '/panel/dashboard')
  );
  
  private isFavoritesOpenSubject = new BehaviorSubject<boolean>(true);
  private openSubmenusSubject = new BehaviorSubject<string[]>([]);
  private activeCollapsedPanelSubject = new BehaviorSubject<CollapsedPanel | null>(null);

  // Public observables
  public isSidebarOpen$: Observable<boolean> = this.isSidebarOpenSubject.asObservable();
  public isSidebarPinned$: Observable<boolean> = this.isSidebarPinnedSubject.asObservable();
  public defaultHomePage$: Observable<string> = this.defaultHomePageSubject.asObservable();
  public isFavoritesOpen$: Observable<boolean> = this.isFavoritesOpenSubject.asObservable();
  public openSubmenus$: Observable<string[]> = this.openSubmenusSubject.asObservable();
  public activeCollapsedPanel$: Observable<CollapsedPanel | null> = this.activeCollapsedPanelSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { }

  /* Sidebar state methods */
  
  toggleSidebar(): void {
    const newState = !this.isSidebarOpenSubject.getValue();
    this.isSidebarOpenSubject.next(newState);
    this.localStorageService.set(this.SIDEBAR_OPEN_KEY, newState);
  }

  toggleSidebarPin(): void {
    const newState = !this.isSidebarPinnedSubject.getValue();
    this.isSidebarPinnedSubject.next(newState);
    this.localStorageService.set(this.SIDEBAR_PINNED_KEY, newState);
  }

  /* Favorites methods */
  
  toggleFavoritesCollapse(): void {
    this.isFavoritesOpenSubject.next(!this.isFavoritesOpenSubject.getValue());
  }

  /* Submenu methods */
  
  toggleSubmenu(submenuId: string): void {
    const currentOpenSubmenus = this.openSubmenusSubject.getValue();
    const isOpen = currentOpenSubmenus.includes(submenuId);
    
    const newOpenSubmenus = isOpen 
      ? currentOpenSubmenus.filter(id => id !== submenuId)
      : [...currentOpenSubmenus, submenuId];
    
    this.openSubmenusSubject.next(newOpenSubmenus);
  }

  /* Default home page methods */
  
  setDefaultHomePage(path: string): void {
    this.defaultHomePageSubject.next(path);
    this.localStorageService.set(this.DEFAULT_HOME_PAGE_KEY, path);
  }

  /* Collapsed panel methods */
  
  toggleActiveCollapsedPanel(panel: CollapsedPanel | null): void {
    const currentPanel = this.activeCollapsedPanelSubject.getValue();
    
    // If the same panel is clicked again, close it. Otherwise, open the new panel
    if (currentPanel && panel && currentPanel.id === panel.id && currentPanel.type === panel.type) {
      this.activeCollapsedPanelSubject.next(null);
    } else {
      this.activeCollapsedPanelSubject.next(panel);
    }
  }

  closeCollapsedPanel(): void {
    this.activeCollapsedPanelSubject.next(null);
  }

  /* Getter methods for synchronous access */
  
  getIsSidebarOpen(): boolean {
    return this.isSidebarOpenSubject.getValue();
  }

  getIsSidebarPinned(): boolean {
    return this.isSidebarPinnedSubject.getValue();
  }

  getDefaultHomePage(): string {
    return this.defaultHomePageSubject.getValue();
  }

  getOpenSubmenus(): string[] {
    return this.openSubmenusSubject.getValue();
  }

  getActiveCollapsedPanel(): CollapsedPanel | null {
    return this.activeCollapsedPanelSubject.getValue();
  }
}
