export interface Location {
  id: number;
  location_name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
  updatedAt?: string;
}

export type LocationPayload = Omit<Location, "id" | "createdAt" | "updatedAt">;
