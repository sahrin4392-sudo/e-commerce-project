<template>
  <div class="w-full py-12">
    <!-- Desktop Horizontal Stepper -->
    <div class="hidden md:flex items-start justify-between relative">
      <!-- Progress Line Background -->
      <div class="absolute top-5 left-0 w-full h-0.5 bg-slate-100 dark:bg-white/5 z-0"></div>
      
      <!-- Active Progress Line -->
      <div 
        class="absolute top-5 left-0 h-0.5 bg-primary-500 transition-all duration-1000 z-0"
        :style="{ width: `${progressWidth}%` }"
      ></div>

      <div 
        v-for="(step, index) in steps" 
        :key="step"
        class="relative z-10 flex flex-col items-center group flex-1"
      >
        <!-- Icon Circle -->
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2"
          :class="[
            index <= activeIndex 
              ? 'bg-primary-500 border-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' 
              : 'bg-white dark:bg-dark-bg border-slate-200 dark:border-white/10 text-slate-300'
          ]"
        >
          <CheckIcon v-if="index < activeIndex" class="w-5 h-5" />
          <div v-else-if="index === activeIndex" class="w-2 h-2 bg-white dark:bg-dark-bg rounded-full animate-ping"></div>
          <span v-else class="text-[10px] font-bold">{{ index + 1 }}</span>
        </div>

        <!-- Label -->
        <div class="mt-4 text-center">
          <p 
            class="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
            :class="index <= activeIndex ? 'text-slate-900 dark:text-white' : 'text-slate-400'"
          >
            {{ step }}
          </p>
          <p v-if="index === activeIndex" class="text-[8px] text-primary-500 uppercase tracking-widest font-bold mt-1 animate-pulse">
            Current Stage
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile Vertical Stepper -->
    <div class="md:hidden flex flex-col gap-8 relative">
      <!-- Vertical Line Background -->
      <div class="absolute left-5 top-0 h-full w-0.5 bg-slate-100 dark:bg-white/5 z-0"></div>
      
      <!-- Active Vertical Line -->
      <div 
        class="absolute left-5 top-0 w-0.5 bg-primary-500 transition-all duration-1000 z-0"
        :style="{ height: `${progressHeight}%` }"
      ></div>

      <div 
        v-for="(step, index) in steps" 
        :key="step"
        class="relative z-10 flex items-start gap-6 group"
      >
        <!-- Icon Circle -->
        <div 
          class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 border-2"
          :class="[
            index <= activeIndex 
              ? 'bg-primary-500 border-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' 
              : 'bg-white dark:bg-dark-bg border-slate-200 dark:border-white/10 text-slate-300'
          ]"
        >
          <CheckIcon v-if="index < activeIndex" class="w-5 h-5" />
          <div v-else-if="index === activeIndex" class="w-2 h-2 bg-white dark:bg-dark-bg rounded-full animate-ping"></div>
          <span v-else class="text-[10px] font-bold">{{ index + 1 }}</span>
        </div>

        <!-- Label -->
        <div class="pt-1">
          <p 
            class="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
            :class="index <= activeIndex ? 'text-slate-900 dark:text-white' : 'text-slate-400'"
          >
            {{ step }}
          </p>
          <p v-if="index === activeIndex" class="text-[8px] text-primary-500 uppercase tracking-widest font-bold mt-1 animate-pulse">
            Current Stage
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckIcon } from 'lucide-vue-next';
import type { OrderStatus } from '../stores/order';

const props = defineProps<{
  status: OrderStatus;
}>();

const steps: OrderStatus[] = [
  'Order Placed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const activeIndex = computed(() => steps.indexOf(props.status));

const progressWidth = computed(() => {
  if (activeIndex.value <= 0) return 0;
  return (activeIndex.value / (steps.length - 1)) * 100;
});

const progressHeight = computed(() => {
  if (activeIndex.value <= 0) return 0;
  return (activeIndex.value / (steps.length - 1)) * 100;
});
</script>
