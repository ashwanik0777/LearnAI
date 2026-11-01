import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const profile = await storage.getProfile(user.id);
  return NextResponse.json(profile || null);
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await storage.updateProfile(user.id, data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update profile" }, { status: 500 });
  }
}
