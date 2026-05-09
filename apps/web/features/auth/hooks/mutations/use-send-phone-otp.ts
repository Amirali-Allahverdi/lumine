"use client";

import { useMutation } from "@tanstack/react-query";
import { sendPhoneOtpOptions } from "../../services/auth_1";

export function useSendPhoneOtp() {
  return useMutation({
    ...sendPhoneOtpOptions(),

    onSuccess: (data) => {
      console.log("OTP sent:", data);
    },

    onError: (error) => {
      console.error("OTP error:", error);
    },
  });
}
