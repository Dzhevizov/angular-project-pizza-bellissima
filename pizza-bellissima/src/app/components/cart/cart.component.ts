import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LEV_TO_EUR = 1.95583;

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
      const deliveryFee = afterDiscount > 0 && afterDiscount < 20 ? 4.99 : 0;
      return { items, subtotal, discounts, deliveryFee, total: afterDiscount + deliveryFee };
    })
  );

  constructor(private cartService: CartService) {}

  close() {
    this.cartService.closeCart();
  }

  updateQuantity(productId: string, delta: number) {
    this.cartService.updateQuantity(productId, delta);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  toEur(lev: number): string {
    return (lev / LEV_TO_EUR).toFixed(2);
  }

  placeOrder(summary: CartSummary) {
    if (summary.items.length === 0) return;
    alert('Поръчката е създадена!');
    this.cartService.clearCart();
    this.close();
  }
}
