"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Separator, Surface } from "@heroui/react";
import FormBuilder from "@/shared/components/form/form-builder";
import { portfolioFieldConfig } from "../configs/auth_5";
import { portfolioSchema, PortfolioFormType } from "../schemas/auth_5";
import { usePortfolio } from "../hooks/mutations/use-portfolio";
import { useRoleStore } from "../store/setting-role";
import { PortfolioPayload } from "../types/auth_5";

export const PortfolioForm = () => {
  const router = useRouter();
  const role = useRoleStore((s) => s.role);
  const { mutate, isPending } = usePortfolio();

  useEffect(() => {
    if (role === "employer") {
      router.replace("/auth/pending");
    }
  }, [role, router]);

  if (!role || role === "employer") {
    return null;
  }

  if (role !== "model" && role !== "instructor") {
    return (
      <Surface variant="transparent" className="w-sm p-4 rounded-4xl">
        <p className="text-center text-danger">
          نقش کاربر معتبر نیست. لطفاً دوباره وارد شوید.
        </p>
      </Surface>
    );
  }

  const onSubmit = (data: PortfolioFormType) => {
    const payload: PortfolioPayload = {
      full_body_url: data.full_body_url as File,
      full_shot_url: data.full_shot_url as File,
    };

    mutate(payload);
  };

  return (
    <Surface variant="transparent" className="w-sm p-4 rounded-4xl">
      <h3 className="text-2xl font-bold my-4">پورتفولیو</h3>
      <Separator className="mb-4" />
      <FormBuilder
        fields={portfolioFieldConfig}
        onSubmit={onSubmit}
        schema={portfolioSchema}
        submitButtonText="تکمیل ثبت نام"
      />
    </Surface>
  );
};
