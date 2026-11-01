import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret, JWT_ALGORITHM } from "@/lib/auth/secret";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/courses",
  "/quizzes",
  "/recommendations",
  "/progress",
  "/analytics",
  "/planner",
  "/resources",
  "/achievements",
  "/profile",
  "/settings",
  "/help",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  let session: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, getJwtSecret(), {
        algorithms: [JWT_ALGORITHM],
      });
      session = payload;
    } catch {
      session = null;
    }
  }

  const isStaff = session?.role === "admin" || session?.role === "subadmin";

  // Auth pages redirect to the right dashboard if logged in
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL(isStaff ? "/admin" : "/dashboard", req.url));
  }

  // Admin login page is public; staff who are already signed in skip it
  if (pathname === "/admin/login") {
    if (isStaff) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Check admin route protection
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (!isStaff) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Check student protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/quizzes/:path*",
    "/recommendations/:path*",
    "/progress/:path*",
    "/analytics/:path*",
    "/planner/:path*",
    "/resources/:path*",
    "/achievements/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/help/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
