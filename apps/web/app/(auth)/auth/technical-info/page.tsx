import { TechnicalInfoForm } from "@/features/auth/components/technical_info-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات فنی",
};

export default function AuthTechnicalInfoPage() {
  return <TechnicalInfoForm />;
}
