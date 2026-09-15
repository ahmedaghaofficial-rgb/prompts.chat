import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, visibleLocales } from "./lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The app stores locale in a cookie rather than in the URL. Keep old/shared
  // locale-prefixed category links working by redirecting them to the real route.
  const localeCategoryMatch = pathname.match(/^\/([^/]+)(\/categories(?:\/.*)?$)/);
  if (localeCategoryMatch) {
    const [, locale, categoryPath] = localeCategoryMatch;

    if (visibleLocales.includes(locale)) {
      const url = request.nextUrl.clone();
      url.pathname = categoryPath;

      const response = NextResponse.redirect(url, 308);
      response.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        sameSite: "lax",
      });
      return response;
    }
  }

  // Rewrite .prompt.md and .prompt.yml requests to the raw API route
  if (pathname.startsWith("/prompts/") && (pathname.endsWith(".prompt.md") || pathname.endsWith(".prompt.yml"))) {
    const id = pathname.slice("/prompts/".length);
    const url = request.nextUrl.clone();
    url.pathname = `/api/prompts/${id}/raw`;
    return NextResponse.rewrite(url);
  }

  // Add pathname header for layout detection
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
