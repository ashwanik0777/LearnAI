import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await storage.markAllNotificationsAsRead(user.id);
  return NextResponse.json({ success: true });
}
