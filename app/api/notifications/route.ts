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
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20;

  const notifs = await storage.getNotificationsByUser(user.id, { onlyUnread, limit });
  return NextResponse.json(notifs);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();
  const created = await storage.createNotification({
    ...data,
    userId: user.id,
  });
  return NextResponse.json(created, { status: 201 });
}
