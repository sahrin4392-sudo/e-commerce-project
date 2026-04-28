<template>
  <div class="min-h-screen pt-24 pb-12 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="flex items-end justify-between mb-8 md:mb-12 border-b border-slate-200 dark:border-white/10 pb-6 animate-fade-in">
        <div>
          <h1 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-2">My Wishlist</h1>
          <p class="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest text-xs">Curated Selection</p>
        </div>
        <div class="text-right">
          <span class="text-sm font-bold text-slate-900 dark:text-white">{{ wishlistStore.totalItems }} Items</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <LoadingSkeleton v-for="i in 4" :key="i" />
      </div>

      <!-- Empty State -->
      <div v-else-if="wishlistStore.items.length === 0" class="flex flex-col items-center justify-center py-20 px-4 animate-slide-up">
        <div class="w-24 h-24 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
          <HeartIcon class="w-10 h-10 text-slate-300 dark:text-slate-600" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3 text-center">Your wishlist is empty</h2>
        <p class="text-slate-500 dark:text-slate-400 max-w-md text-center mb-8 text-sm">Discover our exclusive collection and save your favorite items for later.</p>
        <router-link to="/products" class="btn-primary py-4 px-8">
          Explore Collection
        </router-link>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div 
            v-for="(product, index) in wishlistStore.items" 
            :key="product.id"
            class="group relative flex flex-col bg-white dark:bg-dark-surface border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-slide-up"
            :style="{ transitionDelay: `${index * 50}ms` }"
          >
            <!-- Image -->
            <div class="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img 
                :src="product.thumbnail" 
                :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <!-- Badge -->
              <div v-if="product.discountPercentage > 15" class="absolute top-4 left-4 bg-primary-500 text-white dark:text-dark-bg text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                Exclusive
              </div>

              <!-- Remove Action -->
              <button 
                @click.stop="wishlistStore.removeFromWishlist(product.id)"
                class="absolute top-4 right-4 p-2 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm text-slate-900 dark:text-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all transform opacity-0 group-hover:opacity-100 duration-300 translate-y-2 group-hover:translate-y-0 z-20"
                title="Remove from Wishlist"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{{ getCategoryName(product.category) }}</span>
              </div>
              
              <router-link :to="`/product/${product.id}`" class="block">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight group-hover:text-primary-500 transition-colors line-clamp-1">{{ product.title }}</h3>
              </router-link>
              
              <div class="mt-auto flex flex-col pt-4 border-t border-slate-50 dark:border-white/5 gap-4">
                <div class="flex flex-col">
                  <span v-if="product.discountPercentage" class="text-[10px] text-slate-400 line-through mb-0.5">${{ (product.price * 1.2).toFixed(2) }}</span>
                  <span class="text-lg font-bold text-slate-900 dark:text-white tracking-tighter">${{ product.price }}</span>
                </div>
                
                <button 
                  @click="moveToCart(product)" 
                  class="w-full btn-primary text-[10px] py-3.5 flex justify-center items-center gap-2 group/btn uppercase tracking-widest font-bold"
                >
                  <ShoppingCartIcon class="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Wishlist -->
        <div class="mt-16 flex justify-center md:justify-end">
          <button 
            @click="wishlistStore.clearWishlist"
            class="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-all flex items-center gap-2 group"
          >
            <Trash2Icon class="w-4 h-4 transition-transform group-hover:rotate-12" />
            Clear Wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { HeartIcon, ShoppingCartIcon, XIcon, Trash2Icon } from 'lucide-vue-next';
import { useWishlistStore } from '../stores/wishlist';
import { useCartStore } from '../stores/cart';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import type { Product } from '../types';
import { getCategoryName } from '../types';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});

function moveToCart(product: Product) {
  cartStore.addItem(product);
  wishlistStore.removeFromWishlist(product.id);
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
