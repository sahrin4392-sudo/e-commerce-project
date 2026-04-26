<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md flex-none transition-colors duration-500 lg:z-50 lg:border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-dark-bg/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 bg-primary-500 rounded-none flex items-center justify-center transition-transform group-hover:rotate-12">
              <span class="text-white dark:text-dark-bg font-bold text-xl">S</span>
            </div>
            <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-white uppercase tracking-widest text-glow">Sahrin Collective</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            class="nav-link"
            active-class="nav-link-active"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="themeStore.toggleTheme" 
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500"
            :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <SunIcon v-if="themeStore.isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>

          <button @click="cartStore.toggleDrawer" class="relative p-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
            <ShoppingCartIcon class="w-6 h-6" />
            <span v-if="cartStore.totalItems > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-500 rounded-full">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <div class="hidden md:flex items-center ml-2 border-l border-slate-200 dark:border-slate-800 pl-4">
            <router-link v-if="!authStore.token" to="/login" class="btn-primary py-2 px-4 text-xs">Login</router-link>
            <div v-else class="relative">
              <router-link to="/dashboard" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img :src="authStore.user?.image || `https://ui-avatars.com/api/?name=${authStore.user?.username}&background=random`" alt="avatar" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700">
              </router-link>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500">
            <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide-up">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-slate-800 shadow-xl">
        <div class="px-4 pt-4 pb-8 space-y-2">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg uppercase tracking-wider transition-colors"
            active-class="bg-slate-50 dark:bg-slate-800/50 text-primary-500 font-bold"
          >
            {{ link.name }}
          </router-link>
          
          <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <router-link v-if="!authStore.token" to="/login" @click="isMobileMenuOpen = false" class="btn-primary w-full text-center block py-3">Login</router-link>
            <router-link v-else to="/dashboard" @click="isMobileMenuOpen = false" class="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 rounded-lg uppercase tracking-wider">Dashboard</router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShoppingCartIcon, MenuIcon, XIcon, SunIcon, MoonIcon } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useThemeStore } from '../stores/theme';

const cartStore = useCartStore();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
</script>

<style scoped>
.nav-link {
  @apply text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider relative py-2;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300;
}

.nav-link:hover::after, .nav-link-active::after {
  @apply w-full;
}

.nav-link-active {
  @apply text-primary-500 font-bold;
}
</style>
