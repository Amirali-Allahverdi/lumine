import "@/shared/styles/globals.css";

import { iranYekan, sfBold, sfLight, sfMed } from "@/config/fonts";
import clsx from "clsx";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Toast } from "@heroui/react";
import { AuthProvider } from "@/features/auth/providers/auth-provider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logos/lumine_dark_org.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa" dir="rtl">
      <head />
      <body
        className={clsx(
          iranYekan.variable,
          "relative z-0 min-h-screen font-iran-yekan text-primaryBaseLight bg-background-secondary-light dark:bg-background-secondary-dark antialiased",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
        <Toast.Provider placement="top" />
      </body>
    </html>
  );
}
