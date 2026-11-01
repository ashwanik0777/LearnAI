import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { storage } from "@/lib/db/storage";
import { pickNoteFields } from "@/lib/notes";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const note = await storage.getNoteById(parseInt(id));
  if (!note || note.userId !== user.id) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const noteId = parseInt(id);
  const existing = await storage.getNoteById(noteId);
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  // Whitelist fields so a note can't be reassigned to another user via userId
  const data = pickNoteFields(await req.json());
  const updated = await storage.updateNote(noteId, data);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const noteId = parseInt(id);
  const existing = await storage.getNoteById(noteId);
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  await storage.deleteNote(noteId);
  return NextResponse.json({ success: true });
}
