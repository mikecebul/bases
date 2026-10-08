/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Payload may return an absolute URL for its local file endpoint. Keep it local
  // so Next's optimizer does not make a remote request to a private/loopback host.
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const parsed = new URL(url)
    const server = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    if (
      parsed.pathname.startsWith('/api/media/file/') &&
      (parsed.origin === server.origin ||
        ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname))
    ) {
      url = `${parsed.pathname}${parsed.search}${parsed.hash}`
    }
  }

  // Relative URLs work on both server and client without changing during hydration.
  if (!cacheTag) return url

  const [path, ...fragment] = url.split('#')
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}v=${encodeURIComponent(cacheTag)}${fragment.length ? `#${fragment.join('#')}` : ''}`
}
