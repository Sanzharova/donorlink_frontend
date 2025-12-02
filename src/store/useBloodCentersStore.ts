import { defineStore } from 'pinia';
import { bloodCentersApi } from '../api/bloodCentersApi';
import type {
  BloodCenter,
  BloodCenterCreate,
  BloodCenterUpdate,
} from '../models/BloodCenter';
import type { PaginationInfo } from '../models/Pagination';

export const useBloodCentersStore = defineStore('bloodCenters', {
  state: () => ({
    centers: [] as BloodCenter[],
    pagination: null as PaginationInfo | null,
    loading: false,
  }),

  actions: {
    async fetchCenters(page = 1, limit = 10) {
      this.loading = true;
      try {
        const res = await bloodCentersApi.getCenters(page, limit);
        this.centers = res.data.bloodCenters as BloodCenter[];
        this.pagination = res.data.pagination;
      } finally {
        this.loading = false;
      }
    },

    async getCenterById(id: string) {
      const res = await bloodCentersApi.getCenterById(id);
      return res.data;
    },

    async createCenter(data: BloodCenterCreate) {
      const res = await bloodCentersApi.createCenter(data);
      return res.data;
    },

    async updateCenter(id: string, data: BloodCenterUpdate) {
      const res = await bloodCentersApi.updateCenter(id, data);
      return res.data;
    },

    async toggleArchive(id: string) {
      const res = await bloodCentersApi.toggleArchive(id);
      return res.data;
    },
  },
});
