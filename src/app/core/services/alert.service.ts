import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
  id: number;
  autoClose?: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageIdCounter = 0;
  private messagesSubject = new BehaviorSubject<AlertMessage[]>([]);
  
  public messages$: Observable<AlertMessage[]> = this.messagesSubject.asObservable();

  constructor() { }

  /**
   * Adds a new success message
   */
  success(text: string, autoClose = true, duration = 5000): void {
    this.addMessage({
      type: 'success',
      text,
      id: ++this.messageIdCounter,
      autoClose,
      duration
    });
  }

  /**
   * Adds a new error message
   */
  error(text: string, autoClose = false): void {
    this.addMessage({
      type: 'error',
      text,
      id: ++this.messageIdCounter,
      autoClose
    });
  }

  /**
   * Adds a new info message
   */
  info(text: string, autoClose = true, duration = 5000): void {
    this.addMessage({
      type: 'info',
      text,
      id: ++this.messageIdCounter,
      autoClose,
      duration
    });
  }

  /**
   * Adds a new warning message
   */
  warning(text: string, autoClose = true, duration = 5000): void {
    this.addMessage({
      type: 'warning',
      text,
      id: ++this.messageIdCounter,
      autoClose,
      duration
    });
  }

  /**
   * Removes a message by ID
   */
  removeMessage(id: number): void {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next(currentMessages.filter(m => m.id !== id));
  }

  /**
   * Clears all messages
   */
  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  private addMessage(message: AlertMessage): void {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);

    if (message.autoClose) {
      setTimeout(() => {
        this.removeMessage(message.id);
      }, message.duration || 5000);
    }
  }
}
