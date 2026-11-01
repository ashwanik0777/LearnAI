import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const quizId = parseInt(id);
    const { answers, timeSpent = 60 } = await req.json();

    const quiz = await storage.getQuizById(quizId);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    const questions = await storage.getQuizQuestions(quizId);
    let score = 0;
    const maxScore = questions.reduce((sum, q) => sum + (q.points || 1), 0);

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer && String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        score += q.points || 1;
      }
    });

    const percentageScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    const attempt = await storage.createQuizAttempt({
      userId: user.id,
      quizId,
      score,
      maxScore,
      percentageScore,
      timeSpent,
      completed: true,
      answers,
    });

    // Record activity
    await storage.createActivity({
      userId: user.id,
      subjectId: quiz.subjectId,
      type: "quiz",
      title: `${quiz.title} (${percentageScore}%)`,
      score: percentageScore,
      duration: Math.round(timeSpent / 60) || 1,
    });

    // Award XP
    const gainedXp = percentageScore >= 70 ? 50 : 20;
    await storage.updateUser(user.id, {
      xp: user.xp + gainedXp,
      totalPoints: user.totalPoints + gainedXp,
    });

    return NextResponse.json({
      attempt,
      score,
      maxScore,
      percentageScore,
      passed: percentageScore >= (quiz.passingScore || 70),
      gainedXp,
    });
  } catch (error: any) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ message: error.message || "Failed to submit quiz" }, { status: 500 });
  }
}
