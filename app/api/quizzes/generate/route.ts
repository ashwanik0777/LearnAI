import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { quizService } from "@/lib/ai/quiz.service";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { subjectId, topic, difficulty = "intermediate", questionCount = 5 } = await req.json();

    if (!subjectId) {
      return NextResponse.json({ message: "Subject is required" }, { status: 400 });
    }

    const { quiz, questions } = await quizService.generatePracticeQuiz(
      user.id,
      parseInt(subjectId),
      topic || null,
      difficulty,
      parseInt(questionCount)
    );

    const createdQuiz = await storage.createQuiz(quiz);

    const createdQuestions = await Promise.all(
      questions.map((q) =>
        storage.createQuizQuestion({
          ...q,
          quizId: createdQuiz.id,
        })
      )
    );

    return NextResponse.json({
      quiz: createdQuiz,
      questions: createdQuestions,
    });
  } catch (error: any) {
    console.error("Quiz generation route error:", error);
    return NextResponse.json({ message: error.message || "Failed to generate quiz" }, { status: 500 });
  }
}
