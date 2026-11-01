import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { storage } from "@/lib/db/storage";
import { resetCodesStore } from "@/lib/auth/reset-codes";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateResetCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

const GENERIC_RESPONSE = {
  message: "If this email exists in our system, a reset code has been sent.",
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (
      !rateLimit(`forgot:ip:${getClientIp(req)}`, 10, 60 * 60 * 1000) ||
      !rateLimit(`forgot:email:${email.toLowerCase()}`, 3, 15 * 60 * 1000)
    ) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const user = await storage.getUserByEmail(email);

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    const resetCode = generateResetCode();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    resetCodesStore.set(email, {
      code: resetCode,
      expiry,
      userId: user.id,
      attempts: 0,
    });

    // No email provider is wired up yet, so the code is only printed in development.
    // Never log reset codes in production: anyone with log access could take over accounts.
    if (process.env.NODE_ENV !== "production") {
      console.log(`[dev] Reset code for ${email}: ${resetCode}`);
    }

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
