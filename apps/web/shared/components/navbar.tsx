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
        <h2 className="text-2xl">عنوان صفحه</h2>
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
        {/* <ThemeSwitch /> */}
      </NavbarContent>
    </HeroUINavbar>
  );
};
