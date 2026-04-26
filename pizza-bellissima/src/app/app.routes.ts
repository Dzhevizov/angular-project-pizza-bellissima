import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'catalog',
    pathMatch: 'full',
    component: CatalogComponent,
  },
  {
    path: 'catalog/:category',
    component: CatalogComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
];
