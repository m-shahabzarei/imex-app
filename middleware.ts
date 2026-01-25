import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  const pathname = req.nextUrl.pathname
  console.log('cookies:', req.cookies.getAll())


  // const protectedRoutes = [
  //   '/panel/home',
  //   '/panel/profile',
  //   '/panel/settings',
  // ]
  const protectedRoutes = ['/panel/setting']

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/Login', req.url))
  }

  return NextResponse.next()
}
