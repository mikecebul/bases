import { getClientSideURL } from './getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const appendCacheTag = (value: string, { allowLocalQuery = true }: { allowLocalQuery?: boolean } = {}) => {
    if (!cacheTag) return value
    if (!allowLocalQuery) return value

    const separator = value.includes('?') ? '&' : '?'
    return `${value}${separator}${cacheTag}`
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsedURL = new URL(url)
      const baseUrl = getClientSideURL()
      const parsedBaseURL = baseUrl ? new URL(baseUrl) : null
      const isSameOrigin = parsedBaseURL ? parsedURL.origin === parsedBaseURL.origin : false
      const isLoopbackHost = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(parsedURL.hostname)

      if (isSameOrigin || isLoopbackHost) {
        return appendCacheTag(`${parsedURL.pathname}${parsedURL.search}${parsedURL.hash}`, {
          allowLocalQuery: false,
        })
      }
    } catch {
      // Fall through to returning the original absolute URL.
    }

    return appendCacheTag(url)
  }

  // Keep local Payload media paths relative so Next can treat them as app-local assets
  // instead of performing a blocked remote fetch against localhost in dev.
  if (url.startsWith('/')) {
    return appendCacheTag(url, { allowLocalQuery: false })
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return appendCacheTag(`${baseUrl}${url}`)
}
