/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ogutdgn/sanity-shared'],
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 4,
  },
}

export default nextConfig
