<template>
  <div class="relative w-full max-w-md group" ref="searchContainer">
    <!-- Search Trigger/Input -->
    <div 
      class="relative flex items-center transition-all duration-500 ease-in-out"
      :class="[isExpanded ? 'w-full' : 'w-10 sm:w-64']"
    >
      <SearchIcon 
        class="absolute left-3 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10 pointer-events-none" 
      />
      
      <input 
        v-model="query"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="debouncedSearch"
        @keydown.esc="closeSearch"
        type="text" 
        placeholder="Search the collective..." 
        class="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary-500/50 focus:bg-white dark:focus:bg-dark-surface py-2.5 pl-11 pr-4 rounded-none text-sm outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
        :class="{ 'opacity-0 sm:opacity-100 pointer-events-none sm:pointer-events-auto': !isExpanded && !isMobile }"
      >

      <button 
        v-if="query" 
        @click="clearSearch"
        class="absolute right-3 p-1 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
      >
        <XIcon class="w-3 h-3 text-slate-400" />
      </button>
    </div>

    <!-- Suggestions Dropdown -->
    <transition name="fade-slide">
      <div 
        v-if="showSuggestions && productStore.searchSuggestions.length > 0" 
        class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-none shadow-2xl overflow-hidden z-[60] backdrop-blur-xl"
      >
        <div class="p-2">
          <div class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-white/5 mb-2">
            Suggested Pieces
          </div>
          
          <router-link 
            v-for="product in productStore.searchSuggestions" 
            :key="product.id"
            :to="`/product/${product.id}`"
            @click="closeSearch"
            class="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/item"
          >
            <div class="w-12 h-12 bg-slate-100 dark:bg-dark-bg shrink-0 overflow-hidden">
              <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate group-hover/item:text-primary-500 transition-colors" v-html="highlightText(product.title)"></h4>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{{ product.category }}</p>
            </div>
            <div class="text-xs font-bold text-slate-900 dark:text-white tracking-tighter">
              ${{ product.price }}
            </div>
          </router-link>

          <div class="mt-2 p-2 border-t border-slate-100 dark:border-white/5">
            <button 
              @click="handleFullSearch"
              class="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:text-dark-bg transition-all"
            >
              View all results for "{{ query }}"
            </button>
          </div>
        </div>
      </div>
      
      <!-- No Results State -->
      <div 
        v-else-if="showSuggestions && query.length >= 2 && !productStore.isLoading" 
        class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-none shadow-2xl p-8 text-center z-[60]"
      >
        <div class="w-16 h-16 bg-slate-50 dark:bg-dark-bg flex items-center justify-center mx-auto mb-4">
          <SearchIcon class="w-6 h-6 text-slate-300" />
        </div>
        <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-1">No pieces found</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 italic">Try searching for another masterpiece</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon, XIcon } from 'lucide-vue-next';
import { useProductStore } from '../stores/product';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

const router = useRouter();
const productStore = useProductStore();
const searchContainer = ref(null);

const query = ref('');
const isExpanded = ref(false);
const showSuggestions = ref(false);
const isMobile = ref(window.innerWidth < 640);

const debouncedSearch = useDebounceFn(async () => {
  if (query.value.length >= 2) {
    await productStore.fetchProducts({ search: query.value, limit: 5 });
    productStore.searchSuggestions = productStore.products.slice(0, 5);
    showSuggestions.value = true;
  } else {
    productStore.searchSuggestions = [];
    showSuggestions.value = false;
  }
}, 300);

function handleFocus() {
  isExpanded.value = true;
  if (query.value.length >= 2) {
    showSuggestions.value = true;
  }
}

function handleBlur() {
  setTimeout(() => {
    if (!query.value) isExpanded.value = false;
  }, 200);
}

function closeSearch() {
  showSuggestions.value = false;
  if (!query.value) isExpanded.value = false;
}

function clearSearch() {
  query.value = '';
  productStore.searchSuggestions = [];
  showSuggestions.value = false;
}

function handleFullSearch() {
  if (query.value.trim()) {
    router.push({ path: '/products', query: { q: query.value } });
    closeSearch();
  }
}

function highlightText(text: string) {
  if (!query.value) return text;
  const regex = new RegExp(`(${query.value})`, 'gi');
  return text.replace(regex, '<span class="text-primary-500">$1</span>');
}

onClickOutside(searchContainer, () => {
  showSuggestions.value = false;
});

onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 640;
  });
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
