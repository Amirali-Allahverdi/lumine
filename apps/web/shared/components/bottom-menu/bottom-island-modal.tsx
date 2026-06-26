"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { SidebarIslandItem } from "../sidebar/sidebar-islnad/sidebar-island_item";

export const BottomIslandModal = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      setItems(e.detail.items || []);
      setOpen(true);
    };

    window.addEventListener("open-bottom-island", handler);

    return () => window.removeEventListener("open-bottom-island", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000000] sm:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      <div className="absolute bottom-0 w-full rounded-t-3xl bg-background p-4 flex flex-col gap-2">
        {items.map((item) => (
          <NextLink key={item.href} href={item.href}>
            <SidebarIslandItem icon={item.icon} label={item.label} />
          </NextLink>
        ))}
      </div>
    </div>
  );
};
