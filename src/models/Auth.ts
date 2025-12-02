import type { User } from './User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  bloodType: string;
  address: string;
  medicalHistory?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
