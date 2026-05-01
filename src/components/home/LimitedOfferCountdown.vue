<template>
  <section class="cinematic-reveal relative overflow-hidden rounded-[3rem] bg-slate-950 px-6 py-16 text-white shadow-2xl sm:px-10 md:px-16">
    <img
      src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85"
      alt="Limited luxury offer"
      class="absolute inset-0 h-full w-full object-cover opacity-35"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-primary-950/30"></div>
    <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/20 blur-[90px]"></div>

    <div class="relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <span class="luxury-label !text-primary-300">Limited Time Offer</span>
        <h2 class="text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
          Private Sale Window
        </h2>
        <p class="mt-6 max-w-xl text-base font-light leading-8 text-slate-300">
          Unlock polished fashion, signature scents, design objects, and collectible accessories before the next archive refresh.
        </p>
        <router-link to="/collection/accessories" class="btn-primary mt-10 w-fit !rounded-full !px-10 !py-5">
          Shop Limited Pieces
          <ArrowRightIcon class="h-4 w-4" />
        </router-link>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div
          v-for="item in timerCards"
          :key="item.label"
          class="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1"
        >
          <p class="text-4xl font-bold tracking-tight text-white md:text-5xl">{{ item.value }}</p>
          <p class="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRightIcon } from 'lucide-vue-next';

const endTime = new Date('2026-05-08T23:59:59+05:30').getTime();
const now = ref(Date.now());
let timer: ReturnType<typeof window.setInterval> | undefined;

const remaining = computed(() => Math.max(0, endTime - now.value));

const timerCards = computed(() => {
  const totalSeconds = Math.floor(remaining.value / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(seconds).padStart(2, '0') },
  ];
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>
