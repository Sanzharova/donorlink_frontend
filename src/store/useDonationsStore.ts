import { defineStore } from 'pinia';
import { donationsApi } from '../api/donationsApi';
import type { Donation } from '../models/Donation';
import type { PaginationInfo } from '../models/Pagination';

export const useDonationsStore = defineStore('donations', {
  state: () => ({
    donations: [] as Donation[],
    pagination: null as PaginationInfo | null,
    loading: false,
  }),

  actions: {
    async fetchMyDonations(page = 1, limit = 10) {
      this.loading = true;
      try {
        const res = await donationsApi.getMyDonations(page, limit);
        this.donations = res.data.donations as Donation[];
        this.pagination = res.data.pagination;
      } finally {
        this.loading = false;
      }
    },

    async fetchAllDonations(page = 1, limit = 10) {
      this.loading = true;
      try {
        const res = await donationsApi.getAllDonations(page, limit);
        this.donations = res.data.donations as Donation[];
        this.pagination = res.data.pagination;
      } finally {
        this.loading = false;
      }
    },

    async getDonation(id: string) {
      const res = await donationsApi.getDonationById(id);
      return res.data;
    },

    async updateDonation(id: string, data: Partial<Donation>) {
      const res = await donationsApi.updateDonation(id, data);
      return res.data;
    },
  },
});
