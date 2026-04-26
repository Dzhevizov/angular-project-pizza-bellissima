import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-top-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-offers.component.html',
  styleUrls: ['./top-offers.component.css'],
})
export class TopOffersComponent {
  topOffers: Product[] = products.slice(0, 4);

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
