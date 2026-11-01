import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const quizId = parseInt(id);
    const quiz = await storage.getQuizById(quizId);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    const questions = await storage.getQuizQuestions(quizId);
    return NextResponse.json({ quiz, questions });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
