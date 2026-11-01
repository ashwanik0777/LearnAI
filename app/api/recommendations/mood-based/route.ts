import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const currentMood = await storage.getCurrentUserMood(user.id);
  if (!currentMood) {
    return NextResponse.json([]);
  }

  const recs = await storage.getMoodBasedRecommendations(user.id, currentMood.id);
  return NextResponse.json(recs);
}
