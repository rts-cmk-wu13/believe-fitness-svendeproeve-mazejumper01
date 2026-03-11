import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request) {

  const token = request.cookies.get("accessToken")
  const role = request.cookies.get("role")

    
      if (!token) {
    return NextResponse.redirect(new URL("/no-access", request.url))
  }

  if (request.nextUrl.pathname.startsWith("/createCourse")) {
    if (role?.value !== "admin") {
      return NextResponse.redirect(new URL("/no-access", request.url))
    }
  }

  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/kalender/:path*', '/courses/:path*'],
}