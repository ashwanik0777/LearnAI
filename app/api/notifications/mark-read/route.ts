import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await req.json();
  const notificationId = parseInt(id);
  if (isNaN(notificationId)) {
    return NextResponse.json({ message: "Invalid notification ID" }, { status: 400 });
  }

  // Scoped to the current user so one account can't read or modify another's notifications
  const updated = await storage.markNotificationAsRead(notificationId, user.id);
  if (!updated) {
    return NextResponse.json({ message: "Notification not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
