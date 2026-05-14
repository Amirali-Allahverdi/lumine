"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyPhoneOtpOptions } from "../../services/auth_1";
import { toast } from "@heroui/react";
import { useAuthStore } from "../../store/auth_1";

export function useVerifyPhoneOtp() {
  const router = useRouter();
  const setVerifyOtpData = useAuthStore((s) => s.setVerifyOtpData);

  return useMutation({
    ...verifyPhoneOtpOptions(),

    onSuccess: (data) => {
      setVerifyOtpData(data);
      console.log("Data: ", data);
      toast.success("کد تایید با موفقیت تایید شد.");
      router.push("/auth/basic-info");
    },

    onError: (error) => {
      console.error("Verify OTP error:", error);
    },
  });
}
