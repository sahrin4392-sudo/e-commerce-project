import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Initialize from local storage or default to dark (since previous default was dark)
  const isDark = ref(localStorage.getItem('theme') !== 'light');

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const initTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Watch for changes and update HTML class and localStorage
  watch(isDark, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, { immediate: true });

  return {
    isDark,
    toggleTheme,
    initTheme
  };
});
