import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { openaiService } from "@/lib/ai/openai.service";
import { enhancedAiService } from "@/lib/ai/enhanced-ai.service";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const [profile, stats, subjects, progressData, weeklyData, recommendationsRaw, activities, studyPlan, assessments] =
      await Promise.all([
        storage.getProfile(user.id),
        storage.getDashboardStats(user.id),
        storage.getSubjects(),
        storage.getProgressByUser(user.id),
        storage.getWeeklyChartData(user.id),
        storage.getRecommendationsByUser(user.id),
        storage.getActivitiesByUser(user.id, 10),
        storage.getTodayStudyPlan(user.id),
        storage.getAssessmentsByUser(user.id),
      ]);

    const subjectsWithProgress = subjects.map((subject) => {
      const subjectProgress = progressData.find((p) => p.subjectId === subject.id);
      return {
        ...subject,
        progress: subjectProgress?.percentComplete || 0,
      };
    });

    let recommendations = recommendationsRaw;
    if (recommendations.length === 0) {
      try {
        const enhancedRecs = await enhancedAiService.generateComprehensiveRecommendations(user.id);
        recommendations = await Promise.all(
          enhancedRecs.map((rec) => storage.createRecommendation(rec))
        );
      } catch (aiError) {
        console.warn("Enhanced AI fallback:", aiError);
        const generatedRecs = openaiService.generateDefaultRecommendations(
          user.id,
          user.academicLevel,
          subjectsWithProgress
        );
        recommendations = await Promise.all(
          generatedRecs.map((rec) => storage.createRecommendation(rec))
        );
      }
    }

    const { password: _, ...cleanUser } = user;

    return NextResponse.json({
      user: cleanUser,
      profile: profile || {
        id: 0,
        userId: user.id,
        interests: [],
        goals: [],
        weaknesses: [],
        strengths: [],
        preferences: {},
      },
      stats,
      subjects: subjectsWithProgress,
      weeklyData,
      recommendations,
      activities,
      studyPlan,
      assessments,
      studyActivities: [],
    });
  } catch (error: any) {
    console.error("Dashboard route error:", error);
    return NextResponse.json({ message: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
