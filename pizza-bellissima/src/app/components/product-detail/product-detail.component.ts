import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product, ProductCategory } from '../../models/product.model';
import { products } from '../../data/products';
import { CartService } from '../../services/cart.service';

const categoryTitles: Record<ProductCategory, string> = {
  [ProductCategory.Pizza]: 'Италиански пици',
  [ProductCategory.Pasta]: 'Паста',
  [ProductCategory.Risotto]: 'Ризото',
  [ProductCategory.Dessert]: 'Десерти',
  [ProductCategory.Drink]: 'Напитки',
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product?: Product;
  categoryTitles = categoryTitles;
  addedToCart = false;

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.product = id ? products.find((item) => item.id === id) : undefined;
      this.addedToCart = false;
    });
  }

  private readonly LEV_TO_EUR = 1.95583;

  toEur(lev: number): string {
    return (lev / this.LEV_TO_EUR).toFixed(2);
  }

  addToCart() {
    if (!this.product) {
      return;
    }

    this.cartService.addToCart(this.product);
    this.addedToCart = true;

    setTimeout(() => {
      this.addedToCart = false;
    }, 2500);
  }
}
