import { create } from "zustand";
import {
  SendPhoneOtpResponse,
  VerifyPhoneOtpResponse,
} from "@/features/auth/types/auth_1";

interface AuthState {
  phoneNumber: string | null;
  otpExpire: number | null;
  otpCode?: string | null;

  userToken: string | null;
  stepRegistration: number | null;

  setSendOtpData: (response: SendPhoneOtpResponse) => void;
  setVerifyOtpData: (response: VerifyPhoneOtpResponse) => void;

  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: null,
  otpExpire: null,
  otpCode: null,

  userToken: null,
  stepRegistration: null,

  setSendOtpData: (response) =>
    set({
      phoneNumber: response.data.phone_number,
      otpExpire: response.data.expired_OTP,
      otpCode: response.data.OTP_code ?? null,
    }),

  setVerifyOtpData: (response) => {
    const data = response.data;

    set((state) => ({
      userToken: "user_token" in data ? data.user_token : state.userToken,
      stepRegistration: data.step_registeration,

      // اگر response تایپ‌شده‌ی verify واقعاً phone_number ندارد،
      // بهتر است همان phoneNumber قبلی حفظ شود.
      phoneNumber: state.phoneNumber,
    }));
  },

  resetAuth: () =>
    set({
      phoneNumber: null,
      otpExpire: null,
      otpCode: null,
      userToken: null,
      stepRegistration: null,
    }),
}));
