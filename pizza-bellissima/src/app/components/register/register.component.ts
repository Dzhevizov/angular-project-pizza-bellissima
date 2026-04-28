import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';
  rePassword = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  notes = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    this.error = '';

    if (this.password !== this.rePassword) {
      this.error = 'Паролите не съвпадат!';
      return;
    }

    this.isLoading = true;

    this.authService
      .register({
        email: this.email,
        password: this.password,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        address: this.address,
        city: this.city,
        notes: this.notes,
      })
      .subscribe({
        next: () => this.router.navigate(['/catalog']),
        error: () => {
          this.error = 'Грешка при регистрация. Моля, опитайте отново.';
          this.isLoading = false;
        },
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
