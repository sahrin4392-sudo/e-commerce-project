<template>
  <transition name="modal-fade">
    <div 
      v-if="store.isOpen && product" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="product.title"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md"
        @click="store.closeModal"
      ></div>

      <!-- Modal Content -->
      <div 
        class="relative w-full max-w-5xl bg-white dark:bg-dark-surface shadow-2xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row transform transition-all duration-500 max-h-[90vh] md:max-h-none"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click="store.closeModal"
          class="absolute top-6 right-6 z-10 p-2 bg-slate-100 dark:bg-dark-bg text-slate-500 hover:text-primary-500 dark:text-slate-400 rounded-full transition-all hover:rotate-90"
        >
          <XIcon class="w-6 h-6" />
        </button>

        <!-- Left: Image Gallery -->
        <div class="w-full md:w-1/2 bg-slate-50 dark:bg-dark-bg p-8 flex items-center justify-center">
          <div class="aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-white/5">
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Right: Details -->
        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div class="mb-8">
            <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-500 mb-4 block">Exclusive Selection</span>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4 leading-none">
              {{ product.title }}
            </h2>
            
            <div class="flex items-center gap-6 mb-6">
              <div class="flex items-center gap-1 text-primary-500">
                <StarIcon v-for="i in 5" :key="i" class="w-3 h-3" :class="{ 'fill-current': i <= Math.round(product.rating) }" />
                <span class="text-[10px] font-bold ml-2 text-slate-400">({{ product.rating }})</span>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Brand: <span class="text-slate-900 dark:text-white">{{ product.brand }}</span></span>
            </div>

            <div class="flex items-baseline gap-4 mb-8">
              <span class="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">${{ product.price }}</span>
              <span v-if="product.discountPercentage > 0" class="text-sm text-slate-400 line-through">${{ (product.price * 1.2).toFixed(2) }}</span>
            </div>

            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light mb-10 italic">
              "{{ product.description }}"
            </p>
          </div>

          <!-- Actions -->
          <div class="mt-auto space-y-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="addToCart"
                class="flex-1 btn-primary py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon class="w-4 h-4" />
                Add To Cart
              </button>
              
              <button 
                @click="wishlistStore.toggleWishlist(product)"
                class="px-6 py-4 border-2 transition-all flex items-center justify-center rounded-none"
                :class="wishlistStore.isInWishlist(product.id) ? 'border-primary-500 text-primary-500 bg-primary-500/5' : 'border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary-500 hover:text-primary-500'"
              >
                <HeartIcon class="w-5 h-5" :class="{ 'fill-current': wishlistStore.isInWishlist(product.id) }" />
              </button>
            </div>

            <router-link 
              :to="`/product/${product.id}`" 
              @click="store.closeModal"
              class="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary-500 transition-colors"
            >
              View Full Product Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useQuickViewStore } from '../stores/quickView';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { XIcon, StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-vue-next';

const store = useQuickViewStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = computed(() => store.selectedProduct);

function addToCart() {
  if (product.value) {
    cartStore.addItem(product.value);
    store.closeModal();
  }
}

// Handle ESC key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && store.isOpen) {
    store.closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Custom scrollbar for details section */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-white/10 rounded-full;
}
</style>
