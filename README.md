# Business Website for Substance and Mental Health Counseling

This project was built using [Next.js 13](https://nextjs.org/), focusing on providing substance and mental health counseling services. It includes a dynamic Team section, Carf certification representation, a donation section, and other features.

## Pages

- **Home**: Introduction to the services.
- **Services**: Detailed information about the counseling services.
- **Team**: Dynamic listing of board members and staff members. URLs follow the pattern "/team/staff/[slug]".
- **About Us**: Information about the organization.

## Features

- **Admin Panel**: Located at "/admin", protected with NextAuth using credentials provider.
- **Database**: Utilizing Postgres from [Neon](https://neon.tech) with access via Prisma.
- **Components**: Modified from [Shadcn/ui](https://ui.shadcn.com/).
- **Forms**: Staff member information updated using react-hook-form.
- **Images**: Profile pictures uploaded via [uploadthing](https://uploadthing.com), a wrapper for AWS's S3 bucket.

## Getting Started

### Prerequisites

- Node.js
- Next.js 13
- .env file (copy from .env.example)

### Installation

1. Clone the repository.
2. Run `npm install` or the yarn equivalent to install dependencies.
3. Copy `.env.example` to `.env` and fill in the required details.
4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
