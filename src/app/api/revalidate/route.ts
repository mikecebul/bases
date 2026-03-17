import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()
    
    // Check preview secret for authorization
    if (secret !== process.env.PREVIEW_SECRET) {
      return Response.json(
        { error: 'Invalid or missing secret' },
        { status: 401 }
      )
    }
    
    if (!path) {
      return Response.json(
        { error: 'Path is required' },
        { status: 400 }
      )
    }

    // Revalidate the specified path
    revalidatePath(path, 'layout')
    
    return Response.json(
      { message: `Successfully revalidated ${path}`, revalidated: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error revalidating path:', error)
    return Response.json(
      { error: 'Failed to revalidate path' },
      { status: 500 }
    )
  }
}