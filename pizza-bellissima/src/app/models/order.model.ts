export type OrderStatus = 'pending' | 'in delivery' | 'completed' | 'cancelled';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number; // EUR
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;   // EUR
  discounts: number;  // EUR
  deliveryFee: number; // EUR
  total: number;       // EUR
  date: string;        // YYYY-MM-DD
  clientId: string;
  status: OrderStatus;
}
