<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Image Section -->
        <div class="relative">
          <div class="absolute -inset-4 bg-primary-500/20 blur-2xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80" 
            alt="Sahrin Collective Studio" 
            class="relative rounded-2xl shadow-2xl object-cover h-[600px] w-full"
          />
          <div class="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div class="absolute -top-8 -left-8 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <!-- Content Section -->
        <div>
          <h2 class="text-primary-500 font-medium tracking-widest uppercase mb-2">Our Story</h2>
          <h1 class="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6">Sahrin Collective</h1>
          <div class="w-16 h-1 bg-primary-500 mb-8"></div>
          
          <div class="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 space-y-6">
            <p>
              Founded on the principles of uncompromising quality and timeless aesthetics, Sahrin Collective represents the pinnacle of modern luxury living. We curate collections that transcend fleeting trends, offering pieces that become enduring symbols of refined taste.
            </p>
            <p>
              Our journey began with a singular vision: to bridge the gap between exceptional craftsmanship and contemporary design. Every item in our collection is carefully selected to ensure it meets our rigorous standards of excellence.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="glass-card p-6 border-l-4 border-l-primary-500">
              <h3 class="text-xl font-bold mb-2 uppercase tracking-wide">Our Mission</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">To elevate everyday living through meticulously crafted products that inspire and endure.</p>
            </div>
            <div class="glass-card p-6 border-l-4 border-l-primary-500">
              <h3 class="text-xl font-bold mb-2 uppercase tracking-wide">Our Vision</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">To be the global destination for those who seek uncompromising quality and sophisticated design.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page logic
</script>
