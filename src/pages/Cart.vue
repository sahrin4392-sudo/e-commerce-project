<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Your Collective Bag</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Review your selected pieces before checkout</p>
        </div>
        <router-link to="/products" class="text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:text-slate-900 dark:hover:text-white transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-1">
          Continue Shopping
        </router-link>
      </div>

      <div v-if="cartStore.items.length === 0" class="text-center py-48 bg-slate-50 dark:bg-dark-surface rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl">
        <div class="w-24 h-24 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
          <ShoppingCartIcon class="w-10 h-10 text-slate-300" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">Your bag is currently empty</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-12 max-w-sm mx-auto font-light italic">Discover our curated collections and find the perfect addition to your lifestyle.</p>
        <router-link to="/products" class="btn-primary py-5 px-12 text-xs uppercase tracking-widest font-bold">Explore Collections</router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-16">
        <!-- Cart Items list -->
        <div class="flex-1 space-y-8">
          <div v-for="item in cartStore.items" :key="item.id" class="group bg-white dark:bg-dark-surface p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row gap-10 items-center sm:items-stretch">
            
            <div class="w-40 h-48 shrink-0 bg-slate-50 dark:bg-dark-bg rounded-2xl overflow-hidden cursor-pointer relative" @click="$router.push(`/product/${item.id}`)">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
            
            <div class="flex-1 flex flex-col justify-between w-full py-2">
              <div class="flex justify-between items-start gap-6 border-b border-slate-50 dark:border-white/5 pb-6">
                <div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-2 cursor-pointer hover:text-primary-500 transition-colors" @click="$router.push(`/product/${item.id}`)">{{ item.title }}</h3>
                  <p class="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{{ item.category }} | House of {{ item.brand || 'Sahrin' }}</p>
                </div>
                <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
              </div>
              
              <div class="flex items-center justify-between mt-8">
                <div class="flex items-center border border-slate-100 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-dark-bg p-1">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <span class="w-10 text-center font-bold text-slate-900 dark:text-white">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                </div>
                
                <button @click="cartStore.removeFromCart(item.id)" class="text-slate-400 hover:text-red-500 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 transition-colors group/remove">
                  <Trash2Icon class="w-4 h-4 transition-transform group-hover/remove:scale-110" /> 
                  <span class="border-b border-transparent group-hover/remove:border-red-500 pb-0.5">Remove Piece</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-[400px] shrink-0">
          <div class="bg-slate-50 dark:bg-dark-surface rounded-3xl p-10 border border-slate-100 dark:border-white/5 shadow-2xl sticky top-28">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-10 border-b border-slate-200 dark:border-white/10 pb-6 flex items-center gap-3">
              Summary
              <span class="w-2 h-2 rounded-full bg-primary-500"></span>
            </h2>
            
            <div class="space-y-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-10">
              <div class="flex justify-between">
                <span>Total Pieces</span>
                <span class="text-slate-900 dark:text-white">{{ cartStore.totalItems }}</span>
              </div>
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Concierge Shipping</span>
                <span class="text-primary-500">Complimentary</span>
              </div>
              <div class="flex justify-between">
                <span>Estimated VAT</span>
                <span class="text-slate-900 dark:text-white">$0.00</span>
              </div>
            </div>
            
            <div class="border-t-2 border-dashed border-slate-200 dark:border-white/10 pt-10 mb-12">
              <div class="flex justify-between items-center mb-4">
                <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Total Investment</span>
                <span class="text-3xl font-bold text-primary-500 tracking-tighter">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <p class="text-[10px] text-slate-400 font-medium italic">All taxes and duties included at checkout</p>
            </div>
            
            <button @click="handleCheckout" class="w-full btn-primary py-6 text-xs uppercase tracking-[0.2em] font-bold flex justify-center items-center gap-4 group">
              Finalize Order
              <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
            
            <div class="mt-10 flex flex-col items-center gap-4 pt-8 border-t border-slate-200 dark:border-white/5">
              <div class="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                <ShieldCheckIcon class="w-5 h-5 text-primary-500" />
                Secure Concierge Checkout
              </div>
              <div class="flex gap-4 opacity-30 grayscale dark:invert">
                <!-- Payment Icons Placeholder -->
                <div class="w-8 h-5 bg-slate-400 rounded"></div>
                <div class="w-8 h-5 bg-slate-400 rounded"></div>
                <div class="w-8 h-5 bg-slate-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ShoppingCartIcon, MinusIcon, PlusIcon, Trash2Icon, ArrowRightIcon, ShieldCheckIcon } from 'lucide-vue-next';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

function handleCheckout() {
  if (!authStore.token) {
    alert('Please sign in to proceed with your order.');
    router.push('/login');
    return;
  }
  
  alert('Proceeding to dummy checkout! Order successful.');
  cartStore.clearCart();
  router.push('/dashboard');
}
</script>
