import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { signToken, setAuthCookie } from "@/lib/auth/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Support both bcrypt-hashed and demo passwords
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, user.password);
    } catch {
      isValid = false;
    }

    if (!isValid && user.password === password) {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
