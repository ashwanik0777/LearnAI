import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { subDays, format } from "date-fns";
import type { StudyActivityData } from "@/lib/types";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const progress = await storage.getProgressByUser(user.id);
    const subjectIds = progress.map((p) => p.subjectId);
    const allSubjects = await storage.getSubjects();
    const userSubjects = allSubjects.filter((s) => subjectIds.includes(s.id));

    const studyActivities: StudyActivityData[] = [];
    const today = new Date();

    for (let i = 0; i < 90; i++) {
      const date = subDays(today, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const hasActivity = Math.random() < (isWeekend ? 0.4 : 0.7);

      if (hasActivity && userSubjects.length > 0) {
        const sessionCount = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < sessionCount; j++) {
          const subject = userSubjects[Math.floor(Math.random() * userSubjects.length)];
          studyActivities.push({
            date: format(date, "yyyy-MM-dd"),
            subject: subject.name,
            intensity: Math.floor(Math.random() * 5) + 1,
            duration: (Math.floor(Math.random() * 4) + 1) * 30,
            progress: Math.floor(Math.random() * 101),
            topics: ["Core Concepts", "Review"],
          });
        }
      }
    }

    return NextResponse.json(studyActivities);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
