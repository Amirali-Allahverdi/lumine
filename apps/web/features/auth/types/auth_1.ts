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
