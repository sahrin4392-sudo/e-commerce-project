<template>
  <div class="group bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 overflow-hidden hover:shadow-2xl hover:border-primary-500/30 transition-all duration-500 flex flex-col h-full">
    <!-- Image Container -->
    <div class="relative w-full aspect-[4/5] bg-slate-50 dark:bg-dark-bg overflow-hidden cursor-pointer" @click="$router.push(`/product/${product.id}`)">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
      
      <!-- Badges -->
      <div class="absolute top-4 left-4 flex flex-col gap-2">
        <span v-if="product.discountPercentage > 10" class="px-3 py-1 bg-primary-500 text-white dark:text-dark-bg text-[10px] font-bold rounded-none shadow-lg uppercase tracking-widest">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
        <span class="px-3 py-1 bg-white/90 dark:bg-dark-bg/90 text-slate-900 dark:text-white text-[10px] font-bold border border-slate-100 dark:border-white/10 rounded-none shadow-sm backdrop-blur-sm flex items-center gap-1">
          <StarIcon class="w-3 h-3 text-primary-500 fill-current" />
          {{ product.rating }}
        </span>
      </div>

      <!-- Overlay Quick Actions -->
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button 
          @click.stop="addToCart" 
          class="p-4 bg-white dark:bg-dark-bg text-primary-500 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-primary-500 hover:text-white dark:hover:text-dark-bg"
        >
          <ShoppingCartIcon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <div class="text-[10px] font-bold text-primary-500 mb-3 uppercase tracking-[0.25em]">{{ product.category }}</div>
      
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-1 cursor-pointer hover:text-primary-500 transition-colors uppercase tracking-tight" @click="$router.push(`/product/${product.id}`)">
        {{ product.title }}
      </h3>
      
      <p class="text-slate-500 dark:text-slate-400 text-sm font-light mb-6 line-clamp-2 flex-grow leading-relaxed">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto border-t border-slate-50 dark:border-white/5 pt-5">
        <div class="flex flex-col">
          <span class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            ${{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}
          </span>
          <span v-if="product.discountPercentage > 0" class="text-xs text-slate-400 line-through">
            ${{ product.price }}
          </span>
        </div>
        <button @click="addToCart" class="group flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span>Add to Bag</span>
          <PlusIcon class="w-3 h-3 transition-transform group-hover:rotate-90" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart';
import { StarIcon, ShoppingCartIcon, PlusIcon } from 'lucide-vue-next';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const cartStore = useCartStore();

function addToCart() {
  cartStore.addToCart(props.product);
}
</script>
