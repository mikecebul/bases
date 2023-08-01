import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (typeof path !== "string") {
    return NextResponse.json({ error: "Invalid path parameter." });
  }
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
