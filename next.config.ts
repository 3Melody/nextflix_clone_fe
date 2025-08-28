import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'], // เพิ่มตรงนี้
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
