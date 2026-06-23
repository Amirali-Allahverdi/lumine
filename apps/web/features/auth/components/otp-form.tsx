"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigOtp } from "../configs/auth_1";
import { Auth_1OtpType, auth_1SchemaOtp } from "../schemas/auth_1";
import { Pen } from "lucide-react";
import { Separator, Surface } from "@heroui/react";
import Link from "next/link";
import { useVerifyPhoneOtp } from "../hooks/mutations/use-verify-phone";
import { useAuthStore } from "../store/auth_1";

export const OtpForm = () => {
  const { mutate, isPending } = useVerifyPhoneOtp();

  const phoneNumber = useAuthStore((s) => s.registration.phoneNumber);

  const onSubmit = (data: Auth_1OtpType) => {
    mutate({
      phone_number: data.phone_number,
      code: data.code,
    });
  };

  return (
    <Surface variant="transparent" className="w-sm p-4">
      <h3 className="text-2xl font-bold my-4">تایید شماره تلفن</h3>
      <Separator className="mb-4" />
      <Surface
        variant="transparent"
        className="w-full mb-2 flex justify-center items-center"
      >
        <Link
          className="flex w-fit p-2 rounded-full dark:text-accent-dark text-accent-hover-light bg-surface-elevated-light dark:bg-surface-primary-dark items-center justify-center gap-2 font-bold"
          href="/auth"
        >
          {phoneNumber}
          <Pen className="w-4 h-4" />
        </Link>
      </Surface>
      <FormBuilder
        fields={auth_1FieldConfigOtp}
        onSubmit={onSubmit}
        schema={auth_1SchemaOtp}
        defaultValues={{ phone_number: phoneNumber ?? "", code: "" }}
        submitButtonText="تایید کد و ادامه"
      />
    </Surface>
  );
};
