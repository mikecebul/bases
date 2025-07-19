# Use Node.js 20-alpine for compatibility with tsx and your engines field
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Update and enable Corepack
RUN npm install -g corepack@latest

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Create .env.production from Docker secrets (build-time only)
RUN --mount=type=secret,id=DATABASE_URI \
  --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL \
  --mount=type=secret,id=PAYLOAD_SECRET \
  --mount=type=secret,id=S3_ENABLED \
  --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING \
  sh -c '( \
  echo "DATABASE_URI=$(cat /run/secrets/DATABASE_URI)" && \
  echo "NEXT_PUBLIC_SERVER_URL=$(cat /run/secrets/NEXT_PUBLIC_SERVER_URL)" && \
  echo "PAYLOAD_SECRET=$(cat /run/secrets/PAYLOAD_SECRET)" && \
  echo "S3_ENABLED=$(cat /run/secrets/S3_ENABLED)" && \
  echo "SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN)" && \
  ) > .env.production'

ENV SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone

# Update and enable Corepack
RUN npm install -g corepack@latest

RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && set -a && . ./.env.production && set +a && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables from docker-compose.yml
ENV NEXT_PUBLIC_IS_LIVE=$NEXT_PUBLIC_IS_LIVE
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_UPLOAD_PREFIX=$NEXT_PUBLIC_UPLOAD_PREFIX
ENV NEXT_PUBLIC_USAEPAY_KEY=$NEXT_PUBLIC_USAEPAY_KEY
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ENV EMAIL_HOST=$EMAIL_HOST
ENV EMAIL_PORT=$EMAIL_PORT
ENV EMAIL_USER=$EMAIL_USER
ENV EMAIL_PASSWORD=$EMAIL_PASSWORD
ENV S3_ACCESS_KEY_ID=$S3_ACCESS_KEY_ID
ENV S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY
ENV S3_REGION=$S3_REGION
ENV S3_ENDPOINT=$S3_ENDPOINT
ENV S3_BUCKET=$S3_BUCKET
ENV NEXT_PUBLIC_S3_HOSTNAME=$NEXT_PUBLIC_S3_HOSTNAME
ENV UNSPLASH_ACCESS_KEY=$UNSPLASH_ACCESS_KEY

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

