import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Lazy load all pages for better production performance
const Home = () => import('../pages/Home.vue');
const Products = () => import('../pages/Products.vue');
const ProductDetail = () => import('../pages/ProductDetail.vue');
const Categories = () => import('../pages/Categories.vue');
const Signup = () => import('../pages/Signup.vue');
const Login = () => import('../pages/Login.vue');
const Cart = () => import('../pages/Cart.vue');
const Wishlist = () => import('../pages/Wishlist.vue');
const Payment = () => import('../pages/Payment.vue');
const Dashboard = () => import('../pages/Dashboard.vue');
const OrderTracking = () => import('../pages/OrderTracking.vue');
const PageNotFound = () => import('../pages/PageNotFound.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/order-tracking',
    name: 'OrderTracking',
    component: OrderTracking
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
