import { NextResponse } from 'next/server'

export function proxy(request) {
  const token = request.cookies.get("accessToken")
  const role = request.cookies.get("role")

  if (!token) {
    return NextResponse.redirect(new URL("/no-access", request.url))
  }


  if (request.nextUrl.pathname.startsWith("/deltagerListe")) {
    if (role?.value !== "admin") {
      return NextResponse.redirect(new URL("/no-access", request.url))
    }
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    '/kalender/:path*', '/deltagerListe/:path*'
  ],
}