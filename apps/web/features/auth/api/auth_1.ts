import { axiosInstance } from "@/shared/lib/http/axios";
import { SendPhoneOtpPayload, SendPhoneOtpResponse } from "../types/auth_1";
import { Auth_1PhoneType } from "../schemas/auth_1";

export async function sendPhoneOtp(
  payload: Auth_1PhoneType,
): Promise<SendPhoneOtpResponse> {
  const { data } = await axiosInstance.post("/auth/send-otp/", payload);

  return data;
}
