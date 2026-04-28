import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EurToLevPipe } from '../../pipes/eur-to-lev.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EurToLevPipe],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  private editId: string | null = null;

  isEditMode = false;
  error = '';
  isLoading = false;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = id;
        this.productService.getProductById(id).subscribe({
          next: (product) => {
            this.name = product.name;
            this.category = product.category;
            this.price = product.price;
            this.discount = product.discount ?? null;
            this.description = product.description;
            this.image = product.image;
          },
        });
      }
    });
  }

  handleSubmit() {
    if (!this.name.trim() || this.price === null || this.price <= 0) {
      this.error = 'Моля, попълнете задължителните полета.';
      return;
    }
    this.error = '';
    this.isLoading = true;

    const productData = {
      name: this.name,
      category: this.category,
      price: this.price,
      discount: this.discount ?? 0,
      description: this.description,
      image: this.image,
    };

    const request$ = this.isEditMode && this.editId
      ? this.productService.updateProduct(this.editId, productData)
      : this.productService.createProduct(productData);

    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Грешка при запазване. Моля, опитайте отново.';
      },
    });
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }
}
