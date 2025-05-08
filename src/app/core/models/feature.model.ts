export interface Feature {
  id: string;
  name: string;
  icon: string;
  path: string;
  canAdd: boolean;
  isHomePageCandidate: boolean;
  isFavorite: boolean;
  subItems?: SubItem[];
}

export interface SubItem {
  id: string;
  name: string;
  path: string;
  isHomePageCandidate: boolean;
}

export interface CollapsedPanel {
  id: string;
  type: 'feature' | 'favorites';
}
