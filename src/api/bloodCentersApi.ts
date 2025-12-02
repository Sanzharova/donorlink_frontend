import http from './base/http.ts';
import type {
  BloodCenter,
  BloodCenterCreate,
  BloodCenterUpdate,
} from '../models/BloodCenter';
import type { PaginatedResponse } from '../models/Pagination';

const prefix = '/api/blood-centers';

export const bloodCentersApi = {
  getCenters(page = 1, limit = 10) {
    return http.get<PaginatedResponse<BloodCenter>>(prefix, {
      params: { page, limit },
    });
  },

  getCenterById(id: string) {
    return http.get<BloodCenter>(`${prefix}/${id}`);
  },

  createCenter(data: BloodCenterCreate) {
    return http.post<BloodCenter>(prefix, data);
  },

  updateCenter(id: string, data: BloodCenterUpdate) {
    return http.put<BloodCenter>(`${prefix}/${id}`, data);
  },

  toggleArchive(id: string) {
    return http.patch(`${prefix}/${id}/archive`);
  },
};
