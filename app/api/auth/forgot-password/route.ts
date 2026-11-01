import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { resetCodesStore } from "@/lib/auth/reset-codes";

function generateResetCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await storage.getUserByEmail(email);

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return NextResponse.json({
        message: "If this email exists in our system, a reset code has been sent.",
      });
    }

    const resetCode = generateResetCode();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    resetCodesStore.set(email, {
      code: resetCode,
      expiry,
      userId: user.id,
    });

    console.log(`Reset code for ${email}: ${resetCode}`);

    return NextResponse.json({
      message: "If this email exists in our system, a reset code has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
