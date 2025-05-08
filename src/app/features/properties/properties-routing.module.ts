import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListPageComponent } from './property-list-page/property-list-page.component';
import { PropertyReportsPageComponent } from './property-reports-page/property-reports-page.component';

const routes: Routes = [
  { path: 'list', component: PropertyListPageComponent },
  { path: 'reports', component: PropertyReportsPageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
