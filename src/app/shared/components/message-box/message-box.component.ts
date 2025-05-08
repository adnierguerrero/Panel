import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, AlertMessage } from '../../../core/services/alert.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html'
})
export class MessageBoxComponent implements OnInit, OnDestroy {
  messages: AlertMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeMessage(id: number): void {
    this.alertService.removeMessage(id);
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'x-circle';
      case 'warning': return 'alert-triangle';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  getBgClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-500 text-green-800';
      case 'error': return 'bg-red-50 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-500 text-blue-800';
      default: return 'bg-gray-50 border-gray-500 text-gray-800';
    }
  }
}
