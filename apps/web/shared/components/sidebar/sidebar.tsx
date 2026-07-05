"use client";
import { siteConfig } from "@/config/site";
import { SidebarLink } from "./sidebar-link";
import Image from "next/image";
import { SidebarIsland } from "./sidebar-islnad/sidebar-island";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex items-center">
      <aside className="z-[9999] hidden h-screen p-2 sm:flex flex-col items-center justify-between">
        <section className="flex w-[250px] shadow-2xl flex-col gap-2 p-2 bg-surface-primary-light border border-border dark:bg-surface-primary-dark rounded-4xl h-screen">
          <Link
            href={`https://luminemodels.ir`}
            className="mt-0 m-4 flex items-center gap-4"
          >
            <Image
              src={`/logos/lumine.svg`}
              alt="lumine logo"
              width={24}
              height={24}
              className="my-4"
            />
            <h3 className="text-xl font-bold">لومینه</h3>
          </Link>
          {siteConfig.navItems.map((item, index) => (
            <SidebarLink
              key={item.label}
              item={item}
              index={index}
              total={siteConfig.navItems.length}
            />
          ))}
        </section>

        {/* <div className="h-[56px] w-full" aria-hidden="true" /> */}
      </aside>
    </div>
  );
};
