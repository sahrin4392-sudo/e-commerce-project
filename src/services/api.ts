import axios from 'axios';
import type { ProductsResponse, Product, User } from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getProducts(limit = 12, skip = 0) {
    return apiClient.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  },
  getProduct(id: number | string) {
    return apiClient.get<Product>(`/products/${id}`);
  },
  searchProducts(query: string) {
    // Basic sanitization: remove special characters that might break API calls
    const sanitizedQuery = query.replace(/[^\w\s-]/gi, '');
    return apiClient.get<ProductsResponse>(`/products/search?q=${sanitizedQuery}`);
  },
  getCategories() {
    return apiClient.get<string[]>('/products/categories');
  },
  getProductsByCategory(category: string) {
    return apiClient.get<ProductsResponse>(`/products/category/${category}`);
  },
  login(credentials: any) {
    return apiClient.post<User>('/auth/login', credentials);
  }
};
