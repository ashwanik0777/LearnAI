import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { signToken, setAuthCookie } from "@/lib/auth/session";
import { getClientIp, rateLimit, resetRateLimit } from "@/lib/auth/rate-limit";
import bcrypt from "bcryptjs";

const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$/;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const identifier = username.trim().toLowerCase();
    const ip = getClientIp(req);
    const accountKey = `login:account:${identifier}`;

    // Brute-force protection: per IP and per account
    if (
      !rateLimit(`login:ip:${ip}`, 20, 15 * 60 * 1000) ||
      !rateLimit(accountKey, 10, 15 * 60 * 1000)
    ) {
      return NextResponse.json(
        { message: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // The login form accepts either a username or an email
    const user = identifier.includes("@")
      ? (await storage.getUserByEmail(username.trim())) ?? (await storage.getUserByUsername(username.trim()))
      : await storage.getUserByUsername(username.trim());

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    let isValid = false;
    if (BCRYPT_HASH.test(user.password)) {
      isValid = await bcrypt.compare(password, user.password);
    } else if (user.password === password) {
      // Legacy plaintext password: accept once and upgrade it to a bcrypt hash
      isValid = true;
      await storage.updateUser(user.id, { password: await bcrypt.hash(password, 10) });
    }

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    resetRateLimit(accountKey);

    const token = await signToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
