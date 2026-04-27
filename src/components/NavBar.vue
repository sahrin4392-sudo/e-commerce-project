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
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            class="text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider"
            active-class="text-primary-500 font-bold"
          >
            {{ link.name }}
          </router-link>

          <!-- Global Search Integration -->
          <GlobalSearch class="ml-4" />
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Mobile Search Integration -->
          <div class="md:hidden">
            <GlobalSearch />
          </div>

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
            <router-link v-if="!token" to="/login" class="btn-primary py-2 px-4 text-xs">Login</router-link>
            
            <!-- Profile Dropdown -->
            <div v-else class="relative group" ref="profileDropdown">
              <button 
                @click="isProfileMenuOpen = !isProfileMenuOpen"
                class="flex items-center gap-3 p-1 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-all"
              >
                <div class="relative">
                  <img 
                    :src="user?.image || `https://ui-avatars.com/api/?name=${user?.username}&background=random`" 
                    alt="avatar" 
                    class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                  >
                  <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-dark-bg rounded-full"></div>
                </div>
                <div class="hidden lg:block text-left mr-1">
                  <p class="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-none mb-1">{{ user?.firstName }}</p>
                  <p class="text-[8px] text-slate-400 uppercase tracking-widest font-bold leading-none">Member</p>
                </div>
                <ChevronDownIcon class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" :class="{ 'rotate-180': isProfileMenuOpen }" />
              </button>

              <!-- Dropdown Menu -->
              <transition name="fade-slide">
                <div 
                  v-if="isProfileMenuOpen" 
                  class="absolute right-0 mt-3 w-56 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] backdrop-blur-xl"
                >
                  <div class="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ user?.email }}</p>
                  </div>
                  
                  <div class="p-2">
                    <router-link 
                      to="/dashboard" 
                      @click="isProfileMenuOpen = false"
                      class="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500 rounded-xl transition-all uppercase tracking-widest"
                    >
                      <UserIcon class="w-4 h-4" />
                      Client Profile
                    </router-link>
                    <router-link 
                      to="/cart" 
                      @click="isProfileMenuOpen = false"
                      class="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary-500 rounded-xl transition-all uppercase tracking-widest"
                    >
                      <ShoppingCartIcon class="w-4 h-4" />
                      Order History
                    </router-link>
                  </div>

                  <div class="p-2 border-t border-slate-100 dark:border-white/5">
                    <button 
                      @click="handleLogout"
                      class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-widest"
                    >
                      <LogOutIcon class="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </transition>
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
            <div v-if="!token">
              <router-link to="/login" @click="isMobileMenuOpen = false" class="btn-primary w-full text-center block py-3">Login</router-link>
            </div>
            <div v-else class="space-y-4">
              <div class="flex items-center gap-4 px-4 py-2">
                <img :src="user?.image" class="w-12 h-12 rounded-full border border-primary-500/20">
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{{ user?.firstName }} {{ user?.lastName }}</p>
                  <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Gold Member</p>
                </div>
              </div>
              <router-link to="/dashboard" @click="isMobileMenuOpen = false" class="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 rounded-lg uppercase tracking-wider flex items-center gap-3">
                <UserIcon class="w-5 h-5" />
                Dashboard
              </router-link>
              <button @click="handleLogout" class="w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg uppercase tracking-wider flex items-center gap-3 transition-colors">
                <LogOutIcon class="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { 
  ShoppingCartIcon, MenuIcon, XIcon, SunIcon, MoonIcon, 
  UserIcon, LogOutIcon, ChevronDownIcon 
} from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useThemeStore } from '../stores/theme';
import GlobalSearch from './GlobalSearch.vue';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);
const themeStore = useThemeStore();

const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);

function handleLogout() {
  isProfileMenuOpen.value = false;
  isMobileMenuOpen.value = false;
  authStore.logout();
  router.push('/login');
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
