<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-500">
    <!-- Decorative background elements -->
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
    <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-slate-200 dark:bg-slate-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>

    <div class="max-w-md w-full space-y-10 bg-slate-50/50 dark:bg-dark-surface/90 backdrop-blur-2xl p-10 relative z-10 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl">
      <div class="text-center">
        <div class="mx-auto w-16 h-16 bg-primary-500 rounded-none flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-8 transform rotate-3 transition-transform hover:rotate-0 duration-500">
          <span class="text-white dark:text-dark-bg font-bold text-3xl">S</span>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
          Join The Collective
        </h2>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">
          Apply for exclusive membership access
        </p>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleSignup">
        <div class="grid grid-cols-2 gap-4">
          <div class="group">
            <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">First Name</label>
            <input v-model="form.firstName" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="John">
          </div>
          <div class="group">
            <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Last Name</label>
            <input v-model="form.lastName" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="Doe">
          </div>
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
          <input v-model="form.email" type="email" required class="input-field !rounded-xl !py-3 text-xs" placeholder="john.doe@example.com">
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Desired Username</label>
          <input v-model="form.username" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="johndoe_luxury">
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Access Password</label>
          <input v-model="form.password" type="password" required class="input-field !rounded-xl !py-3 text-xs" placeholder="••••••••">
        </div>

        <div v-if="authStore.error" class="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] rounded-xl border border-red-100 dark:border-red-500/20 font-bold uppercase tracking-widest text-center">
          {{ authStore.error }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading"
          class="w-full btn-primary py-5 uppercase tracking-[0.2em] text-xs font-bold flex justify-center items-center gap-3 disabled:opacity-70 group"
        >
          <LoaderIcon v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
          <span v-else>Submit Application</span>
          <ArrowRightIcon v-if="!authStore.isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
      
      <div class="text-center pt-8 border-t border-slate-100 dark:border-white/5">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Already a member? 
          <router-link to="/login" class="text-primary-500 hover:text-primary-400 ml-1 transition-colors">Sign In Here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { LoaderIcon, ArrowRightIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
});

async function handleSignup() {
  try {
    await authStore.signup(form);
    alert('Application received! In this demo, you can now login with the default credentials.');
    router.push('/login');
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
