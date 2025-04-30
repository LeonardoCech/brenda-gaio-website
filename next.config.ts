import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necessário para exportação estática
  },
  // basePath: '/brenda-gaio-website',
  // assetPrefix: '/brenda-gaio-website/'
};

export default nextConfig;
