import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  cartCount$ = this.cartService.cartCount$;

  // Future auth state placeholders; auth is not implemented yet.
  isAuthenticated = true;
  isAdmin = true;
  userName = 'Иван';

  constructor(private cartService: CartService) {}

  openCart() {
    this.cartService.openCart();
  }
}
