import assert from 'node:assert/strict'
import { channel } from 'node:diagnostics_channel'
import { IncomingMessage, ServerResponse } from 'node:http'
import { Socket } from 'node:net'
import { test } from 'node:test'
import { registerSentryTunnelListenerLimit } from '../src/utilities/registerSentryTunnelListenerLimit'

const requests = channel('http.server.request.start')
registerSentryTunnelListenerLimit()

function responseFor(url: string, limit = 10) {
  const request = new IncomingMessage(new Socket())
  request.url = url
  const response = new ServerResponse(request)
  response.setMaxListeners(limit)
  requests.publish({ request, response })
  return response
}

test('Sentry tunnel responses get headroom, including queries and the trailing slash', () => {
  for (const path of ['/monitoring', '/monitoring?o=123&p=456', '/monitoring/?o=123']) {
    assert.equal(responseFor(path).getMaxListeners(), 20)
  }
})

test('ordinary routes and similarly named paths keep their listener limits', () => {
  for (const path of ['/', '/api/users/me', '/monitoring-other', '/monitoring/nested']) {
    assert.equal(responseFor(path).getMaxListeners(), 10)
  }
})

test('higher and unlimited limits are preserved', () => {
  assert.equal(responseFor('/monitoring', 30).getMaxListeners(), 30)
  assert.equal(responseFor('/monitoring', 0).getMaxListeners(), 0)
})

test('registering instrumentation repeatedly does not multiply the subscription', () => {
  registerSentryTunnelListenerLimit()
  registerSentryTunnelListenerLimit()
  const response = responseFor('/monitoring')
  let updates = 0
  const setMaxListeners = response.setMaxListeners.bind(response)
  response.setMaxListeners = (limit: number) => {
    updates++
    return setMaxListeners(limit)
  }
  // Keep the reported starting limit low so every duplicate callback would update it.
  response.getMaxListeners = () => 10
  const request = new IncomingMessage(new Socket())
  request.url = '/monitoring'
  requests.publish({ request, response })
  assert.equal(updates, 1)
})
