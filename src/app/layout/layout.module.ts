import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SearchHeaderComponent } from './header/search-header/search-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarFavoritesComponent } from './sidebar/sidebar-favorites/sidebar-favorites.component';
import { SidebarNavItemComponent } from './sidebar/sidebar-nav-item/sidebar-nav-item.component';
import { SidebarSubNavItemComponent } from './sidebar/sidebar-subnav-item/sidebar-subnav-item.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchHeaderComponent,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarFavoritesComponent,
    SidebarNavItemComponent,
    SidebarSubNavItemComponent,
    PanelLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PanelLayoutComponent
  ]
})
export class LayoutModule { }
