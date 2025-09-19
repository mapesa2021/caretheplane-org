/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for cPanel hosting
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Disable API routes for static export
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
