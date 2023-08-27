/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Allow resources with HTTP protocol
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
