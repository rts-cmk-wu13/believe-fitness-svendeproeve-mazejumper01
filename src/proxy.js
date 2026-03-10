import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request) {

    
    if( !request.cookies.has("accessToken") )
return NextResponse.redirect(new URL('/no-access', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/kalender/:path*', '/courses/:path*'],
}