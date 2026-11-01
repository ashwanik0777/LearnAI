import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { resetCodesStore } from "@/lib/auth/reset-codes";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await req.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { message: "Email, reset code, and new password are required" },
        { status: 400 }
      );
    }

    const resetData = resetCodesStore.get(email);

    if (!resetData || resetData.code !== resetCode) {
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
