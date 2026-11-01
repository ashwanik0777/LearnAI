import type { InsertNote } from "@/lib/db/schema";

type EditableNoteFields = Partial<Omit<InsertNote, "userId">>;

// Whitelist of fields a client may set on a note. userId/id/timestamps are
// always controlled by the server.
export function pickNoteFields(body: any): EditableNoteFields {
  const data: EditableNoteFields = {};
  if (!body || typeof body !== "object") return data;

  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.content === "string") data.content = body.content;
  if (body.subjectId === null || typeof body.subjectId === "number") data.subjectId = body.subjectId;
  if (body.sessionId === null || typeof body.sessionId === "string") data.sessionId = body.sessionId;
  if (typeof body.isAiGenerated === "boolean") data.isAiGenerated = body.isAiGenerated;
  if (Array.isArray(body.tags)) data.tags = body.tags.filter((t: unknown) => typeof t === "string");

  return data;
}
