"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyPhoneOtpOptions } from "../../services/auth_1";
import { toast } from "@heroui/react";
import { useAuthStore } from "../../store/auth_1";
import { STEP_ROUTES, STATUS_ROUTES } from "../../configs/auth_1";
import { UserStatus } from "../../types/auth_1";

function resolveRedirectPath(step: number, status?: UserStatus): string {
  if (step === 6) {
    return STATUS_ROUTES[status ?? "pendding"];
  }

  return STEP_ROUTES[step] ?? "/auth/basic-info";
}

export function useVerifyPhoneOtp() {
  const router = useRouter();
  const setVerifyOtpData = useAuthStore((s) => s.setVerifyOtpData);

  return useMutation({
    ...verifyPhoneOtpOptions(),

    onSuccess: (data) => {
      setVerifyOtpData(data);
      toast.success("شماره تماس با موفقیت تایید شد.");

      const step = data.data.step_registeration;
      const status = "status" in data.data ? data.data.status : undefined;

      const target = resolveRedirectPath(step, status);

      router.push(target);
    },

    onError: (error) => {
      console.error("Verify OTP error:", error);
    },
  });
}
