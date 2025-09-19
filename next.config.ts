import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
    ],
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
