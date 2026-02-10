import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  const isAuth = Boolean(accessToken || refreshToken);
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/panel") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/login") && isAuth) {
    return NextResponse.redirect(new URL("/panel/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/login"],
};
