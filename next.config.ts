import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kfc.discount',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
