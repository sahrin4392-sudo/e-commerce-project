<template>
  <transition name="fade">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-[100]" @click="cartStore.toggleDrawer"></div>
  </transition>

  <transition name="slide-left">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white dark:bg-dark-surface border-l border-slate-200 dark:border-white/5 shadow-2xl flex flex-col transform transition-transform duration-500">
      <!-- Header -->
      <div class="px-10 py-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ShoppingCartIcon class="w-5 h-5 text-primary-500" />
          <h2 class="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Your Collective</h2>
        </div>
        <button @click="cartStore.toggleDrawer" class="p-2 text-slate-400 hover:text-primary-500 transition-colors transform hover:rotate-90 duration-300">
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-center">
          <div class="w-20 h-20 bg-slate-50 dark:bg-dark-bg rounded-full flex items-center justify-center mb-8 shadow-xl">
            <ShoppingCartIcon class="w-10 h-10 text-slate-200" />
          </div>
          <p class="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">Your bag is empty</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-10 max-w-[200px]">Begin your collection with our exceptional pieces</p>
          <button @click="cartStore.toggleDrawer" class="btn-primary py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-bold">Discover Pieces</button>
        </div>

        <ul v-else class="space-y-10">
          <li v-for="item in cartStore.items" :key="item.id" class="flex gap-8 group">
            <div class="w-24 h-28 shrink-0 bg-slate-50 dark:bg-dark-bg rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 relative">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            </div>
            <div class="flex-1 flex flex-col py-1">
              <div class="flex justify-between items-start gap-4 mb-2">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight line-clamp-2 leading-relaxed">{{ item.title }}</h3>
                <p class="text-xs font-bold text-slate-900 dark:text-white tracking-tighter">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
              </div>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mb-6">{{ item.category }}</p>
              
              <div class="flex items-center justify-between mt-auto">
                <div class="flex items-center border border-slate-100 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-dark-bg p-0.5">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                    <MinusIcon class="w-3 h-3" />
                  </button>
                  <span class="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors">
                    <PlusIcon class="w-3 h-3" />
                  </button>
                </div>
                <button @click="cartStore.removeFromCart(item.id)" class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-0.5">Remove</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-slate-100 dark:border-white/5 p-10 bg-slate-50/50 dark:bg-dark-bg/20">
        <div class="flex justify-between text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">
          <p>Total Investment</p>
          <p class="text-xl text-primary-500 tracking-tighter">${{ cartStore.totalPrice.toFixed(2) }}</p>
        </div>
        <p class="text-[10px] text-slate-400 uppercase tracking-widest mb-10 font-bold">Complimentary White-Glove Shipping</p>
        <button @click="$router.push('/cart'); cartStore.toggleDrawer()" class="w-full btn-primary py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-2xl shadow-primary-500/20 group">
          Finalize Selection
          <ArrowRightIcon class="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { XIcon, ShoppingCartIcon, PlusIcon, MinusIcon, ArrowRightIcon } from 'lucide-vue-next';

const cartStore = useCartStore();
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.3);
}
</style>
