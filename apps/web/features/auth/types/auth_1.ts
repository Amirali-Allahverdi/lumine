//? Phone
export interface SendPhoneOtpPayload {
  phone_number: string;
}

interface SendPhoneOtpResponseData {
  phone_number: string;
  expired_OTP: number;

  //! ONLY FOR DEVELOPMENT
  OTP_code: string;
}

export interface SendPhoneOtpResponse {
  success: boolean;
  message: string;
  data: SendPhoneOtpResponseData;
}

//? Otp
export interface VerifyPhoneOtpPayload {
  phone_number: string;
  code: string;
}

export type UserStatus = "pendding" | "rejected" | "accept";

export interface AuthTokens {
  refresh: string;
  access: string;
}

export interface IncompleteRegistrationData {
  user_token: string;
  step_registeration: 1 | 2 | 3 | 4 | 5;
}

export interface PendingRegistrationData {
  step_registeration: 6;
  status: "pendding";
}

export interface RejectedRegistrationData {
  step_registeration: 6;
  status: "rejected";
}

export interface AcceptedRegistrationData {
  step_registeration: 6;
  status: "accept";
  tokens: AuthTokens;
}

export type VerifyPhoneOtpResponseData =
  | IncompleteRegistrationData
  | PendingRegistrationData
  | RejectedRegistrationData
  | AcceptedRegistrationData;

export interface VerifyPhoneOtpResponse {
  success: boolean;
  message: string;
  data: VerifyPhoneOtpResponseData;
}

export interface AuthStateData {
  phoneNumber: string | null;
  otpExpire: number | null;
  otpCode: string | null;

  userToken: string | null;
  stepRegistration: number | null;

  tokens: AuthTokens | null;
  status: UserStatus | null;
}
