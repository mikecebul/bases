import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  revalidatePath(path);
  console.log("Revalidate Path: ", path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
