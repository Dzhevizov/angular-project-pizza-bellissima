import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, timer, switchMap } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly EUR_TO_LEV = 1.95583;

  orders$!: Observable<Order[]>;
  private pollSub!: Subscription;

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const fetchOrders = () => this.authService.isAdmin
      ? this.orderService.getTodayOrders()
      : this.orderService.getMyOrders();

    this.orders$ = fetchOrders();

    this.pollSub = timer(30_000, 30_000).subscribe(() => {
      this.orders$ = fetchOrders();
    });
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }

  toLev(eur: number): string {
    return (eur * this.EUR_TO_LEV).toFixed(2);
  }

  statusLabel(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
      'pending': 'Изчакваща',
      'in delivery': 'В доставка',
      'completed': 'Завършена',
      'cancelled': 'Отказана',
    };
    return labels[status] ?? status;
  }
}
