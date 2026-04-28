export enum ProductCategory {
  Pizza = 'pizza',
  Pasta = 'pasta',
  Risotto = 'risotto',
  Dessert = 'dessert',
  Drink = 'drink',
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: ProductCategory;
  image: string;
  size?: string;
  ingredients?: string;
  isStatic?: boolean;
}
