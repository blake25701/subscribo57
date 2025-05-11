/** @type {import('next').NextConfig} */
// Force clean build - v1
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com']  // Allow Google profile images
  }
}

module.exports = nextConfig 