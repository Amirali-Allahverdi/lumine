"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { verifyPhoneOtpOptions } from "../../services/auth_1";
import { useAuthStore } from "../../store/auth_1";
import { STEP_ROUTES, STATUS_ROUTES } from "../../configs/auth_1";
import type {
  UserStatus,
  VerifyPhoneOtpResponse,
  VerifyPhoneOtpPayload,
} from "../../types/auth_1";

function resolveRedirectPath(step: number, status?: UserStatus): string {
  if (step === 6 && status) {
    return STATUS_ROUTES[status];
  }

  return STEP_ROUTES[step] ?? "/auth/basic-info";
}

export function useVerifyPhoneOtp() {
  const router = useRouter();
  const setVerifyOtpData = useAuthStore((s) => s.setVerifyOtpData);

  return useMutation<
    VerifyPhoneOtpResponse,
    Error, // ✅ استفاده از Error به جای custom type
    VerifyPhoneOtpPayload
  >({
    ...verifyPhoneOtpOptions(),

    onSuccess: (data) => {
      setVerifyOtpData(data);

      const step = data.data.step_registeration;
      const status = "status" in data.data ? data.data.status : undefined;

      if (status === "accept") {
        toast.success("خوش آمدید");
      } else if (status === "pendding") {
        toast.info("درخواست شما در حال بررسی است");
      } else if (status === "rejected") {
        toast.danger("درخواست شما رد شده است");
      } else {
        toast.success("شماره تماس با موفقیت تایید شد");
      }

      const target = resolveRedirectPath(step, status);
      router.push(target);
    },

    onError: (error) => {
      toast.danger(error.message || "خطا در تایید کد");
    },
  });
}
