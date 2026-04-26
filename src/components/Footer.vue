<template>
  <footer class="bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-white/10 pt-24 pb-12 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 bg-primary-500 rounded-none flex items-center justify-center">
              <span class="text-white dark:text-dark-bg font-bold text-xl">S</span>
            </div>
            <span class="font-bold text-2xl text-slate-900 dark:text-white uppercase tracking-[0.2em]">Sahrin Collective</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed text-lg font-light">
            Curating the finest in modern luxury. Discover exclusive collections crafted for the discerning individual who appreciates the art of living.
          </p>
        </div>
        
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Shop Collective</h3>
          <ul class="space-y-4">
            <li><router-link to="/products" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">All Collections</router-link></li>
            <li><router-link to="/categories" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">By Category</router-link></li>
            <li><router-link to="/products" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Featured Pieces</router-link></li>
            <li><router-link to="/products" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Best Sellers</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">The Brand</h3>
          <ul class="space-y-4">
            <li><router-link to="/about" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Our Story</router-link></li>
            <li><router-link to="/contact" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Concierge</router-link></li>
            <li><a href="#" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Sustainability</a></li>
            <li><a href="#" class="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-widest text-[10px] font-bold">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-slate-200 dark:border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p class="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
          &copy; {{ new Date().getFullYear() }} Sahrin Collective. All rights reserved.
        </p>
        <div class="flex gap-8">
          <a href="#" class="text-slate-400 hover:text-primary-500 transition-all hover:scale-110">
            <span class="sr-only">Instagram</span>
            <InstagramIcon class="w-5 h-5" />
          </a>
          <a href="#" class="text-slate-400 hover:text-primary-500 transition-all hover:scale-110">
            <span class="sr-only">Twitter</span>
            <TwitterIcon class="w-5 h-5" />
          </a>
          <a href="#" class="text-slate-400 hover:text-primary-500 transition-all hover:scale-110">
            <span class="sr-only">Facebook</span>
            <FacebookIcon class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { InstagramIcon, TwitterIcon, FacebookIcon } from 'lucide-vue-next';
</script>
