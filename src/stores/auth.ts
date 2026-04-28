import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Initialize from local storage if needed (we'd decode JWT ideally, but DummyJSON gives user object on login)
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser);
    } catch(e) {
      // clear invalid data
      localStorage.removeItem('user');
    }
  }

  async function login(credentials: any) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.login(credentials);
      user.value = response.data;
      token.value = response.data.token;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function signup(_userData: Record<string, string>) {
    isLoading.value = true;
    error.value = null;
    try {
      // DummyJSON doesn't persist new users, so we simulate a successful registration
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          isLoading.value = false;
          resolve({ data: { message: 'Registration successful' } });
        }, 1500);
      });
    } catch (err: any) {
      error.value = 'Registration failed';
      isLoading.value = false;
      throw err;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return { user, token, isLoading, error, login, signup, logout };
});
