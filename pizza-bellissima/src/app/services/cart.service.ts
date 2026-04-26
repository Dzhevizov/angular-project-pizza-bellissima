import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private itemCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.itemCountSubject.asObservable();

  addToCart(product: Product) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.updateCount();
  }

  private updateCount() {
    const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.itemCountSubject.next(total);
  }

  getItems() {
    return this.items;
  }
}
