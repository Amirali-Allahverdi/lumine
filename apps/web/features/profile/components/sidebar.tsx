import React from "react";
import { GetMeResponse } from "../types/me";
import { Avatar, Button } from "@heroui/react";
import { getMediaUrl } from "@/shared/lib/media/get-media";
import { getRoleLabel } from "@/shared/lib/get-role-label";
import { ArrowUpFromSquare, Calendar, Star, StarFill } from "@gravity-ui/icons";
import { ProfileSidebarItem, ProfileSidebarItemProps } from "./sidebar-item";

interface ProfileSidebarProps {
  user: GetMeResponse;
  className?: string;
}

const profileSidebarItems: ProfileSidebarItemProps[] = [
  {
    icon: <Star className="size-6" />,
    title: "کلاب",
    value: "به زودی",
  },
  {
    icon: <Calendar className="size-6" />,
    title: "عضو از",
    value: "15 فروردین 1405",
  },
];

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  className = "",
}) => {
  const { first_name, last_name, groups, images_portfolio } = user;

  const fullName =
    `${first_name || ""} ${last_name || ""}`.trim() || "کاربر مهمان";

  const avatarUrl = getMediaUrl(images_portfolio?.full_shot_url);

  return (
    <aside
      className={`${className} w-full sm:w-[50%] shadow-2xl bg-card p-4 flex flex-col gap-4 rounded-4xl h-fit`}
    >
      <div className="flex items-center justify-center sm:justify-start gap-4">
        <div className="flex items-center gap-4 flex-col justify-center">
          <Avatar className="size-28 rounded-full">
            <Avatar.Image
              className="object-cover object-center"
              alt={first_name || "User"}
              src={avatarUrl}
            />
            <Avatar.Fallback delayMs={600}>
              {first_name?.slice(0, 1)}
              {last_name?.slice(0, 1)}
            </Avatar.Fallback>
          </Avatar>

          <div className="flex flex-col justify-center items-center gap-1.5">
            <h1 className="text-xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100">
              {fullName}
            </h1>

            {groups && groups.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {groups.map((group) => (
                  <span
                    key={group.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300 border border-primary-100 dark:border-primary-900"
                  >
                    {getRoleLabel(group.name)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <section>
        <ul className="border hidden border-border bg-base-light dark:bg-overlay-dark p-2 flex-col gap-2 rounded-3xl">
          {profileSidebarItems.map((item, i) => (
            <ProfileSidebarItem key={i} {...item} />
          ))}
        </ul>
      </section>
    </aside>
  );
};
