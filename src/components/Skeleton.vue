<template>
  <div 
    class="relative overflow-hidden bg-slate-200/50 dark:bg-white/5 rounded-md"
    :class="[shimmer ? 'shimmer-effect' : '']"
    :style="customStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  width?: string;
  height?: string;
  borderRadius?: string;
  shimmer?: boolean;
}>();

const customStyle = computed(() => ({
  width: props.width || '100%',
  height: props.height || '1rem',
  borderRadius: props.borderRadius || '0.375rem',
}));
</script>

<style scoped>
.shimmer-effect::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Dark mode adjustment for shimmer */
:global(.dark) .shimmer-effect::after {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0)
  );
}
</style>
