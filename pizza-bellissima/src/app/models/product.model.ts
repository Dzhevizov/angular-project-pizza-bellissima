export enum ProductCategory {
  Pizza = 'pizza',
  Pasta = 'pasta',
  Risotto = 'risotto',
  Dessert = 'dessert',
  Drink = 'drink',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: ProductCategory;
  image: string;
}
