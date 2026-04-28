<template>
  <ErrorBoundary>
    <div class="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <NavBar />
      <CartDrawer />
      <QuickViewModal />
      
      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <Footer />
    </div>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import CartDrawer from './components/CartDrawer.vue';
import QuickViewModal from './components/QuickViewModal.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import { useThemeStore } from './stores/theme';

// Initialize theme on app load
useThemeStore();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
