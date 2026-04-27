import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  private readonly LEV_TO_EUR = 1.95583;

  constructor(private cartService: CartService) {}

  toEur(lev: number): string {
    return (lev / this.LEV_TO_EUR).toFixed(2);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
