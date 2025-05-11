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
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' https://accounts.google.com https://*.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src 'self' https://accounts.google.com https://*.google.com",
              "connect-src 'self' https://* wss://*",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig 