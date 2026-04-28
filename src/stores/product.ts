import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, CategoryItem } from '../types';
import api from '../services/api';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const featuredProducts = ref<Product[]>([]);
  const categories = ref<CategoryItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchSuggestions = ref<Product[]>([]);

  // Filter & Sort State
  const filters = ref({
    priceRange: [0, 2000],
    minRating: 0,
    brands: [] as string[],
    inStock: false
  });
  
  const activeSort = ref('featured');

  // Computed: Unique brands from current product set
  const allBrands = computed(() => {
    const brands = products.value.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)].sort();
  });

  // Computed: Filtered and Sorted Products
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Apply Price Filter
    result = result.filter(p => p.price >= filters.value.priceRange[0] && p.price <= filters.value.priceRange[1]);

    // Apply Rating Filter
    if (filters.value.minRating > 0) {
      result = result.filter(p => p.rating >= filters.value.minRating);
    }

    // Apply Brand Filter
    if (filters.value.brands.length > 0) {
      result = result.filter(p => filters.value.brands.includes(p.brand));
    }

    // Apply Availability Filter
    if (filters.value.inStock) {
      result = result.filter(p => p.stock > 0);
    }

    // Apply Sorting
    switch (activeSort.value) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // DummyJSON doesn't have dates, so we'll just reverse for "newest" effect
        result.reverse();
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  });

  interface FetchOptions {
    limit?: number;
    skip?: number;
    category?: string;
    search?: string;
    sortBy?: string;
  }

  async function fetchProducts(options: FetchOptions = {}) {
    const { limit = 30, skip = 0, category, search } = options; // Fetch more for better client-side filtering
    isLoading.value = true;
    error.value = null;
    try {
      let response;
      if (search) {
        response = await api.searchProducts(search);
      } else if (category) {
        response = await api.getProductsByCategory(category);
      } else {
        response = await api.getProducts(limit, skip);
      }
      
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
      const response = await api.getProducts(6, 0);
      featuredProducts.value = response.data.products;
    } catch (err) {
      console.error('Failed to load featured products', err);
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.getCategories();
      categories.value = response.data.slice(0, 15);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  }

  function resetFilters() {
    filters.value = {
      priceRange: [0, 2000],
      minRating: 0,
      brands: [],
      inStock: false
    };
    activeSort.value = 'featured';
  }

  return {
    products,
    featuredProducts,
    categories,
    searchSuggestions,
    isLoading,
    error,
    filters,
    activeSort,
    allBrands,
    filteredProducts,
    fetchProducts,
    fetchFeaturedProducts,
    fetchCategories,
    resetFilters
  };
});
