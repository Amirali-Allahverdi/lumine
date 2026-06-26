"use client";
import { siteConfig } from "@/config/site";
import { SidebarLink } from "./sidebar-link";
import Image from "next/image";
import { SidebarIsland } from "./sidebar-islnad/sidebar-island";

export const Sidebar = () => {
  return (
    <div className="flex items-center">
      <aside className="w-fit z-[9999] hidden h-screen p-2 sm:flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <Image
            src={`/logos/lumine_light.svg`}
            alt="lumine logo"
            width={24}
            height={24}
            className="my-4"
          />
        </div>

        <section className="flex shadow-2xl flex-col gap-2 p-2 border border-border rounded-full">
          {siteConfig.navItems.map((item, index) => (
            <SidebarLink
              key={item.label}
              item={item}
              index={index}
              total={siteConfig.navItems.length}
            />
          ))}
        </section>

        <div className="h-[56px] w-full" aria-hidden="true" />
      </aside>

      <SidebarIsland />
    </div>
  );
};
