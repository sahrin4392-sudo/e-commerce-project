<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-dark-bg transition-colors duration-500">
    <div class="hidden lg:block lg:w-[55%] xl:w-[50%] relative">
      <AuthBanner
        title="Welcome Back"
        subtitle="Client Portal"
        description="Sign in to access your curated collections, exclusive member benefits, and personalized luxury experience."
        :features="['Track your orders in real-time', 'Access exclusive member deals', 'Save items to your wishlist', 'Priority customer support']"
        :stats="[{ value: '24/7', label: 'Support' }, { value: '150+', label: 'Countries' }, { value: '48h', label: 'Delivery' }]"
      />
    </div>
    <div class="lg:hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1408] px-6 py-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 bg-primary-500 rounded-none flex items-center justify-center transform -rotate-3 shadow-gold">
          <span class="text-[#0F0F0F] font-bold text-lg">S</span>
        </div>
        <div>
          <h1 class="text-white text-base font-bold tracking-tight uppercase">Sahrin</h1>
          <p class="text-primary-500 text-[8px] font-bold uppercase tracking-[0.4em]">Collective</p>
        </div>
      </div>
      <p class="text-slate-400 text-xs">Sign in to your exclusive account</p>
      <div class="mt-4 h-[1px] bg-gradient-to-r from-primary-500/40 via-primary-500/10 to-transparent"></div>
    </div>
    <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 xl:px-20 relative overflow-hidden">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/5 rounded-full filter blur-[120px] animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-slate-200/50 dark:bg-slate-500/5 rounded-full filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div class="w-full max-w-md relative z-10">
        <div class="bg-slate-50/50 dark:bg-dark-surface/80 backdrop-blur-2xl p-8 sm:p-10 lg:p-12 border border-slate-200/80 dark:border-white/[0.06] rounded-3xl shadow-2xl dark:shadow-black/30 fade-in">
          <div class="text-center mb-10">
            <div class="hidden lg:flex justify-center mb-8">
              <div class="w-16 h-16 bg-primary-500 rounded-none flex items-center justify-center shadow-2xl shadow-primary-500/20 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <span class="text-white dark:text-dark-bg font-bold text-3xl">S</span>
              </div>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-3">Client Sign In</h2>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">Enter your credentials to access the collective</p>
          </div>
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="group">
              <label for="login-username" class="block text-[10px] font-bold uppercase tracking-widest mb-2.5 transition-colors" :class="fieldErrors.username ? 'text-red-500' : 'text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500'">Email / Username</label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-primary-500 transition-colors"><UserIcon class="w-4 h-4" /></div>
                <input id="login-username" type="text" v-model="username" @blur="validateField('username')" @input="clearFieldError('username')" class="w-full bg-white dark:bg-dark-bg border rounded-2xl pl-11 pr-5 py-4 text-slate-900 dark:text-white outline-none transition-all text-sm shadow-sm" :class="fieldErrors.username ? 'border-red-400 dark:border-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10'" placeholder="Your email or username" autocomplete="username" />
              </div>
              <p v-if="fieldErrors.username" class="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-widest">{{ fieldErrors.username }}</p>
            </div>
            <div class="group">
              <div class="flex justify-between items-center mb-2.5">
                <label for="login-password" class="block text-[10px] font-bold uppercase tracking-widest transition-colors" :class="fieldErrors.password ? 'text-red-500' : 'text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500'">Access Password</label>
                <button type="button" @click="showPassword = !showPassword" class="text-[10px] font-bold uppercase tracking-widest hover:text-primary-400 transition-colors flex items-center gap-1.5" :class="showPassword ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'">
                  <EyeIcon v-if="!showPassword" class="w-3.5 h-3.5" /><EyeOffIcon v-else class="w-3.5 h-3.5" />
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-primary-500 transition-colors"><LockIcon class="w-4 h-4" /></div>
                <input id="login-password" :type="showPassword ? 'text' : 'password'" v-model="password" @blur="validateField('password')" @input="clearFieldError('password')" class="w-full bg-white dark:bg-dark-bg border rounded-2xl pl-11 pr-5 py-4 text-slate-900 dark:text-white outline-none transition-all text-sm shadow-sm" :class="fieldErrors.password ? 'border-red-400 dark:border-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10'" placeholder="••••••••" autocomplete="current-password" />
              </div>
              <p v-if="fieldErrors.password" class="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-widest">{{ fieldErrors.password }}</p>
            </div>
            <div v-if="authStore.error" class="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-100 dark:border-red-500/20 font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2">
              <AlertCircleIcon class="w-4 h-4 flex-shrink-0" />{{ authStore.error }}
            </div>
            <div>
              <button type="button" @click="showDemoHint = !showDemoHint" class="w-full text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-primary-500 transition-colors flex items-center justify-center gap-2">
                <InfoIcon class="w-3 h-3" />{{ showDemoHint ? 'Hide' : 'Show' }} Demo Credentials
                <ChevronDownIcon class="w-3 h-3 transition-transform duration-300" :class="showDemoHint ? 'rotate-180' : ''" />
              </button>
              <div v-if="showDemoHint" class="mt-3 text-[10px] text-slate-500 font-bold tracking-widest bg-white dark:bg-dark-bg/50 p-4 rounded-xl border border-slate-100 dark:border-white/5 space-y-2">
                <div class="flex justify-between"><span>Username</span><button type="button" @click="fillDemo" class="text-primary-500 hover:text-primary-400 cursor-pointer">emilys ↗</button></div>
                <div class="flex justify-between"><span>Password</span><span class="text-slate-900 dark:text-white">emilyspass</span></div>
              </div>
            </div>
            <button type="submit" :disabled="authStore.isLoading" class="w-full btn-primary py-5 uppercase tracking-[0.2em] text-xs font-bold flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group shadow-2xl shadow-primary-500/20 mt-2">
              <LoaderIcon v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
              <span v-else>Authorize Entry</span>
              <ArrowRightIcon v-if="!authStore.isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <div class="text-center pt-8 mt-8 border-t border-slate-100 dark:border-white/5">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              New to the collective?
              <router-link to="/signup" class="text-primary-500 hover:text-primary-400 ml-1 transition-colors inline-flex items-center gap-1">Apply for Membership <ArrowRightIcon class="w-3 h-3" /></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ToastNotification v-if="showToast" :message="toastMessage" :type="toastType" @dismiss="showToast = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AuthBanner from '../components/AuthBanner.vue';
import ToastNotification from '../components/ToastNotification.vue';
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, LoaderIcon, AlertCircleIcon, InfoIcon, ChevronDownIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const showDemoHint = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error' | 'info'>('success');
const fieldErrors = reactive<Record<string, string>>({ username: '', password: '' });

function validateField(field: string) {
  if (field === 'username') {
    fieldErrors.username = !username.value.trim() ? 'Username or email is required' : '';
  } else if (field === 'password') {
    fieldErrors.password = !password.value ? 'Password is required' : password.value.length < 3 ? 'Password is too short' : '';
  }
}

function clearFieldError(field: string) { fieldErrors[field] = ''; authStore.clearMessages(); }

function fillDemo() { username.value = 'emilys'; password.value = 'emilyspass'; showDemoHint.value = false; fieldErrors.username = ''; fieldErrors.password = ''; }

function validateForm(): boolean { validateField('username'); validateField('password'); return !fieldErrors.username && !fieldErrors.password; }

async function handleLogin() {
  if (!validateForm()) return;
  try {
    await authStore.login({ username: username.value.trim(), password: password.value });
    toastMessage.value = authStore.successMessage || 'Login successful!';
    toastType.value = 'success';
    showToast.value = true;
    setTimeout(() => { router.push('/dashboard'); }, 800);
  } catch { /* Error shown inline */ }
}

onBeforeUnmount(() => { authStore.clearMessages(); });
</script>

<style scoped>
@keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,-70px) scale(1.1); } 66% { transform: translate(-30px,30px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
.animate-blob { animation: blob 10s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
</style>
