<template>
  <article class="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20 dark:border-white/5 dark:bg-dark-surface">
    <div class="absolute left-5 top-5 z-20 rounded-full bg-primary-500 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-950 shadow-gold sale-sticker">
      {{ sticker }}
    </div>
    <div
      v-if="isNew"
      class="absolute right-5 top-5 z-20 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-950 shadow-xl new-arrival-badge"
    >
      New Arrival
    </div>

    <router-link :to="`/product/${product.id}`" class="block">
      <div class="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-dark-bg">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"></div>
      </div>
    </router-link>

    <div class="p-7">
      <div class="mb-4 flex items-center justify-between gap-4">
        <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">{{ product.brand }}</span>
        <span class="flex items-center gap-1 text-primary-500">
          <StarIcon class="h-3.5 w-3.5 fill-current" />
          <span class="text-[10px] font-bold">{{ product.rating }}</span>
        </span>
      </div>
      <router-link :to="`/product/${product.id}`">
        <h3 class="line-clamp-1 text-base font-bold uppercase tracking-tight text-slate-900 transition-colors group-hover:text-primary-500 dark:text-white">
          {{ product.title }}
        </h3>
      </router-link>
      <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/5">
        <span class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">${{ product.price }}</span>
        <button
          @click="cartStore.addItem(product)"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary-500 hover:text-slate-950 dark:bg-white dark:text-slate-950"
          title="Quick add to cart"
        >
          <ShoppingCartIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ShoppingCartIcon, StarIcon } from 'lucide-vue-next';
import type { Product } from '../../types';
import { useCartStore } from '../../stores/cart';

defineProps<{
  product: Product;
  sticker: string;
  isNew?: boolean;
}>();

const cartStore = useCartStore();
</script>
