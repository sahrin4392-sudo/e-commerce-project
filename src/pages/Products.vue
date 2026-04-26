<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-72 shrink-0">
          <div class="sticky top-28 space-y-10">
            <div>
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <span class="w-6 h-0.5 bg-primary-500"></span>
                Collections
              </h3>
              <div v-if="productStore.categories.length === 0" class="space-y-3">
                <div v-for="i in 6" :key="i" class="h-10 bg-slate-100 dark:bg-white/5 animate-pulse"></div>
              </div>
              <ul v-else class="space-y-2">
                <li>
                  <button 
                    @click="clearFilters" 
                    :class="['w-full text-left px-6 py-4 transition-all duration-300 uppercase tracking-widest text-[10px] font-bold group', !activeCategory ? 'bg-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500']"
                  >
                    All Collections
                  </button>
                </li>
                <li v-for="cat in productStore.categories" :key="cat">
                  <button 
                    @click="selectCategory(cat)" 
                    :class="['w-full text-left px-6 py-4 transition-all duration-300 uppercase tracking-widest text-[10px] font-bold group capitalize', activeCategory === cat ? 'bg-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500']"
                  >
                    {{ cat }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Header Actions -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 bg-slate-50 dark:bg-dark-surface/50 p-8 rounded-2xl border border-slate-100 dark:border-white/5">
            <div>
              <h1 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                {{ activeCategory ? activeCategory : (searchQuery ? `Search: "${searchQuery}"` : 'Shop All') }}
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2">
                Showing {{ productStore.products.length }} exceptional pieces
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <!-- Search Bar -->
              <div class="relative w-full sm:w-80 group">
                <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                  v-model="searchInput" 
                  @keyup.enter="handleSearch"
                  type="text" 
                  placeholder="Find your perfect piece..." 
                  class="w-full pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all rounded-xl"
                >
              </div>
              
              <!-- Sort Select -->
              <div class="relative w-full sm:w-48">
                <select 
                  v-model="sortBy"
                  @change="handleSort"
                  class="w-full appearance-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all rounded-xl cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <LoadingSkeleton v-for="i in 9" :key="i" />
          </div>

          <div v-else-if="productStore.products.length === 0" class="text-center py-32 bg-slate-50 dark:bg-dark-surface rounded-3xl border border-slate-100 dark:border-white/5">
            <div class="w-24 h-24 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <PackageIcon class="w-10 h-10 text-slate-300" />
            </div>
            <h3 class="text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-2">No items found</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10">We couldn't find any products matching your current criteria. Perhaps try a broader search?</p>
            <button @click="clearFilters" class="btn-primary px-12 py-4 text-xs uppercase tracking-widest">Clear All Filters</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <div v-for="product in productStore.products" :key="product.id" class="animate-fade-in">
              <ProductCard :product="product" />
            </div>
          </div>
          
          <!-- Load More (Demo) -->
          <div v-if="!productStore.isLoading && productStore.products.length > 0" class="mt-20 text-center">
            <button class="btn-secondary px-16 py-5 text-xs uppercase tracking-widest border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-primary-500">
              Load More Pieces
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { SearchIcon, PackageIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const searchInput = ref('');
const sortBy = ref('featured');

const activeCategory = computed(() => route.query.category as string);
const searchQuery = computed(() => route.query.q as string);

onMounted(async () => {
  if (productStore.categories.length === 0) {
    await productStore.fetchCategories();
  }
  fetchProducts();
});

watch(() => route.query, () => {
  fetchProducts();
}, { deep: true });

async function fetchProducts() {
  await productStore.fetchProducts({
    category: activeCategory.value,
    search: searchQuery.value,
    sortBy: sortBy.value
  });
}

function selectCategory(category: string) {
  router.push({ query: { ...route.query, category, q: undefined } });
}

function clearFilters() {
  router.push({ query: {} });
  searchInput.value = '';
}

function handleSearch() {
  router.push({ query: { ...route.query, q: searchInput.value, category: undefined } });
}

function handleSort() {
  fetchProducts();
}
</script>
