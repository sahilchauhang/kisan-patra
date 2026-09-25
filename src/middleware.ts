import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("lang")
  const lang = param === "en" ? "en" : "hi"

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-lang", lang)
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  const cookie = request.cookies.get("lang")?.value
  if (cookie !== lang) {
    response.cookies.set("lang", lang, {
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
