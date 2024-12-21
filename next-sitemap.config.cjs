const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: baseUrl,
  generateRobotsTxt: false,
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
}
