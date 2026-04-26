<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-4">Contact Us</h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We are here to assist you with any inquiries regarding our collections, your orders, or our brand.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div class="space-y-12">
          <div>
            <h3 class="text-2xl font-bold uppercase tracking-wide mb-6">Get in Touch</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Our dedicated concierge team is available to provide you with a personalized experience. Please do not hesitate to reach out.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold uppercase tracking-wider mb-1">Our Boutique</h4>
                <p class="text-slate-600 dark:text-slate-400">123 Luxury Avenue<br>New York, NY 10022</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold uppercase tracking-wider mb-1">Email Inquiries</h4>
                <p class="text-slate-600 dark:text-slate-400">concierge@sahrincollective.com</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold uppercase tracking-wider mb-1">Phone</h4>
                <p class="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="glass-card p-8 md:p-12">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">First Name</label>
                <input type="text" class="input-field" placeholder="Jane" required>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Name</label>
                <input type="text" class="input-field" placeholder="Doe" required>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
              <input type="email" class="input-field" placeholder="jane@example.com" required>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Subject</label>
              <input type="text" class="input-field" placeholder="How can we help you?" required>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Message</label>
              <textarea rows="5" class="input-field resize-none" placeholder="Your message..." required></textarea>
            </div>

            <button type="submit" class="btn-primary w-full flex justify-center items-center gap-2">
              <span>Send Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p v-if="success" class="text-green-500 text-sm mt-4 text-center">Your message has been sent successfully. We will contact you soon.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const success = ref(false);

const submitForm = () => {
  // Simulate sending email
  success.value = true;
  setTimeout(() => {
    success.value = false;
  }, 5000);
};
</script>
