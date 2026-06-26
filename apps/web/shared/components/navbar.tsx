"use client";

import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";
import { Avatar, Button, ButtonGroup, Dropdown, Label } from "@heroui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ArrowRightFromSquare, Gear, Person, Persons } from "@gravity-ui/icons";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pageTitle = getPageTitle(pathname, siteConfig.navItems);

  const handleBack = () => {
    router.back();
  };

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
            <Avatar>
              <Avatar.Image
                alt="Junior Garcia"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <div className="px-3 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <Avatar.Image
                    alt="Jane"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                  />
                  <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <p className="text-sm leading-5 font-medium">
                    هستی اثنی عشری
                  </p>
                  <p className="text-xs leading-none text-muted">
                    hastiesna2009@gmail.com
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
              <Dropdown.Item id="logout" textValue="Logout" variant="danger">
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

function getPageTitle(pathname: string, navItems: any[]) {
  for (const item of navItems) {
    if (item.href === pathname) return item.label;

    if (item.items) {
      const subItem = item.items.find((i: any) => i.href === pathname);
      if (subItem) return subItem.label;
    }
  }

  return "عنوان صفحه";
}
