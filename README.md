# Boilerplate Template - Business Website for Substance and Mental Health Counseling

This project was built with [PayloadCMS](https://payloadcms.com/) and [Next.js 15](https://nextjs.org/), focusing on providing substance and mental health counseling services.

## Table of Contents

- [📄 Pages](#pages)
- [✨ Features](#features)
- [🚀 Getting Started](#getting-started)
  - [💻 Installation](#installation)
  - [🔧 Environment Setup](#environment-setup)
  - [🏃‍♂️ Running the Application](#running-the-application)
- [🎨 Creating Content](#creating-content)
  - [💁‍♂️ Create Pages](#create-pages)
  - [🛠️ Create Services](#create-services)
  - [👥 Create Team Members](#create-team-members)
  - [📚 Create Resources](#create-resources)
  - [ℹ️ Create About Us](#create-about-us)
  - [🔗 Create Links](#create-links)
  - [🧭 Navigation](#navigation)
- [🖼️ Images](#images)
- [💾 Database](#database)
- [🚀 Deployment](#deployment)
- [📝 Notes](#notes)

## Pages

- **Home**: Introduction to the services.
- **Services**: Detailed information about the counseling services.
- **Team**: Dynamic listing of board members and staff members. URLs follow the pattern "/team/staff/[slug]".
- **About Us**: Information about the organization.
- **Resources**: A collection of links and videos.

## Features

- **Framework**: Next.js 15 (React 19)
- **Admin Panel**: Payload CMS
- **Database**: Sqlite from [Turso](https://turso.tech).
- **Image Storage**: [Cloudflare R2](https://r2.cloudflarestorage.com/).
- **Animations**: [Framer Motion v12](https://www.framer.com/motion/).
- **Blocks**: Components built with [Shadcn/ui](https://ui.shadcn.com/).

## Getting Started

### Inspiration

This project is designed to be my base boilerplate for any new small business websites. For my current job as a counsler, my boss wanted to utilize my tech skills to improve the business website. This is my third iteration since starting 5 years ago. One thing I found is the need to modify to meet specific business needs, that's where Payload comes in. Also, if I'm going to make money doing this I better have a solid starting point. I hope others find use out of it too.

### Installation

1. [Create a new repository with this template](https://github.com/new?template_name=payload-marketing-template&template_owner=mikecebul)
2. Run `pnpm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in the required details.

### Environment Setup

Before running the application, you need to set up the following APIs and services. Copy the `.env.example` file to `.env` and update the values with your own credentials.

1. **Google Maps API**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API
   - Create an API key and add it to `GOOGLE_MAPS_API_KEY` in your `.env` file

2. **Resend Email**

   - Sign up for an account at [Resend](https://resend.com/)
   - Obtain your API key from the dashboard
   - Add the API key to `RESEND_API_KEY` in your `.env` file
   - Set your default sender email in `RESEND_DEFAULT_EMAIL`

3. **Turso Database**

   - Sign up for [Turso](https://turso.tech/)
   - Create a new database
   - Get your database URL and auth token
   - Add them to `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` respectively

4. **S3 Compatible Storage (Cloudflare R2)**

   - If you want to use S3 for file storage, set `S3_ENABLED=true`
   - Obtain credentials from your S3-compatible storage provider
   - Fill in the S3-related environment variables in your `.env` file

5. **Unsplash API**
   - Register as a developer on [Unsplash](https://unsplash.com/developers)
   - Create a new application to get your access and secret keys
   - Add these to `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY` in your `.env` file

### Running the Application

1. Run `pnpm run dev` to start the development server.
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating Content

### Create Pages

You'll most likely want to create the Home page first. When adding blocks you'll notice you need other pages to link to on your header's call to action. This template has blocks to make the following pages:

- Home
- Services
- Team
- About Us
- Resources (Lists of Links/Videos)

I didn't create a contact page/form as my boss prefers customers call, so that's the primary CTA on mobile. I may add a form later.

### Create Services

This one is easy as you can simply click the "Seed Services" that is only shown when the there are no services in the database. This has a custom select field to select a matching icon.

### Create Team Members

This one is also easy as you can simply click the "Seed Team" that is only shown when the there are no team members in the database. This can take 20-30 seconds to complete on Vercel on the free plan, so increase your function length to at least 30 seconds. This also has SEO fields for each team member. The layout of those pages uses the TeamMemberBlock automatically.

### Create Resources

My boss uses the website to quickly grab videos for group trainings, and other resources. So, I hide the pages from webcrawlers with the 'hideFromSearchEngines' checkbox in the SEO tab. Also, he would like to add link cards, but would never be bothered to add an image, so I use Unsplash API to grab a random image for the card when you choose 'generate' instead of 'manual upload'. You simply add coma seperated keywords for the type of image you want to be generated.

### Create About Us

This is basically just a RichText Field. I have a subtitle field to help match the theme of the website. Also, the is a hasMany upload field to add images that open in a slider which is setup to rotate every 5 seconds. Probably an easier way of doing this, but I originally planned for a slider.

### Create Links

This one is pretty easy as you can simply click the "Seed Links" that is only shown when the there are no links in the database. This has a custom select field to select a matching icon. This uses the LinksBlock automatically.

### Navigation

You add menu items to the header and footer. in the footer you can also add the company info and a google map by simply clicking a checkbox. The encypt and decrypt utilities are in the utilities folder as I was going to have a field for the API key, but later changed my mind.

## Images

In development you simply use the S3_ENABLED=false in the .env file and all your images will be saved to the local file system, and marked in the gitignore. When you are ready to deploy, go to vercel and create a new project. In the project settings, go to the "Domains" tab and add your domain. Then, go to the "Environment Variables" tab and add the following:

- S3_ENABLED=false
- S3_ACCESS_KEY_ID=
- S3_SECRET_ACCESS_KEY=
- S3_REGION=auto
- S3_ENDPOINT=
- S3_BUCKET=
- NEXT_PUBLIC_S3_HOSTNAME=
- NEXT_PUBLIC_UPLOAD_PREFIX=media

I'm not using the NEXT_PUBLIC_UPLOAD_PREFIX as I have all my images that use different formats in their own collection with their own prefix. It makes it similar to individual folders and more effecient than having 6 different formats for every image. Plus, type checking those nested image sizes is a pain in the ass.

Cloudflare R2 is convient if you already use them for DNS as you simply click a button and you have a subdomain for your bucket. Love it.

## Database

I'm using Turso which is really the icing on the cake for my dream stack for small websites like this. Right now the Payload SQLite adapter is in beta and I've found using migrations in development is the only usable form right now (Ritsu was right). Plus it lets you make sure your scripts work before you push them to production. Once stable I'm sure we can go back to using DB Push in development.

In development make sure to have the env var LOCAL_DATABASE_URL as it will save a local sqlite db. Super cool to not need to use docker to setup a postgres instance. To create a migration after finishing a fetaure use `payload migrate:create`.

Some caveats to using SQLite is not all migrations are supported. Such as updating a table's foreign key. For this one in particualar I found a [great video](https://youtu.be/qTp3VA-9DYc?si=7KSHOC8HoteU11r2) that explains how to properly handle it.

## Deployment

I'm using Vercel because I'd rather not maintain a Digital Ocean Droplet anymore. The migrate script is in the build script already.

## Notes

This is all using the free tiers of each service. Turso will automatically archive the db after 10 days of inactivity. Until I land my first paying customer for hosting, I'm just going to use the free cron job to send a heartbeat to keep it from sleeping. But $8.50 a month for 500 db's is pretty awesome, so I plan on subscribing soon.
