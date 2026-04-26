import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';
import api from '../services/api';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const featuredProducts = ref<Product[]>([]);
  const categories = ref<string[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchSuggestions = ref<Product[]>([]);

  async function fetchProducts(limit = 12, skip = 0) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.getProducts(limit, skip);
      products.value = response.data.products;
    } catch (err: any) {
      error.value = 'Failed to load products';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchFeaturedProducts() {
    try {
      const response = await api.getProducts(4, 0);
      featuredProducts.value = response.data.products;
    } catch (err) {
      console.error('Failed to load featured products', err);
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.getCategories();
      categories.value = response.data.slice(0, 10); // limit to 10 for UI purposes
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  }

  async function searchProducts(query: string) {
    isLoading.value = true;
    try {
      const response = await api.searchProducts(query);
      products.value = response.data.products;
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function getSuggestions(query: string) {
    if (!query.trim()) {
      searchSuggestions.value = [];
      return;
    }
    try {
      const response = await api.searchProducts(query);
      searchSuggestions.value = response.data.products.slice(0, 6);
    } catch (err) {
      console.error('Suggestions failed', err);
    }
  }

  async function filterByCategory(category: string) {
    isLoading.value = true;
    try {
      const response = await api.getProductsByCategory(category);
      products.value = response.data.products;
    } catch (err) {
      console.error('Filter failed', err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    featuredProducts,
    categories,
    searchSuggestions,
    isLoading,
    error,
    fetchProducts,
    fetchFeaturedProducts,
    fetchCategories,
    searchProducts,
    getSuggestions,
    filterByCategory
  };
});
