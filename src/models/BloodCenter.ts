export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OperatingHours {
  [day: string]: {
    open: string;
    close: string;
  } | undefined;
}

export interface BloodCenter {
  _id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: Coordinates;
  operatingHours?: OperatingHours;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BloodCenterCreate {
  name: string;
  address: string;
  phone: string;
  coordinates: Coordinates;
  operatingHours?: OperatingHours;
}

export interface BloodCenterUpdate {
  name?: string;
  address?: string;
  phone?: string;
  coordinates?: Coordinates;
  operatingHours?: OperatingHours;
  currentDonorCount?: number;
}
