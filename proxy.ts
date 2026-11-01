import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "learn-ai-super-secure-jwt-secret-key-2025"
);

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
      const { payload } = await jwtVerify(token, JWT_SECRET);
      session = payload;
    } catch {
      session = null;
    }
  }

  // Auth pages redirect to dashboard if logged in
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Check admin route protection
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (session.role !== "admin" && session.role !== "subadmin") {
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
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
