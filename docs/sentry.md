# Sentry setup

This app uses Sentry SaaS for the `mikecebul/bases` project. Browser, Node.js, and
edge runtimes initialize `@sentry/nextjs`. The Payload error boundary uses the same
SDK version through a scoped pnpm override.

## Connect the project

1. Open the `bases` project's **Settings → Client Keys (DSN)** in Sentry and copy
   its DSN into `NEXT_PUBLIC_SENTRY_DSN` in your local `.env`.
2. Under your organization's **Settings → Auth Tokens**, create an organization
   token for CI/source map uploads (`org:ci`). Set `SENTRY_AUTH_TOKEN` in your local
   `.env` only if you want to test uploads locally.

The non-secret organization and project slugs are fixed as `mikecebul` and `bases`
in `next.config.mjs`; no environment variables are needed for them.

```dotenv
NEXT_PUBLIC_SENTRY_DSN=<DSN from the bases project>
SENTRY_AUTH_TOKEN=<organization auth token>
```

The DSN identifies the event destination and is included in the browser bundle.
The auth token is a build-time secret used for releases and source map uploads;
it is never passed to the runtime container or browser. Do not commit `.env` or
`.env.sentry-build-plugin`.

## Production settings

The GitHub Actions workflow uses the repository's **Production** environment:

- Set its `NEXT_PUBLIC_SENTRY_DSN` secret to the new Sentry DSN.
- Set its `SENTRY_AUTH_TOKEN` secret to the new organization auth token.

The Docker build receives these via BuildKit secrets. GitHub passes the commit
SHA as `SENTRY_RELEASE`, so uploaded artifacts and runtime events share the same
release. In your hosting provider's runtime configuration, set
`NEXT_PUBLIC_SENTRY_DSN` to the same DSN. The browser DSN is set at build time:
rebuild and redeploy the image after changing it.

Source map uploads and release creation are enabled when `SENTRY_AUTH_TOKEN` is
present. Builds can run without it, but uploading source maps still needs a valid
token with access to `mikecebul/bases`.

## Verify

Restart the dev server after changing dependencies or environment values. Open
`http://localhost:3000/sentry-example-page` and click **Throw Sample Error**. This
exercises the browser SDK and `/api/sentry-example-api` through the real app.
Both should report to the `bases` project. A configured DSN enables reporting in
development too; an empty DSN disables it.

Confirm both error messages in the project's Issues view and inspect their source
frames. A connected Sentry MCP can also perform this check. After deploying a
build with source map uploads enabled, repeat the test to confirm readable
production stack traces and the commit SHA release.

Error monitoring remains enabled at the SDK's default error sample rate. Tracing
samples all development traces and 10% of production traces. The shared
`sentryDataCollection` configuration preserves the previous SDK's collection
defaults instead of enabling Sentry 11's broader defaults.

Next.js 16's external rewrite proxy and Sentry HTTP instrumentation can exceed
Node's default of 10 response listeners on `/monitoring`. The Node initialization
raises the limit to 20 for those responses only. Other routes keep their normal
limit, and higher or unlimited limits are preserved. Restart the dev server after
changing this instrumentation. This is a scoped warning-threshold adjustment,
not a fix for any independently confirmed memory leak.

References: [Next.js SDK setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/),
[token permissions](https://docs.sentry.io/api/permissions/), and
[Sentry instrumentation skill](https://skills.sentry.dev/sentry-instrument/SKILL.md).
