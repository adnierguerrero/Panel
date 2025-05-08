import { Component, OnInit } from '@angular/core';

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  status: 'Active' | 'Pending' | 'Sold';
  listedDate: string;
}

@Component({
  selector: 'app-property-list-page',
  templateUrl: './property-list-page.component.html'
})
export class PropertyListPageComponent implements OnInit {
  properties: Property[] = [
    {
      id: '1',
      address: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      price: 875000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      type: 'Single Family',
      status: 'Active',
      listedDate: '2023-07-12'
    },
    {
      id: '2',
      address: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94101',
      price: 1250000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1850,
      type: 'Condo',
      status: 'Pending',
      listedDate: '2023-08-05'
    },
    {
      id: '3',
      address: '789 Pine Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      price: 630000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1750,
      type: 'Townhouse',
      status: 'Sold',
      listedDate: '2023-06-23'
    },
    {
      id: '4',
      address: '101 Maple Road',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      price: 1780000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: 'Condo',
      status: 'Active',
      listedDate: '2023-08-15'
    },
    {
      id: '5',
      address: '202 Cedar Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      price: 925000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      type: 'Single Family',
      status: 'Active',
      listedDate: '2023-07-28'
    }
  ];

  searchTerm = '';
  filteredProperties: Property[] = [];
  sortField = 'listedDate';
  sortDirection = 'desc';

  constructor() { }

  ngOnInit(): void {
    this.filterProperties();
  }

  filterProperties(): void {
    if (!this.searchTerm) {
      this.filteredProperties = [...this.properties];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredProperties = this.properties.filter(prop => 
        prop.address.toLowerCase().includes(searchLower) ||
        prop.city.toLowerCase().includes(searchLower) ||
        prop.state.toLowerCase().includes(searchLower) ||
        prop.zipCode.includes(searchLower) ||
        prop.type.toLowerCase().includes(searchLower)
      );
    }

    this.sortProperties(this.sortField, this.sortDirection);
  }

  sortProperties(field: string, direction: string): void {
    this.sortField = field;
    this.sortDirection = direction;

    this.filteredProperties.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        return direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
    });
  }

  toggleSort(field: string): void {
    const direction = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortProperties(field, direction);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Sold':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}
