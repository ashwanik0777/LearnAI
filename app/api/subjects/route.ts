import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/db/storage";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  try {
    const subjects = await storage.getSubjects();
    return NextResponse.json(subjects);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'admin' && user.role !== 'subadmin')) {
    return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  }

  try {
    const data = await req.json();
    const created = await storage.createSubject(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
