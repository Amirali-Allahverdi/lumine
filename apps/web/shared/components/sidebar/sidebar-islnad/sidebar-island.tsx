"use client";
import { siteConfig } from "@/config/site";
import { SidebarIslandLink } from "./sidebar-island_link";
import Image from "next/image";

export const SidebarIsland = () => {
  return (
    <aside className="w-fit hidden h-screen p-0.5 overflow-y-auto border-l border-border sm:flex flex-col items-center">
      <Image
        src={`/logos/lumine_light.svg`}
        alt="lumine logo"
        width={20}
        height={20}
        className="m-4"
      />

      <section className="w-fit p-2 rounded-3xl">
        {siteConfig.navItems.map((item, index) => (
          <SidebarIslandLink
            key={item.label}
            item={item}
            index={index}
            total={siteConfig.navItems.length}
          />
        ))}
      </section>
    </aside>
  );
};
