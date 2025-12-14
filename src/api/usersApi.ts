import http from './base/http.ts';
import type { User, UserUpdate } from '../models/User';
import type { PaginatedResponse } from '../models/Pagination';

const prefix = '/api/users';

export const usersApi = {
  getUsers(page = 1, limit = 10) {
    return http.get<PaginatedResponse<User>>(`${prefix}`, {
      params: { page, limit },
    });
  },

  getUser(id: string) {
    return http.get<User>(`${prefix}/${id}`);
  },

  updateUser(id: string, data: UserUpdate) {
    return http.put<User>(`${prefix}/${id}`, data);
  },

  toggleBan(id: string) {
    return http.patch(`${prefix}/toggle-ban/${id}`);
  },

  toggleAdmin(id: string) {
    return http.patch(`${prefix}/toggle-admin/${id}`);
  },
};
