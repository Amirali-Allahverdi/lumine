import { OtpForm } from "@/features/auth/components/otp-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تایید شماره تماس",
};

export default function AuthOtpPage() {
  return <OtpForm />;
}
