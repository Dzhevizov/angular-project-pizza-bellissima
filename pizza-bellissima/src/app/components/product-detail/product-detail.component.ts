import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EurToLevPipe } from '../../pipes/eur-to-lev.pipe';
import { Product, ProductCategory } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

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
  imports: [CommonModule, RouterModule, EurToLevPipe],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  categoryTitles = categoryTitles;
  addedToCart = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false;
          this.addedToCart = false;
        },
        error: () => {
          this.product = undefined;
          this.isLoading = false;
        },
      });
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct() {
    if (!this.product) return;
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => this.router.navigate(['/catalog']),
    });
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
    this.addedToCart = true;
    setTimeout(() => { this.addedToCart = false; }, 2500);
  }
}
