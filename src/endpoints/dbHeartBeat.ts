import type { PayloadHandler } from 'payload'
import { createClient } from '@libsql/client'

export const dbHeartBeat: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    await client.execute('SELECT 1')

    client.close()

    return Response.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}
