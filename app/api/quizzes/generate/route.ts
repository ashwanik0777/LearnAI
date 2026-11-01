import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { quizService } from "@/lib/ai/quiz.service";
import { rateLimit } from "@/lib/auth/rate-limit";
import { toPublicQuestion } from "@/lib/quiz";
import { QUIZ_DIFFICULTY_LEVELS } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Each generation calls the OpenAI API, so cap it per user to limit cost abuse
  if (!rateLimit(`quiz-generate:${user.id}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ message: "Quiz generation limit reached. Please try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const subjectId = parseInt(body.subjectId);
    const rawTopic = body.topicName ?? body.topic;
    const topic = typeof rawTopic === "string" && rawTopic.trim() ? rawTopic.trim().slice(0, 100) : null;
    const difficulty = (QUIZ_DIFFICULTY_LEVELS as readonly string[]).includes(body.difficulty)
      ? body.difficulty
      : "intermediate";
    const questionCount = Math.min(Math.max(parseInt(body.questionCount) || 5, 1), 20);

    if (isNaN(subjectId)) {
      return NextResponse.json({ message: "Subject is required" }, { status: 400 });
    }

    const { quiz, questions } = await quizService.generatePracticeQuiz(
      user.id,
      subjectId,
      topic,
      difficulty,
      questionCount
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
      ...createdQuiz,
      questions: createdQuestions.map(toPublicQuestion),
    });
  } catch (error) {
    console.error("Quiz generation route error:", error);
    return NextResponse.json({ message: "Failed to generate quiz" }, { status: 500 });
  }
}
