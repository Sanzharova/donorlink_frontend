import type { User } from './User';
import type { BloodCenter } from './BloodCenter';

export interface Donation {
  _id: string;
  userId: string | UserShort;
  status: 'requested' | 'scheduled' | 'completed' | 'cancelled';
  scheduledFor: string;
  completedAt?: string | null;
  centerId: string | BloodCenterShort;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserShort {
  _id: string;
  fullName: string;
  bloodType: string;
}

export interface BloodCenterShort {
  _id: string;
  name: string;
  address: string;
}
