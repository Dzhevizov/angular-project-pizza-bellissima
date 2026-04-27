import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const EUR_TO_LEV = 1.95583;
const FREE_DELIVERY_THRESHOLD_EUR = 20 / EUR_TO_LEV; // ~10.23 €
const DELIVERY_FEE_EUR = 4.99 / EUR_TO_LEV;          // ~2.55 €

interface CartSummary {
  items: CartItem[];
  subtotal: number;
  discounts: number;
  deliveryFee: number;
  total: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isOpen$ = this.cartService.isOpen$;
  summary$: Observable<CartSummary> = this.cartService.cartItems$.pipe(
    map((items) => {
      const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const discounts = items.reduce((sum, i) => {
        return sum + ((i.product.discount || 0) / 100) * i.product.price * i.quantity;
      }, 0);
      const afterDiscount = subtotal - discounts;
      const deliveryFee = afterDiscount > 0 && afterDiscount < FREE_DELIVERY_THRESHOLD_EUR
        ? DELIVERY_FEE_EUR
        : 0;
      return { items, subtotal, discounts, deliveryFee, total: afterDiscount + deliveryFee };
    })
  );

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  close() {
    this.cartService.closeCart();
  }

  updateQuantity(productId: string, delta: number) {
    this.cartService.updateQuantity(productId, delta);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  toLev(eur: number): string {
    return (eur * EUR_TO_LEV).toFixed(2);
  }

  placeOrder(summary: CartSummary) {
    if (summary.items.length === 0) return;

    this.orderService.placeOrder({
      items: summary.items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal: summary.subtotal,
      discounts: summary.discounts,
      deliveryFee: summary.deliveryFee,
      total: summary.total,
    });

    this.cartService.clearCart();
    this.close();
    this.router.navigate(['/orders']);
  }
}
