<template>
  <div class="auth-banner relative w-full h-full min-h-screen overflow-hidden flex flex-col justify-between">
    <!-- Base gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0F0F0F] to-[#1a1408]"></div>

    <!-- Animated orbs -->
    <div class="absolute top-20 -left-20 w-[400px] h-[400px] bg-primary-500/8 rounded-full filter blur-[100px] animate-orb-1"></div>
    <div class="absolute bottom-40 -right-20 w-[350px] h-[350px] bg-primary-600/6 rounded-full filter blur-[120px] animate-orb-2"></div>
    <div class="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-primary-400/5 rounded-full filter blur-[80px] animate-orb-3"></div>

    <!-- Gold accent line -->
    <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>
    <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-between h-full p-12 lg:p-16">
      <!-- Top: Brand -->
      <div class="fade-in">
        <div class="flex items-center gap-4 mb-2">
          <div class="w-12 h-12 bg-primary-500 rounded-none flex items-center justify-center transform -rotate-3 shadow-gold">
            <span class="text-[#0F0F0F] font-bold text-xl">S</span>
          </div>
          <div>
            <h1 class="text-white text-lg font-bold tracking-tight uppercase">Sahrin</h1>
            <p class="text-primary-500 text-[9px] font-bold uppercase tracking-[0.4em]">Collective</p>
          </div>
        </div>
      </div>

      <!-- Middle: Hero text -->
      <div class="space-y-8 my-auto py-16">
        <div class="slide-up" style="animation-delay: 0.2s; animation-fill-mode: both;">
          <p class="text-primary-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">{{ subtitle }}</p>
          <h2 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
            {{ title }}
          </h2>
        </div>

        <div class="slide-up" style="animation-delay: 0.4s; animation-fill-mode: both;">
          <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
            {{ description }}
          </p>
        </div>

        <!-- Feature list -->
        <div class="space-y-4 slide-up" style="animation-delay: 0.6s; animation-fill-mode: both;">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-3 group"
          >
            <div class="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            <span class="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold group-hover:text-primary-400 transition-colors duration-300">{{ feature }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom: Stats or trust indicators -->
      <div class="slide-up" style="animation-delay: 0.8s; animation-fill-mode: both;">
        <div class="border-t border-white/5 pt-8">
          <div class="flex items-center gap-8">
            <div v-for="(stat, index) in stats" :key="index">
              <p class="text-white font-bold text-xl tracking-tight">{{ stat.value }}</p>
              <p class="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  stats?: Array<{ value: string; label: string }>;
}>(), {
  title: 'Experience\nLuxury\nRedefined',
  subtitle: 'Exclusive Access',
  description: 'Join an elite community of discerning individuals who appreciate the finer things in life. Curated collections, unparalleled quality.',
  features: () => [
    'Curated luxury collections',
    'Exclusive member pricing',
    'Priority concierge service',
    'Worldwide premium delivery',
  ],
  stats: () => [
    { value: '10K+', label: 'Members' },
    { value: '500+', label: 'Brands' },
    { value: '99%', label: 'Satisfaction' },
  ],
});
</script>

<style scoped>
@keyframes orb1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -50px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(40px, 30px) scale(1.05); }
}
@keyframes orb2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-40px, 30px) scale(1.05); }
  50% { transform: translate(30px, -40px) scale(1.1); }
  75% { transform: translate(-20px, -20px) scale(0.95); }
}
@keyframes orb3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(25px, 40px) scale(1.08); }
  66% { transform: translate(-30px, -25px) scale(0.92); }
}

.animate-orb-1 { animation: orb1 20s ease-in-out infinite; }
.animate-orb-2 { animation: orb2 25s ease-in-out infinite; }
.animate-orb-3 { animation: orb3 18s ease-in-out infinite; }
</style>
