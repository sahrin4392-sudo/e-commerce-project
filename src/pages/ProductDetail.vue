<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="aspect-square bg-slate-100 dark:bg-white/5 animate-pulse rounded-2xl"></div>
        <div class="space-y-10">
          <div class="h-12 bg-slate-100 dark:bg-white/5 animate-pulse rounded-xl w-3/4"></div>
          <div class="h-6 bg-slate-100 dark:bg-white/5 animate-pulse rounded-xl w-1/4"></div>
          <div class="h-32 bg-slate-100 dark:bg-white/5 animate-pulse rounded-xl"></div>
          <div class="h-16 bg-slate-100 dark:bg-white/5 animate-pulse rounded-xl w-1/2"></div>
        </div>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Image Gallery -->
        <div class="space-y-6">
          <div class="aspect-square bg-slate-50 dark:bg-dark-bg rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl">
            <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
          </div>
          <div class="grid grid-cols-5 gap-4">
            <button 
              v-for="(img, idx) in product.images.slice(0, 5)" 
              :key="idx"
              @click="activeImage = img"
              :class="['aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300', activeImage === img ? 'border-primary-500 scale-105 shadow-lg' : 'border-slate-100 dark:border-white/10 hover:border-primary-300 opacity-60 hover:opacity-100']"
            >
              <img :src="img" :alt="`${product.title} ${idx}`" class="w-full h-full object-cover">
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <nav class="flex text-[10px] uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-10 font-bold items-center gap-2">
            <router-link to="/" class="hover:text-primary-500 transition-colors">Home</router-link>
            <span class="text-slate-300 dark:text-slate-800">/</span>
            <router-link to="/products" class="hover:text-primary-500 transition-colors">Shop</router-link>
            <span class="text-slate-300 dark:text-slate-800">/</span>
            <span class="text-slate-900 dark:text-white">{{ product.category }}</span>
          </nav>

          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-8 leading-tight">
            {{ product.title }}
          </h1>
          
          <div class="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-slate-100 dark:border-white/5">
            <div class="flex items-center gap-2 bg-primary-500/10 text-primary-500 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
              <StarIcon class="w-3 h-3 fill-current" />
              {{ product.rating }}
            </div>
            <span class="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-bold">Brand: <span class="text-slate-900 dark:text-white ml-1">{{ product.brand || 'Luxury Edition' }}</span></span>
            <div v-if="product.stock > 0" class="flex items-center gap-2 text-green-600 dark:text-green-500 text-[10px] uppercase tracking-widest font-bold">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              In Stock ({{ product.stock }})
            </div>
            <div v-else class="flex items-center gap-2 text-red-600 dark:text-red-500 text-[10px] uppercase tracking-widest font-bold">
              <div class="w-2 h-2 rounded-full bg-red-500"></div>
              Currently Unavailable
            </div>
          </div>

          <div class="flex items-baseline gap-6 mb-12">
            <span class="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
              ${{ discountedPrice }}
            </span>
            <div v-if="product.discountPercentage > 0" class="flex items-center gap-4">
              <span class="text-xl text-slate-400 line-through">${{ product.price }}</span>
              <span class="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold tracking-widest uppercase rounded-lg border border-red-100 dark:border-red-500/20">Exclusive {{ Math.round(product.discountPercentage) }}% Saving</span>
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-300 text-lg mb-12 leading-relaxed font-light italic">
            "{{ product.description }}"
          </p>

          <div class="mt-auto space-y-12">
            <div class="flex items-center gap-8">
              <label class="text-xs uppercase tracking-widest font-bold text-slate-900 dark:text-white">Select Quantity</label>
              <div class="flex items-center border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-dark-bg p-1">
                <button @click="quantity > 1 && quantity--" class="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                  <MinusIcon class="w-5 h-5" />
                </button>
                <span class="w-12 text-center font-bold text-slate-900 dark:text-white text-lg">{{ quantity }}</span>
                <button @click="quantity < product.stock && quantity++" class="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                  <PlusIcon class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-6">
              <button 
                @click="handleAddToCart" 
                :disabled="product.stock === 0" 
                class="flex-[2] btn-primary py-6 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ShoppingCartIcon class="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                Add to Collective Bag
              </button>
              <button class="flex-1 py-6 px-8 rounded-none border-2 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-all flex items-center justify-center group">
                <HeartIcon class="w-6 h-6 transition-transform group-hover:scale-125 group-hover:fill-current" />
              </button>
            </div>
            
            <!-- Trust Badges -->
            <div class="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
              <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <TruckIcon class="w-5 h-5" />
                </div>
                <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">White Glove Delivery</span>
              </div>
              <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <ShieldCheckIcon class="w-5 h-5" />
                </div>
                <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">2 Year Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-48 bg-slate-50 dark:bg-dark-surface rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl mx-4">
        <PackageIcon class="w-20 h-20 text-slate-300 mx-auto mb-8" />
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-tighter">Collection Piece Not Found</h2>
        <router-link to="/products" class="btn-primary py-4 px-12 text-xs uppercase tracking-[0.2em] font-bold">Return to Collections</router-link>
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
  StarIcon, CheckCircleIcon, XCircleIcon, MinusIcon, PlusIcon, 
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
    cartStore.addToCart(product.value, quantity.value);
  }
}
</script>
