import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")
  const isLoginPage = request.nextUrl.pathname === "/"

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/invoice", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

