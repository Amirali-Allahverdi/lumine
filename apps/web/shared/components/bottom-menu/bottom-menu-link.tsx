"use client";

import { BottomMenuLinkProps } from "@/shared/types/bottom-menu/bottom-menu-link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const BottomMenuLink = ({
  href,
  icon,
  label,
  subItems,
}: BottomMenuLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  const baseClass = `flex w-32 p-2 px-4 rounded-full gap-1 flex-col items-center ${
    isActive ? "text-primary bg-surface-secondary-dark/30" : "text-foreground"
  }`;

  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent("open-bottom-island", {
        detail: { items: subItems, label },
      }),
    );
  };

  if (subItems?.length) {
    return (
      <button onClick={handleOpen} className={baseClass}>
        <span className="scale-125">{icon}</span>
        <h3 className="text-sm">{label}</h3>
      </button>
    );
  }

  return (
    <NextLink href={href} className={baseClass}>
      <span className="scale-125">{icon}</span>
      <h3 className="text-sm">{label}</h3>
    </NextLink>
  );
};
