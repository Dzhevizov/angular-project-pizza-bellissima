import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

interface CategoryItem {
  id: ProductCategory;
  label: string;
}

const categories: CategoryItem[] = [
  { id: ProductCategory.Pizza, label: 'Италиански пици' },
  { id: ProductCategory.Pasta, label: 'Паста' },
  { id: ProductCategory.Risotto, label: 'Ризото' },
  { id: ProductCategory.Dessert, label: 'Десерти' },
  { id: ProductCategory.Drink, label: 'Напитки' },
];

const categoryTitles: Record<ProductCategory, string> = {
  [ProductCategory.Pizza]: 'Италиански пици',
  [ProductCategory.Pasta]: 'Паста',
  [ProductCategory.Risotto]: 'Ризото',
  [ProductCategory.Dessert]: 'Десерти',
  [ProductCategory.Drink]: 'Напитки',
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  private allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories = categories;
  selectedCategory: ProductCategory = ProductCategory.Pizza;
  title = categoryTitles[this.selectedCategory];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.isLoading = false;
        this.route.paramMap.subscribe((params) => {
          const category = (params.get('category') as ProductCategory) || ProductCategory.Pizza;
          this.selectCategory(category);
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  goToAddProduct() {
    this.router.navigate(['/product/add']);
  }

  selectCategory(category: string | ProductCategory) {
    const requestedCategory = category as ProductCategory;
    const selected = Object.values(ProductCategory).includes(requestedCategory)
      ? requestedCategory
      : ProductCategory.Pizza;

    this.selectedCategory = selected;
    this.title = categoryTitles[selected];
    this.filteredProducts = this.allProducts.filter((p) => p.category === selected);
  }
}
