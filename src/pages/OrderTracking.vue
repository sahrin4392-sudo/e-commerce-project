<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500 py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Search Section -->
      <div class="max-w-2xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4 animate-fade-in">Track Your Collection</h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto mb-8 animate-fade-in"></div>
        
        <div class="relative group animate-slide-up">
          <input 
            v-model="trackingInput" 
            @keyup.enter="handleTrack"
            type="text" 
            placeholder="ENTER ORDER ID (E.G. SAHR-XXXXX)" 
            class="w-full pl-8 pr-32 py-6 text-sm font-bold uppercase tracking-[0.2em] bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all rounded-2xl shadow-xl"
          >
          <button 
            @click="handleTrack"
            class="absolute right-3 top-3 bottom-3 px-6 bg-primary-500 text-white dark:text-dark-bg text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary-400 transition-all active:scale-95"
          >
            Track
          </button>
        </div>
        <p v-if="error" class="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">{{ error }}</p>
      </div>

      <!-- Result Section -->
      <transition name="fade-slide">
        <div v-if="order" class="space-y-12 animate-fade-in">
          
          <!-- Order Header Info -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card p-8 text-center md:text-left">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Order Identifier</p>
              <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{{ order.id }}</p>
            </div>
            <div class="glass-card p-8 text-center md:text-left">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Investment Total</p>
              <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">${{ order.total.toFixed(2) }}</p>
            </div>
            <div class="glass-card p-8 text-center md:text-left">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Issue Date</p>
              <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{{ order.date }}</p>
            </div>
            <div class="glass-card p-8 text-center md:text-left border-primary-500/30 bg-primary-500/5">
              <p class="text-[10px] uppercase tracking-widest text-primary-500 font-bold mb-2">Estimated Arrival</p>
              <p class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{{ order.estimatedDelivery }}</p>
            </div>
          </div>

          <!-- Stepper -->
          <div class="bg-slate-50 dark:bg-dark-surface/50 rounded-[3rem] p-8 md:p-16 border border-slate-100 dark:border-white/5 shadow-2xl">
            <div class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-slate-200 dark:border-white/10 pb-12">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white dark:text-dark-bg">
                  <PackageIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest leading-none mb-2">Current Status</h3>
                  <p class="text-2xl font-bold text-primary-500 tracking-tighter">{{ order.status }}</p>
                </div>
              </div>
              <button class="btn-secondary py-3 px-8 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 group">
                <DownloadIcon class="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                Download Invoice
              </button>
            </div>

            <OrderStepper :status="order.status" />
          </div>

          <!-- Order Items -->
          <div class="glass-card overflow-hidden">
            <div class="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-dark-bg/20">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">Package Contents ({{ order.items.length }})</h3>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-white/5">
              <div v-for="item in order.items" :key="item.id" class="p-8 flex items-center gap-6">
                <img :src="item.thumbnail" :alt="item.title" class="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-dark-bg">
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{{ item.title }}</h4>
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Qty: {{ item.quantity }}</p>
                </div>
                <p class="text-sm font-bold text-slate-900 dark:text-white tracking-tight">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

        </div>
      </transition>

      <!-- Placeholder / Empty State -->
      <div v-if="!order && !error" class="text-center py-24 opacity-40">
        <div class="w-32 h-32 bg-slate-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-slate-200 dark:border-white/10">
          <SearchIcon class="w-12 h-12 text-slate-300" />
        </div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Awaiting Order Reference</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../stores/order';
import OrderStepper from '../components/OrderStepper.vue';
import { SearchIcon, PackageIcon, DownloadIcon } from 'lucide-vue-next';

const orderStore = useOrderStore();
const trackingInput = ref('');
const error = ref('');

const order = computed(() => orderStore.currentOrder);

onMounted(() => {
  if (orderStore.currentTrackingId) {
    trackingInput.value = orderStore.currentTrackingId;
  }
});

function handleTrack() {
  error.value = '';
  if (!trackingInput.value) return;
  
  const success = orderStore.trackOrder(trackingInput.value);
  if (!success) {
    error.value = 'ORDER NOT FOUND IN OUR ARCHIVE. PLEASE VERIFY THE ID.';
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
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
