import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { storage } from "@/lib/db/storage";
import { resetCodesStore, MAX_RESET_ATTEMPTS } from "@/lib/auth/reset-codes";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";
import bcrypt from "bcryptjs";

function codesMatch(expected: string, received: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(received.trim().toUpperCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await req.json();

    if (
      typeof email !== "string" || typeof resetCode !== "string" || typeof newPassword !== "string" ||
      !email || !resetCode || !newPassword
    ) {
      return NextResponse.json(
        { message: "Email, reset code, and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6 || newPassword.length > 128) {
      return NextResponse.json(
        { message: "Password must be between 6 and 128 characters" },
        { status: 400 }
      );
    }

    if (!rateLimit(`reset:ip:${getClientIp(req)}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json(
        { message: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const resetData = resetCodesStore.get(email);

    if (!resetData) {
      return NextResponse.json(
        { message: "Invalid reset code" },
        { status: 401 }
      );
    }

    if (new Date() > resetData.expiry) {
      resetCodesStore.delete(email);
      return NextResponse.json(
        { message: "Reset code has expired" },
        { status: 401 }
      );
    }

    if (!codesMatch(resetData.code, resetCode)) {
      resetData.attempts += 1;
      // Burn the code after too many wrong guesses so it can't be brute-forced
      if (resetData.attempts >= MAX_RESET_ATTEMPTS) {
        resetCodesStore.delete(email);
        return NextResponse.json(
          { message: "Too many invalid attempts. Please request a new reset code." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { message: "Invalid reset code" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await storage.updateUser(resetData.userId, { password: hashedPassword });
    resetCodesStore.delete(email);

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
