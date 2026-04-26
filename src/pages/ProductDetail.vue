<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="aspect-square bg-slate-100 dark:bg-white/5 animate-pulse rounded-xl"></div>
        <div class="space-y-8">
          <div class="h-10 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg w-3/4"></div>
          <div class="h-6 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg w-1/4"></div>
          <div class="h-32 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg"></div>
          <div class="h-12 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg w-1/2"></div>
        </div>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Image Gallery -->
        <div class="space-y-4">
          <div class="aspect-square bg-slate-50 dark:bg-dark-bg rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-lg">
            <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover">
          </div>
          <div class="grid grid-cols-5 gap-4">
            <button 
              v-for="(img, idx) in product.images.slice(0, 5)" 
              :key="idx"
              @click="activeImage = img"
              :class="['aspect-square rounded-lg overflow-hidden border-2 transition-all', activeImage === img ? 'border-primary-500 shadow-md' : 'border-slate-100 dark:border-white/10 hover:border-primary-300']"
            >
              <img :src="img" :alt="`${product.title} ${idx}`" class="w-full h-full object-cover">
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <nav class="flex text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 font-bold">
            <router-link to="/" class="hover:text-primary-500">Home</router-link>
            <span class="mx-2">/</span>
            <router-link to="/products" class="hover:text-primary-500">Shop</router-link>
            <span class="mx-2">/</span>
            <span class="text-slate-900 dark:text-white">{{ product.category }}</span>
          </nav>

          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            {{ product.title }}
          </h1>
          
          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center gap-1 bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              <StarIcon class="w-3 h-3 fill-current" />
              {{ product.rating }}
            </div>
            <span class="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Brand: <span class="text-slate-900 dark:text-white ml-1">{{ product.brand }}</span></span>
          </div>

          <div class="flex items-baseline gap-4 mb-8">
            <span class="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">
              ${{ discountedPrice }}
            </span>
            <div v-if="product.discountPercentage > 0" class="flex items-center gap-3">
              <span class="text-lg text-slate-400 line-through">${{ product.price }}</span>
              <span class="text-red-500 text-xs font-bold uppercase tracking-widest">Save {{ Math.round(product.discountPercentage) }}%</span>
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light italic">
            "{{ product.description }}"
          </p>

          <div class="mt-auto space-y-8">
            <div class="flex items-center gap-6">
              <label class="text-xs uppercase tracking-widest font-bold text-slate-900 dark:text-white">Quantity</label>
              <div class="flex items-center border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
                <button @click="quantity > 1 && quantity--" class="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-dark-surface text-slate-500 hover:text-primary-500">
                  <MinusIcon class="w-4 h-4" />
                </button>
                <span class="w-12 text-center font-bold text-slate-900 dark:text-white">{{ quantity }}</span>
                <button @click="quantity < product.stock && quantity++" class="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-dark-surface text-slate-500 hover:text-primary-500">
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="handleAddToCart" 
                :disabled="product.stock === 0" 
                class="flex-1 btn-primary py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCartIcon class="w-4 h-4" />
                Add To Cart
              </button>
              <button class="px-6 py-4 rounded-none border-2 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-all flex items-center justify-center">
                <HeartIcon class="w-5 h-5" />
              </button>
            </div>
            
            <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
              <div class="flex items-center gap-3">
                <TruckIcon class="w-5 h-5 text-primary-500" />
                <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Free Delivery</span>
              </div>
              <div class="flex items-center gap-3">
                <ShieldCheckIcon class="w-5 h-5 text-primary-500" />
                <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-24 bg-slate-50 dark:bg-dark-surface rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl">
        <PackageIcon class="w-16 h-16 text-slate-300 mx-auto mb-6" />
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Product Not Found</h2>
        <router-link to="/products" class="btn-primary py-4 px-8 text-xs uppercase tracking-widest font-bold">Return To Shop</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '../types';
import api from '../services/api';
import { useCartStore } from '../stores/cart';
import { 
  StarIcon, MinusIcon, PlusIcon, 
  ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon, PackageIcon 
} from 'lucide-vue-next';

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const activeImage = ref('');
const quantity = ref(1);

const discountedPrice = computed(() => {
  if (!product.value) return '0.00';
  return (product.value.price * (1 - product.value.discountPercentage / 100)).toFixed(2);
});

onMounted(async () => {
  try {
    const id = route.params.id as string;
    const response = await api.getProduct(id);
    product.value = response.data;
    activeImage.value = product.value.images[0] || product.value.thumbnail;
  } catch (err) {
    console.error('Failed to load product', err);
  } finally {
    isLoading.value = false;
  }
});

function handleAddToCart() {
  if (product.value) {
    cartStore.addItem(product.value);
  }
}
</script>
