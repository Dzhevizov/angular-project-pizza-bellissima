import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  cartCount$ = this.cartService.cartCount$;
  currentUser$ = this.authService.currentUser$;
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAdmin$ = this.authService.isAdmin$;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  openCart() {
    this.cartService.openCart();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
