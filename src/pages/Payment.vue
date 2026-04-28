<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500 py-16 md:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Secure Payment</h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">Finalize your investment in excellence</p>
      </div>

      <div class="grid grid-cols-1 gap-12">
        <!-- Order Summary (Small Version) -->
        <div class="glass-card p-8 border-primary-500/20 bg-primary-500/5">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Total Investment</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">${{ cartStore.totalPrice.toFixed(2) }}</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Items</p>
              <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">{{ cartStore.totalItems }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Form -->
        <form @submit.prevent="processPayment" class="space-y-8">
          <div class="space-y-6">
            <h2 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <CreditCardIcon class="w-4 h-4 text-primary-500" />
              Card Information
            </h2>
            
            <div class="space-y-4">
              <div class="relative group">
                <label class="absolute -top-2.5 left-4 px-2 bg-white dark:bg-dark-bg text-[10px] font-bold text-slate-400 group-focus-within:text-primary-500 uppercase tracking-widest transition-colors z-10">Cardholder Name</label>
                <input 
                  v-model="form.name" 
                  required
                  type="text" 
                  placeholder="e.g. JULIANNE VARENCE" 
                  class="input-field py-5 !rounded-none border-slate-200 dark:border-white/10 uppercase tracking-widest text-xs"
                >
              </div>

              <div class="relative group">
                <label class="absolute -top-2.5 left-4 px-2 bg-white dark:bg-dark-bg text-[10px] font-bold text-slate-400 group-focus-within:text-primary-500 uppercase tracking-widest transition-colors z-10">Card Number</label>
                <input 
                  v-model="form.cardNumber" 
                  required
                  placeholder="0000 0000 0000 0000" 
                  class="input-field py-5 !rounded-none border-slate-200 dark:border-white/10 tracking-[0.2em] text-xs"
                >
                <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <div class="w-8 h-5 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <span class="text-[8px] font-bold text-slate-400">VISA</span>
                  </div>
                  <div class="w-8 h-5 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <span class="text-[8px] font-bold text-slate-400">MC</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative group">
                  <label class="absolute -top-2.5 left-4 px-2 bg-white dark:bg-dark-bg text-[10px] font-bold text-slate-400 group-focus-within:text-primary-500 uppercase tracking-widest transition-colors z-10">Expiry Date</label>
                  <input 
                    v-model="form.expiry" 
                    required
                    placeholder="MM / YY" 
                    class="input-field py-5 !rounded-none border-slate-200 dark:border-white/10 tracking-widest text-xs"
                  >
                </div>
                <div class="relative group">
                  <label class="absolute -top-2.5 left-4 px-2 bg-white dark:bg-dark-bg text-[10px] font-bold text-slate-400 group-focus-within:text-primary-500 uppercase tracking-widest transition-colors z-10">CVV</label>
                  <input 
                    v-model="form.cvv" 
                    required
                    type="password"
                    maxlength="3"
                    placeholder="***" 
                    class="input-field py-5 !rounded-none border-slate-200 dark:border-white/10 tracking-[0.5em] text-xs"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center gap-3 py-4 border-t border-slate-100 dark:border-white/5">
            <input type="checkbox" id="save-card" class="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500">
            <label for="save-card" class="text-[10px] uppercase tracking-widest text-slate-500 font-bold cursor-pointer">Save card for future masterpieces</label>
          </div>

          <button 
            type="submit" 
            :disabled="isProcessing"
            class="w-full btn-primary py-6 text-xs uppercase tracking-[0.3em] font-bold flex justify-center items-center gap-3 relative overflow-hidden"
          >
            <span v-if="!isProcessing" class="flex items-center gap-3">
              Confirm Payment
              <ArrowRightIcon class="w-4 h-4" />
            </span>
            <span v-else class="flex items-center gap-3">
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </span>
            <div v-if="isProcessing" class="absolute inset-0 bg-white/10 animate-pulse"></div>
          </button>

          <div class="flex flex-col items-center gap-6 pt-8">
            <div class="flex items-center gap-8">
              <ShieldCheckIcon class="w-10 h-10 text-primary-500/30" />
              <div class="text-left">
                <p class="text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold mb-1">Bank-Grade Security</p>
                <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">256-bit SSL Encrypted Transaction</p>
              </div>
            </div>
            <button @click="$router.back()" type="button" class="text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary-500 transition-colors font-bold border-b border-slate-200 dark:border-white/10 pb-1">Return to Bag</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useOrderStore } from '../stores/order';
import { CreditCardIcon, ArrowRightIcon, ShieldCheckIcon } from 'lucide-vue-next';

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const isProcessing = ref(false);

const form = reactive({
  name: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
});

async function processPayment() {
  if (cartStore.items.length === 0) return;
  
  isProcessing.value = true;
  
  // Simulate payment processing
  setTimeout(() => {
    isProcessing.value = false;
    
    // Create actual simulated order
    orderStore.createOrder(cartStore.items, cartStore.totalPrice);
    
    cartStore.clearCart();
    
    // Redirect to tracking page
    router.push({ path: '/order-tracking' });
  }, 2000);
}
</script>
