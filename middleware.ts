import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  const isAuth = !!(accessToken || refreshToken);
  const pathname = req.nextUrl.pathname;


  if (pathname.startsWith("/panel") && !isAuth) {
    return NextResponse.redirect(new URL("/Login", req.url)) 
  }

  if (pathname.startsWith("/Login") && isAuth) {
    return NextResponse.redirect(new URL("/panel/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/Login"],
};
