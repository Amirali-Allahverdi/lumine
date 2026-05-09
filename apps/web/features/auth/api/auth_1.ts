import { axiosInstance } from "@/shared/lib/axios";
import { SendPhoneOtpPayload, SendPhoneOtpResponse } from "../types/auth_1";

export async function sendPhoneOtp(
  payload: SendPhoneOtpPayload,
): Promise<SendPhoneOtpResponse> {
  const { data } = await axiosInstance.post("/auth/send-otp/", { payload });

  return data;
}
