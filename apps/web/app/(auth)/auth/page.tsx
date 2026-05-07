import { PhoneForm } from "@/features/auth/components/phone-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "احراز هویت",
};

export default function AuthPage() {
  return <PhoneForm />;
}
