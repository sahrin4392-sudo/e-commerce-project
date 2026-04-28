<template>
  <div class="bg-white dark:bg-dark-surface p-6 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
    <!-- Image Skeleton -->
    <div class="w-32 h-32 shrink-0">
      <Skeleton height="100%" border-radius="0.5rem" :shimmer="true" />
    </div>
    
    <!-- Info Skeleton -->
    <div class="flex-1 flex flex-col justify-between w-full">
      <div class="flex justify-between items-start gap-4">
        <div class="space-y-2 w-2/3">
          <Skeleton width="100%" height="20px" :shimmer="true" />
          <Skeleton width="40%" height="12px" :shimmer="true" />
        </div>
        <Skeleton width="60px" height="24px" :shimmer="true" />
      </div>
      
      <div class="flex items-center justify-between mt-4">
        <Skeleton width="100px" height="32px" border-radius="0.5rem" :shimmer="true" />
        <Skeleton width="60px" height="12px" :shimmer="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>
