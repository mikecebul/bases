import { createClient } from '@libsql/client'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    await client.execute('SELECT 1')

    client.close()

    return Response.json({ success: true })
  } catch (error) {
    console.error('DB Heartbeat error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
