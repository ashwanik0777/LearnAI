import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { moodAnalysisService } from "@/lib/ai/mood-analysis.service";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const moodInput = await req.json();
    if (!moodInput.moodDescription) {
      return NextResponse.json({ message: "Mood description is required" }, { status: 400 });
    }

    const moodAnalysis = await moodAnalysisService.analyzeMood(moodInput);
    const userMoodData = moodAnalysisService.formatUserMood(user.id, moodInput, moodAnalysis);
    const userMood = await storage.createUserMood(userMoodData);

    const userSubjects = await storage.getRelevantSubjectsForUser(user.id);
    const subjectNames = userSubjects.map((s) => s.name);

    const moodRecommendations = await moodAnalysisService.generateMoodBasedRecommendations(
      user.id,
      userMood.id,
      moodAnalysis,
      subjectNames
    );

    const savedRecommendations = await Promise.all(
      moodRecommendations.map((rec) => storage.createRecommendation(rec))
    );

    return NextResponse.json({
      mood: userMood,
      analysis: moodAnalysis,
      recommendations: savedRecommendations,
    });
  } catch (error: any) {
    console.error("Mood submission error:", error);
    return NextResponse.json({ message: error.message || "Failed to process mood" }, { status: 500 });
  }
}
