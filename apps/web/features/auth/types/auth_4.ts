// ─── Payload Types ───────────────────────────────────────────────────────────

export interface ModelWorkPayload {
  height_cm: number;
  weight_kg: number;
  skin_color: string;
  eye_color: string;
  hair_color: string;
  full_body_url: File;
  full_shot_url: File;
}

export interface EmployerWorkPayload {
  company_type: "individual" | "company" | "agency";
  company_name: string;
  email: string;
  website?: string;
  instagram?: string;
  city: string;
  address: string;
  description?: string;
}

export interface InstructorWorkPayload {
  years_of_experience: number;
  certifications: "diploma" | "bachelor" | "master" | "PhD";
  workshop_types: "online" | "in_person" | "private";
  email: string;
  website?: string;
  instagram?: string;
  city: string;
  description?: string;
}

export type WorkInfoPayload =
  | ModelWorkPayload
  | EmployerWorkPayload
  | InstructorWorkPayload;

// ─── Response Type ───────────────────────────────────────────────────────────

export interface WorkInfoResponse {
  success: boolean;
  message: string;
  data: WorkInfoPayload;
}
