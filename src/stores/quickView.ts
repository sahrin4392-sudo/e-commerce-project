import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';

export const useQuickViewStore = defineStore('quickView', () => {
  const isOpen = ref(false);
  const selectedProduct = ref<Product | null>(null);

  function openModal(product: Product) {
    selectedProduct.value = product;
    isOpen.value = true;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    isOpen.value = false;
    // Delay clearing the product to allow closing animation to finish
    setTimeout(() => {
      selectedProduct.value = null;
      document.body.style.overflow = '';
    }, 300);
  }

  return {
    isOpen,
    selectedProduct,
    openModal,
    closeModal
  };
});
