"use client";

import { SidebarIslandItem } from "./sidebar-island_item";
import { useActiveNavItem } from "@/shared/hooks/use-activenav-item";
import { usePathname } from "next/navigation";
import { SearchField } from "@heroui/react";
import NextLink from "next/link";

function hasItems(item: any): item is {
  items: { href: string; label: string; icon?: React.ReactNode }[];
} {
  return Array.isArray(item?.items);
}

export const SidebarIsland = () => {
  const pathname = usePathname();
  const activeNav = useActiveNavItem();

  if (!activeNav || activeNav.type !== "link" || !hasItems(activeNav)) {
    return null;
  }

  if (activeNav.items.length === 0) {
    return null;
  }

  return (
    <aside className="w-fit shadow-2xl border rounded-4xl h-[95%] border-border z-[9999] p-3  hidden overflow-y-auto sm:flex flex-col items-center">
      <header>
        <SearchField name="search" className="mb-4">
          <SearchField.Group>
            <SearchField.SearchIcon
              style={{ margin: 0, marginRight: "1rem" }}
            />
            <SearchField.Input placeholder="جستجو" />
            <SearchField.ClearButton
              style={{ margin: 0, marginLeft: "1rem" }}
            />
          </SearchField.Group>
        </SearchField>
      </header>

      <section className="flex flex-col gap-1 w-full">
        {activeNav.items.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <NextLink key={item.href} href={item.href} className="w-full">
              <SidebarIslandItem
                icon={item.icon}
                label={item.label}
                active={isActive}
              />
            </NextLink>
          );
        })}
      </section>
    </aside>
  );
};
