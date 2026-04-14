import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const [timestamp, hmac] = session.value.split(".");
    if (!timestamp || !hmac) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 86400000) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const expected = crypto
        .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
        .update(timestamp)
        .digest("hex");
      if (
        !crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))
      ) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
