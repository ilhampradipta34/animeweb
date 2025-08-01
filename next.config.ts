import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
       {
        protocol: "https",
        hostname: "heroui.com",
      },
    ],
  }
};

export default nextConfig;
