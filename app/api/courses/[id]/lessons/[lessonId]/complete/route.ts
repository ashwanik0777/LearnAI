import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, lessonId } = await params;
  return NextResponse.json({
    success: true,
    lessonId,
    courseId: id,
    recommendation: {
      description: "Great job completing this lesson! Continue reviewing your notes to reinforce understanding.",
    },
  });
}
