/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-health-blog.com',
  generateRobotsTxt: true,
  exclude: ['/keystatic/*'], // Exclude CMS routes
}
