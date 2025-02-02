import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  const token = req.cookies.get("Authorization");

  if (!token) {
    return redirectToLogin(req);
  }

  try {
    const decodedToken = jwtDecode(token.toString()) as { exp: number };
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove("auth_token");
      return redirectToLogin(req);
    }
    const role = JSON.parse(window.localStorage.getItem("user") as string).role;
    const lang = req.cookies.get("NEXT_LOCALE") || "en";

    if (pathname === `${lang}/dashboard/users` && role !== "admin") {
      return NextResponse.redirect(new URL(`${lang}/dashboard`, req.url));
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const lang = req.cookies.get("NEXT_LOCALE") || "en";
  return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url));
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*", // Internationalized paths
    "/dashboard/:path*", // Secured dashboard path
    "/auth/:path*", // authentication paths
  ],
};
