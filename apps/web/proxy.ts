import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGE = "/auth";
const AUTH_PREFIX = "/auth";
const REFRESH_COOKIE = "refresh_token";

const PROTECTED_PATHS = ["/", "/profile", "/settings"];

function hasRefreshToken(request: NextRequest): boolean {
  return !!request.cookies.get(REFRESH_COOKIE)?.value;
}

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/") return true;

  return PROTECTED_PATHS.filter((p) => p !== "/").some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefresh = hasRefreshToken(request);

  if (pathname === AUTH_PAGE && hasRefresh) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedPath(pathname) && !hasRefresh) {
    return NextResponse.redirect(new URL(AUTH_PAGE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
