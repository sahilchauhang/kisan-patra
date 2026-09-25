import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("lang")
  const cookie = request.cookies.get("lang")?.value
  const lang = param === "hi" || param === "en" ? param : cookie === "hi" ? "hi" : "en"

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-lang", lang)
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  if ((param === "hi" || param === "en") && cookie !== param) {
    response.cookies.set("lang", param, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
}
