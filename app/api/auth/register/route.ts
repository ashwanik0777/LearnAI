import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { signToken, setAuthCookie } from "@/lib/auth/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, password, email, fullName, academicLevel } = data;

    if (!username || !password || !email || !fullName || !academicLevel) {
      return NextResponse.json(
        { message: "All required registration fields must be provided" },
        { status: 400 }
      );
    }

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
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to register" },
      { status: 500 }
    );
  }
}
