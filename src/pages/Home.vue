<template>
  <div class="flex flex-col gap-32 pb-32 overflow-hidden">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-slate-950 text-white py-48 sm:py-64 flex items-center justify-center min-h-screen">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1788&q=80" alt="Hero background" class="w-full h-full object-cover mix-blend-overlay opacity-50 scale-105 animate-slow-zoom">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 text-center sm:text-left w-full flex flex-col items-center sm:items-start">
        <div class="overflow-hidden mb-6">
          <span class="luxury-label !mb-0 animate-slide-up">The Future of Curation</span>
        </div>
        <h1 class="text-7xl sm:text-9xl font-light tracking-tighter mb-10 uppercase leading-[0.85] text-glow animate-fade-in">
          Sahrin <br class="hidden sm:block" /> <span class="font-bold text-primary-500">Collective</span>
        </h1>
        <p class="mt-4 text-xl sm:text-2xl text-slate-300 max-w-2xl mb-16 font-light leading-relaxed animate-fade-in opacity-80">
          Uncompromising craftsmanship. Exclusive design. Curated for the modern aesthete.
        </p>
        <div class="flex flex-col sm:flex-row gap-8 animate-slide-up">
          <router-link to="/products" class="btn-primary !px-16 !py-6 text-sm">
            Shop Collection
          </router-link>
          <router-link to="/categories" class="btn-secondary !px-16 !py-6 text-sm backdrop-blur-md">
            Categories
          </router-link>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div class="w-7 h-12 border-2 border-white/20 rounded-full flex justify-center p-2">
          <div class="w-1.5 h-3 bg-primary-500 rounded-full"></div>
        </div>
      </div>
    </section>

    <div class="page-container space-y-48 !py-0">
      
      <!-- Quick Collections Spotlight -->
      <section class="glass-card !p-10 sm:!p-16 -mt-48 relative z-20 mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div class="space-y-4 text-center lg:text-left">
            <span class="luxury-label">Discovery Mode</span>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Curated Archive</h3>
          </div>
          <div class="flex flex-wrap gap-4 items-center justify-center lg:justify-end">
            <button 
              v-for="cat in productStore.categories.slice(0, 6)" 
              :key="typeof cat === 'object' ? cat.slug : cat" 
              @click="goToCategory(typeof cat === 'object' ? cat.slug : cat)" 
              class="px-8 py-3 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] tracking-[0.2em] uppercase hover:border-primary-500 hover:text-primary-500 transition-all rounded-full font-bold hover:bg-primary-500/5"
            >
              {{ getCategoryName(cat) }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-20 gap-8">
          <div class="space-y-4">
            <span class="luxury-label">Premium Selections</span>
            <h2 class="section-title">Newest <br class="sm:hidden" /> Arrivals</h2>
            <div class="w-16 h-1.5 bg-primary-500"></div>
          </div>
          <router-link to="/products" class="group flex items-center gap-3 text-slate-400 text-[10px] tracking-[0.3em] uppercase hover:text-primary-500 transition-colors font-bold pb-2">
            View All Pieces
            <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </router-link>
        </div>

        <div class="grid-layout">
          <ProductCard v-for="product in featuredProductsCurated" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Premium Collections Gallery -->
      <section class="space-y-20">
        <div class="text-center space-y-6">
          <span class="luxury-label">Conceptual Space</span>
          <h2 class="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Masterpieces</h2>
          <div class="w-32 h-1.5 bg-primary-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[1000px]">
          <router-link 
            :to="{ path: '/products', query: { category: 'mens-shoes' } }" 
            class="md:col-span-8 relative group overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-1000"
          >
            <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
            <div class="absolute inset-0 p-12 md:p-20 flex flex-col justify-end text-white">
              <span class="luxury-label text-primary-500 opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 duration-500">Logistics of Style</span>
              <h3 class="text-4xl md:text-6xl font-bold uppercase mb-6 tracking-tighter leading-none">The <br/> Footwear</h3>
              <div class="mt-8 flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                Explore Collection
                <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-3" />
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ path: '/products', query: { category: 'mens-watches' } }" 
            class="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-1000"
          >
            <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
            <div class="absolute inset-0 p-10 flex flex-col justify-end text-white">
              <h3 class="text-3xl font-bold uppercase mb-6 tracking-tighter leading-none">Premium <br/> Horology</h3>
              <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                Discover
                <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Customer Reviews -->
      <section class="py-32 px-12 md:px-24 glass-card">
        <div class="text-center mb-24 space-y-4">
          <span class="luxury-label">Verified Testimonials</span>
          <h2 class="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white leading-none">The Collective Voice</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div v-for="i in 3" :key="i" class="flex flex-col items-center text-center group">
            <div class="flex gap-1.5 mb-8 text-primary-500">
              <StarIcon v-for="s in 5" :key="s" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-slate-600 dark:text-slate-300 italic mb-10 leading-relaxed font-light text-lg">
              "Unrivaled craftsmanship. The attention to detail in every piece is exactly what I expect from Sahrin."
            </p>
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-dark-bg border border-slate-200 dark:border-white/10 group-hover:border-primary-500 transition-colors duration-500 overflow-hidden">
                <img :src="`https://i.pravatar.cc/150?u=${i}`" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div class="text-left">
                <p class="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">Collector 0{{i}}</p>
                <p class="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Newsletter -->
      <section class="relative bg-slate-950 rounded-[3rem] p-16 sm:p-32 text-center overflow-hidden shadow-3xl">
        <div class="absolute inset-0 bg-primary-500/5 mix-blend-overlay"></div>
        <div class="absolute -top-32 -left-32 w-80 h-80 bg-primary-500/10 rounded-full blur-[100px] animate-pulse"></div>
        
        <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span class="luxury-label">Inner Circle</span>
          <h2 class="text-5xl md:text-7xl font-light text-white uppercase tracking-tighter mb-10 leading-none">Join The <br class="sm:hidden" /> <span class="font-bold text-primary-500">Collective</span></h2>
          <p class="text-slate-400 font-light mb-16 text-xl leading-relaxed">Early access to limited editions and curated archive drops.</p>
          <div class="flex flex-col sm:flex-row w-full gap-6 max-w-xl">
            <input type="email" placeholder="Your Digital Address" class="input-field !rounded-none !bg-white/5 !border-white/10 !text-white focus:!border-primary-500 !py-6 !text-center sm:!text-left" />
            <button class="btn-primary !px-12 !py-6">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import { StarIcon, ArrowRightIcon } from 'lucide-vue-next';
import { getCategoryName } from '../types';

const router = useRouter();
const productStore = useProductStore();

const featuredProductsCurated = [
  { id: 101, title: 'Heritage Sneakers', price: 180, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', category: 'Footwear', rating: 4.9, discountPercentage: 10, brand: 'Heritage', description: 'Timeless silhouette reimagined.', stock: 5, images: [] },
  { id: 102, title: 'Nomad Horizon', price: 250, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.8, discountPercentage: 0, brand: 'Nomad', description: 'Precision timekeeping.', stock: 3, images: [] },
  { id: 103, title: 'Urban Veil Hoodie', price: 85, thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', category: 'Apparel', rating: 4.7, discountPercentage: 15, brand: 'Urban', description: 'Minimalist warmth.', stock: 10, images: [] },
];

function goToCategory(category: string) {
  router.push({ path: '/products', query: { category } });
}
</script>

<style scoped>
@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}
.animate-slow-zoom {
  animation: slowZoom 30s linear infinite alternate;
}
</style>
