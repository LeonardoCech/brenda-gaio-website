import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necessário para exportação estática
  },
  basePath: '',
  assetPrefix: './'
};

export default nextConfig;
