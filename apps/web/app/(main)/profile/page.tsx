import { ProfileMain } from "@/features/profile/components/main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل",
};

export default function Profile() {
  return (
    <section className="flex flex-col gap-4 p-6">
      <ProfileMain />
    </section>
  );
}
