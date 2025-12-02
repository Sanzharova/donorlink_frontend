import http from './base/http.ts';
import type { Donation } from '../models/Donation';
import type { PaginatedResponse } from '../models/Pagination';

const prefix = '/api/donations';

export const donationsApi = {
  createDonation(data: {
    scheduledFor: string;
    centerId: string;
    notes?: string;
  }) {
    return http.post<Donation>(prefix, data);
  },

  getMyDonations(page = 1, limit = 10) {
    return http.get<PaginatedResponse<Donation>>(`${prefix}/my-donations`, {
      params: { page, limit },
    });
  },

  getAllDonations(page = 1, limit = 10) {
    return http.get<PaginatedResponse<Donation>>(`${prefix}`, {
      params: { page, limit },
    });
  },

  getDonationById(id: string) {
    return http.get<Donation>(`${prefix}/${id}`);
  },

  updateDonation(id: string, data: Partial<Donation>) {
    return http.put<Donation>(`${prefix}/${id}`, data);
  },
};
