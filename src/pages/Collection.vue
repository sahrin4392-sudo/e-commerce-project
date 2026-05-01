<template>
  <div class="min-h-screen bg-white transition-colors duration-500 dark:bg-dark-bg">
    <section v-if="collection" class="relative min-h-[78vh] overflow-hidden bg-slate-950 text-white">
      <img
        :src="collection.image"
        :alt="collection.title"
        class="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1800ms] ease-out"
      >
      <div :class="['absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r', collection.accent]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.18),transparent_28%)]"></div>

      <div class="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 sm:px-10 lg:px-12">
        <router-link to="/" class="mb-10 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-primary-400">
          <ArrowLeftIcon class="h-4 w-4" />
          Back Home
        </router-link>
        <span class="luxury-label !text-primary-300">{{ collection.eyebrow }}</span>
        <h1 class="max-w-4xl text-6xl font-bold uppercase leading-[0.85] tracking-tight sm:text-8xl md:text-9xl">
          {{ collection.title }}
        </h1>
        <div class="mt-10 flex max-w-3xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p class="text-base font-light leading-8 text-slate-200 md:text-xl">
            {{ collection.description }}
          </p>
          <div class="shrink-0 border-l border-primary-400/50 pl-6">
            <p class="text-3xl font-bold tracking-tight text-white">{{ collection.productCount }}</p>
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-300">Curated Now</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="collection" class="page-container !pt-14">
      <div class="premium-panel mb-12 flex flex-col gap-8 p-6 md:p-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <span class="luxury-label !mb-2">Collection Room</span>
          <h2 class="text-3xl font-bold uppercase leading-none tracking-tight text-slate-900 dark:text-white">
            {{ filteredProducts.length }} Luxury Pieces
          </h2>
        </div>

        <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto">
          <div class="relative">
            <SearchIcon class="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search pieces"
              class="input-field !rounded-xl !py-4 pl-12 text-[11px] font-bold uppercase tracking-[0.18em]"
            >
          </div>

          <select v-model="selectedBrand" class="input-field !rounded-xl !py-4 text-[11px] font-bold uppercase tracking-[0.18em]">
            <option value="">All Brands</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>

          <select v-model="sortBy" class="input-field !rounded-xl !py-4 text-[11px] font-bold uppercase tracking-[0.18em]">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="az">Alphabetical A-Z</option>
          </select>
        </div>
      </div>

      <div class="mb-10 flex flex-wrap items-center gap-4">
        <button
          v-for="rating in [0, 4.7, 4.8, 4.9]"
          :key="rating"
          @click="minRating = rating"
          :class="[
            'rounded-full border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all',
            minRating === rating
              ? 'border-primary-500 bg-primary-500 text-white shadow-gold dark:text-dark-bg'
              : 'border-slate-200 text-slate-500 hover:border-primary-500 hover:text-primary-500 dark:border-white/10'
          ]"
        >
          {{ rating === 0 ? 'All Ratings' : `${rating}+ Rated` }}
        </button>
      </div>

      <div v-if="showSkeletons" class="grid-layout">
        <LoadingSkeleton v-for="item in 8" :key="item" />
      </div>

      <div v-else-if="filteredProducts.length" class="grid-layout">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>

      <div v-else class="rounded-[2rem] border border-slate-100 bg-slate-50 py-28 text-center dark:border-white/5 dark:bg-dark-surface/50">
        <PackageIcon class="mx-auto mb-6 h-12 w-12 text-slate-300" />
        <h3 class="text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">No pieces found</h3>
        <button @click="resetFilters" class="btn-primary mx-auto mt-8 !px-12">Reset Filters</button>
      </div>
    </section>

    <section v-else class="page-container text-center">
      <h1 class="section-title">Collection Not Found</h1>
      <router-link to="/" class="btn-primary mx-auto mt-8 w-fit">Return Home</router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeftIcon, PackageIcon, SearchIcon } from 'lucide-vue-next';
import ProductCard from '../components/ProductCard.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { getLuxuryCollection } from '../data/luxuryCollections';

const route = useRoute();
const search = ref('');
const selectedBrand = ref('');
const sortBy = ref('featured');
const minRating = ref(0);
const showSkeletons = ref(true);

const collection = computed(() => getLuxuryCollection(route.params.slug as string));

const brands = computed(() => {
  if (!collection.value) return [];
  return [...new Set(collection.value.products.map((product) => product.brand))].sort();
});

const filteredProducts = computed(() => {
  if (!collection.value) return [];

  let results = [...collection.value.products];
  const query = search.value.trim().toLowerCase();

  if (query) {
    results = results.filter((product) =>
      [product.title, product.brand, product.description].some((value) => value.toLowerCase().includes(query))
    );
  }

  if (selectedBrand.value) {
    results = results.filter((product) => product.brand === selectedBrand.value);
  }

  if (minRating.value > 0) {
    results = results.filter((product) => product.rating >= minRating.value);
  }

  switch (sortBy.value) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'az':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return results;
});

watch(
  () => route.params.slug,
  () => {
    search.value = '';
    selectedBrand.value = '';
    sortBy.value = 'featured';
    minRating.value = 0;
    showSkeletons.value = true;
    window.setTimeout(() => {
      showSkeletons.value = false;
    }, 450);
  },
  { immediate: true }
);

function resetFilters() {
  search.value = '';
  selectedBrand.value = '';
  sortBy.value = 'featured';
  minRating.value = 0;
}
</script>
