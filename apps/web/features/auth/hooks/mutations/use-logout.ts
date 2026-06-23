// features/auth/hooks/use-logout.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { useAuthStore } from "../../store/auth_1";
import { axiosInstance } from "@/shared/lib/http/axios";

async function logoutApi(): Promise<void> {
  await axiosInstance.post("/auth/logout/");
}

export function useLogout() {
  const router = useRouter();
  const resetAuth = useAuthStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      resetAuth();
      toast.success("با موفقیت خارج شدید");
      router.push("/auth");
    },

    onError: () => {
      // حتی اگر backend خطا داد، local logout انجام بده
      resetAuth();
      router.push("/auth");
    },
  });
}
