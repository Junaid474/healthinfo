import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages static export
  images: {
    unoptimized: true, // Required for static export as Next.js Image Optimization API is not available
  },
};

export default nextConfig;
