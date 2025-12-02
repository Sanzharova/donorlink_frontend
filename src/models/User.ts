export interface User {
  _id: string;
  email: string;
  roles: string[];
  fullName: string;
  phone: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  bloodType: string;
  status: 'active' | 'banned';
  medicalHistory?: string | null;
  donationCount: number;
  lastDonationDate?: string | null;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdate {
  email?: string;
  fullName?: string;
  phone?: string;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  bloodType?: string;
  address?: string;
  medicalHistory?: string;
}
