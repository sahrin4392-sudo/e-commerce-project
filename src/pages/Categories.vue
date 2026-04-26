<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-4">Shop by Category</h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explore our curated collections across various styles and needs.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/products?category=${category.slug}`"
          class="group relative h-96 overflow-hidden rounded-xl block shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Background Image -->
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 class="text-2xl font-bold text-white mb-2 uppercase tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ category.name }}</h3>
            <p class="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2">
              Explore Collection
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  {
    id: 1,
    name: 'Fashion',
    slug: 'womens-dresses',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 2,
    name: 'Electronics',
    slug: 'laptops',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 3,
    name: 'Accessories',
    slug: 'womens-watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1598&q=80'
  },
  {
    id: 4,
    name: 'Lifestyle',
    slug: 'home-decoration',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
  }
];
</script>
