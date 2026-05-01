<template>
  <section class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <div class="absolute inset-0">
      <transition-group name="hero-fade">
        <article
          v-for="(slide, index) in slides"
          v-show="index === activeSlide"
          :key="slide.title"
          class="absolute inset-0"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover opacity-75 hero-image-motion"
          >
          <div :class="['absolute inset-0 bg-gradient-to-r', slide.gradient]"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </article>
      </transition-group>
    </div>

    <div class="pointer-events-none absolute left-[8%] top-[22%] hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 shadow-2xl backdrop-blur-md float-slow md:block">
      50% Off
    </div>
    <div class="pointer-events-none absolute right-[8%] top-[18%] rounded-full bg-primary-500 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-950 shadow-gold float-medium">
      Exclusive
    </div>
    <div class="pointer-events-none absolute bottom-[24%] right-[12%] hidden rotate-6 rounded-2xl border border-white/15 bg-slate-950/50 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-200 shadow-2xl backdrop-blur-md float-slow lg:block">
      Hot Deal
    </div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 sm:px-10 lg:px-12">
      <transition name="hero-copy" mode="out-in">
        <div :key="slides[activeSlide].title" class="max-w-4xl">
          <span class="luxury-label !mb-6 !text-primary-300">{{ slides[activeSlide].eyebrow }}</span>
          <h1 class="text-6xl font-light uppercase leading-[0.84] tracking-tight text-white sm:text-8xl lg:text-9xl">
            {{ slides[activeSlide].title }}
            <span class="block font-bold text-primary-400">{{ slides[activeSlide].accent }}</span>
          </h1>
          <p class="mt-8 max-w-2xl text-lg font-light leading-8 text-slate-200 sm:text-xl">
            {{ slides[activeSlide].subtitle }}
          </p>
          <div class="mt-12 flex flex-col gap-5 sm:flex-row">
            <router-link :to="slides[activeSlide].primaryTo" class="btn-primary !rounded-full !px-10 !py-5">
              {{ slides[activeSlide].primaryLabel }}
              <ArrowRightIcon class="h-4 w-4" />
            </router-link>
            <router-link to="/categories" class="btn-secondary !rounded-full !border-white/30 !px-10 !py-5 !text-white backdrop-blur-md hover:!bg-white/10">
              Explore Categories
            </router-link>
          </div>
        </div>
      </transition>
    </div>

    <div class="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="activeSlide = index"
        :class="[
          'h-2 rounded-full transition-all duration-500',
          index === activeSlide ? 'w-12 bg-primary-400 shadow-gold' : 'w-2 bg-white/40 hover:bg-white'
        ]"
        :aria-label="`Show hero slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRightIcon } from 'lucide-vue-next';

const activeSlide = ref(0);
let timer: ReturnType<typeof window.setInterval> | undefined;

const slides = [
  {
    eyebrow: 'Luxury Collection 2026',
    title: 'Sahrin',
    accent: 'Collective',
    subtitle: 'A cinematic shopping house for polished fashion, expressive accessories, rare scents, and design-led technology.',
    primaryLabel: 'Shop New Luxury',
    primaryTo: '/collection/women-fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1900&q=85',
    gradient: 'from-slate-950 via-slate-950/70 to-rose-950/20',
  },
  {
    eyebrow: 'Private Wardrobe Edit',
    title: 'Evening',
    accent: 'Icons',
    subtitle: 'Statement silhouettes, precision watches, sculptural bags, and luminous finishing touches for the modern collector.',
    primaryLabel: 'Explore Icons',
    primaryTo: '/collection/watches',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1900&q=85',
    gradient: 'from-slate-950 via-slate-950/65 to-amber-950/20',
  },
  {
    eyebrow: 'Limited Time Offer',
    title: 'Rare',
    accent: 'Drops',
    subtitle: 'Fresh arrivals with rich textures, polished materials, and limited promotional pricing across the collection floor.',
    primaryLabel: 'Claim The Drop',
    primaryTo: '/collection/perfumes',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1900&q=85',
    gradient: 'from-slate-950 via-slate-950/60 to-cyan-950/20',
  },
];

onMounted(() => {
  timer = window.setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.length;
  }, 5200);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.hero-copy-enter-active,
.hero-copy-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.hero-copy-enter-from,
.hero-copy-leave-to {
  opacity: 0;
  transform: translateY(22px);
}

.hero-image-motion {
  animation: heroZoom 8s ease-in-out infinite alternate;
}

@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}
</style>
