import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import api from '../services/api';

interface RegisteredUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
  image: string;
}

function getRegisteredUsers(): RegisteredUser[] {
  try {
    const data = localStorage.getItem('registered_users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: RegisteredUser[]): void {
  localStorage.setItem('registered_users', JSON.stringify(users));
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value && !!token.value);

  // Initialize from local storage
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser);
    } catch(e) {
      localStorage.removeItem('user');
    }
  }

  function generateToken(): string {
    return 'local_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
  }

  async function login(credentials: { username: string; password: string }) {
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      // First, check local registered users
      const registeredUsers = getRegisteredUsers();
      const localUser = registeredUsers.find(
        (u) =>
          (u.username.toLowerCase() === credentials.username.toLowerCase() ||
           u.email.toLowerCase() === credentials.username.toLowerCase()) &&
          u.password === credentials.password
      );

      if (localUser) {
        // Local user found — authenticate directly
        const localToken = generateToken();
        const userData: User = {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          gender: localUser.gender,
          image: localUser.image,
          token: localToken,
        };
        user.value = userData;
        token.value = localToken;
        localStorage.setItem('token', localToken);
        localStorage.setItem('user', JSON.stringify(userData));
        successMessage.value = `Welcome back, ${localUser.firstName}!`;
        return;
      }

      // Fall back to DummyJSON API for predefined users
      const response = await api.login(credentials);
      user.value = response.data;
      token.value = response.data.token;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      successMessage.value = `Welcome back, ${response.data.firstName}!`;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Invalid credentials. Please try again.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function signup(userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) {
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      // Simulate network delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const registeredUsers = getRegisteredUsers();

      // Check for duplicate username
      if (registeredUsers.some((u) => u.username.toLowerCase() === userData.username.toLowerCase())) {
        error.value = 'This username is already taken. Please choose another.';
        throw new Error(error.value);
      }

      // Check for duplicate email
      if (registeredUsers.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
        error.value = 'An account with this email already exists.';
        throw new Error(error.value);
      }

      // Create new user
      const newUser: RegisteredUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        gender: 'not specified',
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.firstName + '+' + userData.lastName)}&background=d4af37&color=0F0F0F&bold=true&size=128`,
      };

      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);

      // Auto-login the new user
      const localToken = generateToken();
      const authUser: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        image: newUser.image,
        token: localToken,
      };
      user.value = authUser;
      token.value = localToken;
      localStorage.setItem('token', localToken);
      localStorage.setItem('user', JSON.stringify(authUser));
      successMessage.value = `Welcome to the Collective, ${newUser.firstName}!`;
    } catch (err: any) {
      if (!error.value) {
        error.value = 'Registration failed. Please try again.';
      }
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    successMessage.value = null;
    error.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  function clearMessages() {
    error.value = null;
    successMessage.value = null;
  }

  return { user, token, isLoading, error, successMessage, isAuthenticated, login, signup, logout, clearMessages };
});
