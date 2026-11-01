import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const recommended = await storage.getRecommendedQuizzes(user.id);
    return NextResponse.json(recommended);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
