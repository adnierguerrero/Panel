import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-reports-page',
  templateUrl: './property-reports-page.component.html'
})
export class PropertyReportsPageComponent implements OnInit {
  // Sample report data
  performanceMetrics = [
    { name: 'Average Days on Market', current: 45, previous: 53, change: -15.1, trend: 'down' },
    { name: 'Average Listing Price', current: 865000, previous: 815000, change: 6.1, trend: 'up' },
    { name: 'Total Properties Sold', current: 28, previous: 22, change: 27.3, trend: 'up' },
    { name: 'Conversion Rate', current: 32, previous: 29, change: 10.3, trend: 'up' }
  ];

  // City distribution data
  cityDistribution = [
    { city: 'Los Angeles', count: 35, percentage: 28 },
    { city: 'San Francisco', count: 28, percentage: 22.4 },
    { city: 'New York', count: 22, percentage: 17.6 },
    { city: 'Chicago', count: 18, percentage: 14.4 },
    { city: 'Miami', count: 12, percentage: 9.6 },
    { city: 'Other', count: 10, percentage: 8 }
  ];

  // Property type distribution
  propertyTypes = [
    { type: 'Single Family', count: 55, percentage: 44 },
    { type: 'Condo', count: 35, percentage: 28 },
    { type: 'Townhouse', count: 20, percentage: 16 },
    { type: 'Multi-Family', count: 10, percentage: 8 },
    { type: 'Land', count: 5, percentage: 4 }
  ];

  // Monthly sales data
  monthlySales = [
    { month: 'Jan', amount: 2450000 },
    { month: 'Feb', amount: 2100000 },
    { month: 'Mar', amount: 2800000 },
    { month: 'Apr', amount: 3200000 },
    { month: 'May', amount: 3600000 },
    { month: 'Jun', amount: 3100000 },
    { month: 'Jul', amount: 3800000 },
    { month: 'Aug', amount: 4100000 },
    { month: 'Sep', amount: 3700000 },
    { month: 'Oct', amount: 3250000 },
    { month: 'Nov', amount: 2900000 },
    { month: 'Dec', amount: 3500000 }
  ];

  selectedPeriod = 'This Year';
  periodOptions = ['This Week', 'This Month', 'This Quarter', 'This Year'];

  constructor() { }

  ngOnInit(): void {
  }

  // Format currency values
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  // Format percentages
  formatPercent(value: number): string {
    return value.toFixed(1) + '%';
  }

  // Get color class based on trend
  getTrendClass(trend: string): string {
    return trend === 'up' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  }

  // Generate empty array for chart bars
  getChartBarArray(): number[] {
    return Array(12).fill(0);
  }

  // Calculate bar height percentage
  getBarHeight(amount: number): string {
    const max = Math.max(...this.monthlySales.map(ms => ms.amount));
    const percentage = (amount / max) * 100;
    return `${percentage}%`;
  }
}
