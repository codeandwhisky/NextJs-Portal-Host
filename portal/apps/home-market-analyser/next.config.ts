import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? '/home-market-analyser' : '',
  output: 'standalone',
};

export default nextConfig;
