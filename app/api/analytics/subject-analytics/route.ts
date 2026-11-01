import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";

const subjectColors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316'];

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const [progress, allSubjects, quizAttempts] = await Promise.all([
      storage.getProgressByUser(user.id),
      storage.getSubjects(),
      storage.getQuizAttemptsByUser(user.id),
    ]);

    const subjectsData = progress.map((p, index) => {
      const subject = allSubjects.find((s) => s.id === p.subjectId);
      const subjectQuizzes = quizAttempts.filter((a) => a.quizId === p.subjectId);
      const avgScore = subjectQuizzes.length > 0
        ? Math.round(subjectQuizzes.reduce((sum, q) => sum + (q.percentageScore || 0), 0) / subjectQuizzes.length)
        : 75;

      return {
        id: subject?.id || 0,
        name: subject?.name || 'Subject',
        progress: p.percentComplete,
        color: subjectColors[index % subjectColors.length],
        score: avgScore,
        studyTime: 12,
        quizzes: subjectQuizzes.length,
        strength: "Conceptual Theory",
        weakness: "Complex Numerical Exercises",
        topics: [
          { name: "Foundations", progress: Math.min(100, p.percentComplete + 10), status: "mastered" },
          { name: "Applied Practice", progress: p.percentComplete, status: "in-progress" },
          { name: "Advanced Analysis", progress: Math.max(15, p.percentComplete - 20), status: "struggling" }
        ]
      };
    });

    return NextResponse.json({ subjects: subjectsData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
