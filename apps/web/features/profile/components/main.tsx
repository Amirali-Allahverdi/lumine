"use client";

import {
  BriefcaseFill,
  ChartAreaStackedNormalized,
  StarFill,
  Tray,
} from "@gravity-ui/icons";
import { useMe } from "../hooks/mutations/use-me";
import { ProfileSidebar } from "./sidebar";
import {} from "./sidebar-item";
import { ProfileOptions } from "./options/options";

export const ProfileMain = () => {
  const { data, isLoading } = useMe();

  if (!data) {
    return (
      <div className="p-4 text-center text-red-500">
        خطا در بارگذاری اطلاعات کاربری
      </div>
    );
  }

  return (
    <section className="flex flex-col sm:flex-row justify-center mt-4 sm:mt-16 w-full items-start max-w-4xl gap-2 sm:gap-8">
      <ProfileSidebar user={data} />
      <ProfileOptions />
    </section>
  );
};
