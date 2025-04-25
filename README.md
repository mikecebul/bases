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
- **Database**: MongoDB
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

Before running the application, you need to set up the following services:

#### Required Services

1. **MongoDB Database**

   - Create a new database
   - Add the connection string to `MONGODB_URI` in your `.env` file

2. **S3 Compatible Storage (Cloudflare R2)**
   - Set `S3_ENABLED=true` for production
   - Obtain credentials from your S3-compatible storage provider
   - Fill in the S3-related environment variables

#### Optional Services

1. **Google Maps API**

   - Create/select project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Add key to `GOOGLE_MAPS_API_KEY`

2. **Resend Email**

   - Get API key from [Resend](https://resend.com/)
   - Add to `RESEND_API_KEY`
   - Set `RESEND_DEFAULT_EMAIL`

3. **Unsplash API**
   - Register at [Unsplash Developers](https://unsplash.com/developers)
   - Add keys to `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY`

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

Cloudflare R2 is convient if you already use them for DNS as you simply click a button and you have a subdomain for your bucket. Love it.

## Database

MongoDB is running in a Docker container alongside the application on my VPS. I use Dokploy on a Hetzner server.

### Database Backup & Restore

Dokploy has features for automatic backups using crontab, how many to store so it deletes old ones (I set it to 90), and an easy way to restore if needed.

#### Manual Database Management

1. Install MongoDB Database Tools for working with backups:

##### MacOS

```bash
brew tap mongodb/brew
brew install mongodb-database-tools
```

##### Ubuntu

```bash
sudo apt-get install mongodb-database-tools
```

#### Restoring from Backup

1. Download the backup file from S3 to your local machine's `.dumps` directory
2. To restore to a new database name:

```bash
mongorestore --uri="YOUR_MONGODB_URI" \
  --nsInclude="original-db-name.*" \
  --nsFrom="original-db-name.*" \
  --nsTo="new-db-name.*" \
  --gzip \
  --archive=".dumps/your-backup-file.gz"
```

3. To drop and restore to the same database:

##### MongoDB Shell (mongosh):

```bash
mongosh "YOUR_MONGODB_URI"
use database-name
db.dropDatabase()
```

##### MongoDB Compass:

```bash
1. Connect to your database
2. Right-click on the database name
3. Select "Drop Database"
4. Confirm the deletion
```

##### Then restore (notice we don't need nsFrom/nsTo when keeping the same name)

```bash
mongorestore --uri="YOUR_MONGODB_URI" \
 --nsInclude="database-name.\*" \
 --gzip \
 --archive=".dumps/your-backup-file.gz"
```

## Deployment

This project is deployed on a VPS (Virtual Private Server) with Hetzner using [Dokploy](https://dokploy.com/) as the Platform as a Service (PaaS) solution. The setup includes:

### Infrastructure

- **VPS Provider**: Hetzner
- **Container Management**: Docker
- **PaaS**: Dokploy for simplified deployment and management
- **Database**: Self-hosted MongoDB in Docker
- **Backups**: Automatic backups to S3 storage

### Deployment Process

1. The application and MongoDB run in separate Docker containers
2. Dokploy manages container orchestration and deployment
3. Environment variables are managed through Dokploy's interface
4. Database backups should be performed regularly and uploaded to S3

### Environment Variables

Update your production `.env` file with MongoDB connection details:

```bash
MONGODB_URI=mongodb://username:password@localhost:27017/database
# ... other existing env vars ...
```
