import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product, ProductCategory } from '../../models/product.model';
import { products } from '../../data/products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  private readonly EUR_TO_LEV = 1.95583;

  isEditMode = false;
  error = '';

  toLev(eur: number): string {
    return (eur * this.EUR_TO_LEV).toFixed(2);
  }

  name = '';
  category: ProductCategory = ProductCategory.Pizza;
  price: number | null = null;
  discount: number | null = null;
  description = '';
  image = '';

  categories = [
    { value: ProductCategory.Pizza, label: 'Италиански пици' },
    { value: ProductCategory.Pasta, label: 'Паста' },
    { value: ProductCategory.Risotto, label: 'Ризото' },
    { value: ProductCategory.Dessert, label: 'Десерти' },
    { value: ProductCategory.Drink, label: 'Напитки' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        const product = products.find((p) => p.id === id);
        if (product) {
          this.prefill(product);
        }
      }
    });
  }

  private prefill(product: Product) {
    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.discount = product.discount ?? null;
    this.description = product.description;
    this.image = product.image;
  }

  handleSubmit() {
    if (!this.name.trim() || this.price === null || this.price <= 0) {
      this.error = 'Моля, попълнете задължителните полета.';
      return;
    }
    this.error = '';

    const productData = {
      name: this.name,
      category: this.category,
      price: this.price,
      discount: this.discount ?? 0,
      description: this.description,
      image: this.image,
    };

    console.log(this.isEditMode ? 'Редакция:' : 'Нов продукт:', productData);
    this.router.navigate(['/catalog']);
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }
}
