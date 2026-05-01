<template>
  <div class="flex flex-col gap-28 pb-32 overflow-hidden">
    <LuxuryHeroCarousel />
    <LuxuryMarquee />

    <div class="page-container space-y-40 !py-0">
      
      <!-- Quick Collections Spotlight -->
      <section class="glass-card cinematic-reveal !p-10 sm:!p-16 -mt-28 relative z-20 mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div class="space-y-4 text-center lg:text-left">
            <span class="luxury-label">Discovery Mode</span>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Curated Archive</h3>
          </div>
          <div class="flex flex-wrap gap-4 items-center justify-center lg:justify-end">
            <router-link
              v-for="cat in luxuryCollections.slice(0, 6)"
              :key="cat.slug"
              :to="`/collection/${cat.slug}`"
              class="px-8 py-3 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] tracking-[0.2em] uppercase hover:border-primary-500 hover:text-primary-500 transition-all rounded-full font-bold hover:bg-primary-500/5"
            >
              {{ cat.title }}
            </router-link>
          </div>
        </div>
      </section>

      <!-- Trending Now -->
      <section class="cinematic-reveal space-y-14">
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div class="max-w-3xl space-y-4">
            <span class="luxury-label">Trending Now</span>
            <h2 class="section-title">Objects Of Desire</h2>
            <p class="text-base leading-8 text-slate-500 dark:text-slate-400">
              Fast-moving icons from the collection floor, styled with glowing badges, floating offers, and quick cart access.
            </p>
          </div>
          <router-link to="/products" class="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-primary-500">
            View All Trending
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <TrendingProductCard
            v-for="(item, index) in trendingProducts"
            :key="item.product.id"
            :product="item.product"
            :sticker="item.sticker"
            :is-new="index < 3"
          />
        </div>
      </section>

      <LimitedOfferCountdown />

      <!-- Shop By Categories -->
      <section class="cinematic-reveal space-y-14">
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div class="max-w-3xl space-y-4">
            <span class="luxury-label">Shop By Categories</span>
            <h2 class="section-title">Cinematic Departments</h2>
            <p class="text-base leading-8 text-slate-500 dark:text-slate-400">
              Move through premium edits built around mood, material, and occasion. Each collection opens into a dedicated shopping room with refined products, filters, sorting, cart, and wishlist actions.
            </p>
          </div>
          <router-link to="/categories" class="btn-secondary w-fit !rounded-full !border-slate-200 !px-8 dark:!border-white/10">
            View Category Hall
            <ArrowRightIcon class="h-4 w-4" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="(category, index) in luxuryCollections"
            :key="category.slug"
            :to="`/collection/${category.slug}`"
            :class="[
              'group relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-primary-500/20',
              index === 0 || index === 1 ? 'xl:col-span-2' : ''
            ]"
          >
            <img
              :src="category.image"
              :alt="category.title"
              class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              loading="lazy"
            >
            <div :class="['absolute inset-0 bg-gradient-to-t', category.accent]"></div>
            <div class="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10"></div>
            <div class="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
              {{ category.productCount }}
            </div>
            <div class="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
              <span class="mb-4 block text-[10px] font-bold uppercase tracking-[0.35em] text-primary-300 transition-transform duration-500 group-hover:-translate-y-1">
                {{ category.eyebrow }}
              </span>
              <h3 class="text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
                {{ category.title }}
              </h3>
              <p class="mt-5 max-w-xl text-sm leading-7 text-slate-200 opacity-90">
                {{ category.description }}
              </p>
              <div class="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950 shadow-xl transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white dark:group-hover:text-dark-bg">
                Explore Collection
                <ArrowRightIcon class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured" class="cinematic-reveal">
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
      <section class="cinematic-reveal space-y-20">
        <div class="text-center space-y-6">
          <span class="luxury-label">Conceptual Space</span>
          <h2 class="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Masterpieces</h2>
          <div class="w-32 h-1.5 bg-primary-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[1000px]">
          <router-link 
            to="/collection/shoes" 
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
            to="/collection/watches" 
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
      <section class="cinematic-reveal py-32 px-12 md:px-24 glass-card">
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
      <section class="cinematic-reveal relative bg-slate-950 rounded-[3rem] p-16 sm:p-32 text-center overflow-hidden shadow-3xl">
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
import ProductCard from '../components/ProductCard.vue';
import LimitedOfferCountdown from '../components/home/LimitedOfferCountdown.vue';
import LuxuryHeroCarousel from '../components/home/LuxuryHeroCarousel.vue';
import LuxuryMarquee from '../components/home/LuxuryMarquee.vue';
import TrendingProductCard from '../components/home/TrendingProductCard.vue';
import { StarIcon, ArrowRightIcon } from 'lucide-vue-next';
import { luxuryCollections } from '../data/luxuryCollections';

const trendingProducts = [
  { product: luxuryCollections[1].products[0], sticker: 'Hot Deal' },
  { product: luxuryCollections[3].products[1], sticker: 'Exclusive' },
  { product: luxuryCollections[4].products[0], sticker: '50% Off' },
  { product: luxuryCollections[7].products[2], sticker: 'Rare Drop' },
];

const featuredProductsCurated = [
  { id: 101, title: 'Heritage Sneakers', price: 180, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', category: 'Footwear', rating: 4.9, discountPercentage: 10, brand: 'Heritage', description: 'Timeless silhouette reimagined.', stock: 5, images: [] },
  { id: 102, title: 'Nomad Horizon', price: 250, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.8, discountPercentage: 0, brand: 'Nomad', description: 'Precision timekeeping.', stock: 3, images: [] },
  { id: 103, title: 'Urban Veil Hoodie', price: 85, thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', category: 'Apparel', rating: 4.7, discountPercentage: 15, brand: 'Urban', description: 'Minimalist warmth.', stock: 10, images: [] },
];

</script>
