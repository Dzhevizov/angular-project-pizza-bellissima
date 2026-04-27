import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.itemsSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.countSubject.asObservable();

  private openSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.openSubject.asObservable();

  addToCart(product: Product) {
    const items = this.itemsSubject.getValue();
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
      this.itemsSubject.next([...items]);
    } else {
      this.itemsSubject.next([...items, { product, quantity: 1 }]);
    }
    this.updateCount();
  }

  removeFromCart(productId: string) {
    const items = this.itemsSubject.getValue().filter((item) => item.product.id !== productId);
    this.itemsSubject.next(items);
    this.updateCount();
  }

  updateQuantity(productId: string, delta: number) {
    const items = this.itemsSubject.getValue();
    const item = items.find((i) => i.product.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.itemsSubject.next(items.filter((i) => i.product.id !== productId));
    } else {
      this.itemsSubject.next([...items]);
    }
    this.updateCount();
  }

  clearCart() {
    this.itemsSubject.next([]);
    this.updateCount();
  }

  openCart() {
    this.openSubject.next(true);
  }

  closeCart() {
    this.openSubject.next(false);
  }

  getItems() {
    return this.itemsSubject.getValue();
  }

  private updateCount() {
    const total = this.itemsSubject.getValue().reduce((sum, item) => sum + item.quantity, 0);
    this.countSubject.next(total);
  }
}
