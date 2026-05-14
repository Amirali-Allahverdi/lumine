import { axiosInstance } from "@/shared/lib/http/axios";
import {
  SendPhoneOtpPayload,
  SendPhoneOtpResponse,
  VerifyPhoneOtpResponse,
} from "../types/auth_1";
import { Auth_1OtpType, Auth_1PhoneType } from "../schemas/auth_1";

export async function sendPhoneOtp(
  payload: Auth_1PhoneType,
): Promise<SendPhoneOtpResponse> {
  const { data } = await axiosInstance.post("/auth/send-otp/", payload);

  return data;
}

export async function verifyPhoneOtp(
  payload: Auth_1OtpType,
): Promise<VerifyPhoneOtpResponse> {
  const { data } = await axiosInstance.post("/auth/verify-otp/", payload);

  return data;
}
