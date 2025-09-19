/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for cPanel hosting - DISABLED to enable API routes
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
