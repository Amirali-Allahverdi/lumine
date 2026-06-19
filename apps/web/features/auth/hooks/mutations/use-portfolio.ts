import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { portfolioOptions } from "../../services/auth_5";

export function usePortfolio() {
  const router = useRouter();

  return useMutation({
    ...portfolioOptions(),

    onSuccess: (data) => {
      console.log(data);
      toast.success("پورتفولیو با موفقیت آپلود شد.");
      router.push("/auth/pending");
    },
    onError: (error) => {
      console.error("Portfolio upload error:", error);
      toast.danger(error.message);
    },
  });
}
