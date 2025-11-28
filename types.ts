export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  shortDescription: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageRoute {
  HOME = '/',
  SHOP = '/shop',
  ABOUT = '/about',
  PRODUCT = '/product/:id',
  CART = '/cart'
}
