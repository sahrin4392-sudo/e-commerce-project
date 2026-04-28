<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center px-4 transition-colors duration-500">
    <div class="max-w-xl w-full text-center space-y-12">
      <!-- Icon/Illustration -->
      <div class="relative inline-block">
        <div class="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full"></div>
        <div class="relative text-9xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter opacity-10 leading-none select-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <CompassIcon class="w-24 h-24 text-primary-500 animate-pulse" />
        </div>
      </div>

      <div class="space-y-6">
        <h1 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
          Lost in the <span class="text-primary-500">Collection</span>
        </h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto"></div>
        <p class="text-slate-500 dark:text-slate-400 font-light text-lg max-w-sm mx-auto leading-relaxed italic">
          "True luxury is found in the unexpected, but this path seems to lead nowhere."
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <button @click="$router.back()" class="btn-secondary py-4 px-10 text-xs uppercase tracking-widest font-bold">
          Return Back
        </button>
        <router-link to="/" class="btn-primary py-4 px-10 text-xs uppercase tracking-widest font-bold">
          The Archive
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CompassIcon } from 'lucide-vue-next';
</script>
