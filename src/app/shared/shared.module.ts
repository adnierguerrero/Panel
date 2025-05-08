import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    MessageBoxComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MessageBoxComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
