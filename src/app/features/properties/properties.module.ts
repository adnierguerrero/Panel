import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyListPageComponent } from './property-list-page/property-list-page.component';
import { PropertyReportsPageComponent } from './property-reports-page/property-reports-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PropertyListPageComponent,
    PropertyReportsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
