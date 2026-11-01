import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { signToken, setAuthCookie } from "@/lib/auth/session";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().trim().regex(/^[a-zA-Z0-9_.-]{3,32}$/, "Username must be 3-32 characters (letters, numbers, _ . -)"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  email: z.string().trim().pipe(z.email("Please enter a valid email address")),
  fullName: z.string().trim().min(2).max(100),
  academicLevel: z.string().trim().min(1).max(50),
});

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`register:ip:${getClientIp(req)}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { message: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }

    const parsed = registerSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "All required registration fields must be provided" },
        { status: 400 }
      );
    }
    const { username, password, email, fullName, academicLevel } = parsed.data;

    const existingUsername = await storage.getUserByUsername(username);
    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    const existingEmail = await storage.getUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await storage.createUser({
      username,
      password: hashedPassword,
      email,
      fullName,
      academicLevel,
      role: "user",
    });

    // Create default profile
    await storage.createProfile({
      userId: user.id,
      interests: ["General"],
      goals: ["Master key skills"],
      weaknesses: [],
      strengths: [],
      educationalLevel: academicLevel,
      showOnlyRelevantContent: true,
      preferences: {
        studyTime: "morning",
        preferredLearningStyle: "visual",
      },
    });

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
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to register" },
      { status: 500 }
    );
  }
}
