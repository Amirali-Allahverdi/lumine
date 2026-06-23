"use client";

import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Gear, Person } from "@gravity-ui/icons";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const pageTitle = getPageTitle(pathname, siteConfig.navItems);

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      isBlurred={false}
      className="bg-transparent top-2"
    >
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="start">
        <Button
          isIconOnly
          size="lg"
          className="shadow-2xl bg-transparent backdrop-blur-2xl border-1 border-border px-4 rounded-full"
        >
          <ChevronRight className="size-5" />
        </Button>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="backdrop-blur-xl border-1 border-border px-4 rounded-full"
      >
        <h2 className="text-2xl">{pageTitle}</h2>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="backdrop-blur-xl flex gap-6 border-1 border-border p-4 rounded-full">
          <Link href={`/settings`}>
            <Gear className="size-5" />
          </Link>
          <Link href={`/profile`}>
            <Person className="size-5" />
          </Link>
        </div>
        <ThemeSwitch />
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
