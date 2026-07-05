"use client";

import {
  BriefcaseFill,
  ChartAreaStackedNormalized,
  StarFill,
  Tray,
} from "@gravity-ui/icons";
import { useMe } from "../hooks/mutations/use-me";
import { ProfileHeader } from "./header";
import {
  ProfileHeaderLinkBox,
  ProfileHeaderLinkBoxProps,
} from "./header-link-box";
import { ProfileOptions } from "./options/options";

const profileHeaderLinkBoxs: ProfileHeaderLinkBoxProps[] = [
  {
    icon: <StarFill className="size-10 text-primary" />,
    label: "پورتفولیو من",
    href: "/",
  },
  {
    icon: <BriefcaseFill className="size-10 text-primary" />,
    label: "پروژه ها",
    href: "/",
  },
  {
    icon: <ChartAreaStackedNormalized className="size-10 text-primary" />,
    label: "آمار",
    href: "/",
  },
];

export const ProfileMain = () => {
  const { data, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="w-full py-4 px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 animate-pulse">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-center text-red-500">
        خطا در بارگذاری اطلاعات کاربری
      </div>
    );
  }

  return (
    <section className="flex max-w-[700px] flex-col gap-8">
      <ProfileHeader user={data} />
      <div className="flex justify-center sm:justify-start gap-2">
        {profileHeaderLinkBoxs.map((link, i) => (
          <ProfileHeaderLinkBox key={i} {...link} />
        ))}
      </div>
      <ProfileOptions />
    </section>
  );
};
