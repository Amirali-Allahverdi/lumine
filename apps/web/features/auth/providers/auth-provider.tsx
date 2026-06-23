"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tokenService } from "@/shared/lib/http/token-service";
import { useAuthStore } from "../store/auth_1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isRedirectingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      setIsInitialized(false);

      const isAuthPage = pathname === "/auth";
      const isProtectedPage =
        pathname === "/" ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/settings");

      try {
        const hasValidToken = await tokenService.initialize();

        if (cancelled) return;

        if (hasValidToken) {
          const currentState = useAuthStore.getState();

          if (
            !currentState.authenticated ||
            currentState.authenticated.status !== "accept"
          ) {
            currentState.setAuthenticatedUser(
              "accept",
              tokenService.getAccessToken()!,
            );
          }

          if (isAuthPage && !isRedirectingRef.current) {
            isRedirectingRef.current = true;
            router.replace("/");
            return;
          }

          setIsInitialized(true);
          return;
        }

        if (isProtectedPage && !isRedirectingRef.current) {
          isRedirectingRef.current = true;
          router.replace("/auth");
          return;
        }

        setIsInitialized(true);
      } catch {
        if (cancelled) return;

        if (isProtectedPage && !isRedirectingRef.current) {
          isRedirectingRef.current = true;
          router.replace("/auth");
          return;
        }

        setIsInitialized(true);
      }
    }

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  useEffect(() => {
    isRedirectingRef.current = false;
  }, [pathname]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
