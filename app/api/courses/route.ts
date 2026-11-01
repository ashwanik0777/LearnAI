import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const featured = searchParams.get("featured");

    if (featured === "true") {
      const courses = await storage.getFeaturedCourses();
      return NextResponse.json(courses);
    }

    if (subjectId) {
      const courses = await storage.getCoursesBySubject(parseInt(subjectId));
      return NextResponse.json(courses);
    }

    const courses = await storage.getCourses();
    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "subadmin")) {
    return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  }

  try {
    const data = await req.json();
    const created = await storage.createCourse(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
