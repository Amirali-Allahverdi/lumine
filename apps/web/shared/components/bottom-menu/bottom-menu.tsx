import { siteConfig } from "@/config/site";
import { BottomMenuLink } from "./bottom-menu-link";
import { getBottomNavItems } from "@/shared/helpers/navigation";
import NextLink from "next/link";
import { User } from "lucide-react";
import { PersonFill } from "@gravity-ui/icons";
import { BottomMenuSubItem } from "@/shared/types/bottom-menu/bottom-menu-link";

export const BottomMenu = () => {
  const items = getBottomNavItems(siteConfig.navItems);

  return (
    <nav className="fixed z-[9999] left-1/2 -translate-x-1/2 p-1 rounded-full bottom-4 flex sm:hidden w-full backdrop-blur-2xl justify-between items-center">
      {items.map((item, index) => (
        <BottomMenuLink
          key={index}
          href={item.href}
          icon={item.icon}
          label={item.label}
          subItems={
            "items" in item ? (item.items as BottomMenuSubItem[]) : undefined
          }
        />
      ))}
    </nav>
  );
};
