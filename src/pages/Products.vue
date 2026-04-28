<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="page-container">
      
      <!-- Mobile Filter Header -->
      <div class="lg:hidden flex items-center justify-between mb-12 pb-6 border-b border-slate-100 dark:border-white/5">
        <button 
          @click="isMobileFilterOpen = true"
          class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white bg-slate-50 dark:bg-dark-surface px-8 py-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <FilterIcon class="w-4 h-4" />
          Refine Selection
        </button>
        
        <p class="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">
          {{ productStore.filteredProducts.length }} Masterpieces
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-16">
        
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:block w-80 shrink-0">
          <div class="sticky top-32">
            <FilterSidebar 
              :active-category="activeCategory" 
              @category-change="selectCategory" 
            />
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Header Actions -->
          <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-10 bg-slate-50 dark:bg-dark-surface/30 p-10 rounded-3xl border border-slate-100 dark:border-white/5">
            <div>
              <h1 class="text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-3">
                {{ activeCategory ? activeCategory : (searchQuery ? `"${searchQuery}"` : 'All Pieces') }}
              </h1>
              <p class="text-[10px] text-primary-500 uppercase tracking-[0.3em] font-bold">
                {{ productStore.filteredProducts.length }} exceptional items available
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
              <!-- Search Bar -->
              <div class="relative w-full sm:w-80 group">
                <SearchIcon class="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                  v-model="searchInput" 
                  @keyup.enter="handleSearch"
                  type="text" 
                  placeholder="SEARCH THE ARCHIVE..." 
                  class="w-full pl-14 pr-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all rounded-2xl shadow-sm"
                >
              </div>
              
              <!-- Sort Select -->
              <div class="relative w-full sm:w-64">
                <select 
                  v-model="productStore.activeSort"
                  class="w-full appearance-none px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all rounded-2xl cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="az">Alphabetical A-Z</option>
                </select>
                <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDownIcon class="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <!-- Active Filters Chips -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-3 mb-10">
            <button 
              v-if="productStore.filters.brands.length > 0" 
              @click="productStore.filters.brands = []"
              class="px-5 py-2.5 bg-primary-500/5 text-primary-500 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-3 border border-primary-500/10 hover:bg-primary-500/10 transition-all"
            >
              Brands ({{ productStore.filters.brands.length }})
              <XIcon class="w-3 h-3" />
            </button>
            <button 
              v-if="productStore.filters.minRating > 0" 
              @click="productStore.filters.minRating = 0"
              class="px-5 py-2.5 bg-primary-500/5 text-primary-500 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-3 border border-primary-500/10 hover:bg-primary-500/10 transition-all"
            >
              {{ productStore.filters.minRating }}+ Stars
              <XIcon class="w-3 h-3" />
            </button>
            <button 
              v-if="productStore.filters.priceRange[1] < 2000" 
              @click="productStore.filters.priceRange[1] = 2000"
              class="px-5 py-2.5 bg-primary-500/5 text-primary-500 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-3 border border-primary-500/10 hover:bg-primary-500/10 transition-all"
            >
              Under ${{ productStore.filters.priceRange[1] }}
              <XIcon class="w-3 h-3" />
            </button>
            <button 
              @click="productStore.resetFilters"
              class="px-5 py-2.5 text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          <!-- Product Grid -->
          <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            <LoadingSkeleton v-for="i in 6" :key="i" />
          </div>

          <!-- Empty State -->
          <div v-else-if="productStore.filteredProducts.length === 0" class="text-center py-40 bg-slate-50 dark:bg-dark-surface/50 rounded-[3rem] border border-slate-100 dark:border-white/5 animate-fade-in">
            <div class="w-24 h-24 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-100 dark:border-white/5">
              <PackageIcon class="w-10 h-10 text-slate-200" />
            </div>
            <h3 class="text-3xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white mb-4">No results found</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-12 font-light text-sm italic">"Our current curation does not match your specific criteria. Consider a broader exploration."</p>
            <button @click="productStore.resetFilters" class="btn-primary !px-16 !py-5">Reset Selection</button>
          </div>

          <!-- Results Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            <div v-for="product in productStore.filteredProducts" :key="product.id" class="animate-fade-in">
              <ProductCard :product="product" />
            </div>
          </div>
          
          <!-- Load More (Demo) -->
          <div v-if="!productStore.isLoading && productStore.filteredProducts.length > 0" class="mt-24 text-center">
            <button class="btn-secondary !px-20 !py-6 !border-slate-200 dark:!border-white/10 !text-slate-900 dark:!text-white hover:!border-primary-500">
              Load More Pieces
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <transition name="drawer">
      <div v-if="isMobileFilterOpen" class="fixed inset-0 z-[100] lg:hidden">
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md" @click="isMobileFilterOpen = false"></div>
        <div class="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white dark:bg-dark-bg rounded-t-[3.5rem] shadow-3xl overflow-hidden flex flex-col">
          <div class="p-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Refine</h2>
            <button @click="isMobileFilterOpen = false" class="p-3 bg-slate-50 dark:bg-dark-surface rounded-full">
              <XIcon class="w-6 h-6 text-slate-500" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-10 pb-40">
            <FilterSidebar 
              :active-category="activeCategory" 
              @category-change="(cat) => { selectCategory(cat); isMobileFilterOpen = false; }" 
            />
          </div>
          <div class="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-white dark:from-dark-bg via-white dark:via-dark-bg to-transparent">
            <button 
              @click="isMobileFilterOpen = false" 
              class="w-full btn-primary !py-6 shadow-3xl"
            >
              Show {{ productStore.filteredProducts.length }} Items
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import FilterSidebar from '../components/FilterSidebar.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { SearchIcon, PackageIcon, FilterIcon, XIcon, ChevronDownIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const searchInput = ref('');
const isMobileFilterOpen = ref(false);

const activeCategory = computed(() => route.query.category as string);
const searchQuery = computed(() => route.query.q as string);

const hasActiveFilters = computed(() => {
  return productStore.filters.brands.length > 0 || 
         productStore.filters.minRating > 0 || 
         productStore.filters.priceRange[1] < 2000 ||
         productStore.filters.inStock;
});

onMounted(async () => {
  if (route.query.sort) productStore.activeSort = route.query.sort as string;
  if (route.query.brand) productStore.filters.brands = (route.query.brand as string).split(',');
  if (route.query.rating) productStore.filters.minRating = Number(route.query.rating);
  if (route.query.maxPrice) productStore.filters.priceRange[1] = Number(route.query.maxPrice);
  if (route.query.stock === 'true') productStore.filters.inStock = true;

  if (productStore.categories.length === 0) {
    await productStore.fetchCategories();
  }
  fetchProducts();
});

watch(() => [route.query.category, route.query.q], () => {
  fetchProducts();
}, { deep: true });

watch(() => [productStore.filters, productStore.activeSort], () => {
  const query = { ...route.query };
  
  if (productStore.activeSort !== 'featured') query.sort = productStore.activeSort;
  else delete query.sort;

  if (productStore.filters.brands.length > 0) query.brand = productStore.filters.brands.join(',');
  else delete query.brand;

  if (productStore.filters.minRating > 0) query.rating = productStore.filters.minRating.toString();
  else delete query.rating;

  if (productStore.filters.priceRange[1] < 2000) query.maxPrice = productStore.filters.priceRange[1].toString();
  else delete query.maxPrice;

  if (productStore.filters.inStock) query.stock = 'true';
  else delete query.stock;

  router.replace({ query });
}, { deep: true });

async function fetchProducts() {
  await productStore.fetchProducts({
    category: activeCategory.value,
    search: searchQuery.value
  });
}

function selectCategory(category: string) {
  router.push({ query: { ...route.query, category: category || undefined, q: undefined } });
}

function handleSearch() {
  router.push({ query: { ...route.query, q: searchInput.value || undefined, category: undefined } });
}
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}

.drawer-enter-active :deep(.bg-slate-950\/80),
.drawer-leave-active :deep(.bg-slate-950\/80) {
  transition: opacity 0.6s ease;
}

.drawer-enter-from :deep(.bg-slate-950\/80),
.drawer-leave-to :deep(.bg-slate-950\/80) {
  opacity: 0;
}
</style>
