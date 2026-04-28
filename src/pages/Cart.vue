<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Shopping Bag</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2">
            You have {{ cartStore.totalItems }} pieces in your collection
          </p>
        </div>
        <router-link to="/products" class="text-xs font-bold uppercase tracking-widest text-primary-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          Continue Shopping
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col lg:flex-row gap-12">
        <div class="flex-1 space-y-6">
          <CartItemSkeleton v-for="i in 3" :key="i" />
        </div>
        <div class="w-full lg:w-96 shrink-0">
          <div class="bg-slate-50 dark:bg-dark-surface rounded-2xl p-8 border border-slate-100 dark:border-white/5 space-y-8">
            <Skeleton width="40%" height="24px" :shimmer="true" />
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex justify-between">
                <Skeleton width="60px" height="12px" :shimmer="true" />
                <Skeleton width="40px" height="12px" :shimmer="true" />
              </div>
            </div>
            <Skeleton width="100%" height="56px" :shimmer="true" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="cartStore.items.length === 0" class="text-center py-24 bg-slate-50 dark:bg-dark-surface rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl animate-fade-in">
        <ShoppingCartIcon class="w-16 h-16 text-slate-300 mx-auto mb-6" />
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">Your bag is empty</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto">Explore our collections and discover pieces that speak to your style.</p>
        <router-link to="/products" class="btn-primary py-4 px-8 text-xs uppercase tracking-widest font-bold">Shop Collections</router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="flex flex-col lg:flex-row gap-12 animate-fade-in">
        <!-- Cart Items list -->
        <div class="flex-1 space-y-6">
          <div v-for="item in cartStore.items" :key="item.id" class="group bg-white dark:bg-dark-surface p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
            
            <div class="w-32 h-32 shrink-0 bg-slate-50 dark:bg-dark-bg rounded-lg overflow-hidden cursor-pointer" @click="$router.push(`/product/${item.id}`)">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover">
            </div>
            
            <div class="flex-1 flex flex-col justify-between w-full">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight cursor-pointer hover:text-primary-500 transition-colors" @click="$router.push(`/product/${item.id}`)">{{ item.title }}</h3>
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{{ getCategoryName(item.category) }}</p>
                </div>
                <p class="text-lg font-bold text-slate-900 dark:text-white tracking-tighter">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center border border-slate-100 dark:border-white/10 rounded-lg overflow-hidden bg-slate-50 dark:bg-dark-bg">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary-500">
                    <MinusIcon class="w-3 h-3" />
                  </button>
                  <span class="w-10 text-center font-bold text-slate-900 dark:text-white text-sm">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary-500">
                    <PlusIcon class="w-3 h-3" />
                  </button>
                </div>
                
                <button @click="cartStore.removeItem(item.id)" class="text-slate-400 hover:text-red-500 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1 transition-colors">
                  <Trash2Icon class="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-96 shrink-0">
          <div class="bg-slate-50 dark:bg-dark-surface rounded-2xl p-8 border border-slate-100 dark:border-white/5 shadow-xl sticky top-28">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-white/10 pb-4">Summary</h2>
            
            <div class="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
              <div class="flex justify-between">
                <span>Total Items</span>
                <span class="text-slate-900 dark:text-white">{{ cartStore.totalItems }}</span>
              </div>
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span class="text-green-500">Free</span>
              </div>
            </div>
            
            <div class="border-t border-slate-200 dark:border-white/10 pt-6 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Order Total</span>
                <span class="text-2xl font-bold text-primary-500 tracking-tighter">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
            </div>
            
            <button @click="handleCheckout" class="w-full btn-primary py-4 text-xs uppercase tracking-widest font-bold flex justify-center items-center gap-2 group">
              Checkout
              <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <div class="mt-8 flex flex-col items-center gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
              <div class="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                <ShieldCheckIcon class="w-4 h-4 text-primary-500" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import CartItemSkeleton from '../components/CartItemSkeleton.vue';
import Skeleton from '../components/Skeleton.vue';
import { ShoppingCartIcon, MinusIcon, PlusIcon, Trash2Icon, ArrowRightIcon, ShieldCheckIcon } from 'lucide-vue-next';
import { getCategoryName } from '../types';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(true);

onMounted(() => {
  // Simulate minor loading delay for visual polish
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

function handleCheckout() {
  if (!authStore.token) {
    alert('Please login to checkout');
    router.push('/login');
    return;
  }
  
  router.push('/payment');
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
