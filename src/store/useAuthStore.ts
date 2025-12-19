import {defineStore} from 'pinia';
import {authApi} from '../api/authApi';
import type {User} from '../models/User';
import type {LoginRequest, RegisterRequest} from '../models/Auth';
import {toastError} from "@/utils/toast.ts";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    accessToken: localStorage.getItem('accessToken') || '',
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    loading: false,
    error: '',
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken
  },

  actions: {
    async login(data: LoginRequest) {
      this.loading = true;
      this.error = '';
      try {
        const res = await authApi.login(data);
        this.accessToken = res.data.accessToken;
        this.user = res.data.user;

        console.log(this.user)
        console.log(String(this.user.roles.includes('admin')));

        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAdmin', String(this.user.roles.includes('admin')));

        console.log(
          localStorage.getItem('isAdmin')
        )

        return true;
      } catch (e: any) {
        toastError(e.response?.data?.error);
        return false;
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
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAdmin', String(this.user.roles.includes('admin')));
        return true;
      } catch (e: any) {
        toastError(e.response?.data?.error);
        return false;
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
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAdmin', String(this.user.roles.includes('admin')));
      } catch (e: any) {
        toastError(e.response?.data?.error);
        await this.logout();
      }
    },

    async logout() {
      await authApi.logout()
        .then(() => {
          this.user = null;
          this.accessToken = '';
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAdmin');
        });
    },
  },
});
