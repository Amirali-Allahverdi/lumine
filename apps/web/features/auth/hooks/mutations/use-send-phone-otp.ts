"use client";

import { useMutation } from "@tanstack/react-query";
import { sendPhoneOtpOptions } from "../../services/auth_1";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";

export function useSendPhoneOtp() {
  const router = useRouter();

  return useMutation({
    ...sendPhoneOtpOptions(),

    onSuccess: (data) => {
      console.log("OTP sent:", data);
      toast.success("کد تایید با موفقیت ارسال شد.");
      router.push("/auth/otp");
    },

    onError: (error) => {
      console.error("OTP error:", error);
    },
  });
}
