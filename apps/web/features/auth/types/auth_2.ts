export interface BasicInfoPayload {
  first_name: string;
  last_name: string;
  national_code: string;
  nationality: "IR" | "FR";
  gender: "male" | "female";
  birth_date: string;
}

export interface BasicInfoResponse {
  success: boolean;
  message: string;
  data: BasicInfoPayload;
}
