import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { basicInfoOptions } from "../../services/auth_2";
import { toast } from "@heroui/react";

export function useBasicInfo() {
  const router = useRouter();

  return useMutation({
    ...basicInfoOptions(),

    onSuccess: (data) => {
      console.log(data);
      toast.success("اطلاعات شخصی با موفقیت ذخیره شد.");
      router.push("/auth/technical-info");
    },
    onError: (error) => {
      console.error("Basic info sending error:", error);
      toast.danger(error.message);
    },
  });
}
