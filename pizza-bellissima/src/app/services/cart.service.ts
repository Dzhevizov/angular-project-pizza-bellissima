import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:3030';

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

  private cartId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadCart();
      } else {
        this.cartId = null;
        this.itemsSubject.next([]);
        this.updateCount();
      }
    });
  }

  private loadCart() {
    this.http.get<any[]>(`${API_URL}/data/carts`).subscribe({
      next: (carts) => {
        if (carts.length > 0) {
          const cart = carts[0];
          this.cartId = cart._id;
          this.itemsSubject.next(cart.items ?? []);
          this.updateCount();
        }
      },
      error: () => {},
    });
  }

  private saveCart() {
    const items = this.itemsSubject.getValue();
    if (this.cartId) {
      this.http.put(`${API_URL}/data/carts/${this.cartId}`, { items }).subscribe();
    } else if (this.authService.isAuthenticated) {
      this.http.post<any>(`${API_URL}/data/carts`, { items }).subscribe({
        next: (cart) => { this.cartId = cart._id; },
      });
    }
  }

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
    this.saveCart();
  }

  removeFromCart(productId: string) {
    const items = this.itemsSubject.getValue().filter((item) => item.product.id !== productId);
    this.itemsSubject.next(items);
    this.updateCount();
    this.saveCart();
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
    this.saveCart();
  }

  clearCart() {
    if (this.cartId) {
      this.http.delete(`${API_URL}/data/carts/${this.cartId}`).subscribe();
      this.cartId = null;
    }
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
