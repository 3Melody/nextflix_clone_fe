import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    optimizeCss: false, // ลดขนาด CSS
    
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // ตัด console.log ออกเวลา build
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
