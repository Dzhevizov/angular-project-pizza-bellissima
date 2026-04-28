import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { guestGuard } from './guards/guest.guard';

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
    path: 'product/add',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product/edit/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'orders',
    pathMatch: 'full',
    component: OrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
];
