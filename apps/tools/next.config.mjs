/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ogutdgn/sanity-shared'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
