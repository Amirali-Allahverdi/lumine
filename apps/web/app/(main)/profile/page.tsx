import { ProfileMain } from "@/features/profile/components/main";
import { Description } from "@heroui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل",
};

export default function Profile() {
  return (
    <section className="flex w-full justify-center items-center flex-col gap-4 p-6">
      <ProfileMain />
      <Description className="mb-36 text-center">
        تمام حقوق محفوظ است
        <br />
        نسخه 0.0.1
      </Description>
    </section>
  );
}
