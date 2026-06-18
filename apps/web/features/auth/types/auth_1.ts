//?Phone
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

//?Otp
export interface VerifyPhoneOtpPayload {
  phone_number: string;
  code: string;
}

interface VerifyPhoneOtpResponseData {
  user_token: string;
  phone_number: string;
  step_registeration: number;
}

export interface VerifyPhoneOtpResponse {
  success: boolean;
  message: string;
  data: VerifyPhoneOtpResponseData;
}
