import { type NextRequest, NextResponse } from "next/server";

import { verifySessionToken } from "@/lib/auth-key";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const authed = await verifySessionToken(token);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !authed) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (pathname === "/sign-in" && authed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};
