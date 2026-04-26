<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-500">
    <!-- Decorative background elements -->
    <div class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-slate-200 dark:bg-slate-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>

    <div class="max-w-md w-full space-y-12 bg-slate-50/50 dark:bg-dark-surface/90 backdrop-blur-2xl p-12 relative z-10 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl">
      <div class="text-center">
        <div class="mx-auto w-20 h-20 bg-primary-500 rounded-none flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-10 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
          <span class="text-white dark:text-dark-bg font-bold text-4xl">S</span>
        </div>
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
          Client Sign In
        </h2>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">
          Enter your credentials to access the collective
        </p>
      </div>
      
      <form class="space-y-8" @submit.prevent="handleLogin">
        <div class="space-y-6">
          <div class="group">
            <label for="username" class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-primary-500 transition-colors">Personal Username</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              required 
              v-model="username"
              class="w-full bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:border-primary-500 outline-none transition-all shadow-sm" 
              placeholder="e.g. emilys"
            >
          </div>
          <div class="group">
            <label for="password" class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-primary-500 transition-colors">Access Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              v-model="password"
              class="w-full bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:border-primary-500 outline-none transition-all shadow-sm" 
              placeholder="••••••••"
            >
          </div>
        </div>

        <div v-if="authStore.error" class="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-100 dark:border-red-500/20 font-bold uppercase tracking-widest text-center">
          {{ authStore.error }}
        </div>
        
        <div class="text-[10px] text-slate-500 dark:text-slate-500 font-bold tracking-widest bg-white dark:bg-dark-bg/50 p-6 rounded-2xl border border-slate-100 dark:border-white/5 space-y-2">
          <p class="text-primary-500 uppercase mb-3">Concierge Access:</p>
          <div class="flex justify-between items-center opacity-80">
            <span>Username</span>
            <span class="text-slate-900 dark:text-white">emilys</span>
          </div>
          <div class="flex justify-between items-center opacity-80">
            <span>Password</span>
            <span class="text-slate-900 dark:text-white">emilyspass</span>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading"
          class="w-full btn-primary py-6 uppercase tracking-[0.2em] text-xs font-bold flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group shadow-2xl shadow-primary-500/20"
        >
          <LoaderIcon v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
          <span v-else>Authorize Entry</span>
          <ArrowRightIcon v-if="!authStore.isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
      
      <div class="text-center pt-8 border-t border-slate-100 dark:border-white/5">
        <a href="#" class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-primary-500 transition-colors">Forgotten Access Credentials?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { LoaderIcon, ArrowRightIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('emilys');
const password = ref('emilyspass');

async function handleLogin() {
  try {
    await authStore.login({ username: username.value, password: password.value });
    router.push('/dashboard');
  } catch (error) {
    // Error is handled in the store
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(50px, -70px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
