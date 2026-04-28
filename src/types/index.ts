export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export type CategoryItem = string | ProductCategory;

export function getCategoryName(cat: CategoryItem): string {
  if (typeof cat === 'object' && cat !== null) return cat.name;
  return cat as string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
