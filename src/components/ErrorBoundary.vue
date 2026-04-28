<template>
  <div v-if="error" class="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center p-8 transition-colors duration-500">
    <div class="max-w-xl w-full glass-card p-12 text-center space-y-8 border-red-500/20">
      <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangleIcon class="w-10 h-10 text-red-500" />
      </div>
      
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">System Interruption</h2>
        <div class="w-16 h-1 bg-red-500 mx-auto"></div>
        <p class="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed italic">
          "Even in the most curated collections, the unexpected can occur. Our concierge team has been notified."
        </p>
      </div>

      <div class="bg-slate-50 dark:bg-dark-bg/50 p-4 rounded-xl text-left border border-slate-200 dark:border-white/5 overflow-hidden">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Details</p>
        <p class="text-[10px] font-mono text-red-500 break-all">{{ error.message || 'Unknown Error' }}</p>
      </div>

      <button 
        @click="recover"
        class="btn-primary w-full py-4 text-xs uppercase tracking-widest font-bold"
      >
        Reload Experience
      </button>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import { AlertTriangleIcon } from 'lucide-vue-next';

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err;
  console.error('Captured by ErrorBoundary:', err);
  // Prevent the error from propagating further
  return false;
});

function recover() {
  window.location.reload();
}
</script>
