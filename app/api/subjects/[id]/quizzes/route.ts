import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subjectId = parseInt(id);
    if (isNaN(subjectId)) {
      return NextResponse.json({ message: "Invalid subject ID" }, { status: 400 });
    }

    const quizzes = await storage.getQuizzesBySubject(subjectId);
    return NextResponse.json(quizzes);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
