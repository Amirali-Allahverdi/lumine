import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function useActiveNavItem() {
  const pathname = usePathname();

  const activeItem = siteConfig.navItems.find((item) => {
    if (item.type !== "link") return false;

    if (item.href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(item.href);
  });

  return activeItem;
}
