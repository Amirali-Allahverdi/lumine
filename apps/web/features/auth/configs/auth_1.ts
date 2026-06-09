import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_1FieldConfigPhone: FieldConfig[] = [
  {
    name: "phone_number",
    type: "text",
    placeholder: "لطفا شماره تماس خود را وارد کنید",
    required: true,
    description: "شماره تماس با 09 شروع میشود و 11 رقم دارد",
    className: "text-center my-2",
    variant: "secondary",
  },
];

export const auth_1FieldConfigOtp: FieldConfig[] = [
  {
    name: "code",
    label: "کد ارسال شده به شماره بالا را وارد کنید",
    type: "otp",
    required: true,
    description:
      "در صورت عدم دریافت کد، پوشه هرزنامه (spam) خود را بررسی کنید.",
    maxLength: 6,
    className: "flex mt-2 justify-center",
    timerSeconds: 10,
  },
];

export const STEP_ROUTES: Record<number, string> = {
  1: "/auth/basic-info",
  2: "/auth/technical-info",
  3: "/auth/",
  4: "/auth/",
  5: "/auth/",
  6: "/",
};
