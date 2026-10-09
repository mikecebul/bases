import * as Sentry from '@sentry/nextjs'
import { sentryDataCollection } from './src/utilities/sentryOptions'

Sentry.init({
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  dataCollection: sentryDataCollection,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,
  debug: false,
})
