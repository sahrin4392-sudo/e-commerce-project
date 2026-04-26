<template>
  <div class="group relative flex flex-col bg-white dark:bg-dark-surface border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Overlay Actions -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
        <button 
          @click.stop="quickView"
          class="p-3 bg-white dark:bg-dark-bg text-slate-900 dark:text-white rounded-full shadow-xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
          title="Quick View"
        >
          <EyeIcon class="w-5 h-5" />
        </button>
        <button 
          @click.stop="addToCart"
          class="p-3 bg-white dark:bg-dark-bg text-slate-900 dark:text-white rounded-full shadow-xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
          title="Add to Cart"
        >
          <ShoppingCartIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Badge -->
      <div v-if="product.discountPercentage > 15" class="absolute top-4 left-4 bg-primary-500 text-white dark:text-dark-bg text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
        Exclusive Offer
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{{ product.category }}</span>
        <div class="flex items-center gap-1 text-primary-500">
          <StarIcon class="w-3 h-3 fill-current" />
          <span class="text-[10px] font-bold">{{ product.rating }}</span>
        </div>
      </div>
      
      <router-link :to="`/product/${product.id}`" class="block">
        <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight group-hover:text-primary-500 transition-colors line-clamp-1">{{ product.title }}</h3>
      </router-link>
      
      <div class="mt-auto flex items-end justify-between pt-4 border-t border-slate-50 dark:border-white/5">
        <div class="flex flex-col">
          <span v-if="product.discountPercentage" class="text-[10px] text-slate-400 line-through mb-0.5">${{ (product.price * 1.2).toFixed(2) }}</span>
          <span class="text-lg font-bold text-slate-900 dark:text-white tracking-tighter">${{ product.price }}</span>
        </div>
        <button @click.stop="addToCart" class="text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-1">
          Add To Cart
          <PlusIcon class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon, EyeIcon, StarIcon, PlusIcon } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const props = defineProps<{
  product: any
}>();

const cartStore = useCartStore();
const router = useRouter();

function addToCart() {
  cartStore.addItem(props.product);
}

function quickView() {
  router.push(`/product/${props.product.id}`);
}
</script>
