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
    if (isNaN(quizId)) {
      return NextResponse.json({ message: "Invalid quiz ID" }, { status: 400 });
    }

    const body = await req.json();
    const timeSpent = Math.min(Math.max(Number(body.timeSpent) || 60, 1), 24 * 60 * 60);

    // Accept either [{ questionId, answer }] (quiz page) or { [questionId]: answer }
    const submitted: Record<number, string> = {};
    if (Array.isArray(body.answers)) {
      for (const a of body.answers) {
        if (a && a.questionId != null && a.answer != null) submitted[Number(a.questionId)] = String(a.answer);
      }
    } else if (body.answers && typeof body.answers === "object") {
      for (const [qid, answer] of Object.entries(body.answers)) {
        if (answer != null) submitted[Number(qid)] = String(answer);
      }
    }

    const quiz = await storage.getQuizById(quizId);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    const questions = await storage.getQuizQuestions(quizId);
    let score = 0;
    const maxScore = questions.reduce((sum, q) => sum + (q.points || 1), 0);

    // Grading happens only on the server; the answer key is revealed after submission
    const gradedAnswers = questions.map((q) => {
      const answer = submitted[q.id] ?? "";
      const correct = answer !== "" && answer.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
      if (correct) score += q.points || 1;
      return {
        questionId: q.id,
        answer,
        correct,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      };
    });

    const percentageScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    // XP is only awarded for the first completed attempt, so it can't be farmed by resubmitting
    const previousAttempts = await storage.getQuizAttemptsByUser(user.id, quizId);
    const isFirstAttempt = !previousAttempts.some((a) => a.completed);

    const attempt = await storage.createQuizAttempt({
      userId: user.id,
      quizId,
      score,
      maxScore,
      percentageScore,
      timeSpent,
      completed: true,
      answers: gradedAnswers,
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
    const gainedXp = isFirstAttempt ? (percentageScore >= 70 ? 50 : 20) : 0;
    if (gainedXp > 0) {
      await storage.updateUser(user.id, {
        xp: user.xp + gainedXp,
        totalPoints: user.totalPoints + gainedXp,
      });
    }

    return NextResponse.json({
      attempt,
      score,
      maxScore,
      percentageScore,
      passed: percentageScore >= (quiz.passingScore || 70),
      gainedXp,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ message: "Failed to submit quiz" }, { status: 500 });
  }
}
