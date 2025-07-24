import type { TextFieldSingleValidation } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './plugins/s3'
import {
  BlocksFeature,
  ParagraphFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
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
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { superAdmin } from './access/superAdmin'
import { MediaBlock } from './blocks/MediaBlock/config'
import { Media } from './collections/Media'
import { baseUrl } from './utilities/baseUrl'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<TeamType | Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name} | BASES` : 'BASES'
  }
  return doc?.title ? `${doc.title} | BASES` : 'BASES'
}

const generateURL: GenerateURL<TeamType | Page> = ({ doc }) => {
  if (!doc.slug) return baseUrl
  if ('memberType' in doc) return `${baseUrl}/team/${doc.slug}`
  return `${baseUrl}/${doc.slug}`
}
const generateImage: GenerateImage<TeamType | Page> = ({ doc }) => {
  if (
    typeof doc.meta?.metadata?.image === 'object' &&
    doc.meta?.metadata?.image?.sizes?.meta?.url
  ) {
    return doc.meta.metadata.image.sizes.meta.url || '/flowers-sign.webp'
  }
  return '/flowers-sign.webp'
}

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      afterNavLinks: ['@/components/afterNavLinks/LinkToAnalyticsDefaultRootView'],
      graphics: {
        Icon: '@/graphics/Icon',
        Logo: '@/graphics/Logo',
      },
      views: {
        CustomRootView: {
          Component: '@/components/views/Analytics',
          path: '/analytics',
        },
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
        ParagraphFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        BlocksFeature({
          blocks: [MediaBlock],
        }),
        LinkFeature({
          enabledCollections: ['pages'],
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
                  condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
                validate: ((value, options) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                    return true // no validation needed, as no url should exist for internal links
                  }
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              },
            ]
          },
        }),
      ]
    },
  }),
  graphQL: {
    disable: true,
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  collections: [Pages, Services, Team, Media, Users, Forms, FormSubmissions],
  globals: [Header, Footer, CompanyInfo],
  cors: [baseUrl || ''].filter(Boolean),
  csrf: [baseUrl || ''].filter(Boolean),
  email:
    process.env.NODE_ENV === 'production'
      ? resendAdapter({
          apiKey: process.env.RESEND_API_KEY || '',
          defaultFromAddress: 'bases-website@mikecebul.dev',
          defaultFromName: 'BASES Website',
        })
      : nodemailerAdapter({
          defaultFromAddress: 'bases-website@mikecebul.dev',
          defaultFromName: 'BASES Website',
          transportOptions: {
            host: process.env.EMAIL_HOST || 'localhost',
            port: process.env.EMAIL_PORT || 1025,
            auth: {
              user: process.env.EMAIL_USER || 'user',
              pass: process.env.EMAIL_PASSWORD || 'password',
            },
          },
        }),
  plugins: [
    sentryPlugin({
      options: {
        captureErrors: [400, 401, 403],
        context: ({ defaultContext, req }) => {
          return {
            ...defaultContext,
            tags: {
              locale: req.locale,
            },
          }
        },
        debug: true,
      },
      Sentry,
    }),
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
        admin: {
          group: 'Admin',
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
        media: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            if (typeof args.filename !== 'string') return null as unknown as string
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: process.env.NEXT_PUBLIC_UPLOAD_PREFIX || 'media',
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
