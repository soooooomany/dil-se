/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    // Handle type checking in VS Code
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig