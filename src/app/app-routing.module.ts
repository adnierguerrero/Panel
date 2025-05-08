import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelLayoutComponent } from './layout/panel-layout/panel-layout.component';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: 'panel',
    component: PanelLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'properties',
        loadChildren: () => import('./features/properties/properties.module').then(m => m.PropertiesModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./features/properties/properties.module').then(m => m.PropertiesModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: 'panel/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'panel/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
