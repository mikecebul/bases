import { subscribe } from 'node:diagnostics_channel'
import type { IncomingMessage, ServerResponse } from 'node:http'

type RequestStart = {
  request: IncomingMessage
  response: ServerResponse
}

const registration = globalThis as typeof globalThis & {
  __basesSentryTunnelListenerLimitRegistered?: boolean
}

export function registerSentryTunnelListenerLimit() {
  // Instrumentation can be loaded again in development. Subscribe once per process.
  if (registration.__basesSentryTunnelListenerLimitRegistered) return

  subscribe('http.server.request.start', (message) => {
    const { request, response } = message as RequestStart
    const pathname = request.url?.split('?', 1)[0]
    if (pathname !== '/monitoring' && pathname !== '/monitoring/') return

    // Next 16's external rewrite proxy plus Sentry HTTP instrumentation can
    // legitimately exceed the default of 10 close listeners on this response.
    // Keep a finite limit and preserve any higher or unlimited existing limit.
    const currentLimit = response.getMaxListeners()
    if (currentLimit > 0 && currentLimit < 20) response.setMaxListeners(20)
  })

  registration.__basesSentryTunnelListenerLimitRegistered = true
}
