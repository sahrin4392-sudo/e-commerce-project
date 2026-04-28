<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
    <!-- Image Gallery Skeleton -->
    <div class="space-y-4">
      <Skeleton height="0" class="aspect-square" border-radius="1rem" :shimmer="true" />
      <div class="grid grid-cols-5 gap-4">
        <Skeleton v-for="i in 5" :key="i" height="0" class="aspect-square" border-radius="0.5rem" :shimmer="true" />
      </div>
    </div>

    <!-- Product Info Skeleton -->
    <div class="flex flex-col">
      <div class="flex gap-2 mb-6">
        <Skeleton v-for="i in 3" :key="i" width="40px" height="12px" :shimmer="true" />
      </div>

      <Skeleton width="80%" height="40px" class="mb-4" :shimmer="true" />
      
      <div class="flex items-center gap-4 mb-6">
        <Skeleton width="60px" height="24px" border-radius="9999px" :shimmer="true" />
        <Skeleton width="100px" height="12px" :shimmer="true" />
      </div>

      <div class="flex items-baseline gap-4 mb-8">
        <Skeleton width="120px" height="48px" :shimmer="true" />
        <Skeleton width="80px" height="24px" :shimmer="true" />
      </div>

      <div class="space-y-2 mb-10">
        <Skeleton width="100%" height="16px" :shimmer="true" />
        <Skeleton width="95%" height="16px" :shimmer="true" />
        <Skeleton width="40%" height="16px" :shimmer="true" />
      </div>

      <div class="mt-auto space-y-8">
        <div class="flex items-center gap-6">
          <Skeleton width="60px" height="12px" :shimmer="true" />
          <Skeleton width="100px" height="40px" border-radius="0.5rem" :shimmer="true" />
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <Skeleton class="flex-1" height="56px" :shimmer="true" />
          <Skeleton width="56px" height="56px" :shimmer="true" />
        </div>
        
        <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
          <Skeleton v-for="i in 2" :key="i" width="120px" height="20px" :shimmer="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>
