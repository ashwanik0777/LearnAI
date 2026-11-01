import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const onlyUnread = searchParams.get("unread") === "true";
  const requestedLimit = parseInt(searchParams.get("limit") || "20");
  const limit = Math.min(Math.max(isNaN(requestedLimit) ? 20 : requestedLimit, 1), 100);

  const notifs = await storage.getNotificationsByUser(user.id, { onlyUnread, limit });
  return NextResponse.json(notifs);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { type, title, message, relatedId, relatedType } = await req.json();
  if (!type || !title || !message) {
    return NextResponse.json({ message: "type, title and message are required" }, { status: 400 });
  }

  // Only whitelisted fields; the owner always comes from the session
  const created = await storage.createNotification({
    type,
    title,
    message,
    relatedId: relatedId ?? null,
    relatedType: relatedType ?? null,
    userId: user.id,
  });
  return NextResponse.json(created, { status: 201 });
}
