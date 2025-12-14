import { defineStore } from 'pinia';
import { usersApi } from '../api/usersApi';
import type { User, UserUpdate } from '../models/User';
import type { PaginationInfo } from '../models/Pagination';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    pagination: null as PaginationInfo | null,
    loading: false,
  }),

  actions: {
    async fetchUsers(page = 1, limit = 10) {
      this.loading = true;
      try {
        const res = await usersApi.getUsers(page, limit);
        this.users = res.data.users as User[];
        this.pagination = res.data.pagination;
      } finally {
        this.loading = false;
      }
    },

    async getUser(id: string) {
      const res = await usersApi.getUser(id);
      return res.data;
    },

    async updateUser(id: string, data: UserUpdate) {
      const res = await usersApi.updateUser(id, data);
      return res.data;
    },

    async toggleBan(id: string) {
      return usersApi.toggleBan(id);
    },

    async toggleAdmin(id: string) {
      return usersApi.toggleAdmin(id);
    },
  },
});
