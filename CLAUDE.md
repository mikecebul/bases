# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with PayloadCMS for content management, serving as a business website template for substance and mental health counseling services. The project uses MongoDB for data storage and is designed to be a reusable boilerplate for small business websites.

## Development Commands

- **Development**: `pnpm run dev` - Start development server with turbo mode
- **Build**: `pnpm run build` - Run migrations and build for production
- **Type Check**: `pnpm run typecheck` - Run TypeScript type checking
- **Lint**: `pnpm run lint` - Run ESLint
- **Lint Fix**: `pnpm run lint:fix` - Run ESLint with auto-fix
- **Start Production**: `pnpm start` - Start production server
- **Generate Types**: `pnpm run generate:types` - Generate Payload types
- **Create Migration**: `pnpm run migrate:create` - Create new database migration

## Architecture

### Core Technologies
- **Framework**: Next.js 15 with React 19
- **CMS**: PayloadCMS 3.48.0 with MongoDB database
- **Styling**: TailwindCSS with Shadcn/ui components
- **Animations**: Framer Motion (motion v12)
- **Forms**: React Hook Form with TanStack Form
- **Storage**: S3-compatible storage (Cloudflare R2)

### Application Structure

The application follows a hybrid architecture:
- Frontend routes: `src/app/(frontend)/` - Public-facing pages
- Admin routes: `src/app/(payload)/` - PayloadCMS admin interface
- API routes: `src/app/api/` - Custom API endpoints

### Content Management

**Collections**:
- `Pages` - Dynamic pages with block-based layouts
- `Team` - Team member profiles with SEO fields  
- `Services` - Service offerings with icon selection
- `Forms` - Custom form builder with field validation
- `FormSubmissions` - Form submission data with email handling
- `Media` - File uploads with blurhash generation
- `Users` - User management with role-based access

**Globals**:
- `Header` - Navigation configuration
- `Footer` - Footer content with company info and Google Maps
- `CompanyInfo` - Business details and contact information

### Block System

The site uses a flexible block-based content system:
- `Hero` - Hero sections with CTAs
- `Services` - Service listings with icons
- `Team` - Team member grids
- `AboutUs` - Rich text with image carousels
- `Links` - Link collections with auto-generated images
- `Form` - Dynamic form builder
- `RichText` - Rich text content with carousel support
- `TwoColumnLayout` - Two-column layouts
- `Donate` - Donation forms
- `Carf` - CARF-specific content blocks

### Access Control

Role-based permissions:
- `superAdmin` - Full system access
- `adminOrSuperAdmin` - Admin-level access
- `editorOrHigher` - Content editing permissions
- `authenticated` - Basic authenticated access
- `authenticatedOrPublished` - Public or authenticated content

### Key Features

- **SEO**: Comprehensive SEO plugin with meta fields
- **Forms**: Dynamic form builder with email notifications (Resend/Nodemailer)
- **Image Management**: Automatic image optimization with plaiceholder blur
- **Live Preview**: Real-time content preview in admin
- **Redirects**: Automatic redirect management
- **Monitoring**: Sentry integration for error tracking

### Environment Configuration

**Required**:
- `MONGODB_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - PayloadCMS secret key

**Optional**:
- `S3_ENABLED` - Enable S3 storage (false for local development)
- `RESEND_API_KEY` - Email service configuration
- `GOOGLE_MAPS_API_KEY` - Google Maps integration
- `UNSPLASH_ACCESS_KEY` - Auto-generate link card images

### Development Notes

- Use `S3_ENABLED=false` for local development (images stored locally)
- The project includes seed data functions for Services, Team, and Links
- Form submissions generate email notifications with Lexical content conversion
- Team member pages auto-generate with SEO-optimized URLs (`/team/[slug]`)
- Database migrations run automatically on build
- All images are processed with blurhash for smooth loading
- Use concise commit messages without generated attribution text