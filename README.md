# Business Website for Substance and Mental Health Counseling

This project was built with [Next.js 15](https://nextjs.org/), focusing on providing substance and mental health counseling services. It includes a dynamic Team section, Carf certification representation, a donation section, and other features. And then rebuilt with the Payload CMS v3 website template.

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
2. Run `pnpm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in the required details.
4. Run the development server:

```bash
pnpm dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```