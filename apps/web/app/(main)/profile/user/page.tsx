import { ProfileMain } from "@/features/profile/components/main";
import { Description } from "@heroui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات کاربری",
};

export default function ProfileUser() {
  return (
    <section className="flex w-full justify-center items-center flex-col gap-4 p-6"></section>
  );
}
