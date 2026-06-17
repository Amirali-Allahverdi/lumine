"use client";

import { useMutation } from "@tanstack/react-query";
import { setRoleOptions, setCategoryOptions } from "../../services/auth_3";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { Auth_3TechnicalInfoType } from "../../schemas/auth_3";

export function useTechnicalInfo() {
  const router = useRouter();

  const roleMutation = useMutation(setRoleOptions());
  const categoryMutation = useMutation({
    ...setCategoryOptions(),
    onSuccess: () => {
      toast.success("اطلاعات فنی با موفقیت ثبت شد.");
      router.push("/auth/next-step");
    },
    onError: (error) => {
      toast.danger(error.message);
    },
  });

  const onSubmit = async (formData: Auth_3TechnicalInfoType) => {
    await roleMutation.mutateAsync({ role: formData.role });
    await categoryMutation.mutateAsync({
      category_id: Number(formData.category),
    });
  };

  return {
    onSubmit,
    isPending: roleMutation.isPending || categoryMutation.isPending,
  };
}
