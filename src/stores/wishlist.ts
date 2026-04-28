import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '../types';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([]);

  // Initialize from local storage
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    try {
      items.value = JSON.parse(savedWishlist);
    } catch (e) {
      localStorage.removeItem('wishlist');
    }
  }

  // Save to local storage whenever items change
  watch(items, (newItems) => {
    localStorage.setItem('wishlist', JSON.stringify(newItems));
  }, { deep: true });

  const totalItems = computed(() => items.value.length);

  function addToWishlist(product: Product) {
    if (!isInWishlist(product.id)) {
      items.value.push(product);
    }
  }

  function removeFromWishlist(productId: number) {
    items.value = items.value.filter(item => item.id !== productId);
  }

  function toggleWishlist(product: Product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function clearWishlist() {
    items.value = [];
  }

  function isInWishlist(productId: number): boolean {
    return items.value.some(item => item.id === productId);
  }

  return {
    items,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist
  };
});
