import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // const protectedRoutes = ["/panel/home", "/panel/profile", "/panel/settings"];
  const protectedRoutes = [ "/panel/settings"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}
