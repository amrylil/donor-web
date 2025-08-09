export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  [key: string]: any;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserDetails {
  id: string;
  user_id: string;
  full_name: string;
  nik: string;
  gender: string;
  date_of_birth: string;
  blood_type: string;
  rhesus: string;
  phone_number: string;
  address: string;
  is_active_donor: boolean;
  latitude: number;
  longitude: number;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  user: UserResponse;
  details: UserDetails;
}
