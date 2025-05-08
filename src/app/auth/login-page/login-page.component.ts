import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) { }

  /**
   * Handle login form submission
   */
  onSubmit(): void {
    if (!this.email || !this.password) {
      this.alertService.error('Please enter both email and password');
      return;
    }

    this.isLoading = true;

    // Simulate login process
    setTimeout(() => {
      // In a real app, this would be an authenticated API call
      if (this.email === 'demo@example.com' && this.password === 'password') {
        // Login successful
        this.router.navigate(['/panel/dashboard']);
      } else {
        // Login failed
        this.alertService.error('Invalid email or password');
      }
      this.isLoading = false;
    }, 1000);
  }
}
