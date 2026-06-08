"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button, Input } from "@heroui/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/shared/components/icons";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
  Ellipse,
  Ellipsis,
} from "lucide-react";
import Link from "next/link";
import { Gear, Person } from "@gravity-ui/icons";

export const Navbar = () => {
  const searchInput = (
    <Input aria-label="Search" placeholder="جستجو کنید ..." type="search" />
  );

  return (
    <HeroUINavbar
      maxWidth="full"
      style={{ background: "transparent" }}
      position="sticky"
      className="border-b border-border"
    >
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="start">
        <Button
          isIconOnly
          size="lg"
          className="shadow-2xl bg-surface-secondary-light text-surface-secondary-dark dark:text-surface-secondary-light dark:bg-surface-secondary-dark"
        >
          <ChevronRight />
        </Button>
      </NavbarContent>

      <NavbarContent justify="center">
        <h2 className="text-2xl">عنوان صفحه</h2>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="dark:bg-surface-elevated-dark scale-125 bg-surface-elevated-light flex gap-5 p-2 rounded-full">
          <Link href={`/settings`}>
            <Gear />
          </Link>
          <Link href={`/profile`}>
            <Person />
          </Link>
        </div>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
