# Business Website for Substance and Mental Health Counseling

This project was built using [Next.js 13](https://nextjs.org/), focusing on providing substance and mental health counseling services. It includes a dynamic Team section, Carf certification representation, a donation section, and other features.

## Pages

- **Home**: Introduction to the services.
- **Services**: Detailed information about the counseling services.
- **Team**: Dynamic listing of board members and staff members. URLs follow the pattern "/team/staff/[slug]".
- **About Us**: Information about the organization.

## Features

- **Admin Panel**: Payload CMS
- **Database**: Postgres from [Neon](https://neon.tech).
- **Components**: Modified from [Shadcn/ui](https://ui.shadcn.com/).

## Getting Started

### Prerequisites

- Node.js 20
- Next.js 15
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
```
