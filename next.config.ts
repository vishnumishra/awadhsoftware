import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site — `next build` writes plain HTML/CSS/JS to ./out,
  // which can be served from any static host (Vercel, Netlify, cPanel, S3…).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
