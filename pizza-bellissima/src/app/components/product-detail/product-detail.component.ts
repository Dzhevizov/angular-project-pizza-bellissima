import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  private readonly EUR_TO_LEV = 1.95583;

  product?: Product;
  categoryTitles = categoryTitles;
  addedToCart = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.product = id ? products.find((item) => item.id === id) : undefined;
      this.addedToCart = false;
    });
  }

  toLev(eur: number): string {
    return (eur * this.EUR_TO_LEV).toFixed(2);
  }

  editProduct(id: string) {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct() {}

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
    this.addedToCart = true;
    setTimeout(() => { this.addedToCart = false; }, 2500);
  }
}
