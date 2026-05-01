<template>
  <section class="overflow-hidden border-y border-slate-200 bg-white py-5 dark:border-white/10 dark:bg-dark-surface">
    <div class="marquee-track flex w-max items-center gap-8">
      <div
        v-for="item in repeatedItems"
        :key="item.id"
        class="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300"
      >
        <span>{{ item.text }}</span>
        <span class="h-2 w-2 rounded-full bg-primary-500 shadow-gold"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  'Luxury Collection 2026',
  'Premium Fashion',
  'Exclusive Deals',
  'Worldwide Shipping',
  'Private Drops',
  'Limited Editions',
];

const repeatedItems = Array.from({ length: 3 }).flatMap((_, group) =>
  items.map((text, index) => ({ id: `${group}-${index}`, text }))
);
</script>

<style scoped>
.marquee-track {
  animation: marquee 32s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}
</style>
