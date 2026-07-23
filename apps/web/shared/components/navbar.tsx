"use client";

import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
import { useMe } from "@/features/profile/hooks/mutations/use-me";
import { getMediaUrl } from "../lib/media/get-media";
import { useAuthStore } from "@/features/auth/store/auth_1";
import { getRoleLabel } from "../lib/get-role-label";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuthStore();
  const { data } = useMe();

  // ارسال هر دو آرایه به تابع جهت بررسی کامل مسیرها
  const pageTitle = getPageTitle(
    pathname,
    siteConfig.navItems,
    siteConfig.navMenuItems,
  );

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const avatarUrl = getMediaUrl(data?.images_portfolio?.full_shot_url);

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      isBlurred={false}
      className="bg-transparent top-2"
    >
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="start">
        <Button
          onPress={handleBack}
          isIconOnly
          size="lg"
          className="text-foreground shadow-2xl bg-transparent backdrop-blur-2xl border-1 border-border px-4 rounded-full"
        >
          <ChevronRight className="size-5" />
        </Button>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="backdrop-blur-xl border-1 border-border px-12 rounded-full"
      >
        <h2 className="text-2xl">{pageTitle}</h2>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />

        <Dropdown>
          <Dropdown.Trigger className="rounded-full">
            <Avatar size="sm">
              <Avatar.Image
                className="object-cover object-center"
                alt={data?.first_name || "User"}
                src={avatarUrl}
              />
              <Avatar.Fallback delayMs={600}>
                {data?.first_name?.slice(0, 1)}
                {data?.last_name?.slice(0, 1)}
              </Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <div className="px-3 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0">
                  <p className="text-sm leading-5 font-medium">
                    {data?.first_name} {data?.last_name}
                  </p>
                  <p className="text-xs leading-none text-muted">
                    {data?.phone_number}
                  </p>
                  <p className="text-xs leading-none text-muted">
                    {data?.groups?.map((role) => (
                      <span key={role.id}>{getRoleLabel(role.name)}،</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            <Dropdown.Menu>
              <Dropdown.Item id="profile" textValue="Profile">
                <Link
                  href={`/profile`}
                  className="flex w-full items-center justify-between gap-2"
                >
                  <Person className="size-3.5 text-muted" />
                  <Label>پروفایل</Label>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item id="settings" textValue="Settings">
                <Link
                  href={`/settings`}
                  className="flex w-full items-center justify-between gap-2"
                >
                  <Gear className="size-3.5 text-muted" />
                  <Label>تنظیمات</Label>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onPress={handleLogout}
                id="logout"
                textValue="Logout"
                variant="danger"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <ArrowRightFromSquare className="size-3.5 text-danger" />
                  <Label>خروج از حساب</Label>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </NavbarContent>
    </HeroUINavbar>
  );
};

function getPageTitle(pathname: string, navItems: any[], navMenuItems: any[]) {
  if (pathname === "/profile") {
    return "پروفایل";
  }

  for (const item of navItems) {
    if (item.href === pathname) return item.label;

    if (item.items) {
      const subItem = item.items.find((i: any) => i.href === pathname);
      if (subItem) return subItem.label;
    }
  }

  for (const item of navMenuItems) {
    if (item.href === pathname) return item.label;

    if (item.items) {
      const subItem = item.items.find((i: any) => i.href === pathname);
      if (subItem) return subItem.label;
    }
  }

  return "عنوان صفحه";
}
