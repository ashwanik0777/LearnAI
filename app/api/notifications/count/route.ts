import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ count: 0 });
  }

  const count = await storage.getUnreadNotificationCount(user.id);
  return NextResponse.json({ count });
}
