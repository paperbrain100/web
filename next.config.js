/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http', // Allow resources with HTTP protocol
        hostname: 'ec2-54-199-57-42.ap-northeast-1.compute.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
