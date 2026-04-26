<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <!-- Sidebar -->
        <aside class="w-full lg:w-80 shrink-0 space-y-8">
          <div class="bg-slate-50 dark:bg-dark-surface rounded-3xl p-10 border border-slate-100 dark:border-white/5 text-center shadow-2xl">
            <div class="relative inline-block mb-8">
              <img :src="authStore.user?.image" :alt="authStore.user?.username" class="w-32 h-32 rounded-3xl mx-auto border-2 border-primary-500/30 shadow-2xl object-cover p-1 bg-white dark:bg-dark-bg">
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full border-4 border-slate-50 dark:border-dark-surface flex items-center justify-center">
                <CheckCircleIcon class="w-4 h-4 text-white dark:text-dark-bg" />
              </div>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h2>
            <p class="text-[10px] text-slate-400 dark:text-slate-500 mb-10 font-bold uppercase tracking-widest">{{ authStore.user?.email }}</p>
            <button @click="handleLogout" class="w-full btn-secondary text-[10px] uppercase tracking-widest py-4 font-bold border-slate-200 dark:border-white/10 hover:border-red-500 hover:text-red-500">
              Sign Out
            </button>
          </div>

          <nav class="bg-slate-50 dark:bg-dark-surface rounded-3xl p-4 border border-slate-100 dark:border-white/5 shadow-2xl">
            <ul class="space-y-2">
              <li v-for="item in navItems" :key="item.label">
                <a 
                  href="#" 
                  @click.prevent="activeTab = item.label"
                  :class="['flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group', activeTab === item.label ? 'bg-primary-500 text-white dark:text-dark-bg shadow-lg shadow-primary-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-dark-bg hover:text-primary-500']"
                >
                  <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span class="uppercase tracking-widest text-[10px] font-bold">{{ item.label }}</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 space-y-12">
          <div class="flex justify-between items-end">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Client Overview</h1>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Manage your exclusive collective profile</p>
            </div>
            <div class="hidden sm:block text-right">
              <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Account Tier</p>
              <p class="text-primary-500 font-bold uppercase tracking-tighter">Gold Collective Member</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-dark-surface rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-xl flex items-center gap-6 group hover:shadow-2xl transition-all">
              <div class="w-16 h-16 bg-slate-50 dark:bg-dark-bg text-primary-500 rounded-2xl border border-slate-100 dark:border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <ShoppingBagIcon class="w-6 h-6" />
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Total Orders</p>
                <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">12</p>
              </div>
            </div>
            
            <div class="bg-white dark:bg-dark-surface rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-xl flex items-center gap-6 group hover:shadow-2xl transition-all">
              <div class="w-16 h-16 bg-slate-50 dark:bg-dark-bg text-primary-500 rounded-2xl border border-slate-100 dark:border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <CreditCardIcon class="w-6 h-6" />
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Investment</p>
                <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">$1,245</p>
              </div>
            </div>

            <div class="bg-white dark:bg-dark-surface rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-xl flex items-center gap-6 group hover:shadow-2xl transition-all">
              <div class="w-16 h-16 bg-slate-50 dark:bg-dark-bg text-primary-500 rounded-2xl border border-slate-100 dark:border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <HeartIcon class="w-6 h-6" />
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Wishlist Items</p>
                <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">8</p>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white dark:bg-dark-surface rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
            <div class="px-10 py-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-dark-bg/20">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest">Order History</h3>
              <button class="text-[10px] font-bold text-primary-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">View All Archive</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50/50 dark:bg-dark-bg text-slate-400 uppercase tracking-[0.2em] text-[10px] font-bold">
                  <tr>
                    <th scope="col" class="px-10 py-6">Reference</th>
                    <th scope="col" class="px-10 py-6">Issue Date</th>
                    <th scope="col" class="px-10 py-6">Current Status</th>
                    <th scope="col" class="px-10 py-6 text-right">Investment</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-medium">
                  <tr v-for="order in mockOrders" :key="order.id" class="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-dark-bg/50 transition-colors group">
                    <td class="px-10 py-8 text-slate-900 dark:text-white font-bold tracking-tight">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-dark-bg flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                          <PackageIcon class="w-4 h-4" />
                        </div>
                        {{ order.id }}
                      </div>
                    </td>
                    <td class="px-10 py-8 text-slate-500 dark:text-slate-400 font-light">{{ order.date }}</td>
                    <td class="px-10 py-8">
                      <span :class="['px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold border rounded-full', order.status === 'Delivered' ? 'border-green-100 text-green-600 bg-green-50 dark:border-green-500/20 dark:text-green-400 dark:bg-green-500/5' : 'border-primary-100 text-primary-600 bg-primary-50 dark:border-primary-500/20 dark:text-primary-400 dark:bg-primary-500/5']">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-10 py-8 text-slate-900 dark:text-white font-bold text-right tracking-tight">${{ order.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { 
  LayoutDashboardIcon, ShoppingBagIcon, HeartIcon, SettingsIcon, 
  CreditCardIcon, CheckCircleIcon, PackageIcon 
} from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const activeTab = ref('Overview');

const navItems = [
  { label: 'Overview', icon: LayoutDashboardIcon },
  { label: 'Orders', icon: ShoppingBagIcon },
  { label: 'Wishlist', icon: HeartIcon },
  { label: 'Settings', icon: SettingsIcon },
];

const mockOrders = [
  { id: '#ORD-001', date: 'Oct 24, 2026', status: 'Delivered', total: '124.50' },
  { id: '#ORD-002', date: 'Oct 18, 2026', status: 'Delivered', total: '89.99' },
  { id: '#ORD-003', date: 'Oct 05, 2026', status: 'Processing', total: '299.00' },
];

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>
