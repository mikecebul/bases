export function getStorageFileUrl({ filename, prefix }: { filename: string; prefix?: string }) {
  const host = process.env.NEXT_PUBLIC_S3_HOSTNAME
  if (!host) throw new Error('NEXT_PUBLIC_S3_HOSTNAME is required when S3 storage is enabled')
  const path = [...(prefix?.split('/').filter(Boolean) || []), filename]
    .map((part) => encodeURIComponent(part))
    .join('/')
  return `https://${host}/${path}`
}
