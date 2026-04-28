import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    if (!this.email || !this.password) return;
    this.error = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error = 'Грешен имейл или парола.';
        this.isLoading = false;
      },
    });
  }
}
