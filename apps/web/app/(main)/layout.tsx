import { Navbar } from "@/shared/components/navbar";
import { Sidebar } from "@/shared/components/sidebar/sidebar";
import { BottomMenu } from "@/shared/components/bottom-menu/bottom-menu";
import { SidebarIsland } from "@/shared/components/sidebar/sidebar-islnad/sidebar-island";
import { ScrollShadow } from "@heroui/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="pointer-events-none bottom-16 left-0 right-0 h-16 bg-gradient-to-t z-[9999] from-background/20 to-transparent sm:hidden" />

      <main className="flex flex-col flex-1 overflow-y-auto">
        <BottomMenu />
        <Navbar />
        <ScrollShadow
          size={150}
          className="h-screen absolute top-0 left-1/2 -translate-x-1/2 w-full"
        >
          <div className="flex-1 mt-16">{children}</div>
        </ScrollShadow>
      </main>
    </div>
  );
}
