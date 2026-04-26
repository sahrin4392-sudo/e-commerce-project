<template>
  <div class="min-h-screen flex flex-col font-sans transition-colors duration-300">
    <NavBar />
    <CartDrawer />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import CartDrawer from './components/CartDrawer.vue';
import { useThemeStore } from './stores/theme';

// Initialize theme on app load
const themeStore = useThemeStore();
</script>
