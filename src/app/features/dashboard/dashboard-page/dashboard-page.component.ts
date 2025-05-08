import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  // Sample dashboard data
  statsCards = [
    { title: 'Total Properties', value: '125', change: '+12%', icon: 'building', trend: 'up' },
    { title: 'Active Listings', value: '87', change: '+5%', icon: 'list-check', trend: 'up' },
    { title: 'New Clients', value: '24', change: '+18%', icon: 'users', trend: 'up' },
    { title: 'Appointments', value: '42', change: '-3%', icon: 'calendar', trend: 'down' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
