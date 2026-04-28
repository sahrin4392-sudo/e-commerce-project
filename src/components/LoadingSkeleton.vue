<template>
  <div class="bg-white dark:bg-dark-surface border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500 shadow-sm">
    <!-- Image Skeleton -->
    <div class="aspect-square">
      <Skeleton height="100%" :shimmer="true" border-radius="0" />
    </div>

    <!-- Content Skeleton -->
    <div class="p-6 space-y-4">
      <div class="flex justify-between items-start">
        <Skeleton width="40px" height="10px" :shimmer="true" />
        <Skeleton width="30px" height="10px" :shimmer="true" />
      </div>
      
      <Skeleton width="90%" height="16px" :shimmer="true" />
      
      <div class="mt-auto pt-4 border-t border-slate-50 dark:border-white/5 flex items-end justify-between">
        <div class="space-y-2">
          <Skeleton width="40px" height="8px" :shimmer="true" />
          <Skeleton width="60px" height="20px" :shimmer="true" />
        </div>
        <Skeleton width="70px" height="12px" :shimmer="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>
