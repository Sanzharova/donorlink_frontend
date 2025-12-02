import { defineStore } from 'pinia';
import { authApi } from '../api/authApi';
import type { User } from '../models/User';
import type { LoginRequest, RegisterRequest } from '../models/Auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: localStorage.getItem('accessToken') || '',
    loading: false,
    error: '',
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.user?.roles.includes('admin') || false,
  },

  actions: {
    async login(data: LoginRequest) {
      this.loading = true;
      this.error = '';
      try {
        const res = await authApi.login(data);
        this.accessToken = res.data.accessToken;
        this.user = res.data.user;

        localStorage.setItem('accessToken', this.accessToken);
      } catch (e: any) {
        this.error = e.response?.data?.error || 'Login error';
      } finally {
        this.loading = false;
      }
    },

    async register(data: RegisterRequest) {
      this.loading = true;
      this.error = '';
      try {
        const res = await authApi.register(data);
        this.accessToken = res.data.accessToken;
        this.user = res.data.user;

        localStorage.setItem('accessToken', this.accessToken);
      } catch (e: any) {
        this.error = e.response?.data?.error || 'Register error';
      } finally {
        this.loading = false;
      }
    },

    async refresh() {
      try {
        const res = await authApi.refresh();
        this.accessToken = res.data.accessToken;
        this.user = res.data.user;
        localStorage.setItem('accessToken', this.accessToken);
      } catch {
        await this.logout();
      }
    },

    async logout() {
      try {
        await authApi.logout();
      } catch (_) {}

      this.user = null;
      this.accessToken = '';
      localStorage.removeItem('accessToken');
    },
  },
});
