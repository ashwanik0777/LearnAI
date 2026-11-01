import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { pickNoteFields } from "@/lib/notes";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const notes = await storage.getNotesByUser(user.id);
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = pickNoteFields(await req.json());
    if (!data.title || !data.content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }
    const created = await storage.createNote({
      ...data,
      title: data.title,
      content: data.content,
      userId: user.id,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json({ message: "Failed to create note" }, { status: 500 });
  }
}
