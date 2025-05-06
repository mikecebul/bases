export const addHTTPS = (url: string) => {
  if (
    typeof url === 'string' &&
    url.length > 0 &&
    !url.startsWith('https://') &&
    !url.startsWith('http://')
  )
    return `https://${url}`
  return url
}
