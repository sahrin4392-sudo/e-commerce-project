# Sahrin Collective | Premium E-Commerce Experience

A production-grade, luxury-focused e-commerce platform built with **Vue 3**, **TypeScript**, and **Pinia**. Designed for the modern aesthete, featuring a minimalist dark luxury aesthetic and a highly responsive, animated interface.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![Vue](https://img.shields.io/badge/Vue-3.x-4fc08d)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

---

## ✨ Core Features

### 🛍️ Shopping Experience
* **Advanced Product Grid**: Highly responsive grid with lazy-loaded images and glassmorphism cards.
* **Premium Filtering**: Multi-dimensional filtering system (Category, Price Range, Brand, Rating, Stock).
* **Dynamic Sorting**: Intelligent sorting by price, rating, newest arrivals, and alphabetical order.
* **Smart Search**: Real-time search with instantly filtered results and URL query synchronization.
* **Quick View Modal**: Deep-dive into product details without leaving the current context.

### 💖 User Engagement
* **Persistent Wishlist**: Save favorite pieces with animated heart toggles and local persistence.
* **Seamless Cart**: Slide-out cart drawer with real-time quantity management and persistence.
* **Product Discovery**: Curated collections and "Featured" spotlights on the home page.

### 🔒 Commerce & Security
* **Client Authentication**: Secure login/signup simulation integrated with DummyJSON API.
* **Secure Checkout**: Bank-grade styled payment interface with field validation.
* **Order Tracking**: Post-purchase tracking system with live status simulation and premium stepper UI.

### 🎨 Design & UX
* **Luxury UI/UX**: Custom dark-luxury design system with gold accents.
* **Premium Skeletons**: Custom shimmer-effect loading states to eliminate layout shifts.
* **Dark Mode Native**: Fully optimized for both light and dark environments.
* **Smooth Motion**: Transition-group animations and fade-in effects for a premium feel.

---

## 🛠️ Technology Stack

* **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
* **State Management**: [Pinia](https://pinia.vuejs.org/) (Modular stores)
* **Routing**: [Vue Router 4](https://router.vuejs.org/) (Lazy loading & Guards)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
* **Icons**: [Lucide Vue](https://lucide.dev/)
* **API**: [DummyJSON](https://dummyjson.com/) (Mock data & Auth)
* **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🏗️ Architecture

```text
src/
├── components/     # Reusable UI components (Modals, Skeletons, Cards)
├── pages/          # Full-page views (Lazy loaded)
├── stores/         # Pinia state management (Auth, Cart, Wishlist, Products, Orders)
├── services/       # API interaction layers (Axios)
├── types/          # Strict TypeScript interfaces
├── router/         # Navigation logic and guards
└── assets/         # Static resources
```

---

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Setup environment variables**
   * Copy `.env.example` to `.env`
   * Ensure `VITE_API_BASE_URL` is set correctly.
4. **Run in development mode**
   ```bash
   npm run dev
   ```
5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📦 Deployment Guide

### Netlify
1. Connect your GitHub repository to Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Add environment variables in the Netlify UI.
5. The `public/_redirects` file is already included to handle SPA routing.

### Vercel
1. Connect your repository to Vercel.
2. Vercel will automatically detect Vite.
3. Ensure environment variables are added in the Project Settings.
4. The `vercel.json` file is already included to handle SPA routing.

---

## 📄 License
Proudly crafted by the Sahrin Collective Engineering Team.
v1.0.0 - Production Ready.
