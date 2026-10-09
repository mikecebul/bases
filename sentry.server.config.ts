// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { sentryDataCollection } from './src/utilities/sentryOptions'
import { registerSentryTunnelListenerLimit } from './src/utilities/registerSentryTunnelListenerLimit'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) registerSentryTunnelListenerLimit()

Sentry.init({
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  dataCollection: sentryDataCollection,
  environment: process.env.NODE_ENV,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
