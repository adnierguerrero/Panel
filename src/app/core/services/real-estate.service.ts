import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feature, SubItem } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private featuresSubject = new BehaviorSubject<Feature[]>(this.getInitialFeatures());
  
  /**
   * Observable of features that can be subscribed to by components
   */
  public features$: Observable<Feature[]> = this.featuresSubject.asObservable();

  constructor() { }

  /**
   * Gets all navigation features
   */
  getFeatures(): Feature[] {
    return this.featuresSubject.getValue();
  }

  /**
   * Updates a feature's favorite status
   */
  toggleFavorite(featureId: string, subItemId?: string): void {
    const features = this.featuresSubject.getValue();
    const updatedFeatures = features.map(feature => {
      if (subItemId) {
        // Toggle favorite on a subitem (implementation would vary based on requirements)
        return feature;
      }

      if (feature.id === featureId) {
        return { ...feature, isFavorite: !feature.isFavorite };
      }
      return feature;
    });

    this.featuresSubject.next(updatedFeatures);
  }

  /**
   * Gets all favorites
   */
  getFavorites(): (Feature | { feature: Feature, subItem: SubItem })[] {
    const features = this.featuresSubject.getValue();
    const favorites: (Feature | { feature: Feature, subItem: SubItem })[] = [];

    features.forEach(feature => {
      if (feature.isFavorite) {
        favorites.push(feature);
      }
      
      // If we want to allow favoriting subitems as well
      // feature.subItems?.forEach(subItem => {
      //   if (subItem.isFavorite) {
      //     favorites.push({ feature, subItem });
      //   }
      // });
    });

    return favorites;
  }

  /**
   * Clears all favorites
   */
  clearAllFavorites(): void {
    const features = this.featuresSubject.getValue();
    const updatedFeatures = features.map(feature => ({
      ...feature,
      isFavorite: false,
      // If we want to allow favoriting subitems as well
      // subItems: feature.subItems?.map(subItem => ({
      //   ...subItem,
      //   isFavorite: false
      // }))
    }));

    this.featuresSubject.next(updatedFeatures);
  }

  /**
   * Initial features data
   */
  private getInitialFeatures(): Feature[] {
    return [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'layout-dashboard',
        path: '/panel/dashboard',
        canAdd: false,
        isHomePageCandidate: true,
        isFavorite: true,
        subItems: []
      },
      {
        id: 'properties',
        name: 'Properties',
        icon: 'building',
        path: '/panel/properties',
        canAdd: true,
        isHomePageCandidate: false,
        isFavorite: false,
        subItems: [
          {
            id: 'property-list',
            name: 'Property List',
            path: '/panel/properties/list',
            isHomePageCandidate: true
          },
          {
            id: 'property-reports',
            name: 'Reports',
            path: '/panel/properties/reports',
            isHomePageCandidate: true
          }
        ]
      },
      {
        id: 'clients',
        name: 'Clients',
        icon: 'users',
        path: '/panel/clients',
        canAdd: true,
        isHomePageCandidate: false,
        isFavorite: false,
        subItems: [
          {
            id: 'client-list',
            name: 'Client List',
            path: '/panel/clients/list',
            isHomePageCandidate: true
          },
          {
            id: 'client-reports',
            name: 'Reports',
            path: '/panel/clients/reports',
            isHomePageCandidate: true
          }
        ]
      },
      {
        id: 'schedule',
        name: 'Schedule',
        icon: 'calendar',
        path: '/panel/schedule',
        canAdd: true,
        isHomePageCandidate: true,
        isFavorite: false,
        subItems: []
      },
      {
        id: 'reports',
        name: 'Reports',
        icon: 'bar-chart',
        path: '/panel/reports',
        canAdd: false,
        isHomePageCandidate: true,
        isFavorite: false,
        subItems: []
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: 'settings',
        path: '/panel/settings',
        canAdd: false,
        isHomePageCandidate: false,
        isFavorite: false,
        subItems: [
          {
            id: 'user-settings',
            name: 'User Settings',
            path: '/panel/settings/user',
            isHomePageCandidate: false
          },
          {
            id: 'company-settings',
            name: 'Company Settings',
            path: '/panel/settings/company',
            isHomePageCandidate: false
          }
        ]
      }
    ];
  }
}
