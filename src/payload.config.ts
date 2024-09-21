import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'

import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './plugins/s3'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import Users from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateImage } from '@payloadcms/plugin-seo/types'
import { Page, Team as TeamType } from 'src/payload-types'
import { CompanyInfo } from './globals/CompanyInfo/config'
import { Avatars } from './collections/Avatars'
import { Landcapes } from './collections/Landscapes'
import { Cards } from './collections/Cards'
import { Portraits } from './collections/Portraits'
import { Services } from './collections/Services'
import { Files } from './collections/Files'
import { Team } from './collections/Team'
import { superAdmin } from './access/superAdmin'
import { seedServices } from './endpoints/seedServices'
import { seedTeam } from './endpoints/seedTeam'
import { MetaImages } from './collections/MetaImages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<TeamType | Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name} | BASES` : 'BASES'
  }
  return doc?.title ? `${doc.title} | BASES` : 'BASES'
}

const generateURL: GenerateURL<TeamType | Page> = ({ doc }) => {
  if (!doc.slug) return process.env.NEXT_PUBLIC_SERVER_URL!
  if ('memberType' in doc) return `${process.env.NEXT_PUBLIC_SERVER_URL!}/team/${doc.slug}`
  return `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
}
const generateImage: GenerateImage<TeamType | Page> = ({ doc }) => {
  if (typeof doc.meta?.metadata?.image === 'object' && doc.meta?.metadata?.image) {
    return doc.meta.metadata.image.url || '/flowers-sign.webp'
  }
  return '/flowers-sign.webp'
}

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: '@/graphics/Icon',
        Logo: '@/graphics/Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [{ url: '/favicon.ico' }],
      titleSuffix: ' - BASES',
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h2'] }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'files'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: sqliteAdapter({
    client: {
      // for turso you can do this:
      url: process.env.LOCAL_DATABASE_URL || process.env.TURSO_DATABASE_URL!,
      authToken: process.env.LOCAL_DATABASE_URL ? undefined : process.env.TURSO_AUTH_TOKEN,
    },
    // logger: true,
  }),
  collections: [
    Pages,
    Services,
    Team,
    Avatars,
    Cards,
    Landcapes,
    Portraits,
    MetaImages,
    Files,
    Users,
  ],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || '',
    defaultFromName: 'BASES Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  endpoints: [
    { handler: seedServices, method: 'get', path: '/seed-services' },
    { handler: seedTeam, method: 'get', path: '/seed-team' },
  ],
  globals: [Header, Footer, CompanyInfo],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'team'],
      overrides: {
        access: {
          admin: superAdmin,
          read: superAdmin,
          delete: superAdmin,
          update: superAdmin,
          create: superAdmin,
        },
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
      generateImage,
    }),
    s3StoragePlugin({
      ...S3_PLUGIN_CONFIG,
      collections: {
        avatars: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'avatars',
        },
        cards: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'cards',
        },
        landscapes: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'landscapes',
        },
        portraits: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'portraits',
        },
        'meta-images': {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'meta',
        },
        files: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: 'files',
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
