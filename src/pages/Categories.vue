<template>
  <div class="bg-white py-10 transition-colors duration-500 dark:bg-dark-bg md:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section class="luxury-page-hero group mb-14 min-h-[26rem] fade-in md:min-h-[32rem]">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury category editorial"
          class="luxury-hero-bg opacity-70 group-hover:scale-[1.03]"
          loading="eager"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(212,175,55,0.22),transparent_30%)]"></div>
        <div class="relative z-10 flex min-h-[26rem] flex-col justify-end px-6 py-10 md:min-h-[32rem] md:px-12 md:py-14">
          <span class="luxury-label !mb-3">Curated Departments</span>
          <h1 class="max-w-4xl text-5xl font-bold uppercase leading-none tracking-tight text-white md:text-7xl">
            Shop By Category
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Eight premium shopping rooms with rich visuals, refined products, smooth interactions, and editorial-grade curation.
          </p>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
        <router-link
          v-for="(category, index) in luxuryCollections"
          :key="category.slug"
          :to="`/collection/${category.slug}`"
          :class="[
            'group relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/15',
            index === 0 || index === 7 ? 'xl:col-span-2' : ''
          ]"
        >
          <img
            :src="category.image"
            :alt="category.title"
            class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] group-hover:scale-110"
          >
          <div :class="['absolute inset-0 bg-gradient-to-t', category.accent]"></div>
          <div class="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.2),transparent_28%)]"></div>

          <div class="absolute left-7 top-7 flex items-center gap-3">
            <span class="h-px w-10 bg-primary-400"></span>
            <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-white/75">
              {{ category.productCount }}
            </span>
          </div>

          <div class="absolute inset-x-0 bottom-0 p-8 text-white">
            <span class="luxury-label !mb-3 !text-primary-300">{{ category.eyebrow }}</span>
            <h2 class="text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
              {{ category.title }}
            </h2>
            <p class="mt-5 text-sm leading-7 text-slate-200">
              {{ category.description }}
            </p>
            <div class="mt-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-colors group-hover:text-primary-300">
              Explore Collection
              <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next';
import { luxuryCollections } from '../data/luxuryCollections';
</script>
