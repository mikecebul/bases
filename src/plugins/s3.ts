import type { s3Storage } from '@payloadcms/storage-s3'
export type S3StoragePlugin = Parameters<typeof s3Storage>[0]
export const S3_PLUGIN_CONFIG: S3StoragePlugin = {
  acl: 'public-read',
  bucket: process.env.S3_BUCKET!,
  enabled: process.env.S3_ENABLED === 'true',
  collections: {},
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    region: process.env.S3_REGION,
  },
}
