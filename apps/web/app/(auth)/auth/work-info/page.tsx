import { TechnicalInfoForm } from "@/features/auth/components/technical_info-form";
import { WorkInfoForm } from "@/features/auth/components/work_info-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات کاری",
};

export default function AuthWorkInfoPage() {
  return <WorkInfoForm />;
}
