<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed bottom-6 right-6 z-[9999] max-w-sm w-full pointer-events-auto"
      >
        <div :class="toastClasses" class="toast-container">
          <div class="flex items-start gap-3">
            <div :class="iconBgClass" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
              <CheckCircleIcon v-if="type === 'success'" class="w-4 h-4" />
              <AlertCircleIcon v-if="type === 'error'" class="w-4 h-4" />
              <InfoIcon v-if="type === 'info'" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" :class="titleClass">
                {{ type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info' }}
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{{ message }}</p>
            </div>
            <button
              @click="dismiss"
              class="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1"
            >
              <XIcon class="w-4 h-4" />
            </button>
          </div>
          <!-- Progress bar -->
          <div class="absolute bottom-0 left-0 h-0.5 rounded-b-2xl transition-all" :class="progressClass" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}>(), {
  type: 'success',
  duration: 4000,
});

const emit = defineEmits<{
  (e: 'dismiss'): void;
}>();

const visible = ref(false);
const progressWidth = ref(100);
let progressInterval: ReturnType<typeof setInterval> | null = null;
let dismissTimeout: ReturnType<typeof setTimeout> | null = null;

const toastClasses = computed(() => [
  'relative overflow-hidden rounded-2xl p-4 shadow-2xl border backdrop-blur-xl',
  {
    'bg-white/95 dark:bg-dark-surface/95 border-primary-500/30': props.type === 'success',
    'bg-white/95 dark:bg-dark-surface/95 border-red-500/30': props.type === 'error',
    'bg-white/95 dark:bg-dark-surface/95 border-slate-300/30 dark:border-white/10': props.type === 'info',
  }
]);

const iconBgClass = computed(() => ({
  'bg-primary-500/10 text-primary-500': props.type === 'success',
  'bg-red-500/10 text-red-500': props.type === 'error',
  'bg-slate-500/10 text-slate-500': props.type === 'info',
}));

const titleClass = computed(() => ({
  'text-primary-600 dark:text-primary-400': props.type === 'success',
  'text-red-600 dark:text-red-400': props.type === 'error',
  'text-slate-600 dark:text-slate-400': props.type === 'info',
}));

const progressClass = computed(() => ({
  'bg-primary-500': props.type === 'success',
  'bg-red-500': props.type === 'error',
  'bg-slate-400': props.type === 'info',
}));

function dismiss() {
  visible.value = false;
  setTimeout(() => emit('dismiss'), 300);
}

onMounted(() => {
  // Small delay so transition plays
  requestAnimationFrame(() => {
    visible.value = true;
  });

  const step = 100 / (props.duration / 50);
  progressInterval = setInterval(() => {
    progressWidth.value = Math.max(0, progressWidth.value - step);
  }, 50);

  dismissTimeout = setTimeout(() => {
    dismiss();
  }, props.duration);
});

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
  if (dismissTimeout) clearTimeout(dismissTimeout);
});
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30%) scale(0.95);
}
</style>
