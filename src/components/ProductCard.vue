<template>
  <div class="group relative flex flex-col bg-white dark:bg-dark-surface border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 rounded-2xl">
    <!-- Image -->
    <div class="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-dark-bg">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        @error="handleImageError"
        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Wishlist Toggle -->
      <button 
        @click.stop="wishlistStore.toggleWishlist(product)"
        class="absolute top-5 right-5 z-10 p-3 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-90 group/heart"
        :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-400'"
      >
        <HeartIcon 
          class="w-5 h-5 transition-all duration-300" 
          :class="{ 'fill-current': wishlistStore.isInWishlist(product.id) }" 
        />
      </button>

      <!-- Overlay Actions -->
      <div class="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
        <button 
          @click.stop="handleQuickView"
          class="p-4 bg-white dark:bg-dark-bg text-slate-900 dark:text-white rounded-full shadow-2xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500"
          title="Quick View"
        >
          <EyeIcon class="w-5 h-5" />
        </button>
        <button 
          @click.stop="addToCart"
          class="p-4 bg-white dark:bg-dark-bg text-slate-900 dark:text-white rounded-full shadow-2xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-100"
          title="Add to Cart"
        >
          <ShoppingCartIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Badge -->
      <div v-if="product.discountPercentage > 15" class="absolute top-5 left-5 bg-primary-500 text-white dark:text-dark-bg text-[9px] font-bold px-4 py-1.5 uppercase tracking-[0.2em] z-10">
        Exclusive
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-3">
        <span class="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold leading-none">
          {{ getCategoryName(product.category) }}
        </span>
        <div class="flex items-center gap-1 text-primary-500">
          <StarIcon class="w-3 h-3 fill-current" />
          <span class="text-[10px] font-bold">{{ product.rating }}</span>
        </div>
      </div>
      
      <router-link :to="`/product/${product.id}`" class="block">
        <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-tight group-hover:text-primary-500 transition-colors line-clamp-1 leading-tight">
          {{ product.title }}
        </h3>
      </router-link>
      
      <div class="mt-auto flex items-end justify-between pt-5 border-t border-slate-50 dark:border-white/5">
        <div class="flex flex-col">
          <span v-if="product.discountPercentage" class="text-[10px] text-slate-400 line-through mb-1">${{ (product.price * 1.2).toFixed(2) }}</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">${{ product.price }}</span>
        </div>
        <button @click.stop="addToCart" class="text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-2 group/btn">
          Buy Now
          <PlusIcon class="w-3 h-3 transition-transform group-hover/btn:rotate-90" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon, EyeIcon, StarIcon, PlusIcon, HeartIcon } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { useQuickViewStore } from '../stores/quickView';
import type { Product } from '../types';
import { getCategoryName } from '../types';

const props = defineProps<{
  product: Product
}>();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const quickViewStore = useQuickViewStore();

function addToCart() {
  cartStore.addItem(props.product);
}

function handleQuickView() {
  quickViewStore.openModal(props.product);
}

function handleImageError(e: Event) {
  const target = e.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80';
}
</script>
