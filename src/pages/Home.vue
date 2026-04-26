<template>
  <div class="flex flex-col gap-24 pb-24">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-slate-900 dark:bg-dark-bg text-white py-32 sm:py-48 flex items-center justify-center min-h-[85vh]">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent dark:from-dark-bg/95 dark:via-dark-bg/80 dark:to-transparent"></div>
        <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80" alt="Hero background" class="w-full h-full object-cover mix-blend-overlay opacity-60">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full flex flex-col items-center sm:items-start">
        <div class="overflow-hidden mb-4">
          <span class="text-primary-500 uppercase tracking-[0.4em] text-xs font-bold block animate-slide-up">Welcome to Luxury</span>
        </div>
        <h1 class="text-6xl sm:text-8xl font-light tracking-tight mb-8 uppercase text-glow font-sans leading-none">
          Sahrin <br class="hidden sm:block" /> <span class="font-bold text-primary-500">Collective</span>
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mb-12 font-light leading-relaxed">
          Curated products for the modern aesthete. Experience unparalleled craftsmanship and exclusive design in every piece.
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <router-link to="/products" class="btn-primary text-sm uppercase tracking-widest px-12 py-5">
            Shop Now
          </router-link>
          <router-link to="/categories" class="btn-secondary text-sm uppercase tracking-widest px-12 py-5 bg-white/5 backdrop-blur-sm">
            Categories
          </router-link>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div class="w-1 h-2 bg-primary-500 rounded-full"></div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-32">
      
      <!-- Search & Quick Filters -->
      <section class="glass-card p-8 sm:p-12 -mt-32 relative z-20">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="relative flex-grow">
            <SearchIcon class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="What are you looking for today?" 
              class="input-field pl-14 py-5 w-full text-lg !rounded-none border-b-2 border-transparent focus:border-primary-500 bg-slate-50 dark:bg-dark-bg"
            >
          </div>
          <button @click="handleSearch" class="btn-primary py-5 px-12 text-sm tracking-widest uppercase md:w-auto w-full">Search</button>
        </div>
        
        <div class="mt-8 flex flex-wrap gap-4 items-center">
          <span class="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mr-2">Quick Collections:</span>
          <button 
            v-for="cat in productStore.categories.slice(0, 5)" 
            :key="cat" 
            @click="goToCategory(cat)" 
            class="px-5 py-2 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] tracking-widest uppercase hover:border-primary-500 hover:text-primary-500 transition-all capitalize hover:bg-primary-500/5"
          >
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div class="space-y-2">
            <span class="text-primary-500 uppercase tracking-widest text-xs font-bold block">Selection of Excellence</span>
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Featured</h2>
            <div class="w-12 h-1 bg-primary-500"></div>
          </div>
          <router-link to="/products" class="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs tracking-widest uppercase hover:text-primary-500 transition-colors">
            View all collections
            <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </router-link>
        </div>

        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <LoadingSkeleton v-for="i in 4" :key="i" />
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Categories Spotlight -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <router-link to="/categories" class="relative group h-[500px] overflow-hidden rounded-2xl shadow-xl">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
          <div class="absolute inset-0 p-12 flex flex-col justify-end text-white">
            <span class="uppercase tracking-widest text-xs font-bold mb-2">Elevated Style</span>
            <h3 class="text-4xl font-bold uppercase mb-4 tracking-tighter">Fashion Collective</h3>
            <div class="w-12 h-1 bg-primary-500 transition-all duration-300 group-hover:w-full mb-6"></div>
            <p class="text-slate-200 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Discover meticulously tailored pieces that define modern sophistication.</p>
          </div>
        </router-link>
        <router-link to="/categories" class="relative group h-[500px] overflow-hidden rounded-2xl shadow-xl">
          <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
          <div class="absolute inset-0 p-12 flex flex-col justify-end text-white">
            <span class="uppercase tracking-widest text-xs font-bold mb-2">Modern Living</span>
            <h3 class="text-4xl font-bold uppercase mb-4 tracking-tighter">Lifestyle & Tech</h3>
            <div class="w-12 h-1 bg-primary-500 transition-all duration-300 group-hover:w-full mb-6"></div>
            <p class="text-slate-200 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Innovative design meets everyday functionality in our curated tech and lifestyle essentials.</p>
          </div>
        </router-link>
      </section>

      <!-- Best Sellers -->
      <section id="best-sellers">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div class="space-y-2">
            <span class="text-primary-500 uppercase tracking-widest text-xs font-bold block">Customer Favorites</span>
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Best Sellers</h2>
            <div class="w-12 h-1 bg-primary-500"></div>
          </div>
        </div>
        
        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <LoadingSkeleton v-for="i in 4" :key="i" />
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="product in productStore.products.slice(4, 8)" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Customer Reviews -->
      <section class="py-24 bg-slate-50 dark:bg-white/5 rounded-3xl px-8 md:px-16">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-4">The Collective Voice</h2>
          <div class="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="glass-card p-10 flex flex-col items-center text-center">
            <div class="flex gap-1 mb-6 text-primary-500">
              <StarIcon v-for="s in 5" :key="s" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
              "The attention to detail and quality of the products I've received from Sahrin Collective is truly remarkable. A premium experience from start to finish."
            </p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div class="text-left">
                <p class="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">Julianne V.</p>
                <p class="text-[10px] text-slate-500 uppercase tracking-widest">Verified Collector</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Newsletter -->
      <section class="relative bg-slate-900 dark:bg-dark-surface rounded-3xl p-12 sm:p-24 text-center overflow-hidden shadow-2xl">
        <div class="absolute inset-0 bg-primary-500/5 mix-blend-overlay"></div>
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span class="text-primary-500 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Newsletter</span>
          <h2 class="text-4xl md:text-5xl font-light text-white uppercase tracking-wider mb-8">Join The <span class="font-bold text-primary-500">Collective</span></h2>
          <p class="text-slate-400 font-light mb-12 text-lg">Receive exclusive previews of new arrivals, limited editions, and curated styling guides.</p>
          <div class="flex flex-col sm:flex-row w-full gap-4 max-w-lg">
            <input type="email" placeholder="Email Address" class="input-field !rounded-none flex-grow text-center sm:text-left bg-white/5 border-white/10 text-white focus:border-primary-500" />
            <button class="btn-primary px-10 py-4 uppercase tracking-widest text-xs">Subscribe</button>
          </div>
        </div>
      </section>

      <!-- Quality Indicators -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center py-16">
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <TruckIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Complimentary Logistics</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Seamless worldwide shipping on all curated orders.</p>
        </div>
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <ShieldCheckIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Authenticity Guaranteed</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Every piece is verified for quality and craftsmanship.</p>
        </div>
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <RefreshCcwIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Concierge Returns</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Effortless 30-day return policy for our discerning clientele.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { 
  SearchIcon, TruckIcon, ShieldCheckIcon, RefreshCcwIcon, 
  ArrowRightIcon, StarIcon 
} from 'lucide-vue-next';

const router = useRouter();
const productStore = useProductStore();
const searchQuery = ref('');

onMounted(async () => {
  if (productStore.featuredProducts.length === 0) {
    await productStore.fetchFeaturedProducts();
  }
  if (productStore.categories.length === 0) {
    await productStore.fetchCategories();
  }
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value } });
  }
}

function goToCategory(category: string) {
  router.push({ path: '/products', query: { category } });
}
</script>
