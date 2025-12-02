import http from './base/http.ts';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../models/Auth';

const prefix = '/api/auth';

export const authApi = {
  login(data: LoginRequest) {
    return http.post<AuthResponse>(`${prefix}/login`, data);
  },

  register(data: RegisterRequest) {
    return http.post<AuthResponse>(`${prefix}/register`, data);
  },

  refresh() {
    return http.post<AuthResponse>(`${prefix}/refresh`);
  },

  logout() {
    return http.post(`${prefix}/logout`);
  },
};
