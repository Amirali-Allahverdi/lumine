"use client";

/**
 * ProtectedRoute
 *
 * چون middleware تمام ریدایرکت‌های server-side رو هندل می‌کنه،
 * این کامپوننت فقط یک لایه client-side guard اضافه می‌کنه
 * برای جلوگیری از flash محتوای protected قبل از تأیید توکن.
 *
 * برای اکثر صفحات، فقط کافیه از AuthProvider استفاده کنی
 * و نیازی به این کامپوننت نیست.
 */

import { useIsLoggedIn } from "@/features/auth/store/auth_1";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const isLoggedIn = useIsLoggedIn();

  // middleware قبلاً ریدایرکت کرده، اینجا فقط prevent flash می‌کنیم
  if (!isLoggedIn) {
    return (
      fallback ?? (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )
    );
  }

  return <>{children}</>;
}
