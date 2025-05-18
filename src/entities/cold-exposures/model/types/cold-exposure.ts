export interface IColdExposure {
  id: string; // UUID
  user_id: string; // UUID
  name: string;
  exposure_duration: number;
  preparation_duration: number;
  created_at: string; // ISO String
  updated_at: string;
}
