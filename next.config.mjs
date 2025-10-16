/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false,
  },
  // Set output to standalone for better compatibility
  output: 'standalone',
  distDir: '.next'
}

export default nextConfig;