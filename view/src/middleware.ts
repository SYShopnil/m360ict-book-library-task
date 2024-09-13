import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { EAuth } from "./types/common";

const authProtectedRoute = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/userList",
  "/dashboard/products",
  "/dashboard/products/[id]",
  "",
];

export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  let sessionStatus = false;
  const authToken = cookiesStore.get(EAuth.AuthTokenCookieName);
  if (authToken) {
    sessionStatus = true;
  }
  if (!sessionStatus && authProtectedRoute.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
