import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (!path) {
    return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
  }
 
  revalidatePath(path)
 
  return NextResponse.json({ revalidated: true, now: Date.now() })
}