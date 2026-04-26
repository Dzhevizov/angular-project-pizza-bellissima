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

  constructor(private authService: AuthService, private router: Router) {}

  async handleSubmit() {
    this.error = '';

    if (this.password !== this.rePassword) {
      this.error = 'Паролите не съвпадат!';
      return;
    }

    try {
      await this.authService.register(this.username, this.password, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        notes: this.notes,
      });

      this.router.navigate(['/catalog']);
    } catch {
      this.error = 'Грешка при регистрация. Моля, опитайте отново.';
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
