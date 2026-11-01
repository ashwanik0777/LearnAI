import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { getCurrentUser } from "@/lib/auth/session";

function getDefaultModules(subjectName: string) {
  return [
    {
      id: "mod-1",
      title: "Module 1: Introduction & Foundations",
      description: `Core fundamentals and principles of ${subjectName}.`,
      order: 1,
      lessons: [
        {
          id: "les-1-1",
          title: `Introduction to ${subjectName}`,
          description: "Overview of key concepts and learning objectives.",
          type: "video" as const,
          duration: 15,
          order: 1,
          isCompleted: true,
          content: `Welcome to the comprehensive course on ${subjectName}! In this introductory session, we explore key concepts, the historical context, and modern applications.`,
        },
        {
          id: "les-1-2",
          title: "Fundamental Theories and Methods",
          description: "Deep dive into core theories and formulas.",
          type: "text" as const,
          duration: 25,
          order: 2,
          isCompleted: false,
          content: `This lesson covers the primary frameworks necessary for mastering ${subjectName}. Take notes on the key formulas and conceptual models.`,
        },
        {
          id: "les-1-3",
          title: "Check Your Understanding: Quiz 1",
          description: "Assessment on foundational topics.",
          type: "quiz" as const,
          duration: 20,
          order: 3,
          isCompleted: false,
          content: "Test your comprehension of Module 1 topics.",
        },
      ],
    },
    {
      id: "mod-2",
      title: "Module 2: Intermediate Problem Solving",
      description: "Applying theories to real-world scenarios and complex problems.",
      order: 2,
      lessons: [
        {
          id: "les-2-1",
          title: "Analytical Problem Breakdown",
          description: "Step-by-step methodology for problem solving.",
          type: "video" as const,
          duration: 20,
          order: 1,
          isCompleted: false,
          content: "Learn how to deconstruct difficult multi-step problems.",
        },
        {
          id: "les-2-2",
          title: "Practical Exercise & Hands-on Assignment",
          description: "Project-based exercise to put skills into practice.",
          type: "assignment" as const,
          duration: 45,
          order: 2,
          isCompleted: false,
          content: "Apply what you have learned in a real-world project.",
        },
      ],
    },
    {
      id: "mod-3",
      title: "Module 3: Advanced Mastery",
      description: "Advanced topics, case studies, and exam preparation.",
      order: 3,
      lessons: [
        {
          id: "les-3-1",
          title: "Advanced Case Studies",
          description: "Critical analysis and advanced applications.",
          type: "text" as const,
          duration: 30,
          order: 1,
          isCompleted: false,
          content: "Examine advanced case studies and best practices.",
        },
        {
          id: "les-3-2",
          title: "Comprehensive Final Assessment",
          description: "Final evaluation of all course material.",
          type: "quiz" as const,
          duration: 35,
          order: 2,
          isCompleted: false,
          content: "Demonstrate mastery across all course modules.",
        },
      ],
    },
  ];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id);

    if (isNaN(courseId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Try finding course first
    let course = await storage.getCourse(courseId);
    let subject: any = null;

    if (course) {
      if (course.subjectId) {
        subject = await storage.getSubject(course.subjectId);
      }
      if (!subject) {
        subject = {
          id: course.id,
          name: course.title,
          description: course.description,
          icon: "book-open",
          color: "#4f46e5",
          educationalLevel: "undergraduate",
          progress: 45,
        };
      }
    } else {
      // If course not found by id, try subject
      subject = await storage.getSubject(courseId);
      if (subject) {
        course = {
          id: subject.id,
          title: subject.name,
          description: subject.description || "",
          subjectId: subject.id,
          coverImage: null,
          difficulty: "intermediate",
          estimatedDuration: 120,
          prerequisites: [],
          learningOutcomes: [],
          contentType: "standard",
          isPublished: true,
          isFeatured: true,
          contentUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    }

    if (!course && !subject) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const subjectWithProgress = {
      ...subject,
      progress: subject.progress ?? 35,
    };

    return NextResponse.json({
      ...course,
      subject: subjectWithProgress,
      modules: getDefaultModules(subjectWithProgress.name),
      enrolled: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "subadmin")) {
    return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    const data = await req.json();
    const updated = await storage.updateCourse(courseId, data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
