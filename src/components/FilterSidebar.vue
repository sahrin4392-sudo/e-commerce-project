<template>
  <div class="space-y-10">
    <!-- Categories -->
    <div>
      <h3 class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-primary-500"></span>
        Collections
      </h3>
      <div v-if="productStore.categories.length === 0" class="space-y-2">
        <Skeleton v-for="i in 5" :key="i" height="40px" :shimmer="true" />
      </div>
      <ul v-else class="space-y-1">
        <li>
          <button 
            @click="emit('category-change', '')" 
            :class="['w-full text-left px-5 py-3 transition-all duration-300 uppercase tracking-widest text-[9px] font-bold', !activeCategory ? 'bg-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500']"
          >
            All Pieces
          </button>
        </li>
        <li v-for="cat in productStore.categories" :key="typeof cat === 'object' ? cat.slug : cat">
          <button 
            @click="emit('category-change', typeof cat === 'object' ? cat.slug : cat)" 
            :class="['w-full text-left px-5 py-3 transition-all duration-300 uppercase tracking-widest text-[9px] font-bold capitalize', activeCategory === (typeof cat === 'object' ? cat.slug : cat) ? 'bg-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500']"
          >
            {{ getCategoryName(cat) }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Price Range -->
    <div>
      <h3 class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-primary-500"></span>
        Investment Range
      </h3>
      <div class="space-y-6 px-2">
        <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span>${{ productStore.filters.priceRange[0] }}</span>
          <span>${{ productStore.filters.priceRange[1] }}</span>
        </div>
        <input 
          type="range" 
          v-model.number="productStore.filters.priceRange[1]" 
          min="0" 
          max="2000" 
          step="50"
          class="w-full h-1 bg-slate-200 dark:bg-white/10 appearance-none rounded-full accent-primary-500 cursor-pointer"
        >
      </div>
    </div>

    <!-- Brands -->
    <div v-if="productStore.allBrands.length > 0">
      <h3 class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-primary-500"></span>
        Curated Brands
      </h3>
      <div class="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        <label 
          v-for="brand in productStore.allBrands" 
          :key="brand"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <div class="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              :value="brand" 
              v-model="productStore.filters.brands"
              class="peer appearance-none w-4 h-4 border border-slate-200 dark:border-white/10 rounded-none checked:bg-primary-500 checked:border-primary-500 transition-all"
            >
            <CheckIcon class="absolute w-3 h-3 text-white dark:text-dark-bg opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary-500 transition-colors">{{ brand }}</span>
        </label>
      </div>
    </div>

    <!-- Rating -->
    <div>
      <h3 class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-primary-500"></span>
        Client Rating
      </h3>
      <div class="flex flex-col gap-2">
        <button 
          v-for="rating in [5, 4, 3, 2]" 
          :key="rating"
          @click="productStore.filters.minRating = rating"
          class="flex items-center gap-2 group text-left"
        >
          <div class="flex gap-0.5">
            <StarIcon 
              v-for="i in 5" 
              :key="i" 
              class="w-3 h-3 transition-colors" 
              :class="i <= rating ? 'text-primary-500 fill-current' : 'text-slate-200 dark:text-white/5'"
            />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary-500 transition-colors" :class="{ 'text-primary-500': productStore.filters.minRating === rating }">
            & Up
          </span>
        </button>
      </div>
    </div>

    <!-- Availability -->
    <div>
      <label class="flex items-center justify-between cursor-pointer group">
        <span class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
          <span class="w-8 h-[1px] bg-primary-500"></span>
          In Stock Only
        </span>
        <div class="relative inline-flex items-center">
          <input type="checkbox" v-model="productStore.filters.inStock" class="sr-only peer">
          <div class="w-10 h-5 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
        </div>
      </label>
    </div>

    <!-- Reset -->
    <button 
      @click="productStore.resetFilters"
      class="w-full py-4 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-red-500 hover:border-red-500 transition-all flex items-center justify-center gap-2"
    >
      <RefreshCcwIcon class="w-3 h-3" />
      Reset All Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '../stores/product';
import Skeleton from './Skeleton.vue';
import { StarIcon, CheckIcon, RefreshCcwIcon } from 'lucide-vue-next';
import { getCategoryName } from '../types';

const props = defineProps<{
  activeCategory: string;
}>();

const emit = defineEmits<{
  (e: 'category-change', cat: string): void
}>();

const productStore = useProductStore();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-50 dark:bg-dark-bg;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-white/10 rounded-full;
}
</style>
