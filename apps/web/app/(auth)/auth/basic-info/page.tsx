import { AuthLogoStepper } from "@/features/auth/components/auth-logo-stepper";
import { BasicInfoForm } from "@/features/auth/components/basic_info-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات پایه",
};

export default function AuthBasicInfoPage() {
  return <BasicInfoForm />;
}
