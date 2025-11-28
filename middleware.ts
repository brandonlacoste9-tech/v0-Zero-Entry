import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only run auth check on dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Check for auth cookie
    const accessToken = request.cookies.get("sb-access-token")?.value

    if (!accessToken) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
