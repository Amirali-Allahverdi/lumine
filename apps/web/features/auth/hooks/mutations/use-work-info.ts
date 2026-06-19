import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { workInfoOptions } from "../../services/auth_4";
import { UserRole } from "../../types/auth_3";

export function useWorkInfo(role: UserRole | null) {
  const router = useRouter();

  return useMutation({
    ...workInfoOptions(role),

    onSuccess: (data) => {
      console.log(data);
      toast.success("اطلاعات با موفقیت ذخیره شد.");
      router.push("/auth/portfolio");
    },
    onError: (error) => {
      console.error("Technical info error:", error);
      toast.danger(error.message);
    },
  });
}
